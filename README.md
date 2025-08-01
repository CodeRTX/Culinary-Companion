# 🍳 Culinary Companion - AI Chef Assistant

Transform your culinary dreams into delicious reality with your personal AI chef! A multilingual, intelligent cooking companion that turns your ingredients into extraordinary recipes with expert guidance, creative techniques, and beautiful presentation tips.

## ✨ Features

- **🤖 AI-Powered Recipe Generation**: Get personalized recipes using advanced Qloo API integration
- **🗣️ Voice Interaction**: Speak your ingredients or listen to recipes read aloud
- **🌍 13+ Languages**: Full support for English, Spanish, French, Italian, German, Chinese, Japanese, Korean, Portuguese, Russian, Arabic, Hindi, Thai, and Bengali
- **🥗 Smart Dietary Adaptations**: Intelligent handling of dietary restrictions with automatic ingredient substitutions
- **📱 Fully Responsive**: Perfect experience on desktop, tablet, and mobile devices
- **💾 Session Caching**: Smart autocomplete with session-based memory for improved user experience
- **🎨 Beautiful UI**: Modern, engaging interface with smooth animations and gradients

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Cloudflare account for deployment
- Qloo API key ([Get it here](https://docs.qloo.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd culinary-companion
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Add your API keys (see Environment Variables section below)

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Visit** `http://localhost:5173`

## 🔧 Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Backend**: Hono.js on Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite)
- **APIs**: Qloo Recipe API
- **Speech**: Web Speech API for voice input/output
- **Deployment**: Cloudflare Workers

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```env
# Qloo API Configuration
QLOO_API_KEY=your_qloo_api_key_here

# Mocha Users Service (if using authentication)
MOCHA_USERS_SERVICE_API_KEY=your_mocha_users_api_key
MOCHA_USERS_SERVICE_API_URL=your_mocha_users_api_url

# Database (automatically configured in Cloudflare)
# DB=your_d1_database_binding
```

## 📚 API Documentation

### Recipe Generation Endpoint

**POST** `/api/recipes/generate`

```json
{
  "ingredients": "chicken, garlic, herbs",
  "language": "en",
  "dietaryRestrictions": ["gluten-free", "dairy-free"],
  "cuisineStyle": "Italian"
}
```

**Response:**
```json
{
  "recipes": [
    {
      "title": "Italian Herb Chicken",
      "description": "A delicious fusion dish...",
      "ingredients": ["1 lb chicken breast", "3 cloves garlic", "..."],
      "instructions": ["Prepare ingredients...", "Heat olive oil..."],
      "cuisineType": "Italian",
      "difficultyLevel": "intermediate",
      "prepTime": 15,
      "cookTime": 25,
      "servings": 4,
      "tips": ["Prep all ingredients first", "..."]
    }
  ]
}
```

## 🎯 Key Features Explained

### Smart Dietary Adaptations
When users select dietary restrictions, the app intelligently:
- Detects conflicts (e.g., "chicken sandwich" + "vegetarian")
- Suggests plant-based alternatives
- Shows adaptation notes to users
- Searches for appropriate substitutions

### Session-Based Caching
- Recent searches stored in `sessionStorage`
- Preferences cleared when browser session ends
- Autocomplete suggestions based on current session
- No persistent data storage across sessions

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interface
- Optimized for various browsers

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run check

# Lint code
npm run lint

# Generate Cloudflare types
npm run cf-typegen
```

## 📱 Browser Compatibility

- **Chrome/Edge**: Full support including speech features
- **Firefox**: Full support with speech features
- **Safari**: Full support (speech features may vary)
- **Mobile browsers**: Optimized responsive experience

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, please check our [Documentation](INSTALLATION.md) or open an issue on GitHub.

## 🙏 Acknowledgments

- Qloo API for recipe intelligence
- Cloudflare for hosting and database
- Lucide React for beautiful icons
- Unsplash for culinary images

---

Built with ❤️ and lots of ☕ by passionate developers who love great food!
