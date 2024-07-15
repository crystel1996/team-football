export interface SubtitleLinkInterface {
    link: string;
    title: string;
}

export interface TitleComponentInterface {
    title: string;
    heading?: number;
    subtitleLink?: SubtitleLinkInterface;
    subtitle?: string;
}