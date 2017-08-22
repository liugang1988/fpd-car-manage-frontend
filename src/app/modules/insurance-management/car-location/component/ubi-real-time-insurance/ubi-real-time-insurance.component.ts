import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ubi-real-time-insurance',
  templateUrl: './ubi-real-time-insurance.component.html',
  styleUrls: ['./ubi-real-time-insurance.component.scss']
})
export class UbiRealTimeInsuranceComponent implements OnInit {
  @Input() realTimeData:any;
  public ubiShow: boolean = false;

  constructor() { }

  ngOnInit() {

  }
  
  showUbi(){
    this.ubiShow = !this.ubiShow;
  }

}
