import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

if (MIXPANEL_TOKEN) {
    mixpanel.init(MIXPANEL_TOKEN, {
        debug: process.env.NODE_ENV !== 'production',
        track_pageview: true,
        persistence: 'localStorage',
    });
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
