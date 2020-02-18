import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attribute-binding',
  templateUrl: './attribute-binding.component.html',
  styleUrls: ['./attribute-binding.component.css']
})
export class AttributeBindingComponent implements OnInit {

  // Table Properties

  headerSpan: number = 2;
  showWarning: boolean = true;
  grayBackground: string = "lightGray";
  showBackground: boolean = true;


  constructor() { }

  ngOnInit() {
  }

}
