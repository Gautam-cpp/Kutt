"use client";

import { InputBox } from "@/components/inputBox";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function AuthForm() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  

  const handleSubmit = async (type: "login" | "signup", e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/auth/${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push("/")
        console.log(`${type === "login" ? "Login" : "Signup"} successful`);
        const data = await response.json();
        
       
      } else {
        const errorData = await response.json();
        setError(errorData.message || "An error occurred.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
      
    }
  };

  return (
    <div className="flex  justify-center">
      <form
        className="w-[420px] max-w-full flex flex-grow-1 flex-shrink-1 basis-auto py-0 px-4 flex-col m-0 mt-[3rem] gap-4"
        onSubmit={(e) => handleSubmit("login", e)}
      >
        <div>
          <label
            htmlFor="email"
            className="ml-4 flex text-[rgb(41, 71, 86)] text-base font-bold"
          >
            Email address:
          </label>
          <InputBox
            name="email"
            type="email"
            placeholder="Email address..."
            value={email}
            error={error}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="ml-4 flex text-[rgb(41, 71, 86)] text-base font-bold mt-6"
          >
            Password:
          </label>
          <InputBox
            type="password"
            name="password"
            placeholder="Password..."
            value={password}
            error={error}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="flex items-center justify-between mb-6 mt-10">
          <button
            type="button"
            onClick={(e) => handleSubmit("login", e)}
            className="flex items-center justify-center hover:cursor-pointer h-14 flex-grow-0 flex-shrink-0 basis-[48%] m-0 pt-0 pr-4 pl-1 pb-[2px] bg-[#42a5f5] text-white rounded-full"
            disabled={loading}
            aria-label="Log in"
          >
            <span>
              <svg
                className="w-4 h-auto mr-2 stroke-white stroke-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="#000"
                viewBox="0 0 24 24"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4m-5-4 5-5-5-5m3.8 5H3"></path>
              </svg>
            </span>
            Log in
          </button>

          <button
            type="button"
            onClick={(e) => handleSubmit("signup", e)}
            className="flex items-center justify-center hover:cursor-pointer h-14 flex-grow-0 flex-shrink-0 basis-[48%] m-0 pt-0 pr-4 pl-1 pb-[2px] bg-[#7e57c2] text-white rounded-full"
            disabled={loading}
            aria-label="Sign up"
          >
              <span>
              <svg
                className="w-4 h-auto mr-2 stroke-white stroke-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="#000"
                viewBox="0 0 24 24"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <path d="M20 8v6m3-3h-6"></path>
              </svg>
            </span>
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
