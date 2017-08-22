import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-mit-modal',
  templateUrl: './mit-modal.component.html',
  styleUrls: ['./mit-modal.component.scss']
})
export class MitModalComponent implements OnInit {
  @Input() text:string;
  constructor() { }

  ngOnInit() {
  }

}
