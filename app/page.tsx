"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Blob = () => (
  <motion.div
    className="absolute w-64 h-64 rounded-full bg-primary opacity-50 blur-3xl"
    style={{ top: '-100px', left: '-100px' }}
    animate={{
      x: [0, 100, 0, -100, 0],
      y: [0, 50, 100, 50, 0],
      rotate: [0, 360],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut',
    }}
  />
);

const HomePage = () => {
  return (
    <div className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <Blob />
      <div className="container text-center relative z-10">
        <h1 className="text-4xl font-bold text-balance mb-4">
          Decentralized VPN for Ultimate Privacy
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Secure, censorship-resistant connectivity powered by blockchain technology. Earn rewards by sharing your bandwidth.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/signup">
            <button className="bg-primary text-primary-foreground py-3 px-6 rounded-md hover:bg-primary/80">
              Get Started
            </button>
          </Link>
          <Link href="/learn-more">
            <button className="border border-input py-3 px-6 rounded-md hover:bg-secondary hover:text-secondary-foreground">
              Learn More
            </button>
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-8">
          <div className="p-6 rounded-md bg-card shadow-sm">
            <h2 className="text-2xl font-semibold mb-2">2.5M+</h2>
            <p className="text-muted-foreground">Active Users</p>
          </div>
          <div className="p-6 rounded-md bg-card shadow-sm">
            <h2 className="text-2xl font-semibold mb-2">500K+</h2>
            <p className="text-muted-foreground">Active Nodes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
