import Image from "next/image";
import React from "react";
import bikelg from "../public/bikelg.png";
import bikesm from "../public/bikesm.png";
import { Kumbh_Sans } from "next/font/google";

const font = Kumbh_Sans({ weight: "600", subsets: ["latin"] });

export default function Home() {
  return (
    <main className="z-0 overflow-hidden">

      <div className="flex flex-row h-[100vh] text-black dark:text-white z-0 overflow-hidden">

        <div className="flex flex-col text-left justify-center  w-1/2 bg-lsecondarybg dark:bg-dsecondarybg backdrop-blur-3xl z-30 ">
          <div className=" flex flex-col h-full pl-14 mt-32 relative ">
            <h1 className={` ${font.className} text-4xl font-bold text-black dark:text-white leading-snug w-1/2 tracking-wider `}>
              Rent <span className="text-black underline underline-offset-4 decoration-white dark:text-dsectext">&</span> Ride <br/>  
            <span className="dark:text-dsectext text-stone-500">with</span> <br/>
            <span className="dark:text-dred text-dgreen tracking-wider ">BIKEY&apos;S BIKES.</span>
            </h1>
            
            <button className={` ${font.className} py-1 px-2 mt-8 text-md max-w-fit  dark:bg-dred bg-dgreen rounded-lg hover:shadow-dgreen hover:dark:shadow-dred shadow-[0px_4px_20px_#00000040]  font-bold text-black tracking-widest `}>   
                    Rent a Bike
            </button>


              <div className="-left-20 mt-52 h-[450px] w-[450px] dark:bg-dred bg-dgreen rounded-full absolute blur-3xl px-4 py-3   -z-10 overflow-hidden" ></div>

            <div className="mt-16 relative right-14 h-1/3  ">
             <Image className="" src={bikesm} alt="small bike" width={250} height={100} />
            </div>

          </div> 

           
        </div>   


        <div className="relative right-14 bg-blue-400">
         
        </div>



            
        <div className="w-1/2 flex items-center ">
            
          <Image src={bikelg} alt="big bike" width={500} height={100} />
        </div>


      </div>
      
    </main>
    
  );
}
