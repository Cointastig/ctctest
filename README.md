# CTC Wallet - Professional Crypto Management PWA

A fully-featured, professional cryptocurrency wallet Progressive Web App (PWA) for the CTC blockchain ecosystem with live market data integration.

## 🚀 Features

### Core Wallet Functions
- **Secure Wallet Creation**: 6-digit PIN protection with biometric authentication support
- **Multi-Asset Support**: CTC, BTC, ETH, USDT and more
- **Send & Receive**: QR code scanning, contact management, custom network fees
- **Token Swap**: Built-in DEX with real-time exchange rates
- **Buy Crypto**: Multiple payment methods (Card, Bank, PayPal, Crypto)

### Live Market Data
- **Real-Time Prices**: Integration with CoinGecko API for live cryptocurrency prices
- **Market Charts**: Interactive price charts with multiple timeframes
- **Market Statistics**: 24h volume, market cap, price changes
- **Top Gainers/Losers**: Track market movements

### DeFi Features
- **Staking**: Up to 15% APY with flexible lock periods (30/90/180 days)
- **Liquidity Pools**: Provide liquidity and earn fees
- **Governance**: Vote on protocol proposals
- **Lending & Borrowing**: Supply assets and earn interest

### Security Features
- **PIN Protection**: 6-digit PIN with attempt limiting
- **Biometric Authentication**: Face ID / Touch ID support
- **Recovery Phrase**: BIP39 compatible 12-word seed phrase
- **Local Encryption**: All data encrypted and stored locally
- **No External Dependencies**: Self-contained security

### User Experience
- **PWA Support**: Install to home screen, works offline
- **Push Notifications**: Transaction alerts and price notifications
- **Multi-Language**: 10+ languages supported
- **Multi-Currency**: Display prices in 10+ fiat currencies
- **Dark Theme**: Professional dark UI with glass morphism design
- **Touch Gestures**: Swipe navigation and haptic feedback

## 📁 Project Structure

```
ctc-wallet/
├── src/                    # Source files (served as root on Vercel)
│   ├── index.html         # Main application HTML
│   ├── app.js             # Application logic
│   ├── styles.css         # Styles
│   ├── sw.js              # Service Worker
│   ├── manifest.json      # PWA manifest
│   └── assets/            # Static assets
│       ├── icon-192.png   # App icon 192x192
│       ├── icon-512.png   # App icon 512x512
│       ├── favicon.ico    # Favicon
│       └── logo.png       # CTC logo
├── package.json           # NPM configuration
├── vercel.json           # Vercel deployment config
├── README.md             # This file
└── .gitignore            # Git ignore rules
```

## 🛠️ Technical Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **PWA**: Service Workers, Web App Manifest
- **API Integration**: CoinGecko API for live market data
- **Styling**: CSS Variables, Glass Morphism, Responsive Design
- **Icons**: SVG icons (no emoji dependencies)
- **Storage**: LocalStorage with encryption
- **Deployment**: Vercel (optimized configuration)

## 🚀 Prerequisites

Before deploying, ensure you have the following files in `src/assets/`:
- `icon-192.png` - 192x192px PWA icon
- `icon-512.png` - 512x512px PWA icon
- `favicon.ico` - Browser favicon
- `logo.png` - CTC logo (square format recommended)

## 💻 Local Development

1. Clone the repository:
```bash
git clone https://github.com/your-username/ctc-wallet.git
cd ctc-wallet
```

2. Install dependencies:
```bash
npm install
```

3. Add required assets to `src/assets/` folder

4. Start development server:
```bash
npm run dev
```

5. Open http://localhost:3000

## 🚀 Deployment to Vercel

### Option 1: Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy to Vercel:
```bash
vercel
```

3. For production deployment:
```bash
vercel --prod
```

### Option 2: Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Click "Deploy" (no configuration needed)

The app will be automatically deployed with:
- HTTPS enabled
- Global CDN distribution
- Automatic deployments on git push
- Preview deployments for PRs

## 🔧 Configuration

### Environment Variables
No environment variables required - the app uses public APIs and local storage.

### API Configuration
The app uses CoinGecko's free API tier. For production use with high traffic, consider:
1. Implementing API caching
2. Using a proxy server
3. Upgrading to CoinGecko Pro

### Network Configuration
Edit `NETWORK_CONFIG` in `app.js` to configure:
- RPC endpoints
- Chain ID
- Block explorer URL
- Native currency details

## 📱 PWA Installation

### iOS
1. Open the app in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. Name the app and tap "Add"

### Android
1. Open the app in Chrome
2. Tap the menu (3 dots)
3. Select "Add to Home Screen"
4. Confirm installation

### Desktop
1. Open the app in Chrome/Edge
2. Click the install icon in the address bar
3. Confirm installation

## 🔒 Security Considerations

1. **Private Keys**: Never stored on servers - only in encrypted local storage
2. **PIN Security**: Implement rate limiting for PIN attempts
3. **HTTPS Only**: Always serve over HTTPS in production
4. **CSP Headers**: Content Security Policy configured in vercel.json
5. **API Keys**: Use environment variables for any private API keys

## 🎨 Customization

### Theming
Edit CSS variables in `styles.css`:
```css
:root {
    --brand-primary: #2E7CF6;
    --brand-secondary: #0A58CA;
    /* ... other variables */
}
```

### Adding New Assets
1. Add token data to `COIN_MAPPING` in app.js
2. Update wallet initialization with token balances
3. Add token to swap pairs and market lists

### Adding New Features
1. Create new screen in index.html
2. Add screen logic in app.js
3. Update navigation and routing
4. Add styles in styles.css

## 📊 API Integration

### CoinGecko API
Free tier limits:
- 10-50 calls/minute
- No API key required
- Automatic fallback to demo data

For production:
```javascript
// Add to app.js for API key support
const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY;
const headers = COINGECKO_API_KEY ? {
    'x-cg-demo-api-key': COINGECKO_API_KEY
} : {};
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Wallet creation flow
- [ ] PIN authentication
- [ ] Send/receive transactions
- [ ] Token swaps
- [ ] Market data updates
- [ ] Offline functionality
- [ ] PWA installation
- [ ] Biometric authentication

### Browser Compatibility
- Chrome/Edge: Full support
- Safari: Full support (iOS PWA)
- Firefox: Full support (no PWA install)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Contribution Guidelines
- Follow existing code style
- Add comments for complex logic
- Update README for new features
- Test on multiple devices
- Ensure PWA functionality

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- Documentation: [docs.ctc.network](https://docs.ctc.network)
- Support: [support.ctcwallet.com](https://support.ctcwallet.com)
- Community: [discord.gg/ctcnetwork](https://discord.gg/ctcnetwork)

## 🎯 Roadmap

- [x] Core wallet functionality
- [x] Live market data integration
- [x] DeFi features (Staking, Liquidity, Governance)
- [x] Multi-language support
- [x] PWA features
- [ ] Hardware wallet support
- [ ] WalletConnect integration
- [ ] NFT support
- [ ] Cross-chain bridges
- [ ] Advanced trading features

## ⚡ Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Bundle Size**: <500KB (excluding fonts)
- **Time to Interactive**: <3s on 3G
- **Offline Support**: Full functionality except live prices

---

Built with ❤️ for the CTC Community
