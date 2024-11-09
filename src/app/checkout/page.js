// src/app/mpesaCheckout.js
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function MpesaCheckout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const amount = searchParams.get("amount");

  const [mpesaNumber, setMpesaNumber] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setMpesaNumber(storedUser.phoneNumber);
    }
  }, []);

  const handleCheckout = () => {
    alert(`Processing ${plan} plan payment of Ksh ${amount} for M-Pesa number ${mpesaNumber}`);
    // Add logic to integrate with the M-Pesa API if available
    router.push("/resources"); // Redirect back to the premium page

  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 sm:p-10 font-poppins">
      <div className="bg-white shadow-md rounded-lg p-6 sm:p-10 w-full max-w-md text-center">
        <h2 className="text-3xl font-semibold text-teal-800">M-Pesa Checkout</h2>
        <p className="text-sm text-gray-600 mt-1">Secure Payment Processing</p>
        
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-lg font-medium text-gray-700">Plan:</p>
            <p className="text-lg font-semibold text-teal-800">{plan === "monthly" ? "Monthly" : "Semester"}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg font-medium text-gray-700">Amount:</p>
            <p className="text-lg font-semibold text-teal-800">Ksh {amount}/=</p>
          </div>
        </div>

        <div className="mt-8">
          <label htmlFor="mpesaNumber" className="block text-sm font-medium text-gray-600 mb-2">
            M-Pesa Phone Number
          </label>
          <input
            id="mpesaNumber"
            type="tel"
            value={mpesaNumber}
            onChange={(e) => setMpesaNumber(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-teal-600"
            placeholder="Enter your M-Pesa number"
          />
        </div>

        <button
          onClick={handleCheckout}
          className="w-full bg-teal-800 hover:bg-teal-700 text-white py-3 rounded-lg text-lg font-semibold mt-6 transition duration-200"
        >
          Proceed to Pay
        </button>

        <p className="text-xs text-gray-500 mt-4">
          By proceeding, you agree to complete the payment via M-Pesa and accept the terms and conditions.
        </p>
      </div>
    </div>
  );
}
