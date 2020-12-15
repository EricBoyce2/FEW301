import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  count = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
