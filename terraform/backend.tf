terraform {
  backend "s3" {
    bucket = "bernson.terraform"
    key    = "bedtime_stories"
    region = "us-east-2"
  }
}