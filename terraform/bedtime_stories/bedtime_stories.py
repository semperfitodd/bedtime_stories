import os
import openai
import boto3
import json
from datetime import datetime
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def get_secret(secret_name):
    client = boto3.client(service_name='secretsmanager')
    try:
        get_secret_value_response = client.get_secret_value(SecretId=secret_name)
    except Exception as e:
        raise e
    else:
        secret = json.loads(get_secret_value_response['SecretString'])
        return secret

def generate_story(characters, subject):
    characters_list = ', '.join(characters)
    prompt = f"Please create a child-friendly {subject} story featuring the characters: {characters_list}. Make it engaging and suitable for a 10-year-old reader. It should be around 1000 words."
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=500,
        temperature=0.7
    )
    return response.choices[0].text

def store_story(date, characters, subject, story_response, table):
    item = {
        'date': date,
        'characters': characters,
        'subject': subject,
        'story': story_response
    }
    table.put_item(Item=item)

def lambda_handler(event, context):
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    }

    if event['httpMethod'] == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': cors_headers
        }

    environment = os.getenv("ENVIRONMENT")
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(environment)

    if event['httpMethod'] == 'POST':
        try:
            body = json.loads(event.get('body', '{}'))
            characters = body.get('characters')
            subject = body.get('subject')

            if not characters or not subject:
                return {
                    'statusCode': 400,
                    'headers': cors_headers,
                    'body': json.dumps({'message': 'Characters and subject are required'})
                }

            secret_name = f"{environment}_secret"
            secrets = get_secret(secret_name)
            openai.organization = secrets['openai_org']
            openai.api_key = secrets['openai_key']

            generated_story = generate_story(characters, subject)
            current_date_string = datetime.now().strftime('%Y-%m-%d')
            store_story(current_date_string, characters, subject, generated_story, table)

            return {
                'statusCode': 200,
                'headers': cors_headers,
                'body': json.dumps({'story': generated_story, 'message': 'Story generated and stored successfully'})
            }

        except Exception as e:
            logger.error("Error processing request: {}".format(e))
            return {
                'statusCode': 500,
                'headers': cors_headers,
                'body': json.dumps({'message': 'Internal Server Error'})
            }

    else:
        return {
            'statusCode': 400,
            'headers': cors_headers,
            'body': json.dumps({'message': 'Invalid request method'})
        }
