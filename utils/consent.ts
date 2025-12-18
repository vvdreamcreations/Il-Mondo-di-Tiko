// GDPR Cookie Consent Management

export interface Consent {
    analytics: boolean;
    marketing: boolean;
    timestamp: string;
}

const CONSENT_KEY = 'cookieConsent';

// Get current consent
export const getConsent = (): Consent | null => {
    if (typeof window === 'undefined') return null;

    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return null;

    try {
        return JSON.parse(stored);
    } catch {
        return null;
    }
};

// Save consent
export const saveConsent = (consent: Consent): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
};

// Check specific consents
export const hasAnalyticsConsent = (): boolean => {
    const consent = getConsent();
    return consent?.analytics || false;
};

export const hasMarketingConsent = (): boolean => {
    const consent = getConsent();
    return consent?.marketing || false;
};

// Revoke all consent
export const revokeConsent = (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(CONSENT_KEY);

    // Remove GA cookies
    const cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
        const name = cookie.split('=')[0].trim();
        if (name.startsWith('_ga') || name.startsWith('_gid')) {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
    });
};

// Initialize Google Analytics (called after consent)
export const initializeAnalytics = (): void => {
    if (typeof window === 'undefined') return;

    // Check if already loaded
    if ((window as any).gtag) {
        console.log('GA4 already loaded');
        return;
    }

    // Load gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-5CZGY2LPLJ';
    document.head.appendChild(script);

    // Initialize dataLayer
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
        (window as any).dataLayer.push(arguments);
    }
    (window as any).gtag = gtag;

    gtag('js', new Date());
    gtag('config', 'G-5CZGY2LPLJ', {
        'anonymize_ip': true,
        'cookie_flags': 'SameSite=None;Secure'
    });

    console.log('GA4 initialized with consent');
};

// Check if consent decision has been made
export const hasConsentDecision = (): boolean => {
    return getConsent() !== null;
};
