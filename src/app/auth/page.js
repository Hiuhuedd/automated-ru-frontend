"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpSignInPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(true); // Toggle between sign-up and sign-in
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");


  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);



  const handleSwitch = () => {
    setIsSignUp((prev) => !prev);
  };

  const handleSignUp = () => {
    const user = { username, phoneNumber, password };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Sign-up successful! Redirecting to Premium Page...");
    router.push("/premium"); // Redirect back to the premium page
  };

  const handleSignIn = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      alert("Sign-in successful!");
      router.push("/premium"); // Redirect back to the premium page
    } else {
      alert("Invalid credentials! Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-poppins">

{isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-800"></div>
        </div>
      ) : (
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 space-y-4 text-center">
        <h2 className="text-2xl font-bold text-teal-800">{isSignUp ? "Sign Up" : "Sign In"}</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />

        {isSignUp && (
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        )}

        <input
          type="password"
          placeholder="4-Digit Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />

        <button
          onClick={isSignUp ? handleSignUp : handleSignIn}
          className="w-full bg-teal-800 text-white py-2 rounded mt-4"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>

        <p className="text-sm text-gray-600 mt-4">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <button onClick={handleSwitch} className="text-teal-800 ml-1">
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>)
}
    </div>
  );
}
