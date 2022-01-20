import { Injectable } from '@angular/core';
import { Event } from '../model/event';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  getAll(): Event[] {
    return [
      {
        name: 'Levente',
        date: '2022. 01 20',
        time: '20:54',
        location: {
          address: 'Tokaji F.',
          city: 'Miskolc',
          country: 'Hungary',
        }
      },
      {
        name: 'Viktor',
        date: '2022. 01 20',
        time: '20:54',
        location: {
          address: 'Tokaji F.',
          city: 'Miskolc',
          country: 'Hungary',
        }
      },
      {
        name: 'Gergő',
        date: '2022. 01 20',
        time: '20:54',
        location: {
          address: 'Tokaji F.',
          city: 'Miskolc',
          country: 'Hungary',
        }
      }
    ]
  }
}
