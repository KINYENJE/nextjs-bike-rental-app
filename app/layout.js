import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "./utils/Provider";  // "use client"
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bikey",
  description: "Bike rental app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">    
        <body className={inter.className}>
          <Provider>
            <Toaster position="top-center" />
            <Navbar />
            <main className=" text-black dark:text-white bg-sky-100 dark:bg-dprimarybg min-h-full ">
              {children}
            </main>   
          </Provider>

        </body>
      
    </html>
  );
}
