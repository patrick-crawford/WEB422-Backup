import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.css']
})
export class FooComponent implements OnInit {

  studentName: string = "Jason Bourne";
  @Input() photos: Array<string> = [];
  studentUpdated: Date = new Date();
  currentPhoto: number = 0;

  toggleImage() {
    // increment currentPhoto until we reach the end of the array, then start from 0
    this.currentPhoto = (this.currentPhoto == this.photos.length - 1) ? 0 : this.currentPhoto + 1;
  }

  constructor() { }

  ngOnInit() {
  }
}
