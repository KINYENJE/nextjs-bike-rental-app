import Image from "next/image";
import React from "react";
import bikelg from "../public/bikelg.png";
import bikesm from "../public/bikesm.png";
import { Kumbh_Sans } from "next/font/google";
import Link from "next/link";

const font = Kumbh_Sans({ weight: "600", subsets: ["latin"] });

export default function Home() {
  return (
    <main className="z-0 overflow-hidden">

      <div className="flex flex-row h-[100vh] text-black dark:text-white z-0 overflow-hidden">

        <div className="flex flex-col text-left justify-center overflow-y-hidden w-1/2 bg-lsecondarybg dark:bg-dsecondarybg backdrop-blur-3xl z-30 ">
          <div className=" flex flex-col h-2/3 pl-14 mt-32 2xl:mt-40 2xl:pl-20 gap-4">
            <h1 className={` ${font.className} text-4xl 2xl:text-5xl font-bold text-black dark:text-white leading-snug 2xl:leading-normal w-1/2 `}>Ride the streets <br/>  
            <span className="dark:text-dsectext text-stone-500">with</span> <br/>
            <span className="dark:text-dred text-dgreen tracking-wider ">BIKEY&apos;S BIKES.</span>
            </h1>
            
            <button className={` ${font.className} py-1 px-2 mt-8 text-md max-w-fit  dark:bg-dred bg-dgreen rounded-lg hover:shadow-dgreen hover:dark:shadow-dred shadow-[0px_4px_20px_#00000040]  font-bold text-black tracking-widest 2xl:tracking-wide 2xl:text-xl 2xl:py-2 2xl:px-4`}>   
                    <Link href="/bikes">Rent a Ride</Link>
            </button>

          </div> 

            <div className="mb-8 h-1/3 ">
          
             <Image src={bikesm} alt="small bike" width={250} height={100} />
            </div>

         
          
        </div>   


        <div className="overflow-hidden">
          <div className="-bottom-10 -left-20 dark:bg-dred bg-dgreen rounded-full absolute  blur-3xl px-4 py-3 w-[450px] h-[450px] overflow-hidden" ></div>
        </div>



            
        <div className="w-1/2 flex items-center overflow-hidden ">
            
          <Image src={bikelg} alt="big bike" width={500} height={100} />
        </div>


      </div>
      
    </main>
    
  );
}
