import { Feature } from "./feature";

export function DemoDashboard(){
    return (
        <>
            <div className="flex items-center mt-36 mr-0 mb-0 ml-0 w-[1200px] max-w-[98%] justify-center flex-col md:flex-row">
            <div className="flex flex-grow-1 flex-shrink-1 basis-auto flex-col items-start md:items-start gap-y-12 text-center md:text-left">
                <h2 className="font-[1500] text-[28px]">
                    Manage links, set custom <b>domains </b> and view <b>stats</b>.
                </h2>
                <a href="/login" className="bg-cyan-500 shadow-lg shadow-cyan-500/50 text-gray-200 border-hidden rounded-3xl px-5 py-2 text-sm mb-1 transition-transform transform duration-300 ease-in-out hover:scale-105 mx-auto md:mx-0">Login/ Sign up</a>
            </div>
            <img
                src="callout.png"
                alt=""
                className="w-3/5 max-w-full h-auto flex-grow-0 flex-shrink-0 basis-3/5"
            />
        </div>
            <div className="flex flex-col items-center bg-[hsl(230,15%,92%)] flex-grow-0 flex-shrink-0 basis-auto py-[5rem] px-0 m-0 w-full ">
            <h3 className="font-[300] text-[28px] mb-[72px] text-[hsl(200,35%,25%)]">
                Kutting edge features.
            </h3>
            <div className="w-[1200px] max-w-full flex  flex-grow-1 flex-shrink-1 basis-auto  m-0 p-0 list-none ">
                <Feature ImgSrc={<svg className="w-4 h-auto stroke-white stroke-2 " xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000" viewBox="0 0 24 24"><path d="M20 14.7V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.3"></path><path d="m18 2 4 4-10 10H8v-4z"></path></svg>} heading="Manging links" text="Create, protect and delete your links and monitor them with detailed statistics."></Feature>
                <Feature ImgSrc={<svg className="w-4 h-auto stroke-white stroke-2 " xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000" viewBox="0 0 24 24"><path d="M16 3h5v5M4 20 20.2 3.8M21 16v5h-5m-1-6 5.1 5.1M4 4l5 5"></path></svg>} heading="Custom domain" text="Use custom domains for your links. Add or remove them for free."></Feature>
                <Feature ImgSrc={<svg className="w-4 h-auto stroke-white stroke-2 " xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 2 3 14h9l-1 8 10-12h-9z"></path></svg>} heading="API" text="Use the provided API to create, delete, and get URLs from anywhere."></Feature>
                <Feature ImgSrc={<svg className="w-4 h-auto stroke-white stroke-2 " xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000" viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.7 0l-1.1 1-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1 7.8 7.8 7.8-7.7 1-1.1a5.5 5.5 0 0 0 0-7.8z"></path></svg>} heading="Free & open source" text="Completely open source and free. You can host it on your own server."></Feature>
            </div>
        </div>


        <div className="flex flex-col items-center bg-[hsl(230,15%,20%)] flex-grow-0 flex-shrink-0 basis-auto py-[5rem] px-0 m-0 w-full text-white">
            <h3 className="mb-[4rem]">
                Browser extensions. 
            </h3>
            <div className="flex w-[1200px] max-w-full flex-grow-1 flex-shrink-1 basis-auto justify-center  ">
                <a href="https://chrome.google.com/webstore/detail/kutt/pklakpjfiegjacoppcodencchehlfnpd" className="flex items-center justify-center mx-4 my-0 px-7 py-3 bg-[#eee] border border-[#aaa] text-sm font-bold no-underline rounded-md outline-none shadow-[0_5px_15px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-out cursor-pointer text-[#4285f4]">
                <svg className="w-5 h-auto mt-0 mr-[1rem] mb-[2px] ml-0 fill-[#4285f4]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.2 8.7 23 7a12 12 0 0 1 1.1 5 12 12 0 0 1-13 12l5-8.4.8-1.3a6 6 0 0 0 0-4.7zM13 17.3l-2.1 6.6A12 12 0 0 1 2 5.3l5 8.4c.2.5 1 2.5 3 3.3q1.5.6 3 .3m-1-9.7c-2 0-3.9 1.6-4.3 3.5a5 5 0 0 0 1.2 4 5 5 0 0 0 4.8 1c1.4-.6 2.4-2 2.7-3.4.2-1.9-.8-3.9-2.5-4.7a4 4 0 0 0-2-.4M7 10 2.3 5A12 12 0 0 1 12 0a12 12 0 0 1 10.8 6.7H12.6Q9.8 6.6 8.3 8A5 5 0 0 0 7 10"></path></svg>
                Download for chrome</a>
                <a href="https://addons.mozilla.org/en-US/firefox/addon/kutt/" className="flex items-center justify-center mx-4 my-0 px-7 py-3 bg-[#eee] border border-[#aaa] text-sm font-bold no-underline rounded-md outline-none shadow-[0_5px_15px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-out cursor-pointer text-[#e0890f]">
                <svg className="w-5 h-auto mt-0 mr-[1rem] mb-[2px] ml-0 fill-[#e0890f]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.4 11v-.4l-.3.3-.3-1.5a10 10 0 0 0-1.3-2.9l-.2-.3-1.5-2q-.6-1-.8-2l-.3 1.3-1.4-1.2C15.8.9 16 0 16 0s-2.8 3.2-1.6 6.4q.6 1.6 2 2.8c1.3 1 2.5 1.7 3.2 3.7q-.9-1.6-2.4-2.5.5 1 .5 2.2a5.3 5.3 0 0 1-6.5 5.2l-1.3-.5q-1-.5-1.6-1.4h.1l.7.2q1.4.2 2.6-.3 1.3-.8 1.8-.7.7 0 .4-.7-.8-1-2-.8c-1 .1-1.7.7-2.8.1H9h.2l-.7-.5h.1l-.7-.7q-.3-.6 0-1.1 0-.3.4-.4h.2l.5.3.3.2v-.1q0-.3-.3-.4l.4.2v-1h.1V10l.2-.2 1-.6.9-.4q.4-.3.5-.8v-.2c0-.2-.3-.3-1.8-.5q-1-.1-1.1-1v.2-.2q.5-1.1 1.5-1.8h-.1l.3-.2-.6-.2-.5.2.2-.2-1.1.5v-.1q-.4.1-.7.5l-.4.3Q6.5 4.7 5.1 5l-.4-.5-.2-.3-.2-.3Q4 3.5 4 2.8q-.5.3-.6.7l-.1.2v-.2q0 .2-.2.3V4v-.1H3a7 7 0 0 0-.6 2.3v.4l-.6.8Q1 8.8.6 10.6l.7-1.2a11 11 0 0 0-.8 4l.3-1.2q0 2.6 1 4.8 1.4 3.3 4.4 5 1.2.9 2.6 1.3l.3.1q1.5.5 3.3.5c4 0 5.3-1.6 5.4-1.7l.5-.7h.2l.2-.1 1.7-1q1.1-1 1.5-2.4.3-.5 0-1l.2-.3q1.2-2 1.4-4.6z"></path></svg>
                Download for Firefox</a>
            </div>
        </div>
        
        </>
    )
}