import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const Contact = () => {
  return (
    <div name="contact" className="w-full bg-gradient-to-b from-gray-800 to-black text-white py-8">
      <div className="max-w-screen-lg px-4 py-6 mx-auto">
        <h2 className="text-4xl sm:text-6xl font-bold text-center mb-6">Contact Me</h2>
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-6">
            <a href="https://github.com/KrishnaNAcharya" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
              <FaGithub className="text-3xl hover:text-emerald-500 transition duration-300" />
              <span className="mt-1">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/krishna-n-acharya-a3136b284/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
              <FaLinkedin className="text-3xl hover:text-emerald-500 transition duration-300" />
              <span className="mt-1">LinkedIn</span>
            </a>
            <a href="mailto:knacharyakavoor@gmail.com" className="flex flex-col items-center">
              <FaEnvelope className="text-3xl hover:text-emerald-500 transition duration-300" />
              <span className="mt-1">Email</span>
            </a>
            <a href="tel:+918088022968" className="flex flex-col items-center">
              <FaPhoneAlt className="text-3xl hover:text-emerald-500 transition duration-300" />
              <span className="mt-1">Phone</span>
            </a>
            <a href="https://leetcode.com/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
              <SiLeetcode className="text-3xl hover:text-emerald-500 transition duration-300" />
              <span className="mt-1">LeetCode</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;