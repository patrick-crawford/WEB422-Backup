import { Component, OnInit } from '@angular/core';

class User{
  firstName: string | undefined;
  email: string | undefined;
  age: number | undefined;
  language: string | undefined;
  active: boolean | undefined;
}

@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.css']
})
export class DirectivesComponent implements OnInit {

  users: Array<User> = [{
    firstName: "Hillier",
    email: "hkilpatrick0@nsw.gov.au",
    age: 26,
    language: "English",
    active: true
  }, {
    firstName: "Genvieve",
    email: "gbenettini1@flickr.com",
    age: 35,
    language: "German",
    active: false
  }, {
    firstName: "Melesa",
    email: "mhundey2@java.com",
    language: "Italian",
    age: 22,
    active: false
  }, {
    firstName: "Allayne",
    email: "aoliff3@oracle.com",
    language: "Spanish",
    age: 43,
    active: true
  }]

  constructor() { }

  ngOnInit() {
  }

}
