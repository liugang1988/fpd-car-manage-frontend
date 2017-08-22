import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, ElementRef, HostListener, AfterViewInit, OnDestroy } from '@angular/core';
import { MitEchartsLoaderService } from './services/mit-echarts.loader.service';
import { EChartOption } from './interfaces/option.interfaces';



@Component({
  selector: 'app-mit-echarts',
  templateUrl: './mit-echarts.component.html',
  styleUrls: ['./mit-echarts.component.scss'],
  providers: [MitEchartsLoaderService]
})
export class MitEchartsComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() option: EChartOption; // 参数
  @Input() id: string; // id

  @Input() height: string; // 高度

  chart: any;

  constructor(private el: ElementRef, private loader: MitEchartsLoaderService) { }

  ngOnInit() {



  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.option && this.chart) {
      this.chart.setOption(this.option);
    }

  }

  ngAfterViewInit() {
    setTimeout(() => {
      const echarts = (<any>window)['echarts'];
      if (!echarts) {
        this.loader.load().then(() => {
          this.Init();
        }).catch(() => { });
      } else {
        this.Init();
      }
    }, 100);

  }

  Init(): void {
    const echarts = (<any>window)['echarts'];
    this.chart = new echarts.init(document.getElementById(this.id));
    this.chart.setOption(this.option);
  };


  @HostListener('window:resize', ['$event.target'])
  onResize(event) {
    // this.Init();
    this.chart.resize();
  }


  ngOnDestroy(): void {
  }


}
