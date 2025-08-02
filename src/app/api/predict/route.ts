import { NextRequest, NextResponse } from 'next/server';
import { generateNasibSial } from '@/lib/gemini';
import { ApiResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { jumlahUang } = await request.json();

    // Validasi input
    if (!jumlahUang && jumlahUang !== 0) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Jumlah uang harus diisi',
      }, { status: 400 });
    }

    if (jumlahUang < 0) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Jumlah uang tidak boleh negatif',
      }, { status: 400 });
    }

    if (jumlahUang > 1000000000) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Wah sultan nih! Silakan donasi ke developer dulu ya 😅',
      }, { status: 400 });
    }

    // Generate nasib sial menggunakan Gemini AI
    const prediction = await generateNasibSial(jumlahUang);

    return NextResponse.json<ApiResponse>({
      success: true,
      data: prediction,
      message: 'Nasib sial berhasil diramal!',
    });

  } catch (error) {
    console.error('Error in predict API:', error);
    
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Terjadi kesalahan saat meramal nasib. Coba lagi ya!',
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Nasib Dompet API - Prediksi Nasib Sial Berdasarkan Isi Dompet',
    version: '1.0.0',
    endpoints: {
      'POST /api/predict': 'Prediksi nasib sial berdasarkan jumlah uang',
    }
  });
}
