# 🔮 Nasib Dompet

Website fun untuk memprediksi nasib sial berdasarkan jumlah uang di dompet menggunakan **AI Gemini Flash 2.0**! 

Semakin tipis dompet, semakin absurd nasib sialnya. Perfect buat hiburan dan candaan dengan teman-teman! 😅

## ✨ Features

- 🤖 **AI-Powered Predictions** - Menggunakan Google Gemini Flash 2.0
- 🎨 **Beautiful UI** - Design modern dengan Catppuccin Mocha theme
- 📱 **Responsive Design** - Mobile-first approach
- 🚀 **Fast & Smooth** - Built with Next.js 14+ dan Tailwind CSS
- 🎭 **Humorous Content** - Predictions yang lucu dan relatable
- 📤 **Share Feature** - Bagikan hasil ramalan ke social media
- 💫 **Smooth Animations** - Powered by Framer Motion

## 🛠 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 dengan Catppuccin Mocha theme
- **AI**: Google Gemini Flash 2.0 API
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm atau yarn
- Google Gemini API Key ([Get it here](https://makersuite.google.com/app/apikey))

### Installation

1. Clone repository:
   ```bash
   git clone https://github.com/yourusername/nasib-dompet.git
   cd nasib-dompet
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Isi file `.env.local` dengan API key kamu:
   ```env
   GOOGLE_GEMINI_API_KEY=your_actual_api_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. Run development server:
   ```bash
   npm run dev
   ```

5. Buka [http://localhost:3000](http://localhost:3000) di browser

## 🎨 Catppuccin Mocha Color Palette

Project ini menggunakan theme Catppuccin Mocha yang aesthetic dan eye-friendly:

| Color | Hex | Usage |
|-------|-----|-------|
| Base | `#1e1e2e` | Background utama |
| Surface | `#313244` | Cards, forms |
| Primary | `#cba6f7` | Accent color (Mauve) |
| Secondary | `#89b4fa` | Secondary accent (Blue) |
| Text | `#cdd6f4` | Text utama |
| Success | `#a6e3a1` | Success states |
| Warning | `#fab387` | Warning states |
| Error | `#f38ba8` | Error states |

## 📁 Project Structure

```
nasib-dompet/
├── src/
│   ├── app/                 # App Router pages
│   │   ├── api/            # API routes
│   │   ├── globals.css     # Global styles + Catppuccin theme
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── WalletForm.tsx # Main form component
│   │   └── RandomQuotes.tsx # Quotes carousel
│   ├── lib/               # Utilities
│   │   ├── gemini.ts      # Gemini AI integration
│   │   └── utils.ts       # Helper functions
│   └── types/             # TypeScript type definitions
├── .github/               # GitHub configs
├── public/                # Static assets
└── README.md
```

## 🔧 Configuration

### Tailwind CSS v4

Project ini menggunakan Tailwind CSS v4 dengan konfigurasi custom di `globals.css`:

```css
@theme inline {
  --color-primary: var(--primary);
  --color-base: var(--base);
  /* ... other custom colors */
}
```

### Environment Variables

- `GOOGLE_GEMINI_API_KEY`: API key untuk Google Gemini
- `NEXT_PUBLIC_APP_URL`: URL aplikasi (untuk sharing)

## 📦 Deployment

### Deploy ke Vercel

1. Push code ke GitHub
2. Connect repository ke Vercel
3. Set environment variables di Vercel dashboard
4. Deploy! 🚀

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/nasib-dompet)

## 🤝 Contributing

Contributions welcome! Silakan:

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Catppuccin](https://github.com/catppuccin/catppuccin) untuk color palette yang aesthetic
- [Google Gemini](https://ai.google.dev/) untuk AI yang powerful
- [Lucide](https://lucide.dev/) untuk icons yang beautiful
- Para developer broke yang jadi inspirasi quotes 😅

## ⚠️ Disclaimer

Website ini dibuat purely for fun dan entertainment. Jangan dijadikan panduan hidup yang serius ya! Kalo nasib beneran sial, itu bukan salah AI atau developer 🤣

---

Made with ❤️ and a lot of ☕ by developers who also broke af
