import { Component, OnInit, OnChanges } from '@angular/core';


// 服务
import { DriverManageService } from '../driver-manage.service';

// 动画
import { fadeIn } from '../../../../animation/fadeIn';

@Component({
  selector: 'app-kpi-detail',
  templateUrl: './kpi-detail.component.html',
  styleUrls: ['./kpi-detail.component.scss'],
  animations: [fadeIn]
})
export class KpiDetailComponent implements OnInit {
  public bdhtml: any;
  public sprnstr: string;
  public eprnstr: string;
  public prnhtml: string;
  constructor(
    private driverManageService: DriverManageService
  ) { }

  ngOnInit() {
  }

  printArea(): void {
    const printContent = document.getElementById('print');
    const WinPrint = window.open('', '', 'width=900,height=650');
    WinPrint.document.write(printContent.innerHTML);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
  }

}
