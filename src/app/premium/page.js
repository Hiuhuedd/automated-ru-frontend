// src/app/premiumPage.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PremiumPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [isLoading, setIsLoading] = useState(true);
  const [available, setAvailable] = useState(0);

  useEffect(() => {
        const ar = sessionStorage.getItem('available');
    setAvailable(ar)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    // alert(`Selected ${plan === "monthly" ? "Monthly" : "Semester"} Plan`);
  };

  
  const handleSubscription = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.push("/authScreen");
    } else {
      sessionStorage.setItem("amount", selectedPlan === "monthly" ? "99" : "249");
  
      const url = `/checkout`;
      router.push(url);
    }
  };



  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 font-poppins relative">
      {/* Back Arrow */}
      <button
        onClick={() => router.back()}
        className="absolute flex top-4 left-4 p-2 text-teal-800 hover:text-teal-600"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Back
      </button>

      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-800"></div>
        </div>
      ) : (
        <div className="relative bg-white shadow-lg rounded-lg w-full max-w-lg p-4 sm:p-6 space-y-4 sm:space-y-6 text-center scale-90 sm:scale-100 relative">
            <img
                src="/xmas.png"
                alt="Special Offer"
                className="absolute top-2 right-2 w-16 h-18 sm:w-8 sm:h-8"
              />
          
          <h2 className="text-2xl sm:text-3xl font-bold text-teal-800">Go Premium</h2>
          <p className="text-sm sm:text-base text-gray-700">
            Get full access to all {available} resources!
          </p>

          <div className="  grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Monthly Plan */}
        
            <div
              className={`p-4 sm:p-6 border-2 rounded-lg cursor-pointer ${
                selectedPlan === "monthly" ? "border-teal-800" : "border-gray-300"
              } relative`}
              onClick={() => handlePlanSelect("monthly")}
            >
            
              <h3 className="text-lg sm:text-xl text-gray-600 font-semibold">Monthly Plan</h3>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">Access for 30 days</p>
              <p className="mt-3 sm:mt-4 text-xl sm:text-2xl font-bold text-teal-800">Ksh 99/=</p>
              <p className="text-xs text-gray-500">Billed monthly</p>
            </div>

            {/* Semester Plan */}
            <div
              className={`p-4 sm:p-6 border-2 rounded-lg cursor-pointer ${
                selectedPlan === "semester" ? "border-teal-800" : "border-gray-300"
              } relative`}
              onClick={() => handlePlanSelect("semester")}
            >
            
              <h3 className="text-lg sm:text-xl text-gray-600 font-semibold">Semester Plan</h3>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">Access for 4 months</p>
              <p className="mt-3 sm:mt-4 text-xl sm:text-2xl font-bold text-teal-800">Ksh 249/=</p>
              <p className="text-xs text-gray-500">Billed once per semester</p>
            </div>
          </div>

          <button
            onClick={() =>  handleSubscription()}
            className="w-full bg-teal-800 text-white py-2 sm:py-3 rounded-lg text-sm sm:text-lg font-semibold mt-4"
          >
            Subscribe to {selectedPlan === "monthly" ? "Monthly" : "Semester"} Plan
          </button>
          <p className="text-xs sm:text-xs text-gray-400 mt-2">
            You can cancel anytime in your account settings.
          </p>
        </div>
      )}
    </div>
  );
}
