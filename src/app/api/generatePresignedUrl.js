import AWS from 'aws-sdk';

AWS.config.update({
  region: "ap-southeast-1", // e.g., 'us-east-1'
  accessKeyId: "AKIAVIOZF52DHJ2ZANUF", // Set your AWS Access Key
  secretAccessKey:"NNH20eV1HzjSnM/TsLc9T4c+MLpOqDx975EOYR6v", // Set your AWS Secret Key
});

const s3 = new AWS.S3();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { fileName } = req.query; // Get the file name from the query parameters

      // Define parameters for generating the presigned URL
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME, // Set your S3 bucket name
        Key: fileName,
        Expires: 60 * 60, // URL expiration time in seconds (e.g., 1 hour)
      };

      // Generate the presigned URL
      const url = s3.getSignedUrl('getObject', params);

      return res.status(200).json({ url });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to generate presigned URL' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
