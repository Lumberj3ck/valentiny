import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";



const client = new S3Client({
  credentials: {
    accessKeyId: import.meta.env.VITE_AWSSecretKey,
    secretAccessKey: import.meta.env.VITE_AWSAccessKeyId,
  },
  region: import.meta.env.VITE_AWSRegion 
});

export const uploadImageToS3 = async (file, bucketName, key) => {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: file,
    ContentType: file.type 
  });

  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    console.error(err);
    throw err; 
  }
};
