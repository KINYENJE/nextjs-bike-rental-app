import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "./utils/Provider";  // "use client"
import Navbar from "./components/Navbar";

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
            <Navbar />
            <main className=" text-black dark:text-white bg-sky-100 dark:bg-dprimarybg ">
              {children}
            </main>   
          </Provider>

        </body>
      
    </html>
  );
}
