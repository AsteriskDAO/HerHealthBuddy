import express from 'express';
import { S3Client, PutObjectCommand, ListObjectsV2Command, HeadObjectCommand } from '@aws-sdk/client-s3';
const bucketName = 'poc-asterisk';

const generateRandomFileName = (extension = 'txt') => {
    const timestamp = Date.now(); 
    const randomNum = Math.floor(Math.random() * 1000); 
    return `${timestamp}-${randomNum}.${extension}`;
  };

const app = express();
const PORT = 5000;

app.use(express.json());

app.post('/api/createFile', (req, res) => {
  const { name, age, ethnicity, location } = req.body;

  // Asegúrate de que los datos se reciban correctamente
  console.log('Received data:', { name, age, ethnicity, location });

    //uploadFile(bucketName, message);
  
    res.status(200).json({ success: true, reply: `Message received: ${message}` });
  });
  

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express (ES Module)!' });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

const s3Client = new S3Client({
    endpoint: 'https://s3proxydc.akave.ai', // Endpoint Akave
    region: 'us-east-1', 
    credentials: {
      accessKeyId: 'cM1yVoZgoYSgZUj2o14eGzLyjrofyO', 
      secretAccessKey: 'ZIwwc8aZqj3ROeWatEzDCyLYntP3Q2', 
    },
    forcePathStyle: true, 
  });

async function uploadFile(bucketName, content) {
    try {
      const key = generateRandomFileName('txt');
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key, // file name
        Body: content, // file content
      });
      const response = await s3Client.send(command);
      console.log(`File "${key}" uploaded successfully"${bucketName}":`, response);
    } catch (error) {
      console.error(`Error"${key}":`, error.message);
    }
  }

  async function listObjects(bucketName) {
    try {
      const command = new ListObjectsV2Command({ Bucket: bucketName });
      const response = await s3Client.send(command);
      console.log(`Objects in the bucket "${bucketName}":`, response.Contents);
    } catch (error) {
      console.error(`Error "${bucketName}":`, error.message);
    }
  }

  async function getFileInfo(bucketName, fileName) {
    try {
      const command = new HeadObjectCommand({
        Bucket: bucketName,
        Key: fileName,
      });
      const response = await s3Client.send(command);
      console.log(`Metadata of the file "${fileName}" in the bucket "${bucketName}":`, response);
    } catch (error) {
      console.error(`Error "${fileName}":`, error.message);
    }
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////