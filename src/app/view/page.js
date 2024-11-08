"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ViewResource = () => {
  const router = useRouter();
  const [fileURI, setFileURI] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPresignedUrl = async () => {
      try {
        const storedUrl = sessionStorage.getItem('fileURI');
        let fileName;
        
        if (storedUrl) {
          // Extract the path after the bucket domain
          const url = new URL(storedUrl);
          fileName = url.pathname.substring(1); // Remove the leading '/' from the pathname
        }
        if (fileName) {
          // Make an API call to your server to fetch the presigned URL
          const response = await axios.get(`https://automated-resource-upload.onrender.com/generatePresignedUrl?fileName=${encodeURIComponent(fileName)}`);
          
          // Check if URL is returned and set it
          if (response.data.url) {
            setFileURI(response.data.url);
          } else {
            console.error('Failed to retrieve presigned URL');
          }
        }
      } catch (error) {
        console.error('Error generating presigned URL:', error);
      } finally {
        setLoading(false); // Set loading to false after the request is complete
      }
    };

    fetchPresignedUrl(); // Invoke the async function
  }, []);

  return (
    <div className="container">
      <h1>View Resource</h1>
      {loading ? (
        <p>Loading...</p>
      ) : fileURI ? (
        <iframe
          src={fileURI}
          width="100%"
          height="600"
          frameBorder="0"
          title="Resource Document"
        ></iframe>
      ) : (
        <p>Failed to load the resource.</p>
      )}
    </div>
  );
};

export default ViewResource;
