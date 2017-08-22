import { Component, OnInit, OnChanges, ElementRef, HostListener, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MitTaskBoxService } from './mit-task-box.service';
import { EventsService } from '../../services/events-service.service';
import { fadeIn } from '../../animation/fadeIn';
@Component({
  selector: 'app-mit-task-box',
  templateUrl: './mit-task-box.component.html',
  styleUrls: ['./mit-task-box.component.scss'],
  animations: [fadeIn]
})
export class MitTaskBoxComponent implements OnInit, OnChanges {
  public isExpand = false;  // 展开待办事项列表
  public isListCollapse = false;  // 列表全部展开判断
  public taskList: any;
  public taskAllCount: any;

  constructor(
    private _eref: ElementRef,
    private mitTaskBoxService: MitTaskBoxService,
    public eventsService: EventsService,
    private router: Router

  ) { }

  ngOnInit() {
    this.GetAlertStatistics();
    this.eventsService.getEmitter().subscribe((item) => {
      if (item.name = this.eventsService.eventNames.EVENT_SECURITY_ALERT_HANDING && item.data.State) {
        this.GetAlertStatistics();
      }
    });
  }
  ngOnChanges(changes: SimpleChanges) {

  }


  // 监听全局点击事件 *用于隐藏下拉菜单
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this._eref.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isExpand = false;
    }
  }

  GetAlertStatistics() {
    this.mitTaskBoxService.GetAlertStatistics().subscribe(
      (res) => {
        if (res.State) {
          this.taskAllCount = res.Data.TotalCount;
          this.taskList = res.Data.AlertStatistics;
        }
      },
      (err) => {
        
        if(err.State == 10 || err.State == 11 || err.State == 12){
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
          setTimeout(()=>{
            this.router.navigate(['/account/login']);
          },2500)
        }else{
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
        }
      }
    );

  }

  // 设置样式
  setIconClass(item: number) {
    // '碰撞报警': 'fpd-pengzhuangbaojing2',
    //   '异常震动报警': 'fpd-yichangzhendong',
    //   '水温报警': 'fpd-shuiwen1',
    //   '侧翻报警': 'fpd-cefanbaojing',
    //   '超速报警': 'fpd-chaosubaojing',
    //   '车门异常状态': 'fpd-chemenyichang',
    //   '胎压和手刹异常': 'fpd-taiyaheshouchayichang',
    //   '转速报警': 'fpd-zhuansubaojing',
    //   '电瓶电压报警': 'fpd-dianpingdianyabaojing',
    //   '车辆故障报警': 'fpd-cheliangguzhang',
    //   '怠速报警': 'fpd-daisubaojing',
    //   '断电报警': 'fpd-duandianbaojing',
    //   '终端异常上报': 'fpd-zhongduanyichangshangbao',
    //   '拖吊报警': 'fpd-tuodiaobaojing',
    //   '疲劳驾驶报警': 'fpd-pilaojiashi',
    //   '原地空转': 'fpd-yuandikongzhuan',
    return {
      'fpd-pengzhuangbaojing1': item === 20 ? true : false,
      'fpd-zhendongbaojing': item === 25 ? true : false,
      'fpd-shuiwenbaojing1': item === 49 ? true : false,
      'fpd-cefanbaojing1': item === 24 ? true : false,
      'fpd-chaosubaojing1': item === 48 ? true : false,
      'fpd-chemenyichang1': item === 32 ? true : false,
      'fpd-taiyaheshouchayichang1': item === 31 ? true : false,
      'fpd-zhuansubaojing1': item === 50 ? true : false,
      'fpd-dianpingdianyabaojing1': item === 51 ? true : false,
      'fpd-cheliangguzhang1': item === 52 ? true : false,
      'fpd-daisubaojing1': item === 53 ? true : false,
      'fpd-zhongduanyichangshangbao1': item === 55 ? true : false,
      'fpd-tuodiaobaojing1': item === 56 ? true : false,
      'fpd-yuandikongzhuan1': item === 20 ? true : false,
      'fpd-duandianbaojing1': item === 54 ? true : false,
      'fpd-pilaojiashi1': item === 57 ? true : false
    };
  }

}

