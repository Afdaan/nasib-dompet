'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Sparkles, AlertTriangle, Camera } from 'lucide-react';
import Button from '@/components/ui/Button';
import ShareableCard from '@/components/ShareableCard';
import { useToast } from '@/components/ui/Toast';
import { NasibPrediction, ApiResponse } from '@/types';
import { formatCurrency, getSeverityColor, getSeverityBg } from '@/lib/gemini';
import { captureAndCopyToClipboard } from '@/lib/share';

interface WalletFormProps {
  onPrediction?: (prediction: NasibPrediction | null) => void;
}

export default function WalletForm({ onPrediction }: WalletFormProps) {
  const [amount, setAmount] = useState<string>('');
  const [prediction, setPrediction] = useState<NasibPrediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [shareLoading, setShareLoading] = useState(false);
  const [roast, setRoast] = useState<string>('');
  const [roastLoading, setRoastLoading] = useState(false);
  const [showRoast, setShowRoast] = useState(false);
  const shareableCardRef = useRef<HTMLDivElement>(null);
  const { showToast, ToastComponent } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const jumlahUang = parseInt(amount.replace(/\D/g, ''));
    
    if (isNaN(jumlahUang)) {
      setError('Masukkan jumlah uang yang valid');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jumlahUang }),
      });

      const data: ApiResponse = await response.json();

      if (data.success && data.data) {
        setPrediction(data.data);
        onPrediction?.(data.data);
      } else {
        setError(data.error || 'Terjadi kesalahan');
      }
    } catch (err) {
      setError('Gagal menghubungi server. Coba lagi ya!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const formatted = new Intl.NumberFormat('id-ID').format(parseInt(value) || 0);
    setAmount(value ? formatted : '');
  };

  const handleReset = () => {
    setAmount('');
    setPrediction(null);
    setError('');
    setRoast('');
    setShowRoast(false);
    setRoastLoading(false);
    // Reset prediction in parent component to show homepage with quotes
    if (onPrediction) {
      onPrediction(null);
    }
  };

  const handleShare = async () => {
    if (!prediction || !shareableCardRef.current) return;
    
    setShareLoading(true);
    
    try {
      const success = await captureAndCopyToClipboard(shareableCardRef.current);
      if (success) {
        showToast('Screenshot berhasil disalin ke clipboard! Sekarang bisa di-paste di media sosial', 'success');
      } else {
        showToast('Gagal menyalin screenshot. Coba lagi ya!', 'error');
      }
    } catch (error) {
      console.error('Share failed:', error);
      showToast('Gagal share. Coba lagi ya!', 'error');
    } finally {
      setShareLoading(false);
    }
  };

  const handleRoast = async () => {
    if (!prediction) return;
    
    setRoastLoading(true);
    setRoast('');
    
    try {
      const jumlahUang = parseInt(amount.replace(/\D/g, ''));
      const response = await fetch('/api/roast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jumlahUang
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get roast');
      }
      
      const data = await response.json();
      setRoast(data.roast);
      setShowRoast(true);
    } catch (error) {
      console.error('Roast failed:', error);
      showToast('Gagal nge-roast. Server lagi down kali ya 😅', 'error');
    } finally {
      setRoastLoading(false);
    }
  };

  return (
    <>
      <ToastComponent />
      
      {/* Hidden ShareableCard for screenshot */}
      {prediction && (
        <div className="fixed -top-[9999px] left-0 z-[-1]">
          <ShareableCard
            ref={shareableCardRef}
            prediction={prediction}
            amount={parseInt(amount.replace(/\D/g, ''))}
          />
        </div>
      )}
      
      <div className="w-full max-w-md mx-auto space-y-6">
      {!prediction ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
              <Wallet className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-display font-bold text-text">
              Cek Nasib Dompet
            </h2>
            <p className="text-subtext0">
              Masukkan jumlah uang di dompet untuk mengetahui nasib sial yang akan kamu alami
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium text-text">
                Jumlah Uang (Rupiah)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-subtext0">
                  Rp
                </span>
                <input
                  id="amount"
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="0"
                  className="w-full pl-10 pr-4 py-3 bg-surface rounded-lg border border-surface1 text-text placeholder-subtext0 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors"
                  disabled={loading}
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 p-3 bg-error/20 text-error rounded-lg text-sm"
              >
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <Button
              type="submit"
              loading={loading}
              disabled={!amount || loading}
              className="w-full"
              size="lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {loading ? 'Meramal Nasib...' : 'Ramal Nasib Sial'}
            </Button>
          </form>

          <div className="text-center text-xs text-subtext0">
            Powered by AI Gemini Flash 2.0 ✨
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${getSeverityBg(prediction.tingkatKeparahan)}`}>
              <AlertTriangle className={`w-8 h-8 ${getSeverityColor(prediction.tingkatKeparahan)}`} />
            </div>
            <div className="space-y-1">
              <div className="text-sm text-subtext0">
                Nasib untuk {formatCurrency(parseInt(amount.replace(/\D/g, '')))}
              </div>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getSeverityBg(prediction.tingkatKeparahan)} ${getSeverityColor(prediction.tingkatKeparahan)}`}>
                {prediction.tingkatKeparahan.toUpperCase()} • {prediction.kategori}
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-lg p-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-text mb-2">
                🔮 Nasib Sial Kamu:
              </h3>
              <p className="text-subtext1 leading-relaxed">
                {prediction.nasibSial}
              </p>
            </div>

            {prediction.saran && (
              <div>
                <h4 className="text-md font-medium text-text mb-2">
                  💡 Saran:
                </h4>
                <p className="text-subtext0 text-sm">
                  {prediction.saran}
                </p>
              </div>
            )}

            {prediction.quote && (
              <div className="border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded-r">
                <p className="text-primary italic text-sm">
                  "{prediction.quote}"
                </p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex gap-3">
              <Button
                onClick={handleReset}
                variant="outline"
                className="flex-1"
              >
                Coba Lagi
              </Button>
              <Button
                onClick={handleShare}
                variant="secondary"
                className="flex-1"
                loading={shareLoading}
                disabled={shareLoading}
              >
                <Camera className="w-4 h-4 mr-2" />
                {shareLoading ? 'Capturing...' : 'Copy Screenshot'}
              </Button>
            </div>

            {/* Roast section */}
            {prediction && (
              <div className="p-4 bg-[#313244] rounded-lg border border-[#45475a]">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-md font-semibold text-[#cdd6f4]">
                      🔥 Savage Mode
                    </h3>
                    <p className="text-xs text-[#a6adc8]">
                      Siap-siap di-roast berdasarkan isi dompet kamu 😈
                    </p>
                  </div>
                  <Button
                    onClick={handleRoast}
                    loading={roastLoading}
                    disabled={roastLoading}
                    variant="secondary"
                    size="sm"
                  >
                    {roastLoading ? 'Loading...' : 'Get Roasted!'}
                  </Button>
                </div>

                {showRoast && roast && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-[#f38ba8]/10 border border-[#f38ba8]/30 rounded-lg"
                  >
                    <div className="text-xs text-[#f38ba8] font-medium mb-2">
                      💀 ROASTING TIME 💀
                    </div>
                    <p className="text-[#f38ba8] text-sm font-medium leading-relaxed">
                      {roast}
                    </p>
                  </motion.div>
                )}

                {roastLoading && (
                  <div className="p-4 bg-[#6c7086]/10 rounded-lg">
                    <p className="text-[#6c7086] text-sm italic">
                      Lagi nyiapin roasting yang pedas... 🔥
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
      </div>
    </>
  );
}
