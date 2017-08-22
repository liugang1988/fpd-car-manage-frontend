import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-insurance-price',
  templateUrl: './insurance-price.component.html',
  styleUrls: ['./insurance-price.component.scss']
})
export class InsurancePriceComponent implements OnInit {
  public step: number = 1; // 步骤
  public defaultVehicleObj: any; // 车辆默认加载信息
  public defaultInsuranceProjectObj: any; // 投保项目
  constructor() { }

  ngOnInit() {
  }

  VehicleObj(e) {
    this.defaultVehicleObj = e;
  }

  InsuranceProjectObj(e) {
    this.defaultInsuranceProjectObj = e;
  }

  steps(e) {
    this.step = e;
  }

}
