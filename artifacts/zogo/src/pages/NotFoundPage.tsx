import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="text-[150px] md:text-[200px] font-black text-primary/10 leading-none select-none"
        >
          404
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="-mt-12 md:-mt-16 relative z-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Page Not Found</h1>
          <p className="font-bengali text-xl text-muted-foreground mb-8">পাতা পাওয়া যায়নি</p>
          
          <Link href="/">
            <Button size="lg" className="rounded-xl h-14 px-8 text-lg shadow-lg shadow-primary/20 hover:-translate-y-1 transition-transform">
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
