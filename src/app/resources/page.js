// src/app/resources.js
"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { SunIcon, MoonIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('https://automated-resource-upload.onrender.com/resources');
        setResources(response.data.reverse());
      } catch (error) {
        alert('Error fetching resources');
        console.error('Error fetching resources:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  const filteredResources = resources.filter((resource) =>
    resource.unitName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.unitCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleViewResource = (resource, index) => {
    if (index >= 3) {
      // Redirect to premium page for premium resources
      sessionStorage.setItem('available', resources.length);
      router.push('/premium');
    } else {
      // Redirect to view page for free resources
      sessionStorage.setItem('fileURI', resource.fileURI);
      router.push('/view');
    }
  };

  return (
    <div className={`min-h-screen p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-black'} font-poppins`}>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Search by unit name, unit code"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded text-teal-800 w-full sm:w-auto sm:flex-1"
        />
        <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4">
          <h3 className="font-semibold text-xs">Assets: {filteredResources.length }</h3>
          <h3 className="font-semibold text-xs">Downloads: {resources.length -resources.length/3 }</h3>
        </div>
        <button
          onClick={toggleTheme}
          className="px-2 py-1 bg-blue-500 text-white rounded flex items-center justify-center"
        >
          {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-blue-500" />
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {filteredResources.map((resource, index) => (
            <div key={index} className={`p-6 shadow rounded ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
              <div className="p-4 rounded flex items-center">
                <img
                  src="ku.png"
                  alt="Resource Image"
                  className="w-10 h-10 object-cover rounded-full"
                />
                <div className="p-4 rounded">
                  <h3 className="font-bold">KU Past Papers</h3>
                  <p className="text-xs">{moment(resource.resourceDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
                </div>
              </div>
              <div className={`py-4 px-1 shadow rounded flex justify-start items-center ${resource.isNotes ? 'bg-teal-800' : 'bg-sky-700'} mb-4`}>
                <img
                  src="/pdf3.png"
                  alt="Resource Image"
                  className="w-24 h-24 object-cover p-3 mb-4"
                />
                <div className="p-4 rounded ml-2 mb-4">
                  <p className={`uppercase ${isDarkMode ? 'text-gray-100' : 'text-gray-100'}`}>{resource.unitCode}</p>
                  <h3 className={`uppercase text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-300'}`}>{resource.isNotes ? 'Notes Available' : 'Past Paper'}</h3>
                </div>
                <div className="relative w-full h-full">
                  {index >= 3 && (
                    <img
                      src="/premium.png"
                      alt="Premium Badge"
                      className="absolute top-8 right-0 w-10 h-12 object-cover p-3 mb-4"
                    />
                  )}
                </div>
              </div>
              <p className="uppercase">{resource.unitName}</p>
              <button
                onClick={() => handleViewResource(resource, index,)}
                className="px-2 py-2 mt-3 text-xs bg-sky-800 text-white rounded flex items-center justify-center"
              >
                View Resource
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
