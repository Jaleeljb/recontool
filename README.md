# 🛡️ Advanced OSINT Web Reconnaissance Tool

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Responsive](https://img.shields.io/badge/Responsive-Mobile%20%7C%20Tablet%20%7C%20Desktop-blue)](#)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-success)](#)
[![Language](https://img.shields.io/badge/Language-JavaScript-yellow)](#)

> **Professional OSINT reconnaissance platform for passive intelligence gathering and comprehensive domain analysis.**

A production-ready, fully responsive web application designed for Open Source Intelligence (OSINT) gathering and reconnaissance. This tool performs comprehensive passive analysis of web targets including DNS enumeration, IP geolocation tracking, technology fingerprinting, employee intelligence, contact information extraction, and historical domain analysis.

**🔗 Live Demo**: [Website](https://recontool.vercel.app) 

---

## 🚀 Features

### 🔍 Core Reconnaissance Modules (10 Total)

#### 1. **DNS Records Analysis**
- A, AAAA, MX, NS, TXT, CNAME record enumeration
- Mail server configuration detection and priority analysis
- Nameserver identification and DNS provider detection
- SPF, DKIM, DMARC email authentication verification
- IPv4 and IPv6 address resolution

#### 2. **IP Geolocation & Network Details**
- Real-time IP address resolution
- Geographic location mapping (Country, Region, City)
- ISP and organization identification
- ASN (Autonomous System Number) detection
- Timezone and UTC offset information
- Precise latitude/longitude coordinates
- Network infrastructure analysis

#### 3. **Technology Stack Detection**
- **CMS Identification**: WordPress, Drupal, Joomla, Shopify, Wix, Magento, Squarespace, Webflow, Ghost, Medium
- **JavaScript Frameworks**: React, Vue.js, Angular, Next.js, Svelte, jQuery
- **CSS Frameworks**: Bootstrap, Tailwind CSS, Foundation
- **Analytics & Tracking**: Google Analytics, Google Tag Manager, Facebook Pixel, Hotjar, Amplitude, Mixpanel, Intercom
- **Web Server Fingerprinting**: Apache, Nginx, IIS, LiteSpeed
- **Backend Technology Detection**: PHP, Python, Ruby, Node.js indicators

#### 4. **Employee & Organization Intelligence**
- LinkedIn company profile search links
- Common email pattern analysis (firstname.lastname@domain, etc.)
- Social media organization discovery
- Crunchbase company profile links
- GitHub organization detection
- Employee directory reconnaissance resources

#### 5. **Contact Information Extraction**
- **Email Discovery**: Regex-based extraction from page source and meta tags
- **Phone Numbers**: International format detection (+1, +91, etc.)
- **Social Media Profiles**:
  - Facebook company pages
  - Twitter/X accounts
  - LinkedIn business profiles
  - Instagram handles
  - YouTube channels
  - GitHub repositories
  - TikTok accounts
- Contact form and support channel detection

#### 6. **Related Domains Discovery**
- Reverse WHOIS lookup resources
- Subdomain pattern suggestions (www, api, mail, admin, dev, staging, cdn, blog, shop, app)
- Certificate transparency search integration
- DNS history tracking resources
- Historical IP address databases
- AS number related domain discovery

#### 7. **Historical Data Analysis**
- Domain registration timeline and age calculation
- Wayback Machine archive snapshots
- WHOIS registrar information and changes
- Previous ownership tracking
- DNS record evolution timeline
- Domain reputation score history
- IP address migration tracking

#### 8. **Metadata & SEO Information**
- Page title and meta descriptions
- Open Graph protocol tags (OG:title, OG:description, OG:image)
- Twitter Card metadata
- Canonical URL detection
- Language and robots meta tags
- Heading structure analysis (H1, H2 counts)
- Image and internal/external link counting
- Schema.org structured data detection

#### 9. **WHOIS Information**
- Domain registration data via RDAP protocol
- Registrar information and contact details
- Domain status tracking (active, locked, pending, etc.)
- Registration and expiration dates
- Nameserver configuration

#### 10. **Subdomain Enumeration**
- Certificate transparency log analysis (crt.sh)
- Common subdomain pattern detection
- Live subdomain discovery via SSL certificates
- Historical subdomain tracking

---

## 🎯 Key Capabilities

| Feature | Description | Technology |
|---------|-------------|------------|
| **Passive Reconnaissance** | No active scanning - purely OSINT-based intelligence gathering | OSINT Methodology |
| **Real-Time Data** | Live API integrations for accurate, up-to-date information | Multiple REST APIs |
| **Multi-API Integration** | Google DNS, ipapi.co, ip-api.com, crt.sh, RDAP, AllOrigins CORS proxy | API Orchestration |
| **Professional Reports** | Exportable HTML reports with black-theme styling and analyst attribution | HTML Export |
| **Fully Responsive** | Mobile (320px+), Tablet (768px+), Desktop (1024px+) support | CSS Grid/Flexbox |
| **Zero Dependencies** | Pure HTML, CSS, JavaScript - no frameworks or libraries required | Vanilla JS |
| **Legal Compliance** | Includes comprehensive legal disclaimer for authorized use only | Ethical OSINT |
| **Client-Side Processing** | All processing happens in browser - no server required | Privacy-Focused |
| **Touch Optimized** | 48px minimum tap targets for mobile usability | Mobile UX |
| **Accessibility** | Reduced motion support, high contrast theme | WCAG Guidelines |

---

## 📸 Screenshots

### Desktop View
![Desktop Interface](https://github.com/user-attachments/assets/8e284a8c-3ce2-4094-b706-b3f71a41980f)

---

## 🛠️ Technology Stack

### Frontend Technologies
- **HTML5**: Semantic markup, modern web standards
- **CSS3**: Custom design system, CSS Grid, Flexbox, animations
- **JavaScript (ES6+)**: Async/await, Promises, DOM manipulation, regex processing

### API Integrations
- **Google DNS API**: DNS record resolution (A, AAAA, MX, NS, TXT, CNAME)
- **ipapi.co**: Primary IP geolocation service
- **ip-api.com**: Fallback geolocation provider
- **crt.sh**: Certificate Transparency log queries for subdomain discovery
- **RDAP**: WHOIS information via Registration Data Access Protocol
- **AllOrigins**: CORS proxy for cross-origin content fetching

### Design System
- **Typography**: Courier New monospace font for terminal aesthetic
- **Color Scheme**: Black (#000) and white (#fff) high-contrast theme
- **Responsive Grid**: CSS Grid with 1/2/3/4 column layouts based on viewport
- **Animations**: Subtle gradient pulse (45s cycle) for premium feel
- **Logo**: Custom 140px cybersecurity-themed shield design

### Architecture
- **Type**: Single-page application (SPA)
- **Processing**: Client-side only (no backend required)
- **State Management**: JavaScript object-based result storage
- **Export Format**: Standalone HTML with embedded CSS

---

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Internet connection for API calls
- No server or dependencies required

### Installation

#### Option 1: Direct Browser Usage
```bash
# Download the repository
git clone https://github.com/shaikjaleelbasha/osint-recon-tool.git
cd osint-recon-tool

# Open in browser
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

#### Option 2: Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000

# Then navigate to http://localhost:8000
```

### Deployment Options

#### GitHub Pages
```bash
# Push to GitHub and enable Pages in repository settings
git add .
git commit -m "Initial deployment"
git push origin main

# Enable GitHub Pages in Settings → Pages → Source: main branch
# Your site will be live at: https://yourusername.github.io/osint-recon-tool
```

#### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy to Netlify
netlify deploy --prod

# Or drag-and-drop the folder to https://app.netlify.com/drop
```

#### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

---

## 📖 Usage Guide

### Basic Reconnaissance Workflow

#### Step 1: Enter Target URL
- Input the complete URL (e.g., `https://example.com`)
- Real-time validation occurs via DNS lookup
- Green checkmark indicates valid domain
- Red X indicates invalid or unreachable domain

#### Step 2: Select Reconnaissance Modules
Choose from 10 available intelligence gathering modules:
- ☐ DNS Records (MX/NS/TXT)
- ☐ Geolocation & IP Details
- ☐ WHOIS Information
- ☐ HTTP Headers Analysis
- ☐ SSL/TLS Certificate
- ☐ Technology Stack Detection
- ☐ Subdomain Enumeration
- ☐ Metadata & SEO Info
- ☐ Contact Information
- ☐ Employee Intelligence
- ☐ Related Domains
- ☐ Historical Data

**Tip**: Select all modules for comprehensive reconnaissance

#### Step 3: Configure Scan Depth
- **Quick**: Fast overview with essential data points
- **Standard**: Balanced analysis with moderate depth
- **Deep**: Comprehensive investigation with all available data

#### Step 4: Start Reconnaissance
- Click "START SCAN" button
- Watch real-time progress indicators for each module
- Results populate dynamically as data is retrieved
- Typical scan completes in 30-60 seconds

#### Step 5: Review Findings
Results are organized by category:
- Each category shows item count
- Detailed findings with contextual information
- Links to external verification resources
- Professional formatting for easy reading

#### Step 6: Export Professional Report
- Click "EXPORT REPORT" button
- Downloads standalone HTML file
- Filename format: `OSINT-Report-[domain]-[timestamp].html`
- Report includes:
  - Target URL and scan date
  - Analyst attribution (Shaik Jaleel Basha)
  - Complete findings by category
  - Professional black-theme styling
  - Print-ready formatting

### Example Reconnaissance Session

```
🎯 Target: https://tesla.com
📋 Modules: All (10 modules selected)
⚡ Scan Depth: Deep
⏱️ Duration: 45 seconds

📊 Results Summary:
├── DNS Records (8 findings)
│   ├── A Record: 184.30.18.203
│   ├── MX Record: mx1.tesla.com (Priority 10)
│   ├── NS Record: ns1.tesla.com
│   └── TXT Record: v=spf1 include:_spf.tesla.com ~all
│
├── Geolocation & IP Details (8 findings)
│   ├── IP Address: 184.30.18.203
│   ├── Country: United States (US)
│   ├── Region: Texas
│   ├── City: Austin
│   ├── ISP: Tesla Inc.
│   └── Coordinates: 30.2672, -97.7431
│
├── Technology Stack (15 findings)
│   ├── Web Server: nginx/1.18.0
│   ├── CMS: Custom (proprietary)
│   ├── Framework: React
│   ├── Analytics: Google Analytics, Google Tag Manager
│   └── CDN: Cloudflare
│
├── Contact Information (12 findings)
│   ├── Email: info@tesla.com
│   ├── Email: support@tesla.com
│   ├── Phone: +1-888-518-3752
│   ├── Facebook: https://facebook.com/tesla
│   ├── Twitter: https://twitter.com/tesla
│   ├── LinkedIn: https://linkedin.com/company/tesla-motors
│   └── Instagram: https://instagram.com/teslamotors
│
├── Subdomain Enumeration (20+ findings)
│   ├── www.tesla.com
│   ├── shop.tesla.com
│   ├── auth.tesla.com
│   ├── api.tesla.com
│   └── ...
│
└── Historical Data (10 findings)
    ├── Domain Age: Registered 1992
    ├── Wayback Machine: 5,000+ snapshots since 1997
    └── Registration Timeline: 33 years active

📥 Exported: OSINT-Report-tesla-com-1732080245.html
```

---

## 🔒 Legal & Ethical Use

### ⚠️ CRITICAL LEGAL NOTICE

**THIS TOOL IS FOR AUTHORIZED SECURITY RESEARCH AND TESTING ONLY.**

#### ✅ Authorized Uses
- Domains you own or manage
- Bug bounty programs within defined scope
- Authorized penetration testing engagements with signed contracts
- Educational and academic research purposes
- Security awareness training and demonstrations
- Competitive intelligence with legal permission

#### ❌ Prohibited Uses
- Unauthorized scanning of third-party systems
- Malicious reconnaissance or attack preparation
- Violation of Computer Fraud and Abuse Act (CFAA) or equivalent laws
- Stalking, harassment, or privacy invasion
- Any illegal or unethical activities
- Circumventing security measures without authorization

### Legal Compliance Requirements

**Users are solely responsible for ensuring compliance with applicable laws including:**

**United States:**
- Computer Fraud and Abuse Act (CFAA) - 18 U.S.C. § 1030
- Electronic Communications Privacy Act (ECPA)
- Stored Communications Act (SCA)
- State-specific computer crime laws

**United Kingdom:**
- Computer Misuse Act 1990
- Data Protection Act 2018
- Investigatory Powers Act 2016

**European Union:**
- General Data Protection Regulation (GDPR)
- Network and Information Systems Directive (NIS Directive)
- Cybersecurity Act

**International:**
- Budapest Convention on Cybercrime
- Local and international cybersecurity regulations

### User Agreement

**By using this tool, you explicitly agree to:**

1. ✅ Only scan systems you are legally authorized to test
2. ✅ Comply with all applicable local, national, and international laws
3. ✅ Use the tool responsibly, ethically, and professionally
4. ✅ Not use the tool for malicious, harmful, or illegal purposes
5. ✅ Respect privacy and data protection regulations
6. ✅ Obtain proper authorization before scanning any target
7. ✅ Accept full responsibility for your actions and their consequences

### Disclaimer

**THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. THE AUTHOR ASSUMES NO LIABILITY FOR MISUSE, LEGAL VIOLATIONS, OR DAMAGES RESULTING FROM USE OF THIS TOOL.**

---

## 📂 Project Structure

```
osint-recon-tool/
│
├── index.html                  # Main application file (single-page app)
│   ├── HTML Structure          # Semantic markup
│   ├── Embedded CSS            # Complete styling
│   └── Embedded JavaScript     # All functionality
│
├── README.md                   # This comprehensive documentation
│
├── LICENSE                     # MIT License
│
├── screenshots/                # Visual documentation
│   ├── desktop-view.png        # Desktop interface screenshot
│   ├── mobile-view.png         # Mobile responsive view
│   ├── scan-results.png        # Results display example
│   ├── exported-report.png     # HTML report sample
│   └── logo.png                # Application logo
│
├── docs/                       # Additional documentation
│   ├── API-Integration.md      # Detailed API usage guide
│   ├── Features.md             # Complete feature documentation
│   ├── Legal-Compliance.md     # Legal guidelines and requirements
│   └── Deployment-Guide.md     # Hosting and deployment instructions
│
└── examples/                   # Sample outputs
    ├── example-report.html     # Sample exported report
    └── sample-findings.json    # Example scan results
```

### File Descriptions

- **index.html**: Complete single-page application (~1200 lines)
  - All HTML, CSS, and JavaScript in one file
  - No external dependencies required
  - Ready to deploy as-is

- **README.md**: Comprehensive project documentation
  - Setup and installation instructions
  - Usage guide and examples
  - Legal compliance information
  - Technical documentation

- **screenshots/**: Visual project documentation
  - Desktop and mobile views
  - Scan results examples
  - Exported report samples

---

## 🔧 Configuration

### API Endpoints Used

```javascript
// DNS Resolution (Google DNS API)
https://dns.google/resolve?name={domain}&type={type}
// Supported types: A, AAAA, MX, NS, TXT, CNAME

// IP Geolocation - Primary
https://ipapi.co/{ip}/json/
// Returns: country, region, city, coordinates, ISP, ASN

// IP Geolocation - Fallback
http://ip-api.com/json/{ip}
// Alternative when primary API rate limited

// Subdomain Discovery (Certificate Transparency)
https://crt.sh/?q=%.{domain}&output=json
// Returns: SSL certificate data for subdomains

// WHOIS Data (RDAP Protocol)
https://rdap.org/domain/{domain}
// Returns: registration data, registrar, dates

// CORS Proxy (For webpage fetching)
https://api.allorigins.win/raw?url={encoded_url}
// Allows cross-origin content retrieval
```

### Customizable Parameters

Modify these constants in the JavaScript section:

```javascript
// Scan Configuration
const SCAN_TIMEOUT = 30000;        // 30 seconds max per scan
const API_RETRY_ATTEMPTS = 3;      // Retry failed API calls 3 times
const API_RETRY_DELAY = 1000;      // 1 second between retries

// CORS Proxy Configuration
const CORS_PROXY_PRIMARY = 'https://api.allorigins.win/raw?url=';
const CORS_PROXY_FALLBACK = 'https://corsproxy.io/?';

// DNS Record Types to Query
const DNS_RECORD_TYPES = ['A', 'AAAA', 'MX', 'NS', 'TXT', 'CNAME'];

// Validation Settings
const URL_VALIDATION_TIMEOUT = 5000;  // 5 seconds for URL validation
const DNS_VALIDATION_ENABLED = true;   // Real-time DNS validation

// Export Configuration
const EXPORT_FILENAME_PREFIX = 'OSINT-Report';
const EXPORT_ANALYST_NAME = 'Shaik Jaleel Basha';

// UI Configuration
const LOGO_SIZE_DESKTOP = '140px';
const LOGO_SIZE_TABLET = '100px';
const LOGO_SIZE_MOBILE = '80px';
const GRADIENT_ANIMATION_DURATION = '45s';
```

---

## 🌐 Browser Support

### Desktop Browsers

| Browser | Minimum Version | Status | Notes |
|---------|----------------|--------|-------|
| **Google Chrome** | 90+ | ✅ Fully Supported | Recommended |
| **Mozilla Firefox** | 88+ | ✅ Fully Supported | Excellent performance |
| **Apple Safari** | 14+ | ✅ Fully Supported | macOS/iOS |
| **Microsoft Edge** | 90+ | ✅ Fully Supported | Chromium-based |
| **Opera** | 76+ | ✅ Fully Supported | Chromium-based |
| **Brave** | 1.24+ | ✅ Fully Supported | Privacy-focused |

### Mobile Browsers

| Browser | Minimum Version | Platform | Status |
|---------|----------------|----------|--------|
| **Safari Mobile** | iOS 14+ | iPhone/iPad | ✅ Fully Optimized |
| **Chrome Mobile** | 90+ | Android/iOS | ✅ Fully Optimized |
| **Firefox Mobile** | 88+ | Android/iOS | ✅ Fully Optimized |
| **Samsung Internet** | 14+ | Android | ✅ Fully Supported |
| **Edge Mobile** | 90+ | Android/iOS | ✅ Fully Supported |

### Required Browser Features

- ✅ ES6+ JavaScript support (async/await, Promises)
- ✅ Fetch API for network requests
- ✅ CSS Grid and Flexbox
- ✅ CSS Custom Properties (variables)
- ✅ DOMParser API for HTML parsing
- ✅ Blob API for export functionality
- ✅ Modern CSS animations and transitions

### Responsive Breakpoints Tested

- **320px** - iPhone SE (smallest mobile)
- **375px** - iPhone 12/13 (standard mobile)
- **390px** - iPhone 13 Pro
- **414px** - iPhone Plus models
- **768px** - iPad Mini (tablet portrait)
- **820px** - iPad Air
- **1024px** - iPad Pro (tablet landscape / small desktop)
- **1440px** - MacBook Air / HD Desktop
- **1920px** - Full HD Desktop

---

## 🐛 Known Limitations

### Technical Limitations

1. **CORS Restrictions**
   - Some websites block cross-origin requests even through proxy
   - Mitigation: Using multiple CORS proxy fallbacks
   - Impact: Contact extraction may fail on heavily protected sites

2. **API Rate Limits**
   - Free APIs have usage quotas (e.g., ipapi.co: 1,000/day)
   - Mitigation: Automatic fallback to alternative APIs
   - Impact: Geolocation may use secondary source after quota

3. **Client-Side Only Architecture**
   - No backend means limited active scanning capabilities
   - Cannot perform: Port scanning, vulnerability testing, brute force
   - Design Choice: Ensures legal compliance and passive reconnaissance

4. **DNS Caching**
   - Results may reflect cached DNS data (up to TTL duration)
   - Can show outdated records if recently changed
   - Recommendation: Compare with multiple DNS lookup tools

5. **Dynamic Content Analysis**
   - JavaScript-rendered content may not be fully captured
   - Single-page apps (SPAs) may have incomplete metadata
   - Limitation: No JavaScript execution engine in client-side tool

6. **Subdomain Discovery Completeness**
   - Certificate transparency logs may miss non-SSL subdomains
   - Internal/private subdomains won't appear in public logs
   - Passive method: Cannot discover all possible subdomains

### Security Considerations

7. **No Authentication**
   - Tool is publicly accessible (by design)
   - Anyone can use it for reconnaissance
   - Recommendation: Deploy with access controls if needed

8. **Data Privacy**
   - All processing happens client-side
   - No data stored or logged
   - Exported reports contain sensitive information - handle carefully

### Performance Constraints

9. **Large Scans**
   - Deep scans on large sites may take 60+ seconds
   - Browser may warn about unresponsive script
   - Mitigation: Optimized async processing, timeout limits

10. **Mobile Data Usage**
    - Multiple API calls consume data
    - Deep scans may use 1-2 MB of mobile data
    - Recommendation: Use Wi-Fi for comprehensive scans

---

## 🔮 Future Enhancements

### Planned Features (Roadmap)

#### Version 2.0 - Enhanced Reporting
- [ ] **PDF Export** - Generate professional PDF reports
- [ ] **JSON Export** - Machine-readable output format
- [ ] **CSV Export** - Spreadsheet-compatible results
- [ ] **Report Templates** - Customizable report layouts
- [ ] **Branding Options** - Custom logos and analyst names

#### Version 2.5 - Backend Integration
- [ ] **Backend API** - Node.js/Python backend for enhanced scanning
- [ ] **Database Storage** - PostgreSQL for scan history
- [ ] **User Authentication** - Login system with saved scans
- [ ] **Scheduled Scans** - Automated periodic reconnaissance
- [ ] **Scan Comparison** - Track changes over time

#### Version 3.0 - Advanced Capabilities
- [ ] **OWASP ZAP Integration** - Active vulnerability scanning
- [ ] **SQLmap API** - SQL injection testing capabilities
- [ ] **Nmap Integration** - Port scanning functionality
- [ ] **Custom Wordlists** - User-provided subdomain lists
- [ ] **Whois History** - Historical domain ownership tracking

#### Version 3.5 - User Experience
- [ ] **Dark/Light Theme Toggle** - User preference support
- [ ] **Multi-Language Support** - Internationalization (i18n)
- [ ] **Scan Profiles** - Save common scan configurations
- [ ] **Browser Extension** - One-click scanning from browser
- [ ] **Mobile App** - Native iOS/Android applications

#### Version 4.0 - Collaboration Features
- [ ] **Team Workspaces** - Shared scan repositories
- [ ] **Access Controls** - Role-based permissions
- [ ] **Audit Logging** - Track all reconnaissance activities
- [ ] **API Access** - RESTful API for integrations
- [ ] **Webhooks** - Real-time notifications

### Community Requests
- [ ] Integration with theHarvester for email harvesting
- [ ] Shodan API integration for IoT device discovery
- [ ] VirusTotal API for domain reputation checking
- [ ] Certificate expiry monitoring and alerts
- [ ] Automated OSINT report generation from multiple targets

---

## 🤝 Contributing

Contributions are welcome and appreciated! This project follows standard open-source contribution guidelines.

### How to Contribute

1. **Fork the Repository**
   ```bash
   # Click "Fork" button on GitHub
   # Clone your fork
   git clone https://github.com/YOUR_USERNAME/osint-recon-tool.git
   cd osint-recon-tool
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   # Or for bug fixes:
   git checkout -b bugfix/IssueName
   ```

3. **Make Your Changes**
   - Follow existing code style (monospace fonts, black theme)
   - Add comments for complex logic
   - Test on mobile, tablet, and desktop
   - Ensure no console errors

4. **Test Thoroughly**
   ```bash
   # Test on multiple browsers
   # Test responsive breakpoints (320px, 768px, 1024px, 1440px)
   # Test all reconnaissance modules
   # Test export functionality
   ```

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add: Brief description of feature"
   # Use prefixes: Add, Fix, Update, Remove, Refactor
   ```

6. **Push to Your Fork**
   ```bash
   git push origin feature/AmazingFeature
   ```

7. **Open a Pull Request**
   - Go to original repository
   - Click "New Pull Request"
   - Select your branch
   - Describe changes in detail

### Contribution Guidelines

#### Code Style
- Use **Courier New** monospace font for consistency
- Maintain **black (#000) and white (#fff)** color scheme
- Follow existing **indentation** (2 spaces)
- Add **comments** for non-obvious code
- Use **descriptive variable names** (no single letters)

#### Testing Requirements
- ✅ Test on Chrome, Firefox, Safari, Edge
- ✅ Test mobile (320px), tablet (768px), desktop (1024px+)
- ✅ Verify all API integrations work
- ✅ Confirm export functionality
- ✅ Check for console errors
- ✅ Validate responsive design

#### Documentation
- Update README if adding features
- Add inline code comments
- Document new API integrations
- Update configuration section if needed

#### Legal Compliance
- Ensure all contributions maintain ethical OSINT practices
- No active scanning or malicious features
- Maintain legal disclaimer and authorization requirements
- Respect privacy and data protection laws

### Types of Contributions Needed

- 🐛 **Bug Reports** - Issues with functionality
- 💡 **Feature Requests** - Ideas for enhancements
- 📝 **Documentation** - README improvements, guides
- 🎨 **UI/UX** - Design improvements (within black/white theme)
- 🔧 **Code** - Bug fixes, new features
- 🌍 **Translations** - Multi-language support
- 🧪 **Testing** - Browser compatibility, edge cases

### Code of Conduct

- Be respectful and professional
- Welcome newcomers and help them learn
- Provide constructive feedback
- Focus on the code, not the person
- Report unacceptable behavior

---

## 📄 License

This project is licensed under the **MIT License** - see full license text below.

```
MIT License

Copyright (c) 2025 Shaik Jaleel Basha

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### What This Means

✅ **You CAN:**
- Use the software for commercial purposes
- Modify the software
- Distribute the software
- Use the software privately
- Sublicense the software

✅ **You MUST:**
- Include the original copyright notice
- Include the MIT License text
- State significant changes made to the software

❌ **You CANNOT:**
- Hold the author liable for damages
- Use the author's name for endorsement without permission

### Third-Party Licenses

This project uses the following third-party services:
- **Google DNS API** - [Google Terms of Service](https://policies.google.com/terms)
- **ipapi.co** - [Terms of Use](https://ipapi.co/terms/)
- **ip-api.com** - [Terms of Service](http://ip-api.com/docs/legal)
- **crt.sh** - [Certificate Transparency](https://crt.sh/)
- **RDAP** - [RDAP Protocol](https://www.icann.org/rdap)
- **AllOrigins** - [GitHub Repository](https://github.com/gnuns/allorigins)

---

## 👨‍💻 Author

**Shaik Jaleel Basha**

Cybersecurity Enthusiast | Automation Tester 

- 🌐 **GitHub**: [Jaleeljb](https://github.com/Jaleeljb/)
- 💼 **LinkedIn**: [Jaleel Basha Shaik](https://www.linkedin.com/in/jaleel-basha-shaik-6a8056210/)
- 📧 **Email**: jaleel6jb@gmail.com

### About the Developer

Passionate cybersecurity professional specializing in OSINT, web application security, and ethical hacking. Currently seeking opportunities as a Security Analyst or Penetration Tester in India.

**Skills:**
- OSINT & Reconnaissance
- Web Application Security
- Automation Testing (Selenium, Java)
- Full-Stack Development (HTML, CSS, JavaScript, Python)
- Security Tools (OWASP ZAP, Burp Suite, Nmap, Nikto, Wireshark, Nessus)
- Networking TCP/IP, HTTPS, DNS, LAN/WAN, VPN
- Version Control Git & GitHub
- Operation System Windows, Macos, Linux & Ubuntu

**Certifications:**
- Cisco Introduction to Cybersecurity
- Cisco Networking Basics
- Deloitte Australia Cyber Job Simulation
- Tryhackme CompTIA Pentest+
- Tryhackme Red Teaming
- Certified Cybersecurity Educator Professional (CCEP) by Redteamleaders

**Other Projects:**
- Daily Breach - News portal for Cybersecurity Enthusiasts
- Web Reconaissance Strategic Playbook

---

### Frequently Asked Questions

**Q: Is this tool legal to use?**
A: Yes, when used on systems you own or have explicit authorization to test. See Legal & Ethical Use section.

**Q: Why are some results incomplete?**
A: API rate limits, CORS restrictions, or target security measures may limit data availability.

**Q: Can I use this for bug bounty hunting?**
A: Yes, within the scope defined by each bug bounty program. Always follow program rules.

**Q: Does this tool work offline?**
A: No, it requires internet connection for API calls.

**Q: Can I customize the appearance?**
A: Yes, modify the CSS variables in the index.html file.

**Q: Is my scan data stored anywhere?**
A: No, all processing happens client-side. Nothing is logged or stored.

---

**Built with ❤️ for the cybersecurity community**

*Remember: With great power comes great responsibility. Use ethically and legally.*

---

**Last Updated**: November 20, 2025 | **Version**: 1.0.0 | **Status**: Production Ready

**⚖️ Legal Reminder**: This tool is for authorized security research only. Always obtain proper authorization before scanning any target system. Unauthorized access is illegal and unethical.
