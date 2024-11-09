// src/app/premiumPage.js
"use client";
import { useState } from "react";

export default function PremiumPage() {
  const [selectedPlan, setSelectedPlan] = useState("monthly");

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    alert(`Selected ${plan === "monthly" ? "Monthly" : "Semester"} Plan`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 font-poppins">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-4 sm:p-6 space-y-4 sm:space-y-6 text-center scale-90 sm:scale-100">
        <h2 className="text-2xl sm:text-3xl font-bold text-teal-800">Go Premium</h2>
        <p className="text-sm sm:text-base text-gray-700">Get full access to all resources and exclusive content!</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Monthly Plan */}
          <div
            className={`p-4 sm:p-6 border-2 rounded-lg cursor-pointer ${
              selectedPlan === "monthly" ? "border-teal-800" : "border-gray-300"
            }`}
            onClick={() => handlePlanSelect("monthly")}
          >
            <h3 className="text-lg sm:text-xl font-semibold">Monthly Plan</h3>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">Access for 30 days</p>
            <p className="mt-3 sm:mt-4 text-xl sm:text-2xl font-bold text-teal-800">Ksh 99</p>
            <p className="text-xs text-gray-500">Billed monthly</p>
          </div>

          {/* Semester Plan */}
          <div
            className={`p-4 sm:p-6 border-2 rounded-lg cursor-pointer ${
              selectedPlan === "semester" ? "border-teal-800" : "border-gray-300"
            }`}
            onClick={() => handlePlanSelect("semester")}
          >
            <h3 className="text-lg sm:text-xl font-semibold">Semester Plan</h3>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">Access for 4 months</p>
            <p className="mt-3 sm:mt-4 text-xl sm:text-2xl font-bold text-teal-800">Ksh 249</p>
            <p className="text-xs text-gray-500">Billed once per semester</p>
          </div>
        </div>

        <button
          onClick={() => handlePlanSelect(selectedPlan)}
          className="w-full bg-teal-800 text-white py-2 sm:py-3 rounded-lg text-sm sm:text-lg font-semibold mt-4"
        >
          Subscribe to {selectedPlan === "monthly" ? "Monthly" : "Semester"} Plan
        </button>
        <p className="text-xs sm:text-xs text-gray-400 mt-2">You can cancel anytime in your account settings.</p>
      </div>
    </div>
  );
}
