# Security & Privacy Guidelines 🔒

## Security Checklist ✅

### Environment Variables
- [x] API keys stored in `.env` file
- [x] `.env` file is gitignored
- [x] `.env.example` provided as template
- [x] No hardcoded credentials in source code
- [x] Environment variables properly prefixed with `VITE_`

### Git Security
- [x] `.gitignore` configured to exclude:
  - `.env` and `.env.*` files
  - `node_modules/`
  - Build artifacts (`dist/`, `dist-ssr/`)
  - Editor files (`.vscode/`, `.idea/`)
  - Log files (`*.log`)

### Code Security
- [x] No sensitive data in source code
- [x] No API keys in comments or documentation
- [x] No user data persistence (ephemeral conversations)
- [x] No external data logging

### API Security
- [x] API key loaded from environment variables
- [x] Error handling implemented
- [x] No API key exposure in error messages

## ⚠️ Known Security Considerations

### Client-Side API Key Exposure

**Issue**: This is a client-side React application, which means the Gemini API key is exposed in the browser.

**Risk Level**: Medium to High (depending on usage)

**Mitigation Options**:

1. **For Development/Personal Use**: 
   - Use API key restrictions in Google Cloud Console
   - Limit by IP address or HTTP referrer
   - Set usage quotas

2. **For Production Use**:
   - Implement a backend API proxy
   - Move API calls to server-side
   - Use authentication tokens instead of direct API keys

### Recommended Production Architecture

```
User Browser → Your Backend API → Google Gemini API
              (with auth)        (with API key)
```

Benefits:
- API key never exposed to client
- Implement rate limiting
- Add user authentication
- Monitor and log usage
- Better cost control

## 🛡️ Security Best Practices

### 1. API Key Management

**DO:**
- ✅ Store API keys in `.env` file
- ✅ Use environment variables
- ✅ Rotate keys regularly
- ✅ Set up API key restrictions in Google Cloud Console
- ✅ Monitor API usage and quotas

**DON'T:**
- ❌ Commit `.env` file to git
- ❌ Share API keys in chat/email
- ❌ Hardcode keys in source code
- ❌ Use production keys in development
- ❌ Expose keys in error messages

### 2. Google Cloud Console Configuration

Recommended API key restrictions:

1. **Application Restrictions**:
   - HTTP referrers: `https://yourdomain.com/*`
   - Or IP addresses for development

2. **API Restrictions**:
   - Restrict to: "Generative Language API"

3. **Quotas**:
   - Set daily request limits
   - Set per-minute rate limits

### 3. Data Privacy

**Current Implementation**:
- ✅ No user data stored
- ✅ No conversation history persistence
- ✅ No external analytics
- ✅ No cookies or tracking
- ✅ Local knowledge base only

**For Production**:
- Consider adding privacy policy
- Implement data retention policies
- Add user consent mechanisms
- Comply with GDPR/CCPA if applicable

### 4. Content Security

**Knowledge Base Security**:
- Review `aboutme.md` for sensitive information
- Don't include personal identifiable information (PII)
- Avoid confidential business information
- Keep content appropriate and professional

### 5. Deployment Security

**For Production Deployment**:

1. **HTTPS Only**
   ```nginx
   # Force HTTPS redirect
   server {
       listen 80;
       return 301 https://$host$request_uri;
   }
   ```

2. **Security Headers**
   ```nginx
   add_header X-Frame-Options "SAMEORIGIN";
   add_header X-Content-Type-Options "nosniff";
   add_header X-XSS-Protection "1; mode=block";
   add_header Content-Security-Policy "default-src 'self'";
   ```

3. **Rate Limiting**
   - Implement on backend proxy
   - Prevent API abuse
   - Protect against DDoS

## 🚨 Incident Response

### If API Key is Compromised:

1. **Immediate Actions**:
   - Revoke the compromised key in Google Cloud Console
   - Generate a new API key
   - Update `.env` file with new key
   - Review API usage logs for suspicious activity

2. **Investigation**:
   - Check git history for accidental commits
   - Review access logs
   - Identify how the key was exposed

3. **Prevention**:
   - Implement additional security measures
   - Consider backend proxy implementation
   - Review and update security practices

## 📋 Security Audit Checklist

Before deploying to production, verify:

- [ ] API key not in source code or git history
- [ ] `.env` file is gitignored
- [ ] API key restrictions configured in Google Cloud Console
- [ ] HTTPS enabled for production
- [ ] Security headers configured
- [ ] Rate limiting implemented
- [ ] Error messages don't expose sensitive data
- [ ] Knowledge base reviewed for sensitive content
- [ ] Monitoring and alerting set up
- [ ] Incident response plan documented

## 📞 Reporting Security Issues

If you discover a security vulnerability, please:

1. **DO NOT** open a public issue
2. Email security concerns privately
3. Provide detailed information about the vulnerability
4. Allow reasonable time for fixes before disclosure

## 📚 Additional Resources

- [Google Cloud API Security Best Practices](https://cloud.google.com/docs/security/best-practices)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Vite Security](https://vitejs.dev/guide/env-and-mode.html#env-files)
- [React Security Best Practices](https://react.dev/learn/security)

---

**Last Updated**: 2026-05-14

**Security Review**: Recommended every 3 months or after major changes