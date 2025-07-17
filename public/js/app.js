// CTC Wallet - Tonkeeper-inspired Modern Implementation with Biometric Authentication
const AppState = {
    currentScreen: 'splash-screen',
    pin: '',
    authPin: '',
    selectedFee: 'normal',
    walletData: null,
    selectedAsset: 'CTC',
    transactionData: {},
    swapData: {
        from: 'CTC',
        to: 'USDT',
        fromAmount: '',
        toAmount: ''
    },
    marketData: {},
    liveMarketData: {},
    notifications: [],
    theme: 'light',
    currency: 'USD',
    language: 'en',
    contactsList: [],
    stakingPositions: [],
    importMethod: 'phrase'
};

// Network Configuration
const NETWORK_CONFIG = {
    name: 'CTC Mainnet',
    rpcUrl: 'https://rpc.ctc.network',
    chainId: 1337,
    explorer: 'https://explorer.ctc.network',
    nativeCurrency: {
        name: 'Community Trust Coin',
        symbol: 'CTC',
        decimals: 18
    }
};

// Fee Options
const FEE_OPTIONS = {
    slow: { amount: 0.001, time: '~10 min', gasPrice: 1 },
    normal: { amount: 0.01, time: '~3 min', gasPrice: 5 },
    fast: { amount: 0.1, time: '~30 sec', gasPrice: 10 }
};

// CoinGecko API Configuration
const COINGECKO_API = {
    base: 'https://api.coingecko.com/api/v3',
    coins: '/coins/markets',
    price: '/simple/price'
};

// Extended Coin List with proper metadata
const COIN_LIST = {
    'CTC': {
        id: 'community-trust-coin',
        name: 'Community Trust Coin',
        symbol: 'CTC',
        color: '#2E7CF6',
        logo: '/logo.png',
        isLocal: true
    },
    'BTC': {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'BTC',
        color: '#F7931A',
        logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg'
    },
    'ETH': {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH',
        color: '#627EEA',
        logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg'
    },
    'USDT': {
        id: 'tether',
        name: 'Tether',
        symbol: 'USDT',
        color: '#26A17B',
        logo: 'https://cryptologos.cc/logos/tether-usdt-logo.svg'
    },
    'BNB': {
        id: 'binancecoin',
        name: 'BNB',
        symbol: 'BNB',
        color: '#F3BA2F',
        logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg'
    },
    'SOL': {
        id: 'solana',
        name: 'Solana',
        symbol: 'SOL',
        color: '#9945FF',
        logo: 'https://cryptologos.cc/logos/solana-sol-logo.svg'
    },
    'XRP': {
        id: 'ripple',
        name: 'XRP',
        symbol: 'XRP',
        color: '#23292F',
        logo: 'https://cryptologos.cc/logos/xrp-xrp-logo.svg'
    },
    'USDC': {
        id: 'usd-coin',
        name: 'USD Coin',
        symbol: 'USDC',
        color: '#2775CA',
        logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg'
    },
    'ADA': {
        id: 'cardano',
        name: 'Cardano',
        symbol: 'ADA',
        color: '#0033AD',
        logo: 'https://cryptologos.cc/logos/cardano-ada-logo.svg'
    },
    'AVAX': {
        id: 'avalanche-2',
        name: 'Avalanche',
        symbol: 'AVAX',
        color: '#E84142',
        logo: 'https://cryptologos.cc/logos/avalanche-avax-logo.svg'
    },
    'DOGE': {
        id: 'dogecoin',
        name: 'Dogecoin',
        symbol: 'DOGE',
        color: '#C2A633',
        logo: 'https://cryptologos.cc/logos/dogecoin-doge-logo.svg'
    },
    'TRX': {
        id: 'tron',
        name: 'TRON',
        symbol: 'TRX',
        color: '#FF0013',
        logo: 'https://cryptologos.cc/logos/tron-trx-logo.svg'
    },
    'DOT': {
        id: 'polkadot',
        name: 'Polkadot',
        symbol: 'DOT',
        color: '#E6007A',
        logo: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.svg'
    },
    'MATIC': {
        id: 'matic-network',
        name: 'Polygon',
        symbol: 'MATIC',
        color: '#8247E5',
        logo: 'https://cryptologos.cc/logos/polygon-matic-logo.svg'
    },
    'SHIB': {
        id: 'shiba-inu',
        name: 'Shiba Inu',
        symbol: 'SHIB',
        color: '#FFA409',
        logo: 'https://cryptologos.cc/logos/shiba-inu-shib-logo.svg'
    },
    'LTC': {
        id: 'litecoin',
        name: 'Litecoin',
        symbol: 'LTC',
        color: '#BFBBBB',
        logo: 'https://cryptologos.cc/logos/litecoin-ltc-logo.svg'
    },
    'UNI': {
        id: 'uniswap',
        name: 'Uniswap',
        symbol: 'UNI',
        color: '#FF007A',
        logo: 'https://cryptologos.cc/logos/uniswap-uni-logo.svg'
    },
    'LINK': {
        id: 'chainlink',
        name: 'Chainlink',
        symbol: 'LINK',
        color: '#2A5ADA',
        logo: 'https://cryptologos.cc/logos/chainlink-link-logo.svg'
    },
    'ATOM': {
        id: 'cosmos',
        name: 'Cosmos',
        symbol: 'ATOM',
        color: '#2E3148',
        logo: 'https://cryptologos.cc/logos/cosmos-atom-logo.svg'
    },
    'XLM': {
        id: 'stellar',
        name: 'Stellar',
        symbol: 'XLM',
        color: '#14B6E7',
        logo: 'https://cryptologos.cc/logos/stellar-xlm-logo.svg'
    }
};

// Initialize App
window.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

async function initializeApp() {
    // Load saved data
    loadSavedData();
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Check biometric availability
    checkBiometricAvailability();
    
    // Show appropriate screen after splash
    setTimeout(() => {
        if (AppState.walletData) {
            showScreen('auth-screen');
        } else {
            showScreen('welcome-screen');
        }
    }, 2000);
    
    // Start market updates
    if (AppState.walletData) {
        startMarketUpdates();
    }
}

// Check if biometric authentication is available
async function checkBiometricAvailability() {
    try {
        // Check for WebAuthn support
        if (window.PublicKeyCredential) {
            // Check if platform authenticator is available (Touch ID, Face ID, Windows Hello)
            const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
            if (available) {
                console.log('Biometric authentication is available');
            }
        }
        
        // Fallback: Check for Touch ID / Face ID on iOS
        if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.touchID) {
            console.log('iOS Touch ID/Face ID is available');
        }
    } catch (error) {
        console.log('Biometric authentication check failed:', error);
    }
}

// Load saved data from localStorage
function loadSavedData() {
    const savedWallet = localStorage.getItem('ctc_wallet');
    if (savedWallet) {
        AppState.walletData = JSON.parse(savedWallet);
    }
    
    const savedContacts = localStorage.getItem('ctc_contacts');
    if (savedContacts) {
        AppState.contactsList = JSON.parse(savedContacts);
    }
    
    const savedTheme = localStorage.getItem('ctc_theme');
    if (savedTheme) {
        AppState.theme = savedTheme;
        applyTheme(savedTheme);
    }
    
    const savedCurrency = localStorage.getItem('ctc_currency');
    if (savedCurrency) {
        AppState.currency = savedCurrency;
    }
}

// Apply theme
function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    
    // Update theme color meta tag
    const themeColor = theme === 'dark' ? '#0A0B0F' : '#FFFFFF';
    document.querySelector('meta[name="theme-color"]').setAttribute('content', themeColor);
}

// Initialize event listeners
function initializeEventListeners() {
    // Prevent pull-to-refresh on iOS
    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Handle keyboard events
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Screen Management
function showScreen(screenId) {
    const currentScreen = document.getElementById(AppState.currentScreen);
    const newScreen = document.getElementById(screenId);
    
    if (currentScreen) {
        currentScreen.classList.remove('active');
    }
    
    if (newScreen) {
        newScreen.classList.add('active');
        AppState.currentScreen = screenId;
        
        // Handle bottom navigation visibility
        const bottomNav = document.getElementById('bottom-nav');
        const mainScreens = ['dashboard-screen', 'markets-screen', 'explore-screen', 'settings-screen'];
        
        if (mainScreens.includes(screenId)) {
            bottomNav.classList.add('visible');
            updateActiveTab(screenId);
        } else {
            bottomNav.classList.remove('visible');
        }
        
        // Load screen-specific data
        loadScreenData(screenId);
    }
}

// Load screen-specific data
function loadScreenData(screenId) {
    switch(screenId) {
        case 'dashboard-screen':
            updateDashboard();
            break;
        case 'markets-screen':
            updateMarkets();
            break;
        case 'explore-screen':
            updateExplore();
            break;
        case 'settings-screen':
            updateSettings();
            break;
        case 'send-screen':
            initializeSendScreen();
            break;
        case 'receive-screen':
            generateQRCode();
            break;
        case 'swap-screen':
            initializeSwapScreen();
            break;
        case 'staking-screen':
            loadStakingData();
            break;
    }
}

// Tab Navigation
function switchTab(tab) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    const screenMap = {
        'dashboard': 'dashboard-screen',
        'markets': 'markets-screen',
        'explore': 'explore-screen',
        'settings': 'settings-screen'
    };
    
    showScreen(screenMap[tab]);
}

function updateActiveTab(screenId) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    const tabMap = {
        'dashboard-screen': 0,
        'markets-screen': 1,
        'explore-screen': 2,
        'settings-screen': 3
    };
    
    const index = tabMap[screenId];
    if (index !== undefined) {
        navItems[index].classList.add('active');
    }
}

// PIN Management
function addPin(digit) {
    if (AppState.pin.length < 6) {
        AppState.pin += digit;
        updatePinDisplay();
        
        if (AppState.pin.length === 6) {
            setTimeout(() => {
                generateSeedPhrase();
                showScreen('seed-phrase-screen');
            }, 300);
        }
    }
}

function deletePin() {
    if (AppState.pin.length > 0) {
        AppState.pin = AppState.pin.slice(0, -1);
        updatePinDisplay();
    }
}

function clearPin() {
    AppState.pin = '';
    updatePinDisplay();
}

function updatePinDisplay() {
    for (let i = 1; i <= 6; i++) {
        const dot = document.getElementById(`pin-${i}`);
        if (dot) {
            if (i <= AppState.pin.length) {
                dot.classList.add('filled');
            } else {
                dot.classList.remove('filled');
            }
        }
    }
}

// Auth PIN
function addAuthPin(digit) {
    if (AppState.authPin.length < 6) {
        AppState.authPin += digit;
        updateAuthPinDisplay();
        
        if (AppState.authPin.length === 6) {
            authenticatePin();
        }
    }
}

function deleteAuthPin() {
    if (AppState.authPin.length > 0) {
        AppState.authPin = AppState.authPin.slice(0, -1);
        updateAuthPinDisplay();
    }
}

function updateAuthPinDisplay() {
    for (let i = 1; i <= 6; i++) {
        const dot = document.getElementById(`auth-pin-${i}`);
        if (dot) {
            if (i <= AppState.authPin.length) {
                dot.classList.add('filled');
            } else {
                dot.classList.remove('filled');
            }
        }
    }
}

function authenticatePin() {
    if (AppState.walletData && AppState.walletData.pin === AppState.authPin) {
        AppState.authPin = '';
        updateAuthPinDisplay();
        showScreen('dashboard-screen');
        showToast('Welcome back!', 'success');
        startMarketUpdates();
    } else {
        showToast('Incorrect PIN', 'error');
        AppState.authPin = '';
        updateAuthPinDisplay();
        
        // Vibrate on error
        if ('vibrate' in navigator) {
            navigator.vibrate(200);
        }
    }
}

// Biometric Authentication with WebAuthn
async function authenticateBiometric() {
    if (!(AppState.walletData && AppState.walletData.settings && AppState.walletData.settings.biometric)) {
        showToast('Biometric authentication is disabled', 'info');
        return;
    }
    
    try {
        // Check if WebAuthn is supported
        if (!window.PublicKeyCredential) {
            // Fallback to native biometric APIs if available
            return await authenticateNativeBiometric();
        }
        
        showToast('Authenticating...', 'info');
        
        // Check if credential exists
        const credentialId = localStorage.getItem('ctc_biometric_credential');
        
        if (!credentialId) {
            // First time - register biometric
            const registered = await registerBiometric();
            if (registered) {
                loginWithBiometric();
            }
        } else {
            // Authenticate with existing credential
            await verifyBiometric(credentialId);
        }
    } catch (error) {
        console.error('Biometric authentication error:', error);
        showToast('Authentication failed. Please use PIN.', 'error');
    }
}

// Register biometric credential
async function registerBiometric() {
    try {
        const challenge = new Uint8Array(32);
        crypto.getRandomValues(challenge);
        
        const userId = new TextEncoder().encode(AppState.walletData.address);
        
        const publicKeyCredentialCreationOptions = {
            challenge: challenge,
            rp: {
                name: "CTC Wallet",
                id: window.location.hostname === 'localhost' ? 'localhost' : window.location.hostname
            },
            user: {
                id: userId,
                name: "wallet_user",
                displayName: "CTC Wallet User"
            },
            pubKeyCredParams: [
                { alg: -7, type: "public-key" },  // ES256
                { alg: -257, type: "public-key" } // RS256
            ],
            authenticatorSelection: {
                authenticatorAttachment: "platform",
                userVerification: "required"
            },
            timeout: 60000,
            attestation: "none"
        };
        
        const credential = await navigator.credentials.create({
            publicKey: publicKeyCredentialCreationOptions
        });
        
        if (credential) {
            // Store credential ID
            const credentialId = btoa(String.fromCharCode(...new Uint8Array(credential.rawId)));
            localStorage.setItem('ctc_biometric_credential', credentialId);
            
            // Store public key and other data for verification
            const credentialData = {
                credentialId: credentialId,
                publicKey: btoa(String.fromCharCode(...new Uint8Array(credential.response.publicKey))),
                type: credential.type
            };
            localStorage.setItem('ctc_biometric_data', JSON.stringify(credentialData));
            
            showToast('Biometric registration successful', 'success');
            return true;
        }
    } catch (error) {
        console.error('Biometric registration error:', error);
        if (error.name === 'NotAllowedError') {
            showToast('Biometric registration was cancelled', 'info');
        } else {
            showToast('Failed to register biometric', 'error');
        }
        return false;
    }
}

// Verify biometric credential
async function verifyBiometric(credentialId) {
    try {
        const challenge = new Uint8Array(32);
        crypto.getRandomValues(challenge);
        
        const publicKeyCredentialRequestOptions = {
            challenge: challenge,
            allowCredentials: [{
                id: Uint8Array.from(atob(credentialId), c => c.charCodeAt(0)),
                type: 'public-key',
                transports: ['internal']
            }],
            userVerification: "required",
            timeout: 60000
        };
        
        const assertion = await navigator.credentials.get({
            publicKey: publicKeyCredentialRequestOptions
        });
        
        if (assertion) {
            // Authentication successful
            loginWithBiometric();
        }
    } catch (error) {
        console.error('Biometric verification error:', error);
        if (error.name === 'NotAllowedError') {
            showToast('Biometric authentication was cancelled', 'info');
        } else {
            showToast('Biometric authentication failed', 'error');
        }
    }
}

// Native biometric authentication fallback
async function authenticateNativeBiometric() {
    try {
        // Check for iOS TouchID/FaceID via webkit
        if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.touchID) {
            window.webkit.messageHandlers.touchID.postMessage({
                action: 'authenticate',
                reason: 'Authenticate to access your CTC Wallet'
            });
            return;
        }
        
        // For Android, try using the Credential Management API
        if ('credentials' in navigator && 'preventSilentAccess' in navigator.credentials) {
            const credential = await navigator.credentials.get({
                password: true,
                federated: {
                    providers: []
                }
            });
            
            if (credential) {
                loginWithBiometric();
                return;
            }
        }
        
        showToast('Biometric authentication not available', 'error');
    } catch (error) {
        console.error('Native biometric error:', error);
        showToast('Biometric authentication failed', 'error');
    }
}

// Login after successful biometric authentication
function loginWithBiometric() {
    showScreen('dashboard-screen');
    showToast('Authentication successful', 'success');
    startMarketUpdates();
}

// Handle iOS biometric response
window.handleTouchIDResponse = function(success) {
    if (success) {
        loginWithBiometric();
    } else {
        showToast('Biometric authentication failed', 'error');
    }
};

function forgotPin() {
    if (confirm('This will reset your wallet. You will need your recovery phrase to restore it. Continue?')) {
        localStorage.removeItem('ctc_wallet');
        localStorage.removeItem('ctc_biometric_credential');
        localStorage.removeItem('ctc_biometric_data');
        AppState.walletData = null;
        showScreen('welcome-screen');
        showToast('Wallet reset successfully', 'info');
    }
}

// Seed Phrase Generation
function generateSeedPhrase() {
    const wordlist = [
        'abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract',
        'absurd', 'abuse', 'access', 'accident', 'account', 'accuse', 'achieve', 'acid',
        'acoustic', 'acquire', 'across', 'act', 'action', 'actor', 'actress', 'actual',
        'adapt', 'add', 'addict', 'address', 'adjust', 'admit', 'adult', 'advance',
        'advice', 'aerobic', 'affair', 'afford', 'afraid', 'again', 'age', 'agent',
        'agree', 'ahead', 'aim', 'air', 'airport', 'aisle', 'alarm', 'album',
        'alcohol', 'alert', 'alien', 'all', 'alley', 'allow', 'almost', 'alone',
        'alpha', 'already', 'also', 'alter', 'always', 'amateur', 'amazing', 'among',
        'amount', 'amused', 'analyst', 'anchor', 'ancient', 'anger', 'angle', 'angry',
        'animal', 'ankle', 'announce', 'annual', 'another', 'answer', 'antenna', 'antique',
        'anxiety', 'any', 'apart', 'apology', 'appear', 'apple', 'approve', 'april'
    ];
    
    const seedPhrase = [];
    for (let i = 0; i < 12; i++) {
        const randomIndex = Math.floor(Math.random() * wordlist.length);
        seedPhrase.push(wordlist[randomIndex]);
    }
    
    // Display seed phrase
    const seedGrid = document.getElementById('seed-grid');
    if (seedGrid) {
        seedGrid.innerHTML = '';
        seedPhrase.forEach((word, index) => {
            const seedWord = document.createElement('div');
            seedWord.className = 'seed-word';
            seedWord.innerHTML = `
                <div class="seed-number">${index + 1}</div>
                <div class="seed-text">${word}</div>
            `;
            seedGrid.appendChild(seedWord);
        });
    }
    
    // Create wallet
    const wallet = {
        pin: AppState.pin,
        seedPhrase: seedPhrase.join(' '),
        address: generateAddress(),
        balance: '10000.00',
        tokens: {
            CTC: { balance: '10000.00', value: 24500 },
            BTC: { balance: '0.5', value: 22500 },
            ETH: { balance: '5.0', value: 16000 },
            USDT: { balance: '1000.00', value: 1000 },
            BNB: { balance: '20.0', value: 6400 },
            SOL: { balance: '100.0', value: 10000 }
        },
        transactions: generateMockTransactions(),
        settings: {
            currency: 'USD',
            biometric: true,
            notifications: true,
            theme: 'light',
            language: 'en'
        },
        createdAt: Date.now(),
        lastAccess: Date.now()
    };
    
    localStorage.setItem('ctc_wallet', JSON.stringify(wallet));
    AppState.walletData = wallet;
}

function generateAddress() {
    const chars = '0123456789abcdef';
    let address = 'ctc1q';
    for (let i = 0; i < 38; i++) {
        address += chars[Math.floor(Math.random() * chars.length)];
    }
    return address;
}

function generateMockTransactions() {
    const types = ['send', 'receive', 'swap'];
    const transactions = [];
    
    for (let i = 0; i < 10; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        const amount = (Math.random() * 1000).toFixed(2);
        
        transactions.push({
            id: generateTransactionId(),
            type: type,
            amount: amount,
            asset: 'CTC',
            timestamp: Date.now() - (i * 86400000),
            status: i === 0 ? 'pending' : 'confirmed',
            recipient: type === 'send' ? generateAddress() : null,
            sender: type === 'receive' ? generateAddress() : null,
            fee: FEE_OPTIONS.normal.amount
        });
    }
    
    return transactions;
}

function generateTransactionId() {
    const chars = '0123456789abcdef';
    let txId = '0x';
    for (let i = 0; i < 64; i++) {
        txId += chars[Math.floor(Math.random() * chars.length)];
    }
    return txId;
}

// Copy seed phrase
function copySeedPhrase() {
    const seedPhrase = AppState.walletData.seedPhrase;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(seedPhrase).then(() => {
            showToast('Seed phrase copied', 'success');
        });
    }
}

function confirmSeedPhrase() {
    showScreen('dashboard-screen');
    showToast('Wallet created successfully!', 'success');
    startMarketUpdates();
}

// Import Wallet
function selectImportMethod(method) {
    AppState.importMethod = method;
    
    const phraseSection = document.getElementById('import-phrase-section');
    const keySection = document.getElementById('import-key-section');
    const tabs = document.querySelectorAll('.import-tabs .tab-btn');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    
    if (method === 'phrase') {
        phraseSection.style.display = 'block';
        keySection.style.display = 'none';
        tabs[0].classList.add('active');
    } else {
        phraseSection.style.display = 'none';
        keySection.style.display = 'block';
        tabs[1].classList.add('active');
    }
}

function importWallet() {
    if (AppState.importMethod === 'phrase') {
        const phrase = document.getElementById('import-phrase').value.trim();
        
        if (!phrase) {
            showToast('Please enter recovery phrase', 'error');
            return;
        }
        
        const words = phrase.split(' ');
        if (words.length !== 12 && words.length !== 24) {
            showToast('Invalid recovery phrase', 'error');
            return;
        }
        
        // Import wallet
        AppState.importedPhrase = phrase;
        showScreen('create-wallet-screen');
    }
}

// Dashboard Updates
function updateDashboard() {
    if (!AppState.walletData) return;
    
    // Calculate total portfolio value
    let totalValue = 0;
    Object.entries(AppState.walletData.tokens).forEach(([symbol, data]) => {
        const price = AppState.marketData[symbol]?.price || getDefaultPrice(symbol);
        const value = parseFloat(data.balance) * price;
        totalValue += value;
    });
    
    // Update balance display
    const balanceEl = document.querySelector('.balance-amount');
    if (balanceEl) {
        balanceEl.textContent = `$${totalValue.toFixed(2).toLocaleString()}`;
    }
    
    // Update assets
    updateAssetList();
    
    // Update transactions
    updateTransactionList();
}

function updateAssetList() {
    const assetList = document.getElementById('dashboard-assets');
    if (!assetList) return;
    
    const assets = Object.entries(AppState.walletData.tokens).map(([symbol, data]) => {
        const price = AppState.marketData[symbol]?.price || getDefaultPrice(symbol);
        const value = parseFloat(data.balance) * price;
        const change = AppState.marketData[symbol]?.change24h || 0;
        const coinInfo = COIN_LIST[symbol];
        
        return `
            <div class="asset-item" onclick="showAssetDetail('${symbol}')">
                ${coinInfo && coinInfo.logo ? 
                    `<img src="${coinInfo.logo}" alt="${symbol}" class="asset-icon" style="background-color: ${coinInfo.color}20;">` :
                    `<div class="asset-icon-placeholder" style="background-color: ${coinInfo?.color || '#E5E7EB'};">${symbol}</div>`
                }
                <div class="asset-info">
                    <div class="asset-name">${symbol}</div>
                    <div class="asset-balance">${data.balance} ${symbol}</div>
                </div>
                <div class="asset-values">
                    <div class="asset-price">$${value.toFixed(2)}</div>
                    <div class="asset-change ${change >= 0 ? 'positive' : 'negative'}">
                        ${change >= 0 ? '+' : ''}${change.toFixed(2)}%
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    assetList.innerHTML = assets;
}

function updateTransactionList() {
    const txList = document.getElementById('dashboard-transactions');
    if (!txList) return;
    
    const transactions = AppState.walletData.transactions.slice(0, 5).map(tx => {
        const icon = tx.type === 'receive' ? 
            '<path d="M12 5v14m0 0l7-7m-7 7l-7-7"/>' :
            '<path d="M12 19V5m0 0l-7 7m7-7l7 7"/>';
        
        return `
            <div class="transaction-item" onclick="viewTransactionDetails('${tx.id}')">
                <div class="transaction-icon ${tx.type}">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        ${icon}
                    </svg>
                </div>
                <div class="transaction-info">
                    <div class="transaction-type">${tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}</div>
                    <div class="transaction-time">${formatTime(tx.timestamp)}</div>
                </div>
                <div class="transaction-amount">
                    <div class="transaction-value ${tx.type === 'receive' ? 'positive' : ''}">
                        ${tx.type === 'receive' ? '+' : '-'}${tx.amount} ${tx.asset}
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    txList.innerHTML = transactions || '<p style="text-align: center; color: var(--text-secondary);">No transactions yet</p>';
}

// Send Functions
function initializeSendScreen() {
    document.getElementById('amount').value = '';
    document.getElementById('recipient').value = '';
    updateAmountConversion();
}

function setAmount(percentage) {
    const balance = parseFloat(AppState.walletData.tokens[AppState.selectedAsset]?.balance || 0);
    const amount = (balance * percentage / 100).toFixed(2);
    document.getElementById('amount').value = amount;
    updateAmountConversion();
}

function selectFee(fee) {
    AppState.selectedFee = fee;
    document.querySelectorAll('.fee-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    document.querySelector(`input[value="${fee}"]`).parentElement.classList.add('selected');
}

function updateAmountConversion() {
    const amount = parseFloat(document.getElementById('amount')?.value) || 0;
    const price = AppState.marketData[AppState.selectedAsset]?.price || getDefaultPrice(AppState.selectedAsset);
    const usdValue = (amount * price).toFixed(2);
    const convertedElement = document.querySelector('.amount-conversion');
    if (convertedElement) {
        convertedElement.textContent = `≈ $${usdValue} USD`;
    }
}

function reviewTransaction() {
    const recipient = document.getElementById('recipient').value;
    const amount = document.getElementById('amount').value;
    
    if (!recipient || !amount || parseFloat(amount) <= 0) {
        showToast('Please fill all fields', 'error');
        return;
    }
    
    const balance = parseFloat(AppState.walletData.tokens[AppState.selectedAsset]?.balance || 0);
    if (parseFloat(amount) > balance) {
        showToast('Insufficient balance', 'error');
        return;
    }
    
    AppState.transactionData = {
        recipient,
        amount,
        asset: AppState.selectedAsset,
        fee: FEE_OPTIONS[AppState.selectedFee].amount
    };
    
    updateConfirmScreen();
    showScreen('confirm-screen');
}

function updateConfirmScreen() {
    // Update confirm screen with transaction data
    const amountEl = document.querySelector('.confirm-amount .amount-large');
    const usdEl = document.querySelector('.confirm-amount .amount-usd');
    
    if (amountEl) {
        amountEl.textContent = `${AppState.transactionData.amount} ${AppState.transactionData.asset}`;
    }
    
    if (usdEl) {
        const price = AppState.marketData[AppState.transactionData.asset]?.price || getDefaultPrice(AppState.transactionData.asset);
        const usd = (parseFloat(AppState.transactionData.amount) * price).toFixed(2);
        usdEl.textContent = `≈ $${usd} USD`;
    }
}

async function sendTransaction() {
    showToast('Sending transaction...', 'info');
    
    // Simulate transaction
    setTimeout(() => {
        // Update balance
        const currentBalance = parseFloat(AppState.walletData.tokens[AppState.transactionData.asset].balance);
        AppState.walletData.tokens[AppState.transactionData.asset].balance = (
            currentBalance - parseFloat(AppState.transactionData.amount) - AppState.transactionData.fee
        ).toFixed(2);
        
        // Add transaction to history
        const tx = {
            id: generateTransactionId(),
            type: 'send',
            amount: AppState.transactionData.amount,
            asset: AppState.transactionData.asset,
            recipient: AppState.transactionData.recipient,
            fee: AppState.transactionData.fee,
            timestamp: Date.now(),
            status: 'pending'
        };
        
        AppState.walletData.transactions.unshift(tx);
        localStorage.setItem('ctc_wallet', JSON.stringify(AppState.walletData));
        
        showScreen('success-screen');
        
        // Update status after delay
        setTimeout(() => {
            tx.status = 'confirmed';
            localStorage.setItem('ctc_wallet', JSON.stringify(AppState.walletData));
        }, 3000);
    }, 2000);
}

function viewTransaction() {
    const txId = AppState.walletData.transactions[0].id;
    window.open(`${NETWORK_CONFIG.explorer}/tx/${txId}`, '_blank');
}

function copyTxHash() {
    const txHash = AppState.walletData.transactions[0].id;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(txHash).then(() => {
            showToast('Transaction ID copied', 'success');
        });
    }
}

// Receive Functions
function generateQRCode() {
    const addressElement = document.getElementById('wallet-address');
    const qrContainer = document.getElementById('qr-code');
    
    if (addressElement && AppState.walletData) {
        addressElement.textContent = AppState.walletData.address;
    }
    
    if (qrContainer) {
        // Simple QR placeholder
        qrContainer.innerHTML = `
            <div style="width: 200px; height: 200px; background: var(--bg-tertiary); display: flex; align-items: center; justify-content: center;">
                <span style="color: var(--text-tertiary); font-size: 14px;">QR Code</span>
            </div>
        `;
    }
}

function copyAddress() {
    const address = AppState.walletData.address;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(address).then(() => {
            showToast('Address copied', 'success');
        });
    }
}

function shareAddress() {
    const address = AppState.walletData.address;
    
    if (navigator.share) {
        navigator.share({
            title: 'My CTC Address',
            text: address
        }).catch(err => {
            if (err.name !== 'AbortError') {
                copyAddress();
            }
        });
    } else {
        copyAddress();
    }
}

function requestAmount() {
    showToast('Request amount feature coming soon', 'info');
}

// Swap Functions
function initializeSwapScreen() {
    updateSwapRates();
}

function switchSwapAssets() {
    const temp = AppState.swapData.from;
    AppState.swapData.from = AppState.swapData.to;
    AppState.swapData.to = temp;
    
    // Update UI
    document.getElementById('swap-from-amount').value = '';
    document.getElementById('swap-to-amount').value = '';
    updateSwapRates();
}

function updateSwapFromAmount(amount) {
    AppState.swapData.fromAmount = amount;
    calculateSwapAmount();
}

function calculateSwapAmount() {
    const fromAmount = parseFloat(AppState.swapData.fromAmount) || 0;
    const fromPrice = AppState.marketData[AppState.swapData.from]?.price || getDefaultPrice(AppState.swapData.from);
    const toPrice = AppState.marketData[AppState.swapData.to]?.price || getDefaultPrice(AppState.swapData.to);
    
    const toAmount = fromAmount * fromPrice / toPrice;
    AppState.swapData.toAmount = toAmount.toFixed(6);
    
    const toAmountEl = document.getElementById('swap-to-amount');
    if (toAmountEl) {
        toAmountEl.value = AppState.swapData.toAmount;
    }
}

function updateSwapRates() {
    const fromPrice = AppState.marketData[AppState.swapData.from]?.price || getDefaultPrice(AppState.swapData.from);
    const toPrice = AppState.marketData[AppState.swapData.to]?.price || getDefaultPrice(AppState.swapData.to);
    const rate = fromPrice / toPrice;
    
    const rateEl = document.getElementById('swap-rate');
    if (rateEl) {
        rateEl.textContent = `1 ${AppState.swapData.from} = ${rate.toFixed(6)} ${AppState.swapData.to}`;
    }
}

async function executeSwap() {
    if (!AppState.swapData.fromAmount || parseFloat(AppState.swapData.fromAmount) <= 0) {
        showToast('Please enter amount', 'error');
        return;
    }
    
    const fromBalance = parseFloat(AppState.walletData.tokens[AppState.swapData.from].balance);
    if (parseFloat(AppState.swapData.fromAmount) > fromBalance) {
        showToast('Insufficient balance', 'error');
        return;
    }
    
    showToast('Processing swap...', 'info');
    
    setTimeout(() => {
        // Update balances
        const fromAmount = parseFloat(AppState.swapData.fromAmount);
        const toAmount = parseFloat(AppState.swapData.toAmount);
        const fee = fromAmount * 0.003; // 0.3% fee
        
        AppState.walletData.tokens[AppState.swapData.from].balance = (
            parseFloat(AppState.walletData.tokens[AppState.swapData.from].balance) - fromAmount - fee
        ).toFixed(6);
        
        AppState.walletData.tokens[AppState.swapData.to].balance = (
            parseFloat(AppState.walletData.tokens[AppState.swapData.to].balance) + toAmount
        ).toFixed(6);
        
        // Add transaction
        const tx = {
            id: generateTransactionId(),
            type: 'swap',
            fromAsset: AppState.swapData.from,
            fromAmount: fromAmount,
            toAsset: AppState.swapData.to,
            toAmount: toAmount,
            fee: fee,
            timestamp: Date.now(),
            status: 'confirmed'
        };
        
        AppState.walletData.transactions.unshift(tx);
        localStorage.setItem('ctc_wallet', JSON.stringify(AppState.walletData));
        
        // Reset form
        AppState.swapData.fromAmount = '';
        AppState.swapData.toAmount = '';
        document.getElementById('swap-from-amount').value = '';
        document.getElementById('swap-to-amount').value = '';
        
        showToast('Swap completed successfully!', 'success');
        showScreen('dashboard-screen');
    }, 2000);
}

// Market Functions - Enhanced
function updateMarkets() {
    const marketList = document.getElementById('market-list');
    if (!marketList) return;
    
    // Create comprehensive market list with all coins
    const allCoins = Object.keys(COIN_LIST);
    
    // Ensure we have market data for all coins
    allCoins.forEach(symbol => {
        if (!AppState.marketData[symbol]) {
            AppState.marketData[symbol] = {
                price: getDefaultPrice(symbol),
                change24h: Math.random() * 20 - 10, // Random change for demo
                marketCap: getDefaultPrice(symbol) * 1000000000,
                volume24h: Math.random() * 1000000000
            };
        }
    });
    
    // Sort by market cap
    const sortedCoins = allCoins.sort((a, b) => {
        const marketCapA = AppState.marketData[a]?.marketCap || 0;
        const marketCapB = AppState.marketData[b]?.marketCap || 0;
        return marketCapB - marketCapA;
    });
    
    const markets = sortedCoins.map((symbol, index) => {
        const data = AppState.marketData[symbol];
        const coinInfo = COIN_LIST[symbol];
        
        return `
            <div class="market-item" onclick="viewMarketDetails('${symbol}')">
                <div class="market-rank">${index + 1}</div>
                ${coinInfo.logo ? 
                    `<img src="${coinInfo.logo}" alt="${symbol}" class="asset-icon" style="background-color: ${coinInfo.color}20;">` :
                    `<div class="asset-icon-placeholder" style="background-color: ${coinInfo.color};">${symbol}</div>`
                }
                <div class="market-info">
                    <div class="market-symbol">${symbol}</div>
                    <div class="market-name">${coinInfo.name}</div>
                </div>
                <div class="market-values">
                    <div class="market-price">$${formatPrice(data.price)}</div>
                    <div class="market-change ${data.change24h >= 0 ? 'positive' : 'negative'}">
                        ${data.change24h >= 0 ? '+' : ''}${data.change24h.toFixed(2)}%
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    marketList.innerHTML = markets;
}

// Price formatting helper
function formatPrice(price) {
    if (price >= 1000) {
        return price.toFixed(0).toLocaleString();
    } else if (price >= 1) {
        return price.toFixed(2);
    } else if (price >= 0.01) {
        return price.toFixed(4);
    } else {
        return price.toFixed(6);
    }
}

// Settings Functions
function updateSettings() {
    // Update toggle states
    const biometricToggle = document.getElementById('biometric-toggle');
    const notificationsToggle = document.getElementById('notifications-toggle');
    const darkModeToggle = document.getElementById('darkmode-toggle');
    
    if (biometricToggle && AppState.walletData) {
        biometricToggle.classList.toggle('active', AppState.walletData.settings.biometric);
    }
    
    if (notificationsToggle && AppState.walletData) {
        notificationsToggle.classList.toggle('active', AppState.walletData.settings.notifications);
    }
    
    if (darkModeToggle) {
        darkModeToggle.classList.toggle('active', AppState.theme === 'dark');
    }
}

function toggleBiometric() {
    const toggle = document.getElementById('biometric-toggle');
    if (toggle) {
        toggle.classList.toggle('active');
        const isActive = toggle.classList.contains('active');
        
        AppState.walletData.settings.biometric = isActive;
        localStorage.setItem('ctc_wallet', JSON.stringify(AppState.walletData));
        
        if (isActive) {
            // Trigger biometric registration if enabled for the first time
            const credentialId = localStorage.getItem('ctc_biometric_credential');
            if (!credentialId) {
                registerBiometric();
            } else {
                showToast('Biometric enabled', 'success');
            }
        } else {
            // Clear biometric data if disabled
            localStorage.removeItem('ctc_biometric_credential');
            localStorage.removeItem('ctc_biometric_data');
            showToast('Biometric disabled', 'success');
        }
    }
}

function toggleNotifications() {
    const toggle = document.getElementById('notifications-toggle');
    if (toggle) {
        toggle.classList.toggle('active');
        const isActive = toggle.classList.contains('active');
        
        AppState.walletData.settings.notifications = isActive;
        localStorage.setItem('ctc_wallet', JSON.stringify(AppState.walletData));
        
        if (isActive) {
            requestNotificationPermission();
        } else {
            showToast('Notifications disabled', 'success');
        }
    }
}

function toggleDarkMode() {
    const toggle = document.getElementById('darkmode-toggle');
    if (toggle) {
        toggle.classList.toggle('active');
        const isActive = toggle.classList.contains('active');
        
        AppState.theme = isActive ? 'dark' : 'light';
        localStorage.setItem('ctc_theme', AppState.theme);
        applyTheme(AppState.theme);
        
        showToast(`${isActive ? 'Dark' : 'Light'} mode enabled`, 'success');
    }
}

async function requestNotificationPermission() {
    if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            showToast('Notifications enabled', 'success');
        } else {
            showToast('Notification permission denied', 'error');
        }
    }
}

function editProfile() {
    showToast('Profile editing coming soon', 'info');
}

function showSupport() {
    window.open('https://support.ctcwallet.com', '_blank');
}

function logout() {
    if (confirm('Are you sure you want to sign out?')) {
        AppState.authPin = '';
        showScreen('auth-screen');
        showToast('Signed out successfully', 'info');
    }
}

// Staking Functions
function loadStakingData() {
    const positionsEl = document.getElementById('staking-positions');
    if (!positionsEl) return;
    
    if (AppState.stakingPositions.length === 0) {
        positionsEl.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No active staking positions</p>';
    } else {
        // Display staking positions
        positionsEl.innerHTML = AppState.stakingPositions.map(position => `
            <div class="staking-position">
                <!-- Staking position details -->
            </div>
        `).join('');
    }
}

function showStakeDialog() {
    showToast('Staking feature coming soon', 'info');
}

// Helper Functions
function formatTime(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    
    return new Date(timestamp).toLocaleDateString();
}

function getTokenName(symbol) {
    return COIN_LIST[symbol]?.name || symbol;
}

function getDefaultPrice(symbol) {
    const prices = {
        CTC: 2.45,
        BTC: 67890,
        ETH: 3845,
        USDT: 1.0,
        BNB: 612,
        SOL: 178,
        XRP: 0.52,
        USDC: 1.0,
        ADA: 0.58,
        AVAX: 38.45,
        DOGE: 0.16,
        TRX: 0.11,
        DOT: 7.85,
        MATIC: 0.84,
        SHIB: 0.000027,
        LTC: 72.50,
        UNI: 11.20,
        LINK: 14.85,
        ATOM: 9.65,
        XLM: 0.12
    };
    return prices[symbol] || 1;
}

// Toast Notifications
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    const toastIcon = document.querySelector('.toast-icon');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        
        // Update icon based on type
        const icons = {
            success: '<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>',
            error: '<path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>',
            info: '<path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>'
        };
        
        toastIcon.innerHTML = icons[type] || icons.info;
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Market Data Updates
async function loadMarketData() {
    try {
        // Initialize with realistic crypto prices
        const defaultPrices = {
            CTC: { price: 2.45, change24h: 12.5 },
            BTC: { price: 67890, change24h: 2.3 },
            ETH: { price: 3845, change24h: 3.7 },
            USDT: { price: 1.0, change24h: 0.01 },
            BNB: { price: 612, change24h: 1.8 },
            SOL: { price: 178, change24h: 5.2 },
            XRP: { price: 0.52, change24h: -1.4 },
            USDC: { price: 1.0, change24h: 0.02 },
            ADA: { price: 0.58, change24h: 4.1 },
            AVAX: { price: 38.45, change24h: -2.3 },
            DOGE: { price: 0.16, change24h: 8.7 },
            TRX: { price: 0.11, change24h: 1.2 },
            DOT: { price: 7.85, change24h: 3.9 },
            MATIC: { price: 0.84, change24h: -0.8 },
            SHIB: { price: 0.000027, change24h: 15.3 },
            LTC: { price: 72.50, change24h: 1.5 },
            UNI: { price: 11.20, change24h: 2.8 },
            LINK: { price: 14.85, change24h: 4.5 },
            ATOM: { price: 9.65, change24h: -1.9 },
            XLM: { price: 0.12, change24h: 0.7 }
        };
        
        // Set default data
        AppState.marketData = defaultPrices;
        
        // Try to fetch live data
        const coinIds = Object.values(COIN_LIST)
            .filter(coin => !coin.isLocal)
            .map(coin => coin.id)
            .join(',');
        
        const response = await fetch(
            `${COINGECKO_API.base}${COINGECKO_API.price}?ids=${coinIds}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`
        );
        
        if (response.ok) {
            const data = await response.json();
            
            // Update market data with live prices
            Object.entries(COIN_LIST).forEach(([symbol, coinInfo]) => {
                if (data[coinInfo.id] && !coinInfo.isLocal) {
                    AppState.marketData[symbol] = {
                        price: data[coinInfo.id].usd || defaultPrices[symbol].price,
                        change24h: data[coinInfo.id].usd_24h_change || defaultPrices[symbol].change24h,
                        marketCap: data[coinInfo.id].usd_market_cap || defaultPrices[symbol].price * 1000000000,
                        volume24h: data[coinInfo.id].usd_24h_vol || Math.random() * 1000000000
                    };
                }
            });
        }
    } catch (error) {
        console.error('Failed to load market data:', error);
    }
}

function startMarketUpdates() {
    // Initial load
    loadMarketData();
    
    // Update every 30 seconds
    setInterval(() => {
        loadMarketData();
        
        // Update UI if on relevant screens
        if (['dashboard-screen', 'markets-screen'].includes(AppState.currentScreen)) {
            if (AppState.currentScreen === 'dashboard-screen') {
                updateDashboard();
            } else if (AppState.currentScreen === 'markets-screen') {
                updateMarkets();
            }
        }
    }, 30000);
}

// Keyboard Shortcuts
function handleKeyboardShortcuts(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 's':
                e.preventDefault();
                if (AppState.currentScreen === 'dashboard-screen') {
                    showScreen('send-screen');
                }
                break;
            case 'r':
                e.preventDefault();
                if (AppState.currentScreen === 'dashboard-screen') {
                    showScreen('receive-screen');
                }
                break;
        }
    }
}

// QR Code Scanner (placeholder)
function scanQRCode() {
    showToast('QR scanner coming soon', 'info');
}

// Show contacts
function showContacts() {
    showToast('Contacts feature coming soon', 'info');
}

// Show fee options
function showFeeOptions() {
    showToast('Custom fee options coming soon', 'info');
}

// Select send asset
function selectSendAsset() {
    showToast('Asset selection coming soon', 'info');
}

// Select swap assets
function selectSwapFromAsset() {
    showToast('Asset selection coming soon', 'info');
}

function selectSwapToAsset() {
    showToast('Asset selection coming soon', 'info');
}

// View transaction details
function viewTransactionDetails(txId) {
    showToast('Transaction details coming soon', 'info');
}

// View market details
function viewMarketDetails(symbol) {
    AppState.selectedAsset = symbol;
    showToast('Market details coming soon', 'info');
}

// Show asset detail
function showAssetDetail(symbol) {
    AppState.selectedAsset = symbol;
    showToast('Asset details coming soon', 'info');
}

// Update explore screen
function updateExplore() {
    // Explore screen is static
}

// Export functions for HTML
window.showScreen = showScreen;
window.switchTab = switchTab;
window.addPin = addPin;
window.deletePin = deletePin;
window.clearPin = clearPin;
window.addAuthPin = addAuthPin;
window.deleteAuthPin = deleteAuthPin;
window.authenticatePin = authenticatePin;
window.authenticateBiometric = authenticateBiometric;
window.forgotPin = forgotPin;
window.selectFee = selectFee;
window.setAmount = setAmount;
window.reviewTransaction = reviewTransaction;
window.sendTransaction = sendTransaction;
window.viewTransaction = viewTransaction;
window.copyAddress = copyAddress;
window.shareAddress = shareAddress;
window.requestAmount = requestAmount;
window.scanQRCode = scanQRCode;
window.toggleBiometric = toggleBiometric;
window.toggleNotifications = toggleNotifications;
window.toggleDarkMode = toggleDarkMode;
window.editProfile = editProfile;
window.showSupport = showSupport;
window.logout = logout;
window.copySeedPhrase = copySeedPhrase;
window.confirmSeedPhrase = confirmSeedPhrase;
window.copyTxHash = copyTxHash;
window.showContacts = showContacts;
window.showFeeOptions = showFeeOptions;
window.viewTransactionDetails = viewTransactionDetails;
window.viewMarketDetails = viewMarketDetails;
window.showAssetDetail = showAssetDetail;
window.importWallet = importWallet;
window.selectImportMethod = selectImportMethod;
window.switchSwapAssets = switchSwapAssets;
window.updateSwapFromAmount = updateSwapFromAmount;
window.executeSwap = executeSwap;
window.selectSendAsset = selectSendAsset;
window.selectSwapFromAsset = selectSwapFromAsset;
window.selectSwapToAsset = selectSwapToAsset;
window.showStakeDialog = showStakeDialog;
window.updateAmountConversion = updateAmountConversion;

console.log('CTC Wallet - Enhanced Markets Edition initialized');
/* ======= AUTO‑INSERTED COMPLETION FEATURES ======= */
function rememberPrev(screenId){
    AppState.previousScreen = AppState.currentScreen;
    showScreen(screenId);
}

/* Contacts */
function showContacts(){
    loadContacts();
    rememberPrev('contacts-screen');
}
function loadContacts(){
    const list = document.getElementById('contacts-list');
    if(!list)return;
    if(AppState.contactsList.length===0){
        list.innerHTML='<p style="text-align:center;color: var(--text-secondary);">No contacts yet</p>';
    }else{
        list.innerHTML = AppState.contactsList.map((c,i)=>\`
            <div class="contact-item">
                <div>
                    <div style="font-weight:600;">\${c.name}</div>
                    <div style="font-size:12px;color:var(--text-tertiary);">\${c.address}</div>
                </div>
                <button class="contact-send-btn" onclick="startSendToContact(\${i})">Send</button>
            </div>\`).join('');
    }
}
function addContact(){
    const name = prompt('Contact Name');
    if(!name)return;
    const address = prompt('Contact Address');
    if(!address)return;
    AppState.contactsList.push({name,address});
    localStorage.setItem('ctc_contacts', JSON.stringify(AppState.contactsList));
    loadContacts();
}
function startSendToContact(idx){
    const c = AppState.contactsList[idx];
    if(!c)return;
    rememberPrev('send-screen');
    setTimeout(()=>{const r=document.getElementById('recipient'); if(r) r.value=c.address;},200);
}

/* Fee Options */
function showFeeOptions(){
    const list=document.getElementById('fee-options-list');
    if(list){
        list.innerHTML = Object.entries(FEE_OPTIONS).map(([k,v])=>\`
            <button class="fee-option-btn" onclick="selectFee('\${k}'); showScreen(AppState.previousScreen || 'send-screen');">\${k.charAt(0).toUpperCase()+k.slice(1)} – \${v.amount} CTC (\${v.time})</button>\`).join('');
    }
    rememberPrev('fee-options-screen');
}

/* Asset Picker */
function openAssetPicker(ctx){
    AppState.assetPickerContext=ctx;
    const list=document.getElementById('asset-picker-list');
    if(list){
        const tokens=Object.keys(AppState.walletData?.tokens||{CTC:{balance:0}});
        list.innerHTML=tokens.map(sym=>{
            const coin=COIN_LIST[sym]||{};
            return \`<button class="asset-picker-item" onclick="pickAsset('\${sym}')"><img src="\${coin.logo||'/logo.png'}" class="asset-icon"><span style='font-size:16px;font-weight:500;'>\${sym}</span></button>\`;
        }).join('');
    }
    rememberPrev('asset-picker-screen');
}
function pickAsset(sym){
    if(AppState.assetPickerContext==='send'){
        AppState.selectedAsset=sym;
        document.querySelector('.asset-selector .asset-name').textContent=sym;
    }else if(AppState.assetPickerContext==='swap-from'){
        AppState.swapData.from=sym;
    }else if(AppState.assetPickerContext==='swap-to'){
        AppState.swapData.to=sym;
    }
    showScreen(AppState.previousScreen || 'dashboard-screen');
}
function selectSendAsset(){ openAssetPicker('send'); }
function selectSwapFromAsset(){ openAssetPicker('swap-from'); }
function selectSwapToAsset(){ openAssetPicker('swap-to'); }

/* Transaction Details */
function viewTransactionDetails(txId){
    const tx=(AppState.walletData?.transactions||[]).find(t=>t.id===txId);
    if(!tx){ showToast('Transaction not found','error'); return; }
    const el=document.getElementById('tx-details');
    if(el){
        el.innerHTML=\`
            <div style="padding:var(--space-lg);background:var(--bg-primary);border-radius:var(--radius-lg);">
                <div style="margin-bottom:12px;"><strong>ID:</strong> \${tx.id.slice(0,10)}…</div>
                <div style="margin-bottom:12px;"><strong>Type:</strong> \${tx.type}</div>
                <div style="margin-bottom:12px;"><strong>Amount:</strong> \${tx.amount} \${tx.asset}</div>
                <div style="margin-bottom:12px;"><strong>Status:</strong> \${tx.status}</div>
            </div>\`;
    }
    rememberPrev('tx-details-screen');
}

/* QR Scanner (basic placeholder) */
function scanQRCode(){
    rememberPrev('qr-scanner-screen');
    const video=document.getElementById('qr-video');
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
        navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}}).then(stream=>{
            video.srcObject=stream;
        }).catch(()=>{});
    }
}

/* Export overrides */
window.showContacts=showContacts;
window.addContact=addContact;
window.startSendToContact=startSendToContact;
window.showFeeOptions=showFeeOptions;
window.openAssetPicker=openAssetPicker;
window.pickAsset=pickAsset;
window.selectSendAsset=selectSendAsset;
window.selectSwapFromAsset=selectSwapFromAsset;
window.selectSwapToAsset=selectSwapToAsset;
window.viewTransactionDetails=viewTransactionDetails;
window.scanQRCode=scanQRCode;
