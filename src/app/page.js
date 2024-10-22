"use client";
import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);

  const [resource, setResource] = useState({
    programCode: '',
    isCommonUnit: false,
    unitCode: '',
    unitName: '',
    semester: '',
    year: '',
    resourceDate: '',
    isProfessorEndorsed: false,
    isExam: false,
    isNotes: false,
    unitProfessor: '',
  });
  const [pdfFile, setPdfFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setResource({
      ...resource,
      [name]: inputValue,
    });
  };

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', pdfFile);
    formData.append('resourceData', JSON.stringify(resource));

    setLoading(true); // Set loading to true when the request starts

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
        // Optionally show a success message to the user
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`); // Alert user with the error message
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file.'); // Generic error message
    } finally {
      setLoading(false); // Set loading to false when the request finishes
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 bg-white shadow-md rounded-lg w-full max-w-lg"
      >
        <h1>Resource upload form</h1>
        {/* Program Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Program Code
          </label>
          <input
            type="text"
            name="programCode"
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        {/* Unit Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Unit Code
          </label>
          <input
            type="text"
            name="unitCode"
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        {/* Unit Professor */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Unit Professor
          </label>
          <input
            type="text"
            name="unitProfessor"
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Semester */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Semester
          </label>
          <input
            type="number"
            name="semester"
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        {/* Year */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Year
          </label>
          <input
            type="number"
            name="year"
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        {/* Resource Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Resource Date
          </label>
          <input
            type="date"
            name="resourceDate"
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        {/* Is Professor Endorsed */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isProfessorEndorsed"
            onChange={handleInputChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm font-medium text-gray-700">
            Is Professor Endorsed
          </label>
        </div>

        {/* Is Exam */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isExam"
            onChange={handleInputChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm font-medium text-gray-700">
            Is Exam
          </label>
        </div>

        {/* Is Notes */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isNotes"
            onChange={handleInputChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm font-medium text-gray-700">
            Is Notes
          </label>
        </div>

        {/* Is Common Unit */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isCommonUnit"
            onChange={handleInputChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm font-medium text-gray-700">
            Is Common Unit
          </label>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload PDF
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="mt-1 block w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={loading}   className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
        {loading ? 'Uploading...' : 'Upload Resource'}
      </button>
      {loading && <p>Loading...</p>} {/* Loading indicator */}
      </form>
    </div>
  );
}
