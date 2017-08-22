import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ubi-history-insurance',
  templateUrl: './ubi-history-insurance.component.html',
  styleUrls: ['./ubi-history-insurance.component.scss']
})
export class UbiHistoryInsuranceComponent implements OnInit {
  @Input() historyData:any;
  public ubiShow: boolean = false;

  constructor() { }

  ngOnInit() {

  }
  
  showUbi(){
    this.ubiShow = !this.ubiShow;
  }

}
