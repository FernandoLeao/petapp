import { environment } from '../../../environments/environment';

export class UrlService {

  static addApiPrefix(url: string): string {
    return 'http://localhost:5000/' + url;
  }
}
