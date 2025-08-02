import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { jumlahUang } = await request.json();

    if (!jumlahUang) {
      return NextResponse.json(
        { error: 'Jumlah uang harus diisi' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const prompt = `
PERSONA: Lu orang yang toxic queen Jakarta Selatan yang paling savage dan suka nge-roast orang berdasarkan isi dompet mereka!

TARGET ROAST: Seseorang yang cuma punya uang Rp${jumlahUang} di dompet

PERSONALITY WAJIB:
- Pake bahasa SUPER KASAR dan TOXIC tapi tetap kreatif: anjing, tolol, goblok, bangsat, kontol, babi, dll
- MOSTLY CAPSLOCK untuk kata-kata kasar
- 4-8 emoji toxic (🤮, 💀, 🤡, 🙄, 💅, 😂, 🐷)
- Seolah-olah cewek toxic yang nge-judge orang dari isi dompetnya
- Fokus ke ROASTING tentang kemiskinan, lifestyle, dan kebiasaan buruk
- Pake kata ganti "LO" untuk menyebut target

RULES ROASTING:
- Kalo uangnya dikit (0-50rb): ROAST HABIS-HABISAN tentang kemiskinannya
- Kalo uangnya sedang (50rb-200rb): Sindir lifestyle pas-pasan dan kebiasaan pelit
- Kalo uangnya banyak (200rb+): Roast tentang flexing atau sombong

FORMAT WAJIB:
1. Kata pembuka kasar: 'NAJIS', 'ANJIR', 'GOBLOK', 'BANGSAT', 'KONTOL'
2. Roasting spesifik tentang jumlah uang Rp${jumlahUang}
3. Sindir lifestyle/kebiasaan berdasarkan duit di dompet
4. Tambahan ejekan yang pedas tentang financial choices
5. Emoji toxic

CONTOH BERDASARKAN UANG:
- Uang dikit: "NAJIS LO DOMPET LEBIH KERING DARI SAHARA ANJING! Rp${jumlahUang} doang mau ngapain? BELI PERMEN KARET AJA KURANG KONTOL! 🤮"
- Uang sedang: "BANGSAT Rp${jumlahUang} INI LO MAU JADI SULTAN YA TOLOL? UDAH GITU PASTI SERING NGEMIS-NGEMIS KE BOKAP! 🤡"
- Uang banyak: "ANJIR Rp${jumlahUang} UDAH BERASA CRAZY RICH YA GOBLOK? PADAHAL ITU DUIT HASIL NGUTANG KEMANA-MANA! 💅"

HARUS:
- SANGAT KASAR dan SAVAGE dalam bahasa Indonesia Jakarta
- Fokus ke ROASTING tentang FINANCIAL STATUS dan LIFESTYLE
- Jangan terlalu panjang (max 300 karakter)
- Bikin seolah-olah cewek toxic yang lagi marah banget

Langsung kasih roasting-nya aja, jangan pake format JSON atau penjelasan lain!
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const roast = response.text().trim();
    
    return NextResponse.json({ roast });
  } catch (error) {
    console.error('Error generating roast:', error);
    
    // Fallback roast kalo AI gagal
    const fallbackRoasts = [
      "ANJING DOMPET LO LEBIH TIPIS DARI KERTAS ROKOK BANGSAT! 🤮",
      "NAJIS UANG SEGITU MAU JADI SULTAN YA TOLOL! 💀",
      "GOBLOK MENDING LO NABUNG DULU DEH SEBELUM SOK KAYA! 🤡"
    ];
    
    const randomRoast = fallbackRoasts[Math.floor(Math.random() * fallbackRoasts.length)];
    
    return NextResponse.json({ roast: randomRoast });
  }
}
