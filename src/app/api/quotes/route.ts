import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.GOOGLE_GEMINI_API_KEY) {
  throw new Error('GOOGLE_GEMINI_API_KEY is not set');
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

export async function GET() {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Add randomization to get different results each time
    const themes = [
      "gaji pas-pasan tapi tetap optimis",
      "dompet tipis tapi vibe kuat", 
      "broke tapi aesthetic",
      "tabungan kosong tapi mimpi penuh",
      "budget minim tapi tetap happy",
      "miskin tapi kaya pengalaman",
      "saldo menipis tapi semangat membara"
    ];
    
    const styles = [
      "bahasa gaul anak Jakarta",
      "campuran formal dan slang",
      "bahasa santai ala anak muda",
      "mix Indonesian dan English",
      "bahasa sehari-hari yang relatable"
    ];

    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    const timestamp = Date.now();

    const prompt = `
Buatkan 8-10 quote BARU dan FRESH tentang ${randomTheme}. 
Gunakan ${randomStyle} yang natural dan menghibur.
Jangan pernah gunakan quote ini: "Miskin itu bukan masalah, yang masalah kalau gak bisa ngakuin kalau miskin"

WAJIB FORMAT JSON:
{
  "quotes": [
    "quote 1",
    "quote 2", 
    ...
  ]
}

Tema dan variasi yang bisa digunakan:
- Pengalaman berbelanja dengan budget terbatas  
- Realita hidup kost-kostan atau rumah ortu
- Drama cari kerja dan interview
- Kehidupan social media vs realita finansial
- Makanan murah tapi tetap bahagia
- Transport dan jalan kaki everywhere
- Mimpi traveling vs saldo ATM
- Shopping online vs reality check
- Ngutang dan nunggak tagihan
- Gaya hidup hemat yang kreatif

Buat yang benar-benar BEDA dan KREATIF! Timestamp: ${timestamp}
`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    console.log('AI Response:', text); // Debug log

    // Try to extract JSON from the response
    let quotes: string[] = [];
    try {
      // Remove markdown formatting if present
      const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
      console.log('Cleaned text:', cleanText); // Debug log
      
      const parsed = JSON.parse(cleanText);
      quotes = parsed.quotes || [];
      console.log('Parsed quotes:', quotes); // Debug log
    } catch (parseError) {
      console.log('JSON parse failed, trying manual extraction:', parseError);
      
      // More aggressive manual extraction
      const lines = text.split('\n');
      const quotesSection = lines.find(line => line.includes('quotes'));
      
      if (quotesSection) {
        // Try to extract from the quotes array
        const quoteMatches = text.match(/"([^"]{10,}[^"]*?)"/g);
        if (quoteMatches) {
          quotes = quoteMatches.map(match => match.replace(/^"/, '').replace(/"$/, ''));
        }
      }
      
      // Final fallback: look for any quoted text that looks like quotes
      if (!quotes.length) {
        const allQuotes = text.match(/["']([^"']{20,}[^"']*?)["']/g);
        if (allQuotes) {
          quotes = allQuotes.map(q => q.replace(/^["']/, '').replace(/["']$/, ''));
        }
      }
    }

    // Validate we have quotes
    if (!quotes.length) {
      throw new Error('No quotes generated');
    }

    // Limit to 10 quotes
    quotes = quotes.slice(0, 10);

    return NextResponse.json({
      success: true,
      data: { quotes },
    });

  } catch (error) {
    console.error('Error generating quotes:', error);
    
    // More diverse fallback quotes
    const fallbackQuotes = [
      "Jalan kaki adalah cardio gratis, jadi sekalian aja diet kantong",
      "Gofood? More like GoWalk ke warung sebelah",
      "Rich mindset, broke wallet - it's a vibe",
      "Ngecek saldo ATM sambil berdoa adalah morning routine",
      "Shopee 99% discount tapi tetep gabisa checkout karena ongkir",
      "Kopi sachet rasanya sama aja kok sama yang 50rb",
      "Mie indomie adalah comfort food lintas generasi dan lintas ekonomi",
      "Budget date: sunset di emperan sambil minum teh botol",
      "Skincare routine: air dingin dan doa",
      "Investment terbaik: beli pulsa buat nelpon mamah minta transfer"
    ];

    return NextResponse.json({
      success: true,
      data: { quotes: fallbackQuotes },
    });
  }
}
