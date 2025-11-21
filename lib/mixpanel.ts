import mixpanel from 'mixpanel-browser';
import { generateUUID } from './utils';

// Helper to get cookie on client
function getCookie(name: string): string | undefined {
    if (typeof window === 'undefined') return undefined;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
}

// Helper to set cookie on client
function setCookie(name: string, value: string, days: number) {
    if (typeof window === 'undefined') return;
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
}

export function getOrSetVisitorId(): string {
    if (typeof window === 'undefined') return '';

    const cookieName = 'visitorId';
    let visitorId = getCookie(cookieName);

    if (!visitorId) {
        visitorId = generateUUID();
        setCookie(cookieName, visitorId, 365); // 1 year
    }

    return visitorId;
}

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

if (MIXPANEL_TOKEN && typeof window !== 'undefined') {
    mixpanel.init(MIXPANEL_TOKEN, {
        debug: process.env.NODE_ENV !== 'production',
        track_pageview: true,
        persistence: 'localStorage',
    });
    
    const visitorId = getOrSetVisitorId();
    if (visitorId) {
        mixpanel.identify(visitorId);
    }
}

export const Mixpanel = {
    identify: (id: string) => {
        if (MIXPANEL_TOKEN) {
            mixpanel.identify(id);
        }
    },
    alias: (id: string) => {
        if (MIXPANEL_TOKEN) {
            mixpanel.alias(id);
        }
    },
    track: (name: string, props?: object) => {
        if (MIXPANEL_TOKEN) {
            mixpanel.track(name, props);
        }
    },
    people: {
        set: (props: object) => {
            if (MIXPANEL_TOKEN) {
                mixpanel.people.set(props);
            }
        },
    },
};
