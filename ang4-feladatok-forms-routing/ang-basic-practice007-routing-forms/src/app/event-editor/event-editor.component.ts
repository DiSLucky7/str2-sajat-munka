import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EventService } from '../service/event.service';
import { Event } from '../model/event';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  event: Event = new Event();

  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params =>
      this.eventService.get(Number(params.id)).forEach(
        event => {
            console.log('1',event);
            this.event = event || new Event();
          }
        )
    );
  }

  onFormSubmit(form: NgForm, event: Event): void {
    this.eventService.update(event)
    this.router.navigate([''])
  }

}
