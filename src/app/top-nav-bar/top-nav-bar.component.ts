import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.sass']
})
export class TopNavBarComponent implements OnInit {
  opened = false;
  constructor() { }

  ngOnInit(): void {
  }

}
