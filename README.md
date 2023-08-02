# AI-Powered Story Creator

This application creates a fun and interactive story creation platform. Inspired by the desire to make reading enjoyable for children, this app generates custom stories based on user input.

## Architecture

- **Frontend:** React.js
- **Backend:**
  - **API Gateway:** Handles API requests.
  - **Lambda:** Runs the story creation logic.
  - **DynamoDB:** Stores the generated stories.
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

Enjoy the stories with your children!