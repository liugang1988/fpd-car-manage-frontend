import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-real-time-condition',
  templateUrl: './real-time-condition.component.html',
  styleUrls: ['./real-time-condition.component.scss']
})
export class RealTimeConditionComponent implements OnInit {
  @Input() data: any;
  @Output() close = new EventEmitter();
  public VehicleSpeed: any;
  public WaterTemperature: any;
  public EngineLoad: any;
  public Instantaneousfuelconsumption: any;
  public BatteryPressure: any;
  constructor() { }

  ngOnInit() {

  }

  closeHandler(e) {
    this.close.emit(e);
  }

}
