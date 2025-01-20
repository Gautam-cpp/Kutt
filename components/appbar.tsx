'use client'
import { useAuth } from "@/hooks/isAuth"
import { useRouter } from "next/navigation";


export function Appbar(){
    const {isAuth, logout} = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout(); 
        router.push("/");
             
    };

   

    return (
        <div className="flex box-border m-0 w-[1232px] max-w-full py-0 px-8 h-28 justify-between items-center ">
            <div className="flex items-center">
                <a href="/" className="relative flex items-center text-[22px] font-bold no-underline border-none m-0 p-0 hover:cursor-pointer">
                    <img src="logo.svg" alt="" width={18} height={24} className="m-0 mr-3 p-0 aspect-auto"/> Kutt
                </a>
                <div className="invisible md:visible flex items-end m-0 ml-2 text-gray-600 font-extralight">
                    <a href="https://github.com" className="pt-[2px] pr-0 pb-0 pl-0 m-0 ml-8 text-base  cursor-pointer no-underline hover:underline hover:decoration-dotted hover:decoration-black hover:underline-offset-8 hover:text-blue-600 decoration-1">Github</a>
                    <a href="/report" className="pt-[2px] pr-0 pb-0 pl-0 m-0 ml-8 text-base cursor-pointer no-underline hover:underline hover:decoration-dotted hover:decoration-black hover:underline-offset-8 hover:text-blue-600 decoration-1">Report</a>
                </div>
            </div>
            <div className="block">
                <div className="flex flex-row-reverse items-center m-0 p-0 text-gray-600 font-extralight">
                    <div className="m-0 p-0 ml-8">
                    {isAuth?
                        <button onClick={handleLogout} className="w-auto relative h-[40px] flex items-center justify-center text-[13px] text-center  bg-cyan-500 shadow-lg shadow-cyan-500/50 text-gray-200 border-none overflow-hidden cursor-pointer  rounded-full leading-none break-keep px-8 py-0 text-sm mb-1  transition-transform transform duration-300 ease-in-out hover:scale-105">Log out</button>:
                        <a onClick={()=>{window.location.href="/login"}} className="w-auto relative h-[40px] flex items-center justify-center text-[13px] text-center  bg-cyan-500 shadow-lg shadow-cyan-500/50 text-gray-200 border-none overflow-hidden cursor-pointer  rounded-full leading-none break-keep px-8 py-0 text-sm mb-1  transition-transform transform duration-300 ease-in-out hover:scale-105">Login / Signup</a>

                     }

                    </div>
                    <a  className="cursor-pointer no-underline hover:underline hover:decoration-dotted hover:decoration-black hover:underline-offset-8 hover:text-blue-600 decoration-1">Premium</a>
                </div>
            </div>
        </div>
    )
}
