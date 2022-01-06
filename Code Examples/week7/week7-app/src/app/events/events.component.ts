import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  clickLog: Array<string> = [];

  logClick(msg: any){
    this.clickLog.push(msg);
  }

  constructor() { }

  ngOnInit() {
  }

}
