import React from "react";
import { getCurrentUser } from "../utils/Common";

const Footer = () => {
  const user = getCurrentUser();

  return (
    <footer className="bg-blue-600 text-white pt-10 pb-6 mt-5">
    
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-start space-y-5 md:space-y-0">
        
        {/* Center becomes Right: Address and Map */}
        <div className="md:w-1/3 text-left">
          <h2 className="text-md font-funnel mb-1 font-bold">Our Address</h2>
          <p className="text-sm font-funnel mb-3">
            Cartify HQ, 123 Green Street, <br />
            Pune, Maharashtra, India - 411001
          </p>
          
          <p className="mt-1 text-smfont-funnel">
            <span className="font-bold font-funnel">Email :</span> support@cartify.com 
          </p>
             <p className="mt-1 text-smfont-funnel">
           <span className="font-bold font-funnel">Phone :</span> +91 98765 43210
          </p>
         
        </div>
         <div className="md:w-1/3 text-left">
      
          <div className="mt-3">
            <iframe
              title="Cartify Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.0986129423565!2d73.85674381489248!3d18.5204300874015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c07b3f72af87%3A0xbaa708e987d5b2e9!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1716721234567!5m2!1sen!2sin"
              width="100%"
              height="150"
              allowFullScreen=""
              loading="lazy"
              className="rounded-md shadow-md border border-white"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        
      </div>

      {/* Bottom center: Branding and Info */}
      <div className="text-center mt-5">
        <p className="text-sm font-funnel">
          © {new Date().getFullYear()} Cartify. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
