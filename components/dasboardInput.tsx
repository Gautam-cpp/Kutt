"use client";

import { useEffect, useState } from "react";
import { DemoAlert } from "./demoAlert";
import {useAuth} from "@/hooks/isAuth";


export function DashboardInput() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {isAuth} = useAuth()

 

 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 
    setIsLoading(true);

    if (!longUrl.trim()) {
      setError("Please enter a valid URL.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/linkShortner/shortner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl: longUrl }), 
      });

      const data = await response.json();

      if (response.ok) {
        if (isAuth) {
          await fetch("/api/shorten", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              longUrl: longUrl,
              shortUrl: data.shortUrl,
            }),
            credentials: "include", // Ensure JWT token is sent
          });
        }
        setShortUrl(data.shortUrl);

        setTimeout(() => {
          setShortUrl(''); 
        }, 10000); 

        setIsLoading(false); 
        


        



      } 
      else {
        setIsLoading(false);
        setError(
          data.error || "Something went wrong while shortening the URL."
        );
      }
    } catch (error) {
      setIsLoading(false);
      setError("Failed to shorten URL. Please try again later.");
    }
  };

  

  return (
    <div className="w-[800px] max-w-full flex flex-col flex-grow-1 flex-shrink-1 basis-auto items-center py-0 px-4 mt-4 ">
 
      <div className="flex items-center mt-4 mr-0 mb-12 ml-0 text-slate-700">
        <h1 className="m-0 font-[200] text-[2rem]">
          Kutt Your links{" "}
          <span className="underline decoration-dotted decoration-1 underline-offset-8">
            shorter
          </span>
          .
        </h1>
      </div>

      {shortUrl && (
        <p className="text-center mt-4 text-green-600">
          Short URL:{" "}
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {shortUrl}
          </a>
        </p>
      )}

      {
        (shortUrl && !isAuth ) && (
          <div className="my-4">
              
            <DemoAlert></DemoAlert>
          </div>
        )
      }

      <form
        onSubmit={handleSubmit}
        className="relative w-full flex flex-col "
      >
        <div className="relative w-full h-auto">
          <input
            type="text"
            placeholder="Paste your long URL"
            className="relative w-full h-[72px]  flex text-xl rounded-full pl-[40px] pr-[84px] py-0 text-[#444] bg-white box-border border-b-[5px] border-b-[rgba(243,239,239,0.8)] shadow-[0_10px_35px_hsla(200,15%,70%,0.2)] focus:ring-0 focus:outline-none"
            onChange={(e) => setLongUrl(e.target.value)}
          />

          <button
            type="submit"
            className=" box-content absolute cursor-pointer w-[28px] h-auto right-0 top-[16px] p-[4px] m-[0_2rem_0] bg-none shadow-none outline-none border-none "
          >
            {isLoading ? (
              <svg
                className="text-[#444] items-center hover:text-violet-800"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2v4m0 12v4M5 5l2.8 2.8m8.4 8.4 2.9 2.9M2 12h4m12 0h4M5 19l2.8-2.8m8.4-8.4 2.9-2.9"></path>
              </svg>
            ) : (
              <svg
                className="text-[#444] items-center hover:text-violet-800"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="m2 21 21-9L2 3v7l15 2-15 2z"></path>
              </svg>
            )}
          </button>
        </div>

        {error && <p className="text-red-600 mt-4">{error}</p>}
      </form>
    </div>
  );
}
