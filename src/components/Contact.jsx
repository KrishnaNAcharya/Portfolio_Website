import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const Contact = () => {
  return (
    <section name="contact" className="w-full py-8 mt-auto">
      <div className="max-w-screen-lg w-full px-4 py-8 mx-auto">
        <h2 className="text-4xl sm:text-6xl font-bold text-center mb-8">Contact Me</h2>
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 pb-4">
            <a href="https://github.com/KrishnaNAcharya" target="_blank" rel="noopener noreferrer" 
               className="flex flex-col items-center group transform hover:scale-110 transition-all duration-300">
              <FaGithub className="text-4xl hover:text-emerald-500 transition duration-300" />
              <span className="mt-2 group-hover:text-emerald-500">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/krishna-n-acharya-a3136b284/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group transform hover:scale-110 transition-all duration-300">
              <FaLinkedin className="text-4xl hover:text-emerald-500 transition duration-300" />
              <span className="mt-2 group-hover:text-emerald-500">LinkedIn</span>
            </a>
            <a href="mailto:knacharyakavoor@gmail.com" className="flex flex-col items-center group transform hover:scale-110 transition-all duration-300">
              <FaEnvelope className="text-4xl hover:text-emerald-500 transition duration-300" />
              <span className="mt-2 group-hover:text-emerald-500">Email</span>
            </a>
            <a href="tel:+918088022968" className="flex flex-col items-center group transform hover:scale-110 transition-all duration-300">
              <FaPhoneAlt className="text-4xl hover:text-emerald-500 transition duration-300" />
              <span className="mt-2 group-hover:text-emerald-500">Phone</span>
            </a>
            <a href="https://leetcode.com/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group transform hover:scale-110 transition-all duration-300">
              <SiLeetcode className="text-4xl hover:text-emerald-500 transition duration-300" />
              <span className="mt-2 group-hover:text-emerald-500">LeetCode</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;