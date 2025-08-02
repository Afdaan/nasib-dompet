import { GoogleGenerativeAI } from '@google/generative-ai';
import { NasibPrediction } from '@/types';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');

export async function generateNasibSial(jumlahUang: number): Promise<NasibPrediction> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const prompt = `
Kamu adalah peramal nasib sial yang super lucu dan kreatif, kayak temen yang selalu nyeletuk random tapi kadang bener. Tugas kamu adalah ngeramal nasib seseorang cuma dari jumlah uang yang ada di dompet mereka: Rp${jumlahUang}.

Kamu harus bikin ramalan nasib yang kocak, dramatis, dan super relatable buat anak muda Indonesia zaman sekarang.

Aturan mainnya:
1. Semakin dikit uangnya, makin absurd dan ngenes ramalannya.
2. Gaya bahasa harus 100% santai, kekinian, kayak anak Twitter atau TikTok: campur bahasa Indonesia + slang gaul (misal: "anjay", "gas", "gajadi", "dompet sekarat", dll).
3. Jangan kaku. Tulis seolah-olah kamu ngobrol beneran, bukan robot.
4. Tambahin kategori masalah (kayak: Makanan, Transportasi, Percintaan, Teknologi, Hidup, dll).
5. Tutup dengan saran kocak dan quote motivasi yang sarkas tapi ngena, khas tongkrongan.
6. Kamu bukan Ai atau Robot, Jawab se natural layaknya manusia asli

Kategori nasib berdasarkan jumlah uang:
- 0–10.000 → EKSTREM (udah kayak di ujung tanduk)
- 10.001–50.000 → BERAT (dompet tipis, harapan makin kabur)
- 50.001–100.000 → SEDANG (masih bisa napas, tapi ngos-ngosan)
- 100.001+ → RINGAN (belum aman, tapi bisa jajan cilok)

PENTING: Kamu HARUS merespons dengan JSON yang valid saja. Jangan ada kata pengantar, penjelasan, atau teks tambahan. Langsung mulai dengan { dan akhiri dengan }.

Format JSON:
{
  "nasibSial": "deskripsi nasib sial yang akan dialami (harus kocak dan gaul)",
  "tingkatKeparahan": "ringan/sedang/berat/ekstrem",
  "kategori": "kategori masalah",
  "saran": "saran humoris dan absurd",
  "quote": "quote sarkas dan ngena"
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse JSON response - more robust cleaning
    let cleanText = text.replace(/```json|```/g, '').trim();
    
    // Find the first { and last } to extract only the JSON part
    const firstBrace = cleanText.indexOf('{');
    const lastBrace = cleanText.lastIndexOf('}');
    
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      cleanText = cleanText.substring(firstBrace, lastBrace + 1);
    }
    
    const prediction: NasibPrediction = JSON.parse(cleanText);
    
    return prediction;
  } catch (error) {
    console.error('Error generating nasib sial:', error);
    
    // Fallback prediction jika API gagal
    const fallbackPredictions = getFallbackPrediction(jumlahUang);
    return fallbackPredictions;
  }
}

function getFallbackPrediction(jumlahUang: number): NasibPrediction {
  const predictions = {
    ekstrem: [
      {
        nasibSial: "Dompet kamu akan terbang terbawa angin kencang pas lagi mau bayar ojol, dan driver udah nunggu 15 menit sambil pandang sinis.",
        tingkatKeparahan: "ekstrem" as const,
        kategori: "Transportasi",
        saran: "Mulai latihan lari marathon buat persiapan jalan kaki selamanya",
        quote: "Miskin itu bukan masalah, yang masalah kalau gak bisa ngakuin kalau miskin"
      }
    ],
    berat: [
      {
        nasibSial: "HP kamu akan lowbat pas lagi order makanan online, dan aplikasi crash tepat setelah pembayaran berhasil tapi pesanan gak masuk.",
        tingkatKeparahan: "berat" as const,
        kategori: "Teknologi",
        saran: "Mulai belajar memasak dari YouTube tutorial 'Masak Pake Nasi Sisa'",
        quote: "Hidup itu seperti sinyal WiFi - kadang kuat, kadang lemah, tapi seringnya error"
      }
    ],
    sedang: [
      {
        nasibSial: "Kamu akan ketemu mantan pas lagi jajan gorengan pinggir jalan dengan outfit seadanya, dan dia lagi sama pacar barunya yang kece.",
        tingkatKeparahan: "sedang" as const,
        kategori: "Sosial",
        saran: "Selalu sedia outfit backup di tas, atau jangan keluar rumah sama sekali",
        quote: "Penampilan itu nomor dua, yang penting hati. Tapi kalau ketemu mantan, penampilan jadi nomor satu"
      }
    ],
    ringan: [
      {
        nasibSial: "ATM terdekat akan selalu error pas kamu butuh cash, dan kamu harus jalan kaki ke ATM sebelah yang antriannya panjang banget.",
        tingkatKeparahan: "ringan" as const,
        kategori: "Keuangan",
        saran: "Install semua aplikasi mobile banking yang ada, jadilah koleksi lengkap",
        quote: "Uang bukan segalanya, tapi tanpa uang segala jadi tidak ada"
      }
    ]
  };

  let category: keyof typeof predictions;
  if (jumlahUang <= 10000) category = 'ekstrem';
  else if (jumlahUang <= 50000) category = 'berat';
  else if (jumlahUang <= 100000) category = 'sedang';
  else category = 'ringan';

  const categoryPredictions = predictions[category];
  return categoryPredictions[Math.floor(Math.random() * categoryPredictions.length)];
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getSeverityColor(tingkat: NasibPrediction['tingkatKeparahan']): string {
  const colors = {
    ringan: 'text-success',
    sedang: 'text-accent',
    berat: 'text-warning',
    ekstrem: 'text-error',
  };
  return colors[tingkat];
}

export function getSeverityBg(tingkat: NasibPrediction['tingkatKeparahan']): string {
  const colors = {
    ringan: 'bg-success/20',
    sedang: 'bg-accent/20',
    berat: 'bg-warning/20',
    ekstrem: 'bg-error/20',
  };
  return colors[tingkat];
}
