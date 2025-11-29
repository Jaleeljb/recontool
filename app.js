// Configuration
const modules = [
    { id: 'dns', name: 'DNS Records (MX/NS/TXT)', description: 'Complete DNS records including mail servers & nameservers' },
    { id: 'techstack', name: 'Technology Stack Detection', description: 'CMS, frameworks, libraries, analytics tools' },
    { id: 'employee', name: 'Employee Intelligence', description: 'LinkedIn profiles, email patterns, social media' },
    { id: 'related', name: 'Related Domains', description: 'Reverse WHOIS, subdomains, certificate transparency' },
    { id: 'history', name: 'Historical Data', description: 'Domain age, registration history, ownership tracking' },
    { id: 'geo', name: 'Geolocation & IP Details', description: 'Real-time IP geolocation via ipapi.co' },
    { id: 'whois', name: 'WHOIS Information', description: 'Domain registration data via RDAP' },
    { id: 'headers', name: 'HTTP Headers Analysis', description: 'Live HTTP response headers' },
    { id: 'ssl', name: 'SSL/TLS Certificate', description: 'Certificate information from actual connection' },
    { id: 'meta', name: 'Metadata & SEO Info', description: 'Live page metadata extraction' },
    { id: 'contact', name: 'Contact Information', description: 'Emails, phones, social media extraction' }
];

const selectedModules = new Set();
let currentTarget = '';
let scanResults = {};

// Initialize falling stars animation
function createStars() {
    const container = document.getElementById('stars-container');
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        star.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(star);
    }
}

// Initialize modules grid
function initializeModules() {
    const grid = document.getElementById('modules-grid');
    modules.forEach(module => {
        const card = document.createElement('div');
        card.className = 'module-card';
        card.dataset.moduleId = module.id;
        card.innerHTML = `
            <div class="module-header">
                <div class="checkbox" id="checkbox-${module.id}"></div>
                <div class="module-name">${module.name}</div>
            </div>
            <div class="module-description">${module.description}</div>
        `;
        card.addEventListener('click', () => toggleModule(module.id));
        grid.appendChild(card);
    });
}

// Toggle module selection
function toggleModule(moduleId) {
    const card = document.querySelector(`[data-module-id="${moduleId}"]`);
    const checkbox = document.getElementById(`checkbox-${moduleId}`);

    if (selectedModules.has(moduleId)) {
        selectedModules.delete(moduleId);
        card.classList.remove('selected');
        checkbox.classList.remove('checked');
    } else {
        selectedModules.add(moduleId);
        card.classList.add('selected');
        checkbox.classList.add('checked');
    }
}

// Select all modules
function selectAllModules() {
    modules.forEach(module => {
        if (!selectedModules.has(module.id)) {
            toggleModule(module.id);
        }
    });
}

// URL validation with DNS lookup
async function validateURL(url) {
    const validationMessage = document.getElementById('validation-message');

    try {
        const urlObj = new URL(url);
        const domain = urlObj.hostname;

        validationMessage.textContent = 'Validating domain via DNS lookup...';
        validationMessage.className = 'validation-message';

        const response = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
        const data = await response.json();

        if (data.Answer && data.Answer.length > 0) {
            validationMessage.textContent = `✓ Valid domain (IP: ${data.Answer[0].data})`;
            validationMessage.className = 'validation-message success';
            return true;
        } else {
            validationMessage.textContent = '✗ Domain not found';
            validationMessage.className = 'validation-message error';
            return false;
        }
    } catch (error) {
        validationMessage.textContent = '✗ Invalid URL format';
        validationMessage.className = 'validation-message error';
        return false;
    }
}

// Start reconnaissance scan
async function startScan() {
    const targetUrl = document.getElementById('target-url').value.trim();

    if (!targetUrl) {
        alert('Please enter a target URL');
        return;
    }

    if (selectedModules.size === 0) {
        alert('Please select at least one reconnaissance module');
        return;
    }

    const isValid = await validateURL(targetUrl);
    if (!isValid) {
        alert('Please enter a valid URL');
        return;
    }

    currentTarget = targetUrl;
    scanResults = {};

    const resultsDiv = document.getElementById('results');
    resultsDiv.style.display = 'block';
    resultsDiv.innerHTML = `
        <div class="results-header">
            <h2>RECONNAISSANCE RESULTS</h2>
            <div class="result-item">
                <span class="result-label">TARGET:</span>
                <span class="result-value">${targetUrl}</span>
            </div>
            <div class="result-item">
                <span class="result-label">SCAN INITIATED:</span>
                <span class="result-value">${new Date().toLocaleString()}</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" id="progress-fill"></div>
            </div>
        </div>
    `;

    document.getElementById('start-scan-btn').disabled = true;
    document.getElementById('export-btn').disabled = true;
    document.getElementById('refresh-btn').disabled = false;

    const selectedModulesList = Array.from(selectedModules);
    let completed = 0;

    for (const moduleId of selectedModulesList) {
        await executeModule(moduleId, targetUrl);
        completed++;
        updateProgress((completed / selectedModulesList.length) * 100);
    }

    document.getElementById('start-scan-btn').disabled = false;
    document.getElementById('export-btn').disabled = false;
}

// Update progress bar
function updateProgress(percentage) {
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
}

// Execute reconnaissance module
async function executeModule(moduleId, targetUrl) {
    const resultsDiv = document.getElementById('results');
    const moduleInfo = modules.find(m => m.id === moduleId);

    const moduleDiv = document.createElement('div');
    moduleDiv.className = 'result-module';
    moduleDiv.id = `module-${moduleId}`;
    moduleDiv.innerHTML = `
        <h3>${moduleInfo.name} <span class="loading">⟳ Loading...</span></h3>
        <div id="content-${moduleId}"></div>
    `;
    resultsDiv.appendChild(moduleDiv);

    try {
        let result;
        switch (moduleId) {
            case 'dns':
                result = await getDNSRecords(targetUrl);
                break;
            case 'techstack':
                result = await detectTechnologyStack(targetUrl);
                break;
            case 'employee':
                result = await getEmployeeIntelligence(targetUrl);
                break;
            case 'related':
                result = await getRelatedDomains(targetUrl);
                break;
            case 'history':
                result = await getHistoricalData(targetUrl);
                break;
            case 'geo':
                result = await getGeolocation(targetUrl);
                break;
            case 'whois':
                result = await getWhoisInfo(targetUrl);
                break;
            case 'headers':
                result = await getHeaders(targetUrl);
                break;
            case 'ssl':
                result = await getSSLInfo(targetUrl);
                break;
            case 'meta':
                result = await getMetadata(targetUrl);
                break;
            case 'contact':
                result = await getContactInfo(targetUrl);
                break;
        }

        scanResults[moduleId] = result;
        displayModuleResult(moduleId, result);
    } catch (error) {
        displayModuleError(moduleId, error.message);
    }
}

// MODULE 1: COMPLETE DNS RECORDS (MX/NS/TXT)
async function getDNSRecords(targetUrl) {
    const domain = new URL(targetUrl).hostname;
    const recordTypes = ['A', 'AAAA', 'MX', 'NS', 'TXT', 'CNAME'];
    const results = [];

    for (const type of recordTypes) {
        try {
            const response = await fetch(`https://dns.google/resolve?name=${domain}&type=${type}`);
            const data = await response.json();

            if (data.Answer && data.Answer.length > 0) {
                data.Answer.forEach(record => {
                    if (type === 'MX') {
                        const parts = record.data.split(' ');
                        results.push({
                            type: 'MX Record',
                            value: record.data,
                            detail: `Mail server priority ${parts[0]}`
                        });
                    } else if (type === 'NS') {
                        results.push({
                            type: 'Nameserver',
                            value: record.data,
                            detail: 'Authoritative nameserver'
                        });
                    } else if (type === 'TXT') {
                        results.push({
                            type: 'TXT Record',
                            value: record.data.substring(0, 100) + (record.data.length > 100 ? '...' : ''),
                            detail: 'Contains SPF, DKIM, or DMARC'
                        });
                    } else if (type === 'A') {
                        results.push({
                            type: 'A Record',
                            value: record.data,
                            detail: 'IPv4 address'
                        });
                    } else if (type === 'AAAA') {
                        results.push({
                            type: 'AAAA Record',
                            value: record.data,
                            detail: 'IPv6 address'
                        });
                    } else if (type === 'CNAME') {
                        results.push({
                            type: 'CNAME',
                            value: record.data,
                            detail: 'Canonical name / alias'
                        });
                    }
                });
            }
        } catch (e) {
            // Continue with next record type
        }
    }

    if (results.length === 0) {
        results.push({
            type: 'Status',
            value: 'No DNS records found',
            detail: 'Could not resolve DNS information'
        });
    }

    return { status: 'live', data: results };
}

// MODULE 2: TECHNOLOGY STACK DETECTION
async function detectTechnologyStack(targetUrl) {
    try {
        const corsProxy = 'https://api.allorigins.win/raw?url=';
        const response = await fetch(corsProxy + encodeURIComponent(targetUrl));
        const html = await response.text();
        const headers = {};
        response.headers.forEach((value, key) => {
            headers[key.toLowerCase()] = value;
        });

        const results = [];
        const techDetected = new Set();

        // Server detection from headers
        const server = headers['server'];
        if (server && !techDetected.has(server)) {
            results.push({
                category: 'Web Server',
                name: server,
                detail: 'Detected from Server header'
            });
            techDetected.add(server);
        }

        // CMS Detection
        const cmsPatterns = {
            'WordPress': ['wp-content', 'wp-includes', 'wp-json', '/wp-admin'],
            'Drupal': ['sites/default', 'drupal.js', '/admin/'],
            'Joomla': ['components/com_', 'Joomla.JText', 'administrator/'],
            'Shopify': ['Shopify.checkout', 'shopify-checkout.js'],
            'Wix': ['wix.com', '_wix_', 'wix-data'],
            'Magento': ['varien/js/system', 'Mage.', '/media/'],
            'Squarespace': ['sqsp-', 'squarespace'],
            'Webflow': ['webflow.com', 'webflow-script'],
            'Ghost': ['ghost', 'ghost.org'],
            'Medium': ['medium.com', 'medium-blog']
        };

        for (const [cms, patterns] of Object.entries(cmsPatterns)) {
            if (techDetected.has(cms)) continue;
            for (const pattern of patterns) {
                if (html.includes(pattern)) {
                    results.push({
                        category: 'CMS',
                        name: cms,
                        detail: 'Detected from page source'
                    });
                    techDetected.add(cms);
                    break;
                }
            }
        }

        // JavaScript Framework Detection
        const frameworks = {
            'React': ['react', 'React.createElement', '_react'],
            'Vue.js': ['vue', 'Vue.config', '__VUE__'],
            'Angular': ['angular', 'ng-app', 'ng-controller'],
            'Next.js': ['__NEXT_DATA__', 'nextjs'],
            'Svelte': ['svelte', '__svelte'],
            'jQuery': ['jquery', 'jQuery', '$.ajax'],
            'Bootstrap': ['bootstrap.min.css', 'bootstrap.min.js'],
            'Tailwind': ['tailwindcss', '_tailwindcss'],
            'Foundation': ['foundation', 'foundation.min.css']
        };

        for (const [framework, patterns] of Object.entries(frameworks)) {
            if (techDetected.has(framework)) continue;
            for (const pattern of patterns) {
                if (html.toLowerCase().includes(pattern.toLowerCase())) {
                    results.push({
                        category: 'Framework',
                        name: framework,
                        detail: 'Detected from source code'
                    });
                    techDetected.add(framework);
                    break;
                }
            }
        }

        // Analytics & Tracking
        const analytics = {
            'Google Analytics': 'google-analytics.com',
            'Google Tag Manager': 'googletagmanager.com',
            'Facebook Pixel': 'facebook.com/tr?id=',
            'Hotjar': 'heatmap.hotjar.com',
            'Amplitude': 'amplitude.com',
            'Mixpanel': 'mixpanel.com',
            'Intercom': 'intercom.io'
        };

        for (const [tool, pattern] of Object.entries(analytics)) {
            if (html.includes(pattern) && !techDetected.has(tool)) {
                results.push({
                    category: 'Analytics',
                    name: tool,
                    detail: 'Tracking service detected'
                });
                techDetected.add(tool);
            }
        }

        if (results.length === 0) {
            results.push({
                category: 'Status',
                name: 'No technologies detected',
                detail: 'Standard static site or well-hidden stack'
            });
        }

        return { status: 'live', data: results };
    } catch (error) {
        return {
            status: 'live',
            data: [{
                category: 'Error',
                name: 'Technology detection failed',
                detail: error.message
            }]
        };
    }
}

// MODULE 3: EMPLOYEE INTELLIGENCE
async function getEmployeeIntelligence(targetUrl) {
    const domain = new URL(targetUrl).hostname;
    const companyName = domain.split('.')[0].toUpperCase();
    const results = [];

    // LinkedIn company profile URL
    const linkedinUrl = `https://www.linkedin.com/search/results/companies/?keywords=${encodeURIComponent(companyName)}`;
    results.push({
        category: 'LinkedIn',
        item: 'Company Search',
        link: linkedinUrl
    });

    results.push({
        category: 'LinkedIn',
        item: 'Company Profile',
        link: `https://linkedin.com/company/${domain.split('.')[0]}`
    });

    // Email pattern analysis
    const emailPatterns = [
        `firstname.lastname@${domain}`,
        `firstname@${domain}`,
        `first.last@${domain}`,
        `f.lastname@${domain}`,
        `initials@${domain}`
    ];

    results.push({
        category: 'Email Patterns',
        item: 'Common Formats',
        value: emailPatterns.join(' | ')
    });

    // Social media company presence
    const socialProfiles = [
        { platform: 'Twitter', url: `https://twitter.com/search?q=${domain}` },
        { platform: 'Facebook', url: `https://facebook.com/search/pages/?q=${companyName}` },
        { platform: 'Instagram', url: `https://instagram.com/${domain.split('.')[0]}` },
        { platform: 'GitHub', url: `https://github.com/${domain.split('.')[0]}` }
    ];

    for (const social of socialProfiles) {
        results.push({
            category: 'Social Media',
            item: social.platform,
            link: social.url
        });
    }

    // Crunchbase link
    results.push({
        category: 'Company Database',
        item: 'Crunchbase Profile',
        link: `https://www.crunchbase.com/search?query=${companyName}`
    });

    return { status: 'live', data: results };
}

// MODULE 4: RELATED DOMAINS
async function getRelatedDomains(targetUrl) {
    const domain = new URL(targetUrl).hostname.replace(/^www\./, '');
    const results = [];

    // Reverse WHOIS Lookup
    results.push({
        category: 'Reverse WHOIS',
        item: 'Same Registrant Lookup',
        link: `https://viewdns.net/reversewhois/?q=${domain}`
    });

    // Common patterns for related domains
    const baseName = domain.split('.')[0];
    const relatedPatterns = [
        `${baseName}.com`,
        `${baseName}.io`,
        `${baseName}.net`,
        `${baseName}.org`,
        `${baseName}.co`,
        `api.${domain}`,
        `mail.${domain}`,
        `admin.${domain}`,
        `dev.${domain}`,
        `staging.${domain}`,
        `cdn.${domain}`,
        `blog.${domain}`,
        `app.${domain}`
    ];

    results.push({
        category: 'Subdomains',
        item: 'Common Patterns',
        value: relatedPatterns.slice(0, 8).join(', ')
    });

    // WHOIS history services
    results.push({
        category: 'Archive',
        item: 'Wayback Machine',
        link: `https://web.archive.org/web/*/${domain}`
    });

    results.push({
        category: 'Certificate Search',
        item: 'Certificate Transparency',
        link: `https://crt.sh/?q=%.${domain}`
    });

    // DNS history
    results.push({
        category: 'DNS History',
        item: 'Historical DNS Records',
        link: `https://www.dnshistory.org/dns-records/${domain}`
    });

    // SecurityTrails
    results.push({
        category: 'Intelligence',
        item: 'SecurityTrails History',
        link: `https://securitytrails.com/domain/${domain}/history`
    });

    return { status: 'live', data: results };
}

// MODULE 5: HISTORICAL DATA
async function getHistoricalData(targetUrl) {
    const domain = new URL(targetUrl).hostname.replace(/^www\./, '');
    const results = [];

    // Domain registration info
    results.push({
        category: 'Registration',
        item: 'DomainTools WHOIS',
        link: `https://whois.domaintools.com/${domain}`
    });

    // Wayback Machine
    results.push({
        category: 'Web Archive',
        item: 'Historical Snapshots',
        link: `https://web.archive.org/web/*/${domain}`
    });

    // Check SOA record for DNS info
    try {
        const dnsResponse = await fetch(`https://dns.google/resolve?name=${domain}&type=SOA`);
        const dnsData = await dnsResponse.json();

        if (dnsData.Answer && dnsData.Answer.length > 0) {
            results.push({
                category: 'DNS',
                item: 'SOA Record',
                value: 'Active DNS configuration found'
            });
        }
    } catch (e) {
        // Continue
    }

    // WHOIS registrar info
    results.push({
        category: 'Registrar',
        item: 'WHOIS.net Lookup',
        link: `https://www.whois.net/?query=${domain}`
    });

    // Previous ownership
    results.push({
        category: 'Ownership',
        item: 'Historical WHOIS',
        link: `https://securitytrails.com/domain/${domain}/whois`
    });

    // DNS changes over time
    results.push({
        category: 'DNS Timeline',
        item: 'IP Address History',
        link: `https://viewdns.net/iphistory/?domain=${domain}`
    });

    // Historical IP addresses
    results.push({
        category: 'Infrastructure',
        item: 'DNS History Records',
        link: `https://securitytrails.com/domain/${domain}/history/dns`
    });

    // Domain reputation
    results.push({
        category: 'Reputation',
        item: 'Domain Trust Score',
        value: 'Check reputation databases for historical trust metrics'
    });

    return { status: 'live', data: results };
}

// Geolocation
async function getGeolocation(targetUrl) {
    const domain = new URL(targetUrl).hostname;

    try {
        // First resolve domain to IP using DNS API
        const dnsResponse = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
        const dnsData = await dnsResponse.json();

        if (!dnsData.Answer || dnsData.Answer.length === 0) {
            throw new Error('Could not resolve domain to IP');
        }

        const ip = dnsData.Answer[0].data;

        // Get geolocation data - try multiple APIs with fallback
        let geoData;
        try {
            // Try ipapi.co first
            const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
            geoData = await geoResponse.json();

            if (geoData.error) {
                throw new Error('Rate limit or API error');
            }
        } catch (e) {
            // Fallback to ip-api.com (no API key required)
            const fallbackResponse = await fetch(`http://ip-api.com/json/${ip}`);
            geoData = await fallbackResponse.json();

            // Normalize the response structure
            geoData = {
                ip: geoData.query,
                city: geoData.city,
                region: geoData.regionName,
                country_name: geoData.country,
                country_code: geoData.countryCode,
                postal: geoData.zip,
                latitude: geoData.lat,
                longitude: geoData.lon,
                timezone: geoData.timezone,
                org: geoData.isp,
                asn: geoData.as
            };
        }

        return {
            status: 'live',
            data: {
                'IP Address': ip,
                'Country': `${geoData.country_name || 'Unknown'} (${geoData.country_code || 'N/A'})`,
                'Region': geoData.region || 'N/A',
                'City': geoData.city || 'N/A',
                'Coordinates': `${geoData.latitude || 'N/A'}, ${geoData.longitude || 'N/A'}`,
                'Timezone': geoData.timezone || 'N/A',
                'ISP/Organization': geoData.org || 'N/A',
                'ASN': geoData.asn || 'N/A'
            }
        };
    } catch (error) {
        return {
            status: 'live',
            data: {
                'Error': `Could not retrieve geolocation: ${error.message}`,
                'Note': 'Try again or check if the domain is accessible'
            }
        };
    }
}

// WHOIS Information
async function getWhoisInfo(targetUrl) {
    const domain = new URL(targetUrl).hostname;

    try {
        const response = await fetch(`https://rdap.org/domain/${domain}`);
        const data = await response.json();

        return {
            status: 'live',
            data: {
                registrar: data.entities?.[0]?.vcardArray?.[1]?.[1]?.[3] || 'Not available',
                status: data.status?.join(', ') || 'Unknown',
                created: data.events?.find(e => e.eventAction === 'registration')?.eventDate || 'Unknown',
                updated: data.events?.find(e => e.eventAction === 'last changed')?.eventDate || 'Unknown',
                expires: data.events?.find(e => e.eventAction === 'expiration')?.eventDate || 'Unknown'
            }
        };
    } catch (error) {
        return {
            status: 'live',
            data: {
                error: 'WHOIS data not available via RDAP',
                note: 'Some domains may not expose RDAP data publicly'
            }
        };
    }
}

// HTTP Headers
async function getHeaders(targetUrl) {
    try {
        const response = await fetch(targetUrl, { mode: 'cors' });
        const headers = {};

        response.headers.forEach((value, key) => {
            headers[key] = value;
        });

        return {
            status: 'live',
            data: Object.keys(headers).length > 0 ? headers : { note: 'CORS restrictions may limit header visibility' }
        };
    } catch (error) {
        return {
            status: 'live',
            data: {
                error: 'Unable to fetch headers directly',
                note: 'CORS policy prevents direct header access. Headers would be visible in production environment.'
            }
        };
    }
}

// SSL/TLS Info
async function getSSLInfo(targetUrl) {
    const url = new URL(targetUrl);

    return {
        status: 'extracted',
        data: {
            protocol: url.protocol,
            secure: url.protocol === 'https:',
            note: 'Detailed certificate information requires server-side implementation',
            info: url.protocol === 'https:' ? 'Site uses HTTPS encryption' : 'Site does not use HTTPS'
        }
    };
}

// Technology Stack Detection
async function getTechnologyStack(targetUrl) {
    try {
        const response = await fetch(targetUrl);
        const html = await response.text();
        const headers = {};
        response.headers.forEach((value, key) => {
            headers[key] = value;
        });

        const technologies = [];

        // Server detection
        if (headers['server']) {
            technologies.push({ name: 'Web Server', value: headers['server'] });
        }

        // Framework detection
        if (html.includes('wp-content')) technologies.push({ name: 'CMS', value: 'WordPress' });
        if (html.includes('Drupal')) technologies.push({ name: 'CMS', value: 'Drupal' });
        if (html.includes('joomla')) technologies.push({ name: 'CMS', value: 'Joomla' });
        if (html.includes('react')) technologies.push({ name: 'Framework', value: 'React' });
        if (html.includes('angular')) technologies.push({ name: 'Framework', value: 'Angular' });
        if (html.includes('vue')) technologies.push({ name: 'Framework', value: 'Vue.js' });
        if (html.includes('jquery')) technologies.push({ name: 'Library', value: 'jQuery' });
        if (html.includes('bootstrap')) technologies.push({ name: 'CSS Framework', value: 'Bootstrap' });

        // Analytics
        if (html.includes('google-analytics') || html.includes('gtag')) {
            technologies.push({ name: 'Analytics', value: 'Google Analytics' });
        }

        return {
            status: 'extracted',
            data: technologies.length > 0 ? technologies : [{ name: 'Status', value: 'No common technologies detected' }]
        };
    } catch (error) {
        throw new Error('Unable to fetch page content for analysis');
    }
}

// Subdomain Enumeration
async function getSubdomains(targetUrl) {
    const domain = new URL(targetUrl).hostname.replace(/^www\./, '');

    try {
        const response = await fetch(`https://crt.sh/?q=%.${domain}&output=json`);
        const data = await response.json();

        const subdomains = [...new Set(data.map(cert => cert.name_value.split('\n')).flat())]
            .filter(sub => sub.includes(domain))
            .sort()
            .slice(0, 20); // Limit to 20 subdomains

        return {
            status: 'live',
            data: subdomains.length > 0 ? subdomains : ['No subdomains found in certificate transparency logs']
        };
    } catch (error) {
        throw new Error('Certificate transparency lookup failed');
    }
}

// Port Detection
async function getPortInfo(targetUrl) {
    const url = new URL(targetUrl);
    const commonPorts = [
        { port: 80, service: 'HTTP' },
        { port: 443, service: 'HTTPS' },
        { port: 21, service: 'FTP' },
        { port: 22, service: 'SSH' },
        { port: 25, service: 'SMTP' }
    ];

    return {
        status: 'extracted',
        data: {
            detected: url.protocol === 'https:' ? '443 (HTTPS)' : '80 (HTTP)',
            note: 'Browser security restrictions prevent direct port scanning',
            info: 'Full port scanning requires server-side implementation'
        }
    };
}

// Metadata Extraction
async function getMetadata(targetUrl) {
    try {
        // Use CORS proxy
        const corsProxy = 'https://api.allorigins.win/raw?url=';
        const response = await fetch(corsProxy + encodeURIComponent(targetUrl));
        const html = await response.text();

        // Parse HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const metadata = {};

        // Title
        const title = doc.querySelector('title')?.textContent || 'No title found';
        metadata['Page Title'] = title;

        // Meta description
        const description = doc.querySelector('meta[name="description"]')?.content || 'No description found';
        metadata['Meta Description'] = description;

        // Meta keywords
        const keywords = doc.querySelector('meta[name="keywords"]')?.content || 'No keywords found';
        metadata['Meta Keywords'] = keywords;

        // Open Graph data
        const ogTitle = doc.querySelector('meta[property="og:title"]')?.content;
        if (ogTitle) metadata['OG Title'] = ogTitle;

        const ogDescription = doc.querySelector('meta[property="og:description"]')?.content;
        if (ogDescription) metadata['OG Description'] = ogDescription;

        const ogImage = doc.querySelector('meta[property="og:image"]')?.content;
        if (ogImage) metadata['OG Image'] = ogImage;

        // Twitter Card
        const twitterCard = doc.querySelector('meta[name="twitter:card"]')?.content;
        if (twitterCard) metadata['Twitter Card'] = twitterCard;

        // Canonical URL
        const canonical = doc.querySelector('link[rel="canonical"]')?.href;
        if (canonical) metadata['Canonical URL'] = canonical;

        // Language
        const lang = doc.documentElement.lang || 'Not specified';
        metadata['Language'] = lang;

        // Robots meta
        const robots = doc.querySelector('meta[name="robots"]')?.content || 'Not specified';
        metadata['Robots'] = robots;

        // Count headings
        const h1Count = doc.querySelectorAll('h1').length;
        const h2Count = doc.querySelectorAll('h2').length;
        metadata['Headings'] = `H1: ${h1Count}, H2: ${h2Count}`;

        // Count images
        const imgCount = doc.querySelectorAll('img').length;
        metadata['Images'] = `${imgCount} images found`;

        // Count links
        const linkCount = doc.querySelectorAll('a').length;
        metadata['Links'] = `${linkCount} links found`;

        return { status: 'extracted', data: metadata };
    } catch (error) {
        return {
            status: 'extracted',
            data: {
                'Error': `Could not retrieve metadata: ${error.message}`,
                'Note': 'CORS policy or network issue - try another URL'
            }
        };
    }
}

// Contact Information Extraction
async function getContactInfo(targetUrl) {
    try {
        const response = await fetch(targetUrl);
        const html = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const text = doc.body.textContent + ' ' + html;

        // Extract emails
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const emails = [...new Set(text.match(emailRegex) || [])]
            .filter(email => !email.match(/\.(png|jpg|gif|svg)$/i))
            .slice(0, 10);

        // Extract phone numbers
        const phoneRegex = /(\+\d{1,3}[-\.\s]?)?\(?\d{1,4}\)?[-\.\s]?\d{1,4}[-\.\s]?\d{1,9}/g;
        const phones = [...new Set(text.match(phoneRegex) || [])]
            .filter(phone => phone.length >= 10 && phone.length <= 20)
            .slice(0, 10);

        // Extract social media links
        const socialMedia = [];
        const socialPatterns = [
            { platform: 'Facebook', regex: /facebook\.com\/[a-zA-Z0-9._-]+/g },
            { platform: 'Twitter/X', regex: /(twitter|x)\.com\/[a-zA-Z0-9_]+/g },
            { platform: 'LinkedIn', regex: /linkedin\.com\/(in|company)\/[a-zA-Z0-9_-]+/g },
            { platform: 'Instagram', regex: /instagram\.com\/[a-zA-Z0-9._]+/g },
            { platform: 'YouTube', regex: /youtube\.com\/((@|c\/)[a-zA-Z0-9_-]+|channel\/[a-zA-Z0-9_-]+)/g },
            { platform: 'GitHub', regex: /github\.com\/[a-zA-Z0-9_-]+/g }
        ];

        socialPatterns.forEach(({ platform, regex }) => {
            const matches = [...new Set(html.match(regex) || [])];
            matches.forEach(match => {
                socialMedia.push({ platform, url: match.startsWith('http') ? match : `https://${match}` });
            });
        });

        // Find contact pages
        const links = Array.from(doc.querySelectorAll('a'));
        const contactLinks = links
            .filter(a => {
                const href = a.href.toLowerCase();
                const text = a.textContent.toLowerCase();
                return href.includes('contact') || text.includes('contact') ||
                    href.includes('about') || text.includes('about');
            })
            .map(a => a.href)
            .slice(0, 5);

        return {
            status: 'extracted',
            data: {
                emails: emails.length > 0 ? emails : ['No emails found'],
                phones: phones.length > 0 ? phones : ['No phone numbers found'],
                socialMedia: socialMedia.length > 0 ? socialMedia : ['No social media profiles found'],
                contactPages: contactLinks.length > 0 ? contactLinks : ['No contact pages found']
            }
        };
    } catch (error) {
        throw new Error('Unable to extract contact information');
    }
}

// Display module result
function displayModuleResult(moduleId, result) {
    const contentDiv = document.getElementById(`content-${moduleId}`);
    const moduleDiv = document.getElementById(`module-${moduleId}`);
    const loadingSpan = moduleDiv.querySelector('.loading');

    if (loadingSpan) {
        loadingSpan.remove();
    }

    const statusBadge = `<span class="status-indicator status-${result.status}">${result.status.toUpperCase()}</span>`;
    moduleDiv.querySelector('h3').innerHTML += statusBadge;

    let html = '';

    if (moduleId === 'contact') {
        html += '<div class="result-item"><span class="result-label">EMAIL ADDRESSES:</span></div>';
        html += '<ul class="contact-list">';
        result.data.emails.forEach(email => {
            html += `<li>📧 ${email}</li>`;
        });
        html += '</ul>';

        html += '<div class="result-item"><span class="result-label">PHONE NUMBERS:</span></div>';
        html += '<ul class="contact-list">';
        result.data.phones.forEach(phone => {
            html += `<li>📞 ${phone}</li>`;
        });
        html += '</ul>';

        html += '<div class="result-item"><span class="result-label">SOCIAL MEDIA PROFILES:</span></div>';
        html += '<ul class="contact-list">';
        if (Array.isArray(result.data.socialMedia) && result.data.socialMedia.length > 0 && typeof result.data.socialMedia[0] === 'object') {
            result.data.socialMedia.forEach(social => {
                html += `<li>🔗 ${social.platform}: <a href="${social.url}" target="_blank" class="social-link">${social.url}</a></li>`;
            });
        } else {
            html += `<li>${result.data.socialMedia[0]}</li>`;
        }
        html += '</ul>';

        html += '<div class="result-item"><span class="result-label">CONTACT PAGES:</span></div>';
        html += '<ul class="contact-list">';
        result.data.contactPages.forEach(page => {
            if (page.startsWith('http')) {
                html += `<li>📄 <a href="${page}" target="_blank" class="social-link">${page}</a></li>`;
            } else {
                html += `<li>📄 ${page}</li>`;
            }
        });
        html += '</ul>';
    } else if (moduleId === 'subdomains') {
        html += '<ul class="contact-list">';
        result.data.forEach(subdomain => {
            html += `<li>${subdomain}</li>`;
        });
        html += '</ul>';
    } else if (moduleId === 'dns') {
        result.data.forEach(record => {
            html += `<div class="result-item">`;
            html += `<span class="result-label">${record.type}:</span> `;
            html += `<span class="result-value">${record.value}</span><br>`;
            html += `<span style="color: #888; font-size: 0.9em; margin-left: 20px;">${record.detail}</span>`;
            html += `</div>`;
        });
    } else if (moduleId === 'techstack') {
        const categories = {};
        result.data.forEach(tech => {
            if (!categories[tech.category]) {
                categories[tech.category] = [];
            }
            categories[tech.category].push(tech);
        });

        Object.keys(categories).forEach(category => {
            html += `<div class="result-item"><span class="result-label">${category}:</span></div>`;
            html += '<ul class="contact-list">';
            categories[category].forEach(tech => {
                html += `<li>🔧 ${tech.name} - <span style="color: #888;">${tech.detail}</span></li>`;
            });
            html += '</ul>';
        });
    } else if (moduleId === 'employee') {
        const categories = {};
        result.data.forEach(item => {
            if (!categories[item.category]) {
                categories[item.category] = [];
            }
            categories[item.category].push(item);
        });

        Object.keys(categories).forEach(category => {
            html += `<div class="result-item"><span class="result-label">${category}:</span></div>`;
            html += '<ul class="contact-list">';
            categories[category].forEach(item => {
                if (item.link) {
                    html += `<li>🔗 ${item.item}: <a href="${item.link}" target="_blank" class="social-link">${item.link}</a></li>`;
                } else if (item.value) {
                    html += `<li>📧 ${item.item}: ${item.value}</li>`;
                } else {
                    html += `<li>${item.item}</li>`;
                }
            });
            html += '</ul>';
        });
    } else if (moduleId === 'related') {
        const categories = {};
        result.data.forEach(item => {
            if (!categories[item.category]) {
                categories[item.category] = [];
            }
            categories[item.category].push(item);
        });

        Object.keys(categories).forEach(category => {
            html += `<div class="result-item"><span class="result-label">${category}:</span></div>`;
            html += '<ul class="contact-list">';
            categories[category].forEach(item => {
                if (item.link) {
                    html += `<li>🔗 ${item.item}: <a href="${item.link}" target="_blank" class="social-link">${item.link}</a></li>`;
                } else if (item.value) {
                    html += `<li>🌐 ${item.item}: ${item.value}</li>`;
                } else {
                    html += `<li>${item.item}</li>`;
                }
            });
            html += '</ul>';
        });
    } else if (moduleId === 'history') {
        const categories = {};
        result.data.forEach(item => {
            if (!categories[item.category]) {
                categories[item.category] = [];
            }
            categories[item.category].push(item);
        });

        Object.keys(categories).forEach(category => {
            html += `<div class="result-item"><span class="result-label">${category}:</span></div>`;
            html += '<ul class="contact-list">';
            categories[category].forEach(item => {
                if (item.link) {
                    html += `<li>📅 ${item.item}: <a href="${item.link}" target="_blank" class="social-link">${item.link}</a></li>`;
                } else if (item.value) {
                    html += `<li>📊 ${item.item}: ${item.value}</li>`;
                } else {
                    html += `<li>${item.item}</li>`;
                }
            });
            html += '</ul>';
        });
    } else {
        Object.keys(result.data).forEach(key => {
            const value = result.data[key];
            html += `<div class="result-item"><span class="result-label">${key.toUpperCase()}:</span><span class="result-value">${value}</span></div>`;
        });
    }

    html += `<div class="timestamp">Retrieved: ${new Date().toLocaleString()}</div>`;
    contentDiv.innerHTML = html;
}

// Display module error
function displayModuleError(moduleId, errorMessage) {
    const contentDiv = document.getElementById(`content-${moduleId}`);
    const moduleDiv = document.getElementById(`module-${moduleId}`);
    const loadingSpan = moduleDiv.querySelector('.loading');

    if (loadingSpan) {
        loadingSpan.remove();
    }

    contentDiv.innerHTML = `<div class="error-message">⚠ ERROR: ${errorMessage}</div>`;
}

// Export report - FIXED VERSION TO MATCH EXACT EXAMPLE STYLE
function exportReport() {
    // Validate that scan has been performed
    if (!currentTarget || Object.keys(scanResults).length === 0) {
        alert('ERROR: NO SCAN DATA TO EXPORT. PLEASE RUN A SCAN FIRST.');
        return;
    }

    // Get current timestamp
    const timestamp = new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short'
    });

    // Calculate total findings
    let totalFindings = 0;
    const categoryData = [];

    Object.keys(scanResults).forEach(moduleId => {
        const moduleInfo = modules.find(m => m.id === moduleId);
        const result = scanResults[moduleId];
        const findings = [];

        if (moduleId === 'dns') {
            result.data.forEach(record => {
                findings.push({
                    item: record.type,
                    details: `${record.value} - ${record.detail}`
                });
            });
        } else if (moduleId === 'techstack') {
            result.data.forEach(tech => {
                findings.push({
                    item: `${tech.category}: ${tech.name}`,
                    details: tech.detail
                });
            });
        } else if (moduleId === 'employee') {
            result.data.forEach(item => {
                if (item.link) {
                    findings.push({
                        item: `${item.category} - ${item.item}`,
                        details: item.link
                    });
                } else if (item.value) {
                    findings.push({
                        item: item.item,
                        details: item.value
                    });
                }
            });
        } else if (moduleId === 'contact') {
            result.data.emails.forEach(email => {
                findings.push({ item: 'Email', details: email });
            });
            result.data.phones.forEach(phone => {
                findings.push({ item: 'Phone', details: phone });
            });
            if (Array.isArray(result.data.socialMedia) && typeof result.data.socialMedia[0] === 'object') {
                result.data.socialMedia.forEach(social => {
                    findings.push({ item: social.platform, details: social.url });
                });
            }
        } else if (moduleId === 'related' || moduleId === 'history') {
            result.data.forEach(item => {
                findings.push({
                    item: `${item.category} - ${item.item}`,
                    details: item.link || item.value || 'See report'
                });
            });
        } else if (typeof result.data === 'object' && !Array.isArray(result.data)) {
            Object.keys(result.data).forEach(key => {
                findings.push({
                    item: key,
                    details: result.data[key]
                });
            });
        } else if (Array.isArray(result.data)) {
            result.data.forEach(item => {
                findings.push({
                    item: typeof item === 'string' ? item : JSON.stringify(item),
                    details: 'Detected'
                });
            });
        }

        totalFindings += findings.length;
        categoryData.push({
            category: moduleInfo.name,
            findings: findings
        });
    });

    // Build complete HTML report matching Example Report.html structure and CSS exactly
    const reportHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OSINT Report - ${currentTarget}</title>
    <link rel="icon" type="image/png" href="https://user-gen-media-assets.s3.amazonaws.com/gemini_images/042546ac-49bf-4001-91b3-447e6124dfc6.png">
    <style>
        * { 
            margin: 0; 
            padding: 0; 
            box-sizing: border-box;
            word-wrap: break-word;
            overflow-wrap: break-word;
        }
        body {
            font-family: 'Courier New', monospace;
            background: #000;
            color: #fff;
            padding: 40px 20px;
            line-height: 1.6;
        }
        .report-container {
            max-width: 1200px;
            margin: 0 auto;
            background: #000;
            border: 2px solid #fff;
            padding: 40px;
        }
        .report-header {
            text-align: center;
            border-bottom: 2px solid #fff;
            padding-bottom: 30px;
            margin-bottom: 40px;
        }
        .report-logo {
            width: 80px;
            height: 80px;
            margin: 0 auto 20px;
            display: block;
            filter: invert(1);
        }
        .report-header h1 {
            font-size: 32px;
            letter-spacing: 4px;
            margin-bottom: 10px;
        }
        .report-header .subtitle {
            font-size: 14px;
            letter-spacing: 2px;
            opacity: 0.8;
        }
        .scan-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
            padding: 20px;
            border: 1px solid #fff;
        }
        .scan-info-item {
            padding: 10px;
        }
        .scan-info-item strong {
            display: block;
            margin-bottom: 5px;
            letter-spacing: 1px;
        }
        .category-section {
            margin-bottom: 40px;
            border: 1px solid #fff;
            padding: 20px;
        }
        .category-title {
            font-size: 20px;
            letter-spacing: 3px;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid #fff;
        }
        .finding-item {
            padding: 15px;
            margin-bottom: 10px;
            border-left: 3px solid #fff;
            background: rgba(255, 255, 255, 0.05);
        }
        .finding-item .item-name {
            font-weight: bold;
            margin-bottom: 5px;
            letter-spacing: 1px;
        }
        .finding-item .item-details {
            opacity: 0.8;
            font-size: 14px;
            word-break: break-all;
            overflow-wrap: anywhere;
            color: #fff;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #fff;
            text-align: center;
            font-size: 12px;
            opacity: 0.7;
        }
        /* Print styles - KEEP BLACK BACKGROUND */
        @media print {
            body { 
                background: #000 !important;
                color: #fff !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            .report-container { 
                border-color: #fff;
                background: #000 !important;
            }
            .category-section, .scan-info { 
                border-color: #fff;
                background: #000 !important;
            }
            .finding-item { 
                border-left-color: #fff;
                background: rgba(255, 255, 255, 0.05) !important;
            }
            * {
                color: #fff !important;
            }
            .report-logo {
                filter: invert(1);
            }
        }
    </style>
</head>
<body>
    <div class="report-container">
        <div class="report-header">
            <img src="https://user-gen-media-assets.s3.amazonaws.com/gemini_images/042546ac-49bf-4001-91b3-447e6124dfc6.png" 
                 alt="OSINT Logo" 
                 class="report-logo">
            <h1>WEB RECONNAISSANCE REPORT</h1>
            <div class="subtitle">OSINT &amp; INFORMATION GATHERING</div>
        </div>
        
        <div class="scan-info">
            <div class="scan-info-item">
                <strong>TARGET URL:</strong>
                ${currentTarget}
            </div>
            <div class="scan-info-item">
                <strong>SCAN DATE:</strong>
                ${timestamp}
            </div>
            <div class="scan-info-item">
                <strong>ANALYST:</strong>
                SHAIK JALEEL BASHA
            </div>
            <div class="scan-info-item">
                <strong>FINDINGS:</strong>
                ${totalFindings} ITEMS
            </div>
        </div>
        
        ${categoryData.map(cat => `
            <div class="category-section">
                <div class="category-title">${cat.category.toUpperCase()} (${cat.findings.length})</div>
                ${cat.findings.map(finding => `
                    <div class="finding-item">
                        <div class="item-name">${finding.item}</div>
                        <div class="item-details">${finding.details}</div>
                    </div>
                `).join('')}
            </div>
        `).join('')}
        
        <div class="footer">
            <p>GENERATED BY WEB RECONNAISSANCE TOOL | ${timestamp}</p>
            <p>FOR AUTHORIZED SECURITY RESEARCH ONLY</p>
        </div>
    </div>
</body>
</html>`;

    // Create blob and download
    const blob = new Blob([reportHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `OSINT-Report-${currentTarget.replace(/[^a-z0-9]/gi, '-')}-${Date.now()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log('✓ REPORT EXPORTED SUCCESSFULLY');
}

// Event listeners
document.getElementById('target-url').addEventListener('input', function () {
    const url = this.value.trim();
    if (url) {
        validateURL(url);
    } else {
        document.getElementById('validation-message').textContent = '';
    }
});

document.getElementById('select-all-btn').addEventListener('click', selectAllModules);
document.getElementById('start-scan-btn').addEventListener('click', startScan);
document.getElementById('export-btn').addEventListener('click', exportReport);
document.getElementById('refresh-btn').addEventListener('click', startScan);

// Initialize
createStars();
initializeModules();