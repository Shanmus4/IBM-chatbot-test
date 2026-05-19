# Google Gemini API Key Setup Guide

## Current Issue

The API key provided is returning 404 errors for all Gemini models. This indicates one of the following issues:

1. **API Key is Invalid** - The key may be expired or incorrectly copied
2. **API Not Enabled** - The Generative Language API is not enabled for this key
3. **Billing Not Set Up** - Google Cloud billing may not be configured
4. **Wrong API Type** - The key might be for a different Google service

## How to Fix

### Step 1: Verify Your API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy the new API key

### Step 2: Enable the Generative Language API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create a new one)
3. Go to "APIs & Services" > "Library"
4. Search for "Generative Language API"
5. Click on it and press "Enable"

### Step 3: Set Up Billing (if required)

1. In Google Cloud Console, go to "Billing"
2. Link a billing account to your project
3. Note: Gemini API has a free tier, but billing must be enabled

### Step 4: Update Your .env File

Replace the API key in `.env`:

```
VITE_GEMINI_API_KEY=your_new_api_key_here
```

### Step 5: Restart the Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Testing the API Key

You can test if your API key works by running this command:

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models?key=YOUR_API_KEY"
```

Replace `YOUR_API_KEY` with your actual key. If it works, you'll see a list of available models.

## Available Gemini Models

The current code is configured to use: `gemini-1.5-flash-latest`

Other available models you can try (edit `src/geminiService.js`):
- `gemini-1.5-flash`
- `gemini-1.5-pro`
- `gemini-1.5-pro-latest`

## Alternative: Use a Different AI Service

If you continue to have issues with Gemini, you can modify the code to use:
- **OpenAI GPT** - More widely used, easier setup
- **Anthropic Claude** - Good alternative
- **Cohere** - Another option

## Current Configuration

**File**: `src/geminiService.js`
**Model**: `gemini-1.5-flash-latest`
**API Version**: v1beta

## Need Help?

1. Check [Google AI Studio Documentation](https://ai.google.dev/tutorials/setup)
2. Review [Gemini API Quickstart](https://ai.google.dev/tutorials/get_started_web)
3. Check [API Status Page](https://status.cloud.google.com/)

## Once Fixed

After getting a valid API key:
1. Update `.env` with the new key
2. Restart the dev server
3. Test by asking: "What is John's role?"
4. The AI should respond with information from `public/aboutme.md`