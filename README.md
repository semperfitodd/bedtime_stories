# AI-Powered Story Creator

## Overview
Kai's Stories is a fun and interactive story creation platform designed to foster a love for reading and storytelling in children. Inspired by the desire to make reading enjoyable, this app generates custom stories based on user-selected characters and subjects. Tailored for a youthful audience, these engaging stories can be both read and listened to, providing a multi-sensory experience.

## Background
As a parent eager to instill a love for reading in my son, I created this application to provide an entertaining and educational tool. By personalizing stories and incorporating audio narration, this app adds a unique twist to traditional reading, making it an enjoyable activity for children of various ages.

## Features
* **Custom Story Creation:** Users can choose characters and subjects to generate a unique story.
* **Interactive Audio Experience:** The application integrates with Amazon Polly to provide audible narration, allowing children to listen to the stories.
* **Serverless Architecture:** Built entirely on serverless technologies, this app ensures scalability and cost-efficiency.

## Technologies Used
**React:** Frontend development for a seamless user interface.

**Amazon Polly:** Text-to-speech service to create engaging audio narrations.

**AWS Lambda, DynamoDB, S3:** Backend components for generating and storing stories.

## Why Serverless?
By leveraging serverless technologies, this application benefits from reduced operational complexity and costs. It scales effortlessly with demand, ensuring a responsive and reliable experience.

## Purpose and Vision
Kai's Stories aims to create an enjoyable reading environment that encourages creativity and exploration. By providing children with personalized and interactive stories, this application nurtures a lifelong love for reading and learning.

## How to Use
1. **Choose Characters and Subject:** Select from predefined subjects and enter your favorite characters.
2. **Generate Story:** Click "Create Story" to generate a tailored story based on your selections.
3. **Read and Listen:** Enjoy reading the story or click "Play Story" to listen to the audio narration.

## Architecture

![architecture.png](images%2Farchitecture.png)

- **Frontend:** React.js
- **Backend:**
  - **API Gateway:** Handles API requests.
  - **Lambda:** Runs the story creation logic.
  - **DynamoDB:** Stores the generated stories.
  - **Poly API:** Generates the story audibly.
- **Infrastructure:**
  - **Route 53:** DNS management.
  - **ACM:** SSL certificate management.
  - **CloudFront:** CDN for the front-end.
  - **S3:** Hosts the static front-end files.
  - **AWS Secrets Manager:** Manages sensitive information.

## Deployment

### Frontend

1. Navigate to the React application directory.
2. Install dependencies with `npx create-react-app bedtime stories`.
3. Build the app with `npm run build`.
4. Deploy the build to the S3 bucket configured for hosting.

### Backend

1. Ensure that you have Terraform installed.
2. Clone the repository and navigate to the Terraform directory.
3. Open `variables.tf` and update the variables with your information.
4. Open `locals.tf` and update the variables with your information.
5. Run `terraform init` to initialize the Terraform configuration.
6. Run `terraform apply` to create the infrastructure.

## Usage

1. Open the web application in your browser.
2. Enter the characters and select a subject.
3. Click "Create Story" to generate a story.
![site.png](images%2Fsite.png)

Enjoy the stories with your children!