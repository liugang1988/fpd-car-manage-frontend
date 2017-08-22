import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-mit-footer',
  templateUrl: './mit-footer.component.html',
  styleUrls: ['./mit-footer.component.scss']
})
export class MitFooterComponent implements OnInit {
  @Input() isExpand: boolean;
  info: any = environment;

  constructor() { }

  ngOnInit() {
  }

}
