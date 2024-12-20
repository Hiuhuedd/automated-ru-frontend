"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MpesaCheckout() {
  const router = useRouter();

  // Initialize plan and amount with default values or null
  const [plan, setPlan] = useState(null);
  const [amount, setAmount] = useState(null);

  const [mpesaNumber, setMpesaNumber] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if we're running on the client side
    if (typeof window !== "undefined") {
      const storedPlan = sessionStorage.getItem("selectedPlan");
      const storedAmount = sessionStorage.getItem("amount");

      // Set the plan and amount from sessionStorage
      if (storedPlan && storedAmount) {
        setPlan(storedPlan);
        setAmount(storedAmount);
      }

      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
        setMpesaNumber(storedUser.phoneNumber);
      }
    }
  }, []); // Empty dependency array ensures this runs once when the component is mounted

  const handleCheckout = () => {
    alert(`Processing ${plan} plan payment of Ksh ${amount} for M-Pesa number ${mpesaNumber}`);
    // Add logic to integrate with the M-Pesa API if available
    router.push("/resources");
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
