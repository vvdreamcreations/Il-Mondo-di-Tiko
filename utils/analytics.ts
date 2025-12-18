// Google Analytics 4 Event Tracking Utilities
import { hasAnalyticsConsent } from './consent';

// Check if gtag is available AND user has given consent
const isGtagAvailable = () => typeof window !== 'undefined' && typeof window.gtag === 'function' && hasAnalyticsConsent();

// Survey Vote Event
export const trackSurveyVote = (topicId: string, topicName: string) => {
    if (isGtagAvailable()) {
        window.gtag('event', 'survey_vote', {
            topic_id: topicId,
            topic_name: topicName,
            event_category: 'engagement',
            event_label: topicName
        });
        console.log('GA4: Survey vote tracked', { topicId, topicName });
    }
};

// Topic Suggestion Event
export const trackTopicSuggestion = (hasEmail: boolean) => {
    if (isGtagAvailable()) {
        window.gtag('event', 'topic_suggestion', {
            has_email: hasEmail,
            event_category: 'engagement',
            event_label: 'Custom Topic Suggestion'
        });
        console.log('GA4: Topic suggestion tracked', { hasEmail });
    }
};

// Book Click Event
export const trackBookClick = (bookId: string, bookTitle: string) => {
    if (isGtagAvailable()) {
        window.gtag('event', 'book_click', {
            book_id: bookId,
            book_title: bookTitle,
            event_category: 'engagement',
            event_label: bookTitle
        });
        console.log('GA4: Book click tracked', { bookId, bookTitle });
    }
};

// Newsletter Signup Event
export const trackNewsletterSignup = (email: string) => {
    if (isGtagAvailable()) {
        window.gtag('event', 'newsletter_signup', {
            event_category: 'conversion',
            event_label: 'Newsletter Subscription'
        });
        console.log('GA4: Newsletter signup tracked');
    }
};

// Page View (auto-tracked, but can be manually triggered if needed)
export const trackPageView = (pagePath: string, pageTitle: string) => {
    if (isGtagAvailable()) {
        window.gtag('event', 'page_view', {
            page_path: pagePath,
            page_title: pageTitle
        });
        console.log('GA4: Page view tracked', { pagePath, pageTitle });
    }
};

// TypeScript window extension
declare global {
    interface Window {
        gtag: (...args: any[]) => void;
        dataLayer: any[];
    }
}
