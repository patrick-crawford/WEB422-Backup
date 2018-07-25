import { Component, OnInit } from '@angular/core';


import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public token

  constructor(private router: Router, private auth:AuthService) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      this.token = this.auth.readToken();
    });
  }
}
