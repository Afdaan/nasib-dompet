'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Github, Heart } from 'lucide-react';
import WalletForm from '@/components/WalletForm';
import RandomQuotes from '@/components/RandomQuotes';
import { NasibPrediction } from '@/types';

export default function HomePage() {
  const [prediction, setPrediction] = useState<NasibPrediction | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1e1e2e] via-[#181825] to-[#1e1e2e]">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#cba6f7]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-[#89b4fa]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-[#f9e2af]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-8 md:py-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-[#cba6f7] animate-pulse" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#cba6f7] via-[#89b4fa] to-[#f9e2af] bg-clip-text text-transparent">
              Nasib Dompet
            </h1>
            <Sparkles className="w-8 h-8 text-[#f9e2af] animate-pulse" />
          </div>
          
          <p className="text-lg md:text-xl text-[#bac2de] max-w-2xl mx-auto leading-relaxed">
            Tebak nasib sial berdasarkan isi dompet kamu dengan bantuan{' '}
            <span className="text-[#cba6f7] font-semibold">AI Gemini Flash 2.0</span>
          </p>
          
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[#313244]/50 rounded-full border border-[#45475a]">
            <div className="w-2 h-2 bg-[#a6e3a1] rounded-full animate-pulse" />
            <span className="text-sm text-[#a6adc8]">Powered by artificial stupidity</span>
          </div>
        </motion.header>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-12">
          {!prediction && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <RandomQuotes />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-lg"
          >
            <WalletForm onPrediction={setPrediction} />
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center py-8 space-y-4"
        >
          <div className="flex items-center justify-center gap-2 text-sm text-[#a6adc8]">
            <span>Created by</span>
            <span className="text-[#cba6f7] font-bold">Dnz</span>
            <span>and powered by</span>
            <Heart className="w-4 h-4 text-[#f38ba8] fill-current animate-pulse" />
            <span className="text-[#f9e2af]">coffee addiction</span>
          </div>
          
          <div className="text-xs text-[#6c7086] italic">
            ~ Fellow broke developer who understands the struggle ~
          </div>
          
          <div className="flex items-center justify-center gap-6 text-sm">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#a6adc8] hover:text-[#cba6f7] transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Source Code</span>
            </a>
            <span className="text-[#45475a]">•</span>
            <span className="text-[#a6adc8]">v1.0.0</span>
          </div>

          <div className="text-xs text-[#a6adc8] max-w-md mx-auto">
            Disclaimer: Ini cuma for fun ya, jangan dijadiin panduan hidup beneran. 
            Kalo nasib beneran sial, itu bukan salah AI 😅
          </div>
        </motion.footer>
      </div>
    </main>
  );
}
