import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  studentPhotos: Array<string> = ["https://upload.wikimedia.org/wikipedia/en/6/60/Jason_bourne_infobox.jpg", "https://upload.wikimedia.org/wikipedia/commons/d/d1/Matt_Damon_%28cropped%29.jpg"]

  constructor() { }

  ngOnInit() {
  }

}
