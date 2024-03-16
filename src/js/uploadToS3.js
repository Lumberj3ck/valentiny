import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
// import dotenv from 'dotenv'

// dotenv.config()

// AWS.config.update({
//   accessKeyId: process.env.AWSAccessKeyId,
//   secretAccessKey: process.env.AWSSecretKey,
//   region: process.env.AWSRegion
// });


const client = new S3Client({
  credentials: {
    accessKeyId: '',
    secretAccessKey: ''
  },
  region: 'eu-north-1' 
});

export const uploadImageToS3 = async (file, bucketName, key) => {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: file,
    ContentType: file.type // Set the content type based on the uploaded file
  });

  try {
    const response = await client.send(command);
    console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    throw err; // Rethrow the error for handling in the calling code
  }
};


// export const main = async () => {
//   const command = new PutObjectCommand({
//     Bucket: "postcard-user-images",
//     Key: "hello-s3.txt",
//     Body: "Hello S3!",
//   });

//   try {
//     const response = await client.send(command);
//     console.log(response);
//   } catch (err) {
//     console.error(err);
//   }
// };
// export { uploadImageToS3 };
