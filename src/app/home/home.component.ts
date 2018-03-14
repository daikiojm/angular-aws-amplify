import { Component, OnInit } from '@angular/core';

import { ApiService } from './../api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    // this.api.getHello()
    //   .subscribe(result => {
    //     console.log(result);
    //   });
    this.api.getHello_API()
      .subscribe(
        result => console.log(result),
        error => console.log(error)
      );
  }

}
