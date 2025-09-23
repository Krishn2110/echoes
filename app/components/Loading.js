"use client";

import React from 'react';
import { motion } from 'framer-motion';
import localFont from "next/font/local";

const DeliusRegular = localFont({
  src: [
    {
      path: '../fonts/Delius-Regular.ttf',
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-delius-regular",
  display: "swap",
});

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className={`${DeliusRegular.className} fixed inset-0 bg-gray-950 flex flex-col items-center justify-center z-50`}>
      {/* Animated circles */}
      <div className="relative w-32 h-32 mb-8">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border-4 border-transparent"
            style={{
              borderTopColor: ['#00ffcc', '#00e0b0', '#00b8a9', '#0ff', '#0af'][i % 5],
            }}
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
      
      {/* Loading text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-neon-green glow-text mb-2">
          ECHOES
        </h2>
        <p className="text-gray-300 text-lg">{message}</p>
      </motion.div>
      
      {/* Progress bar */}
      <motion.div 
        className="h-1 w-64 bg-gray-800 rounded-full mt-8 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-green-500 to-teal-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
      </motion.div>
    </div>
  );
};

export default Loading;