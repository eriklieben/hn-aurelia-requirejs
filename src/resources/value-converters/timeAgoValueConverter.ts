import * as moment from 'moment';

export class TimeAgoValueConverter {
  public toView(datetime) {
    return moment.unix(datetime).fromNow();
  }
}
