import { ToastType } from "@/types/toast";
import Image from "next/image";
import  React, { ReactElement, useEffect, useRef } from "react";

export default function Toast({id,image,name,role,clearNotification}:ToastType):(ReactElement|undefined){
    const audioPlayer:HTMLAudioElement = new Audio("assets/audio/sound.mp3");
    audioPlayer.preload = "auto";
    const idTimeoutRef = useRef<NodeJS.Timeout>();
    const toastRef = useRef<HTMLDivElement>(null);
    useEffect(()=>{
        
        toastRef.current?.classList.add("toAppear");
        audioPlayer.play();
        idTimeoutRef.current = setTimeout(() => {
            clearNotification(id,toastRef);
        }, 5000);
        return ()=>clearTimeout(idTimeoutRef.current);
    },[]);

    return(
        <div ref={toastRef} className="flex opacity-0 animate-appear bg-slate-950 p-2 w-full rounded-lg">
            <div className="flex flex-1 text-white">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image alt={`image de ${name}`} src={image} fill className="object-cover object-center"/>
                </div>
               <div className="mx-2 flex flex-col justify-center">
                 <h3 className="font-extrabold">{name}</h3>
                 <span className="text-xs font-thin">{role}</span>
               </div>
            </div>
            <div className="border-l px-3 flex items-center ">
                <button onClick={()=>clearNotification(id,toastRef)}  className="text-green-300 text-sm">Close</button>
            </div>
        </div>
    )
}