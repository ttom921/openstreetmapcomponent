import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() navClicked = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }
  handleClicked(ev: Event) {
    ev.preventDefault();
    this.navClicked.emit();
  }
}
