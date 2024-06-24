import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from 'react-toastify';
import "@/assets/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: "Booking.com",
  description: "Find your dream rental property",
  keywords: "rental, find rentals, find rooms",
};
const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
