import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() title: string;
  @Input() userName: string;
  @Input() userMenuName: string;
  @Input() indexLink: string = '';

  constructor() { }

  ngOnInit() {
  }

}
