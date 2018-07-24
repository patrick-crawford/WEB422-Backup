import { Component, OnInit } from '@angular/core';


import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router, private auth:AuthService) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      let token = this.auth.readToken();

      if (token)
        console.log(token);
      else {
        console.log("Unable to read token")
      }
    });
  }
}
