"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

const ViewResource = () => {
  const [fileURI, setFileURI] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPresignedUrl = async () => {
      try {
        const storedUrl = sessionStorage.getItem('fileURI');
        
        if (!storedUrl) {
          throw new Error('No file URI found in session storage');
        }

        const url = new URL(storedUrl);
        const fileName = url.pathname.substring(1);

        const response = await axios.get(
          `https://automated-resource-upload.onrender.com/generatePresignedUrl?fileName=${encodeURIComponent(fileName)}`
        );

        if (!response.data?.url) {
          throw new Error('No presigned URL returned from server');
        }
console.log(response.data.url)
        setFileURI(response.data.url);
      } catch (error) {
        console.error('Error fetching presigned URL:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPresignedUrl();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error loading the resource: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">View Resource</h1>
      {fileURI ? (
        <div className="border rounded-lg shadow-lg h-screen">
          <DocViewer
            documents={[{ uri: fileURI }]}
            pluginRenderers={DocViewerRenderers}
            className="h-full"
          />
        </div>
      ) : (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>No resource available to display.</p>
        </div>
      )}
    </div>
  );
};

export default ViewResource;
