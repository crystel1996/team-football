export interface SubtitleLinkInterface {
    link: string;
    title: string;
}

export interface TitleComponentInterface {
    title: string;
    subtitleLink?: SubtitleLinkInterface;
    subtitle?: string;
}