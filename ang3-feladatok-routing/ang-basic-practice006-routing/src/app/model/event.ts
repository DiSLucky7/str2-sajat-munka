import { Location } from './location';

export class Event {
  name: string = '';
  date: string = '';
  time: string = '';
  location: Location = {
    address: '',
    city: '',
    country: '',
  }
}
