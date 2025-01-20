import Image from "next/image";

export function Feature(props:any){
    return <div className="max-w-[25%] flex flex-col items-center py-0 px-[1.5rem] m-0 text-[hsl(200,35%,25%)]">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#2196f3]">
            {props.ImgSrc}
        </div>
        <h3 className="m-[1rem] p-0 font-[600]"> {props.heading} </h3>
        <p className="m-0 p-0 text-sm font-[300] text-center">{props.text}</p>
        
    </div>
}