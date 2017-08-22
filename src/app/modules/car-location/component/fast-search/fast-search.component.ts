import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { IsLicensePipe } from '../../../../widgets/mit-pipe/IsLicense/is-license.pipe';
import { FastSearchPipe } from './fast-search.pipe';
@Component({
  selector: 'app-fast-search',
  templateUrl: './fast-search.component.html',
  styleUrls: ['./fast-search.component.scss'],
  providers: [IsLicensePipe]
})
export class FastSearchComponent implements OnInit, OnChanges {

  @Input() vehicleArr: Array<any>; ;
  @Output() searchEvt = new EventEmitter();
  result: Array<any>;
  searcVal: String;
  tmpSearchVal: String;
  showAlert = false;
  alertMessage = '';

  searchArr: Array<any>;


  constructor(private isLicense: IsLicensePipe) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  inputEvt(e) {
    this.tmpSearchVal = this.searcVal;
    this.searchArr = new FastSearchPipe().transform(this.vehicleArr, e);
  }
  selected(e) {
    if (this.searchArr && e) {
      this.searcVal = e.Plate;
    }

    // 当满足搜索条件的数组长度为1时，回车默认选择第一个
    if (this.searchArr.length === 1) {
      this.searcVal = this.searchArr[0].Plate;
      this.submit(this.searcVal);
    }

    this.tmpSearchVal = null;
  }

  submit(val) {
    if (!val || !val.length) {
      this.alertMessage = '车牌号码不得为空';
      this.showAlert = true;
    } else if (this.find(val).length) {
      this.searchEvt.emit(val);
      this.searcVal = null;
    } else {
      this.alertMessage = '车牌号码不存在';
      this.showAlert = true;
    }
  }

  find(val) {
    const _a = this.vehicleArr.filter((e) => {
      return e.Plate === val;
    });
    return _a;
  }

  closeAlert(e) {
    this.showAlert = false;
  }

}
