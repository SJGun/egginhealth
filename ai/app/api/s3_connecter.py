from config import Config
import boto3


def s3_connection():
    s3 = boto3.client('s3',
                      aws_access_key_id=Config.S3_ACCESS_KEY,
                      aws_secret_access_key=Config.S3_SECRET_KEY,
                      region_name='ap-northeast-2')
    return s3
