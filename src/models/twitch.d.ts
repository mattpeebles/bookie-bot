declare namespace Twitch{
    
    interface User{
        badges: Badges
        "badges-raw": string
        color: string;
        "display-name": string;
        emotes: any;
        "emotes-raw": any;
        id: string;
        "message-type": string;
        mod: boolean;
        "room-id": string;
        subscriber: boolean
        "tmi-sent-ts": string;
        turbo: boolean;
        "user-id": string;
        "user-type": null;
        username: string;
    }

    interface Badges {
        broadcaster: boolean;
        premium: boolean;
    }
}