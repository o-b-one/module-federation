import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {IFeedItem} from "../interfaces/feed-item.interface";


@Injectable({providedIn: "root"})
export class FeedService {

  fetchFeed(): Observable<{ feed: IFeedItem[] }> {
    return of({
      feed: [
        {
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean diam nibh, consequat volutpat urna vitae, luctus tristique quam. Vivamus eget justo et nulla hendrerit accumsan a sed lectus. Duis a ante eu nisl egestas efficitur et eget nulla. Vestibulum in sodales sem. Sed imperdiet viverra neque. Cras eu sem vel magna dapibus vehicula ac id lectus. Integer dictum, magna vel tincidunt tincidunt, augue turpis imperdiet eros, at cursus ante urna eu nibh. Sed congue aliquet venenatis.',
          userId: '1111',
          date: '06/11/2021',
        },
        {
          content: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus mollis consequat turpis, ut laoreet lorem gravida ac. Sed quis pellentesque felis, sit amet luctus erat. Vestibulum auctor tristique turpis ut porttitor. Quisque interdum justo sit amet magna convallis tincidunt. Vestibulum vestibulum, quam cursus pretium ullamcorper, leo nunc maximus ipsum, id faucibus nunc nulla non nisi. Praesent ut nibh nibh. Nulla interdum rutrum tellus sit amet finibus. Phasellus ornare metus ac lectus iaculis porta. Donec quis est sollicitudin, faucibus neque id, lacinia nisl.',
          userId: '2222',
          date: '05/11/2021',
        },
      ]
    })
  }


}
