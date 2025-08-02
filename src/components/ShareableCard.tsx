'use client';

import { forwardRef } from 'react';
import { AlertTriangle, Sparkles } from 'lucide-react';
import { NasibPrediction } from '@/types';
import { formatCurrency, getSeverityColor, getSeverityBg } from '@/lib/gemini';

interface ShareableCardProps {
  prediction: NasibPrediction;
  amount: number;
}

const ShareableCard = forwardRef<HTMLDivElement, ShareableCardProps>(
  ({ prediction, amount }, ref) => {
    return (
      <div
        ref={ref}
        className="w-[400px] bg-gradient-to-br from-[#1e1e2e] via-[#181825] to-[#1e1e2e] p-6 rounded-2xl shadow-2xl border border-[#45475a] relative overflow-hidden"
        style={{ fontFamily: 'Inter, Poppins, ui-sans-serif, system-ui', minHeight: '600px' }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#cba6f7]/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#89b4fa]/10 rounded-full blur-2xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-7 h-7 text-[#cba6f7]" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#cba6f7] via-[#89b4fa] to-[#f9e2af] bg-clip-text text-transparent">
                Nasib Dompet
              </h1>
              <Sparkles className="w-7 h-7 text-[#f9e2af]" />
            </div>
            <div className="text-sm text-[#a6adc8] mb-2">
              Tebak Nasib Lewat Isi Dompet Kamu
            </div>
          </div>

          {/* Amount and Severity */}
          <div className="text-center space-y-3">
            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${getSeverityBg(prediction.tingkatKeparahan)}`}>
              <AlertTriangle className={`w-7 h-7 ${getSeverityColor(prediction.tingkatKeparahan)}`} />
            </div>
            
            <div className="space-y-1">
              <div className="text-xl font-bold text-[#cdd6f4]">
                {formatCurrency(amount)}
              </div>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getSeverityBg(prediction.tingkatKeparahan)} ${getSeverityColor(prediction.tingkatKeparahan)}`}>
                {prediction.tingkatKeparahan.toUpperCase()} • {prediction.kategori}
              </div>
            </div>
          </div>

          {/* Prediction */}
          <div className="bg-[#313244]/50 rounded-lg p-4 space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-[#cdd6f4] mb-2">
                🔮 Nasib Sial:
              </h3>
              <p className="text-[#bac2de] text-xs leading-relaxed">
                {prediction.nasibSial}
              </p>
            </div>

            {prediction.saran && (
              <div>
                <h4 className="text-xs font-medium text-[#cdd6f4] mb-1">
                  💡 Saran:
                </h4>
                <p className="text-[#a6adc8] text-xs leading-relaxed">
                  {prediction.saran}
                </p>
              </div>
            )}

            {prediction.quote && (
              <div className="border-l-3 border-[#cba6f7] pl-3 py-1 bg-[#cba6f7]/5 rounded-r">
                <p className="text-[#cba6f7] italic text-xs">
                  "{prediction.quote}"
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center">
            <div className="text-xs text-[#6c7086]">
              dompet.horn-yastudio.com
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ShareableCard.displayName = 'ShareableCard';

export default ShareableCard;
