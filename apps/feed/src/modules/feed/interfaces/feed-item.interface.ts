export interface IFeedItem {
    userId: string;
    content: string;
    date: string;
    media?: {
      resource: string;
      type: 'image' | 'video';
    };
}
