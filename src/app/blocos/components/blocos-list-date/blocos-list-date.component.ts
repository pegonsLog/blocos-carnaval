import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BlocosService } from '../blocos.service';

@Component({
  selector: 'app-blocos-list-date',
  templateUrl: './blocos-list-date.component.html',
  styleUrls: ['./blocos-list-date.component.scss'],
})
export class BlocosListDateComponent implements OnInit {
  blocosFire$ = this.blocosService.listFire();
  datas: string[] = [];
  contador: number = 0;
  subscription: Subscription = new Subscription();
  navigationExtras: NavigationExtras = {
    state: {
      value: null,
    },
  };

  constructor(
    private blocosService: BlocosService,
    private router: Router,
    private location: Location
  ) {
    this.datas = this.blocosService.datas();

  }

  forDate(data: string) {
    this.router.navigate(['blocos/date-regional'], { state: { value: data } });
  }

  goBack(){
    this.location.back();
  }

  ngOnInit(): void {
    this.blocosService.datas();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
