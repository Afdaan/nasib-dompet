// Types for Nasib Dompet project

export interface NasibPrediction {
  nasibSial: string;
  tingkatKeparahan: 'ringan' | 'sedang' | 'berat' | 'ekstrem';
  kategori: string;
  saran?: string;
  quote?: string;
}

export interface WalletData {
  jumlahUang: number;
  mata_uang: 'IDR' | 'USD' | 'EUR';
  tanggalInput: Date;
}

export interface ApiResponse {
  success: boolean;
  data?: NasibPrediction;
  error?: string;
  message?: string;
}

export interface ShareData {
  nasib: string;
  jumlah: number;
  url: string;
}
