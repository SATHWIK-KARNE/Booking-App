import React from "react";
import '@/assets/styles/globals.css';

export const metadata= {
  title: 'Booking.com',
  description:'Find your dream rental property',
  keywords:'rental, find rentals, find rooms'
}
const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};

export default MainLayout;
