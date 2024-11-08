"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [resource, setResource] = useState({
    unitCode: '',
    unitName: '',
    isNotes: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setResource((prevResource) => ({
      ...prevResource,
      [name]: inputValue,
    }));
  };

  const handleNavigate = () => {
    router.push('/resources');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://automated-resource-upload.onrender.com/generate-and-upload', resource, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
alert(response.data.message)
      console.log('Success:', response.data); // Handle successful response
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        alert(`Error: ${error.response.data.error}`);
      } else {
        console.error('Error uploading file:', error);
        alert('An error occurred while generating the file.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
       <button
        onClick={handleNavigate}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        View Resources
      </button>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 bg-white shadow-md rounded-lg w-full max-w-lg"
      >
        <h1  className="text-blue-500 ">Resource upload form</h1>
      
        {/* Unit Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Unit Code
          </label>
          <input
            type="text"
            name="unitCode"
            value={resource.unitCode}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-50 text-slate-950 uppercase py-1 shadow-sm"
            required
          />
        </div>

        {/* Unit Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Unit Name
          </label>
          <input
            type="text"
            name="unitName"
            value={resource.unitName}
            onChange={handleInputChange}
            className="mt-1 block w-full text-slate-950 uppercase border-gray-50 py-1 shadow-sm"
            required
          />
        </div>

        {/* Is Notes */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isNotes"
            checked={resource.isNotes}
            onChange={handleInputChange}
            className="h-4 w-4 text-indigo-600  border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm font-medium text-gray-700">
            Is Notes
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          {loading ? 'Generating...' : 'Generate Resource'}
        </button>
        {loading && <p>Loading...</p>}
      </form>
    </div>
  );
}
