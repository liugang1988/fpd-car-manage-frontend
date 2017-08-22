import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
import { Router, ActivatedRoute } from '@angular/router';
import { MitBaiduMapComponent } from '../../../../../widgets/mit-baidu-map/mit-baidu-map.component';

// 服务
import { NameOfCarService } from '../name-of-car.service';
import { EventsService } from '../../../../../services/events-service.service';
import { MitBaiduMapService } from '../../../../../widgets/mit-baidu-map/services/mit-baidu-map.service';


// 动画
import { fadeIn } from '../../../../../animation/fadeIn';


@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss'],
  animations: [fadeIn]
})
export class ModifyComponent implements OnInit {
  @ViewChild(MitBaiduMapComponent) mitBaiduComponent: MitBaiduMapComponent;
  public showLoading = false;
  public form: FormGroup;

  public disabled = false;

  public id: number;

  public overlays = [];
  public controls: any;

  public styleOptions = {
    strokeColor: '#0078ff',    // 边线颜色。
    fillColor: '#0078ff',      // 填充颜色。当参数为空时，圆形将没有填充效果。
    strokeWeight: 2,       // 边线的宽度，以像素为单位。
    strokeOpacity: 0.8,	   // 边线透明度，取值范围0 - 1。
    fillOpacity: 0.6,      // 填充的透明度，取值范围0 - 1。
    strokeStyle: 'solid' // 边线的样式，solid或dashed。
  };

  public cycleArr = [{ id: 1, name: '周一', checked: false },
  { id: 2, name: '周二', checked: false },
  { id: 3, name: '周三', checked: false },
  { id: 4, name: '周四', checked: false },
  { id: 5, name: '周五', checked: false },
  { id: 6, name: '周六', checked: false },
  { id: 7, name: '周日', checked: false }];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private nameOfCarService: NameOfCarService,
    private eventsService: EventsService,
    private mitBaiduMapService: MitBaiduMapService) {
    this.form = fb.group({
      'ID': 0,
      'RuleContent': this.fb.group({
        'FenceName': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(10)])], // 栅栏名称
        'StartHourTime': ['', [Validators.required]], // 	围栏地点 (超速可不设置)
        'EndHourTime': ['', [Validators.required]], // 报警方式 1 进入报警 2 离开报警
        'CircleCenter': [0, [Validators.required]], // 圆心
        'R': [0, [Validators.required]],  // 单位（米）
        'Points': [[], [Validators.required]], // 	如果shape为1，则填充点集合
        'FenceAddress': ['', [Validators.required]],
        'WeekDays': [[], [Validators.required]],
      }, { validator: this.timeMatch('StartHourTime', 'EndHourTime') })
    });
  }


  // 确保结束时间不小于开始时间
  timeMatch(StartHourTime, EndHourTime) {
    return (group: FormGroup) => {
      if (group.controls[StartHourTime].value && group.controls[EndHourTime].value) {
        const startHourTimeInput = group.controls[StartHourTime].value.split(':');
        const endHourTimeInput = group.controls[EndHourTime].value.split(':');
        if (endHourTimeInput[0] < startHourTimeInput[0]) {
          return group.controls[EndHourTime].setErrors({ notEquivalent: true });
        } else if (endHourTimeInput[0] === startHourTimeInput[0] && endHourTimeInput[1] < startHourTimeInput[1]) {
          return group.controls[EndHourTime].setErrors({ notEquivalent: true });
        }
      }
    };
  }

  ngOnInit() {
    this.mitBaiduComponent.LoadBMap('Iz0YCH1ZtoxHyzhlD7yyz2fNckw8FRq5').then(() => {
      this.mitBaiduComponent.Init(); // 初始化百度地图


      this.checkAction();


      // 加载绘制工具
      this.mitBaiduComponent.LoadDrawingManager().then(() => {
        const BMAP_DRAWING_MARKER = 'marker',     // 鼠标画点模式
          BMAP_DRAWING_POLYLINE = 'polyline',   // 鼠标画线模式
          BMAP_DRAWING_CIRCLE = 'circle',     // 鼠标画圆模式
          BMAP_DRAWING_RECTANGLE = 'rectangle',  // 鼠标画矩形模式
          BMAP_DRAWING_POLYGON = 'polygon';    // 鼠标画多边形模式



        // 实例化鼠标绘制工具
        const drawingManager = new BMapLib.DrawingManager(this.mitBaiduComponent.currentMap, {
          isOpen: true, // 是否开启绘制模式
          enableDrawingTool: true, // 是否显示工具栏
          drawingToolOptions: {
            anchor: 1, // 位置
            offset: new BMap.Size(5, 5), // 偏离值
            drawingModes: [
              BMAP_DRAWING_CIRCLE
            ]
          },
          circleOptions: this.styleOptions, // 圆的样式
          polygonOptions: this.styleOptions, // 多边形的样式
          rectangleOptions: this.styleOptions // 矩形的样式
        });


        // 添加鼠标绘制工具监听事件，用于获取绘制结果
        drawingManager.addEventListener('overlaycomplete', (e) => {
          this.overlays.forEach((overlay, i) => {
            this.mitBaiduComponent.currentMap.removeOverlay(overlay);
            this.overlays = [];
          });
          this.overlays.push(e.overlay);
          this.getOverlayData(e);
        });
      });
    });
  }

  // 获取ID
  checkAction() {
    this.activatedRoute.params.subscribe((params: { id: string }) => {
      if (params.id) {
        this.id = parseInt(params.id, 10);
        this.form.controls['ID'].setValue(this.id);
        this.GetRollCallFenceSettingByFenceId(this.id);
      } else {
        this.mitBaiduComponent.IpCity(this.mitBaiduComponent.currentMap); // 定位到当前城市
      }
    });
  }



  // 获取绘制结果
  getOverlayData(e) {
    const _p = [];
    const _pointArr = e.overlay.getPath();
    const _center = e.overlay.getCenter();
    const _radius = e.overlay.getRadius();
    _pointArr.forEach((item) => {
      _p.push({ X: item.lng, Y: item.lat });
    });
    this.form.controls['RuleContent']['controls']['CircleCenter'].setValue({ X: _center.lng, Y: _center.lat });
    this.form.controls['RuleContent']['controls']['R'].setValue(_radius);
    this.form.controls['RuleContent']['controls']['Points'].setValue(_p);
    this.getAddress(_center);
  }

  // 通过中心标获取地理位置
  getAddress(point) {
    this.mitBaiduMapService.getAddress(point.lat, point.lng).subscribe((res) => {
      this.form.controls['RuleContent']['controls']['FenceAddress'].setValue(res.result.formatted_address);
    });
  }

  // 获取重复周期
  checkCycle(list) {
    const _r = [];
    list.forEach((e) => {
      if (e.checked) {
        _r.push(e.id);
      }
    });
    this.form.controls['RuleContent']['controls']['WeekDays'].setValue(_r);
  }


  GetRollCallFenceSettingByFenceId(id) {
    const data = { FenceId: id };
    this.nameOfCarService.GetRollCallFenceSettingByFenceId(data).subscribe((res) => {
      if (res.State) {
        this.form.setValue({
          'ID': id,
          'RuleContent': {
            'FenceName': res.Data.RuleContent.FenceName || '',
            'FenceAddress': res.Data.RuleContent.FenceAddress || '',
            'StartHourTime': res.Data.RuleContent.StartHourTime || '',
            'EndHourTime': res.Data.RuleContent.EndHourTime || '',
            'CircleCenter': res.Data.RuleContent.CircleCenter || '',
            'R': res.Data.RuleContent.R || '',
            'Points': res.Data.RuleContent.Points || '',
            'WeekDays': res.Data.RuleContent.WeekDays || [],
          }
        });
        this.setOverlay(res.Data.RuleContent.Points);
        this.setDefaultWeekDays(res.Data.RuleContent.WeekDays);
      }
    }, (err) => {
      
        if(err.State == 10 || err.State == 11 || err.State == 12){
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
          setTimeout(()=>{
            this.router.navigate(['/account/login']);
          },2500)
        }else{
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
        }
    });
  }


  // setDefaultWeekDays
  setDefaultWeekDays(WeekDays) {
    this.cycleArr.forEach((item) => {
      WeekDays.forEach((e) => {
        if (item.id === e) {
          item.checked = true;
        }
      });
    });
  }



  // 设置覆盖物
  setOverlay(pointArr) {
    const _p = [];
    pointArr.forEach((item, i) => {
      this.mitBaiduComponent.GetPoint(item.X, item.Y).then((point) => {
        _p[i] = point;
      });
    });
    setTimeout(() => {
      const polygon = new BMap.Polygon(_p, this.styleOptions);  // 创建多边形
      this.mitBaiduComponent.currentMap.addOverlay(polygon);   // 增加多边形
      this.overlays.push(polygon);
      this.mitBaiduComponent.currentMap.setViewport(_p);
    }, 150);
  }


  onSubmit(form) {
    this.nameOfCarService.AddOrUpdateRollCallFenceSetting(form).subscribe((res) => {
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      this.back();
    }, (err) => {
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
      this.back();
    });
  }



  // 取消
  back() {
    if (this.id) {
      this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }
  }

  SetStatrtTime(e) {
    this.form.controls['RuleContent']['controls']['StartHourTime'].setValue(e);
  }

  SetEndTime(e) {
    this.form.controls['RuleContent']['controls']['EndHourTime'].setValue(e);
  }



}
