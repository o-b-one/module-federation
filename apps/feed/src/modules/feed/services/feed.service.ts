import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {IFeedItem} from "../interfaces/feed-item.interface";


@Injectable({providedIn: "root"})
export class FeedService {

  fetchFeed(): Observable<{ feed: IFeedItem[] }> {
    return of({
      feed: [
        {
          content: 'Behold, the Micro-Services chaos is coming to the Frontend.',
          userId: '1',
          date: '11/06/2021',
        },
        {
          content: 'If you strike me down, I shall become more powerful than you can possibly imagine.',
          userId: '2',
          date: '11/05/2021',
        },
        {
          content: 'All our dreams can come true, if we have the courage to pursue them.',
          userId: '3',
          date: '11/06/2021',
        },
        {
          content: 'The way to get started is to quit talking and begin doing.\n',
          userId: '3',
          date: '11/04/2021',
        },
      ].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime() )
    })
  }


}
