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
  const [isDarkMode, setIsDarkMode] = useState(false); // Add state for dark mode

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('https://automated-resource-upload.onrender.com/resources');
        setResources(response.data);
        console.log(response.data);
      } catch (error) {
        alert('Error fetching resources:');
        console.error('Error fetching resources:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  const filteredResources = resources.filter(resource =>
    resource.unitName.toLowerCase().includes(searchTerm.toLowerCase())||resource.unitCode.toLowerCase().includes(searchTerm.toLowerCase())

  );

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode); // Toggle between light and dark themes
  };

  const router = useRouter();



  return (
    <>


    <div className={`min-h-screen p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-black'} font-poppins`}>
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-4">
  <input
    type="text"
    placeholder="Search resources..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="p-2 border border-gray-300 rounded text-teal-800 w-full sm:w-auto sm:flex-1"
  />

  <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4">
    <h3 className="font-semibold text-xs">Assets: {filteredResources.length * 2181}</h3>
    <h3 className="font-semibold text-xs">Downloads: {resources.length * 200}</h3>
  </div>

  <button
    onClick={toggleTheme}
    className="px-2 py-1 bg-blue-500 text-white rounded flex items-center justify-center"
  >
    {isDarkMode ? (
      <SunIcon className="h-5 w-5" />
    ) : (
      <MoonIcon className="h-5 w-5" />
    )}
  </button>
</div>


      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-blue-500" />
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {filteredResources.map((resource, index) => (
            <div key={index} className={`p-6 shadow rounded ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} `}>

          <div className={`p-4 rounded flex items-center  `}>
                <img
                  src="ku.png" // Reference the image in the public folder
                  alt="Resource Image"
                  className="w-10 h-10 object-cover  rounded-full " // Set a smaller width and height (e.g., 8rem x 8rem)
                  />
               <div className={`p-4 rounded `}>
               <h3 className="font-bo">KU Past Papers</h3>
               <p className='text-xs'>{moment(resource.resourceDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
               
              </div>
              </div>
             
              <div className={`p-4 shadow rounded flex justify-center items-center ${resource.isNotes ? 'bg-fuchsia-600' : 'bg-teal-800'} mb-4`}>
                <img
                  src="/pdf3.png" // Reference the image in the public folder
                  alt="Resource Image"
                  className="w-24 h-24 object-cover bg-teal-900 p-3 rounded-full mb-4" // Set a smaller width and height (e.g., 8rem x 8rem)
                  />
                <div className={`p-4 rounded ${isDarkMode ? 'bg-teal-800 text-white' : 'bg-white'} ml-2  mb-4`}>
               <h3 className="">Free to Download</h3>
               
              </div>
              </div>
              <h3 className="font-bold uppercase">{resource.unitName}</h3>
              <p className=" uppercase"> {resource.unitCode}</p>
              <p>{resource.isNotes ? 'Notes Available' : 'Past Paper'}</p>

              <button
                onClick={()=>   {  
                  sessionStorage.setItem('fileURI', resource.fileURI);
                  router.push('/view')   } }
                className="px-2 py-1 bg-teal-500 text-white rounded flex items-center justify-center"
              >
                View Resource
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}
