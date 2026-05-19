# Mini Me - AI Chatbot 🤖

A modern, full-screen chatbot interface built with React and Vite, powered by Google Gemini AI. This chatbot answers questions based exclusively on information from a knowledge base file (`aboutme.md`).

## ✨ Features

- 🎨 Clean, modern full-screen UI based on Figma design
- 🤖 Google Gemini 2.5 Flash AI integration
- 💬 Real-time message display with typing indicators
- 📱 Responsive design with mobile support
- ⚡ Lightning-fast development with Vite
- 🔒 Scope-limited responses (only answers from knowledge base)
- 🎯 Smart out-of-scope detection
- 🔐 Secure environment variable management

## 🛡️ Security & Privacy

### ✅ Security Measures Implemented

1. **Environment Variables Protected**
   - API keys stored in `.env` file (gitignored)
   - `.env.example` provided as template
   - No sensitive data committed to repository

2. **API Key Security**
   - ⚠️ **Important**: This is a client-side app, so the API key is exposed in the browser
   - For production use, implement a backend proxy to hide the API key
   - Consider using API key restrictions in Google Cloud Console

3. **Data Privacy**
   - No user data is stored or logged
   - All conversations are ephemeral (not persisted)
   - Knowledge base is local and under your control

4. **Best Practices**
   - `.gitignore` configured to exclude sensitive files
   - No hardcoded credentials in source code
   - Environment variables properly prefixed with `VITE_`

### 🔒 Recommended Production Security

For production deployment, consider:

1. **Backend API Proxy**: Create a backend service to handle Gemini API calls
2. **Rate Limiting**: Implement request throttling to prevent abuse
3. **API Key Restrictions**: Configure IP/domain restrictions in Google Cloud Console
4. **HTTPS Only**: Always serve over HTTPS in production
5. **Content Security Policy**: Add CSP headers to prevent XSS attacks

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**

Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Then edit `.env` and add your API key:
```
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

⚠️ **Never commit the `.env` file to version control!**

3. **Configure your knowledge base:**

Edit `public/aboutme.md` with the information you want the chatbot to know about. The AI will ONLY answer questions based on this file.

Example content:
```markdown
# About Me

## Personal Information
- Name: Your Name
- Role: Your Role
- Location: Your Location

## Skills
- Your skills here
```

### Running Locally

1. **Start the development server:**
```bash
npm run dev
```

2. **Open in browser:**
The app will be available at `http://localhost:3000` (or the port shown in terminal)

### Building for Production

To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
mini-me-chatbot/
├── public/
│   ├── aboutme.md          # Knowledge base file
│   └── chat-icon.svg       # Favicon
├── src/
│   ├── App.jsx             # Main chatbot component
│   ├── App.css             # Chatbot styles
│   ├── geminiService.js    # Gemini AI integration
│   ├── main.jsx            # React entry point
│   └── index.css           # Global styles
├── .env                    # Environment variables (gitignored)
├── .env.example            # Environment template
├── .gitignore              # Git ignore rules
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
└── README.md              # This file
```

## 🎯 How It Works

### AI Integration

The chatbot uses Google Gemini 2.5 Flash model with a custom system prompt that:

1. **Loads knowledge base**: Reads content from `public/aboutme.md` on startup
2. **Enforces scope**: Only answers questions related to the knowledge base
3. **Handles out-of-scope**: Politely declines unrelated questions
4. **Provides context**: Uses the aboutme.md content as context for all responses

### Key Features

#### 🎯 Scope-Limited Responses
The AI will ONLY answer questions about information in `aboutme.md`. For any other questions, it responds with a friendly out-of-scope message.

#### ⚡ Real-time Interaction
- Typing indicators show when AI is processing
- Auto-scroll to latest messages
- Clean, modern message bubbles
- Smooth animations

#### 🎨 Customizable Knowledge Base
Simply edit `public/aboutme.md` to change what the chatbot knows. The AI will automatically use the updated content.

## 🎨 Customization

### Design System

Colors defined in `src/App.css`:
- Primary Text: `#0f172a` (dark slate)
- Secondary Text: `#475569` (slate)
- User Message Background: `#fed7aa` (peach/orange)
- Border: `#e2e8f0` (light gray)
- Background: `white`

### Layout
- Full-screen design (100vw x 100vh)
- Sidebar: 222px width
- Chat area: Flexible with 200px horizontal padding
- Input field: 800px width, centered

### AI Model

To change the Gemini model, edit `src/geminiService.js`:
```javascript
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.0-flash-exp"  // Change model here
});
```

Available models:
- `gemini-2.0-flash-exp` - Latest experimental model (fastest)
- `gemini-1.5-flash` - Stable production model
- `gemini-1.5-pro` - More capable, slower model

## 🔧 Troubleshooting

### API Key Issues
If you see API key errors:
1. Verify your `.env` file exists and has the correct format
2. Ensure the key starts with `VITE_` prefix
3. Restart the dev server after changing `.env`
4. Check Google Cloud Console for API quotas and restrictions

### Model Not Found (404 Error)
If you get 404 errors:
1. The model name might be incorrect or not available in your region
2. Try using `gemini-1.5-flash` instead of `gemini-2.0-flash-exp`
3. Check [Google AI Studio](https://makersuite.google.com/app/apikey) for available models

### Knowledge Base Not Loading
If the chatbot doesn't use your knowledge base:
1. Ensure `public/aboutme.md` exists and has content
2. Check browser console for fetch errors
3. Restart the dev server after editing `aboutme.md`

## 🌐 Environment Variables

- `VITE_GEMINI_API_KEY` - Your Google Gemini API key (required)

**Security Note**: The `.env` file is gitignored and should never be committed to version control.

## 📝 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Google Generative AI SDK** - Gemini AI integration
- **CSS3** - Modern styling with flexbox and animations

## 🚀 Future Enhancements

- [ ] Backend API proxy for secure key management
- [ ] Conversation history persistence
- [ ] Streaming responses for real-time typing effect
- [ ] File upload for knowledge base updates
- [ ] Multi-language support
- [ ] Voice input/output
- [ ] Analytics and usage tracking
- [ ] Dark mode support

## 📄 License

MIT

## 🤝 Support

For issues or questions, please open an issue in the repository.

---

**Made with ❤️ using React, Vite, and Google Gemini AI**