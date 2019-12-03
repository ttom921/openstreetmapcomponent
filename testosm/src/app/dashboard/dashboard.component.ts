import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenavContent } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('benji', { static: false }) el !: MatSidenavContent;
  constructor() { }

  ngOnInit() {
  }
  onActivate(event) {
    //讓內容移到最上面
    if (this.el && this.el.getElementRef().nativeElement) {
      this.el.getElementRef().nativeElement.scrollTop = 0;
    }
  }
}
