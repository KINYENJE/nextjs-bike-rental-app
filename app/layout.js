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
            <main className=" mx-auto max-w-5xl px-6 bg-orange-100 dark:bg-slate-900">
              {children}
            </main>   
          </Provider>

        </body>
      
    </html>
  );
}
