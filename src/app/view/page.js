"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

const ViewResource = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [documentData, setDocumentData] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const storedUrl = sessionStorage.getItem('fileURI');
        
        if (!storedUrl) {
          throw new Error('No file URI found in session storage');
        }

        // Extract the filename from the stored URL
        const url = new URL(storedUrl);
        const originalFileName = url.pathname.substring(1);

        // Fetch the presigned URL
        const presignedResponse = await axios.get(
          `https://automated-resource-upload.onrender.com/generatePresignedUrl?fileName=${encodeURIComponent(originalFileName)}`
        );

        if (!presignedResponse.data?.url) {
          throw new Error('No presigned URL returned from server');
        }

        // Fetch the document content
        const docResponse = await axios.get(presignedResponse.data.url, {
          responseType: 'blob',
        });

        // Create a blob URL from the response
        const docBlob = new Blob([docResponse.data], { 
          type: docResponse.headers['content-type'] || 'application/pdf' 
        });
        const docBlobUrl = URL.createObjectURL(docBlob);
        
        // Get the display name from the original URL
        const displayName = originalFileName.split('/').pop() || 'document';
        
        setDocumentData([{
          uri: docBlobUrl,
          fileName: displayName,
        }]);
        
      } catch (error) {
        console.error('Error fetching document:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();

    // Cleanup function
    return () => {
      if (documentData) {
        documentData.forEach(doc => {
          if (doc.uri.startsWith('blob:')) {
            URL.revokeObjectURL(doc.uri);
          }
        });
      }
    };
  }, []);

  const config = {
    header: {
      disableHeader: false,
      disableFileName: false,
      retainURLParams: false
    },
    csvDelimiter: ",",
    pdfZoom: {
      defaultZoom: 1.1,
      zoomJump: 0.2,
    },
    pdfVerticalScrollByDefault: true,
    loadingRenderer: {
      showLoadingTimeout: 250,
    }
  };

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
      {documentData ? (
        <div className="border rounded-lg shadow-lg h-screen">
          <DocViewer
            documents={documentData}
            pluginRenderers={DocViewerRenderers}
            config={config}
            className="h-full"
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: '#f8f9fa'
            }}
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