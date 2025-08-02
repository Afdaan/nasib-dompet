'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, RefreshCw } from 'lucide-react';

// Fallback quotes in case API fails
const fallbackQuotes = [
  "Dompet tipis bukan berarti hati yang tipis, tapi memang saldo yang tipis",
  "Hidup itu seperti ATM - kadang ada saldo, kadang cuma ada harapan",
  "Broke but make it aesthetic ✨",
  "Kantong kering, mimpi basah",
  "Miskin itu temporary, tapi rasanya permanent",
  "Uang bukan segalanya, tapi tanpa uang segala jadi susah",
  "Tabungan kosong, tapi playlist penuh",
  "Gaji UMR, gaya hidup sultan",
  "Dompet: *kosong* | Hati: *penuh harapan*",
  "Stress karena gaji kecil, tapi tetap beli kopi mahal",
  "Hidup sederhana: makan nasi, minum air, scrolling Instagram",
  "Budget tipis, tapi tetap optimis",
  "Rekening: 4 digit | Mimpi: 10 digit",
  "Bukan miskin, tapi lagi menabung... dari tahun kemarin",
  "Duit abis, tapi vibes-nya masih ada"
];

export default function RandomQuotes() {
  const [quotes, setQuotes] = useState<string[]>(fallbackQuotes);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastFetched, setLastFetched] = useState<number>(0);

  const fetchQuotes = async () => {
    // Don't fetch if we fetched less than 5 seconds ago (for easy testing)
    const now = Date.now();
    if (now - lastFetched < 5 * 1000) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/quotes');
      const data = await response.json();
      
      if (data.success && data.data.quotes.length > 0) {
        setQuotes(data.data.quotes);
        setCurrentQuote(0);
        setLastFetched(now);
      }
    } catch (error) {
      console.error('Failed to fetch quotes:', error);
      // Keep using current quotes on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch fresh quotes on component mount
    fetchQuotes();
    
    // Auto refresh quotes every 2 minutes
    const refreshInterval = setInterval(() => {
      fetchQuotes();
    }, 2 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative min-h-[100px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center px-6"
          >
            <div className="flex items-start gap-3">
              <Quote className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <p className="text-lg md:text-xl text-subtext1 italic leading-relaxed">
                {quotes[currentQuote]}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="flex justify-center items-center mt-4 space-x-3">
        <div className="flex space-x-1">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuote(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === currentQuote ? 'bg-primary' : 'bg-surface1'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={fetchQuotes}
          disabled={loading}
          className="ml-4 p-2 rounded-full bg-surface/50 hover:bg-surface transition-colors disabled:opacity-50"
          title="Refresh quotes"
        >
          <RefreshCw className={`w-4 h-4 text-subtext0 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      {loading && (
        <div className="text-center mt-2">
          <p className="text-xs text-subtext0">Generating fresh quotes...</p>
        </div>
      )}
    </div>
  );
}
