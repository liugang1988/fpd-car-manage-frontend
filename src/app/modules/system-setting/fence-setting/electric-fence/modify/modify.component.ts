import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
import { Router, ActivatedRoute } from '@angular/router';
import { MitBaiduMapComponent } from '../../../../../widgets/mit-baidu-map/mit-baidu-map.component';

// 服务
import { ElectricFenceService } from '../electric-fence.service';
import { EventsService } from '../../../../../services/events-service.service';
import { MitBaiduMapService } from '../../../../../widgets/mit-baidu-map/services/mit-baidu-map.service';


// 表格基类
import { MitDataTableBase } from '../../../../../widgets/mit-data-table/mit-data-table-base';


// 动画
import { fadeIn } from '../../../../../animation/fadeIn';



@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss'],
  animations: [fadeIn]
})
export class ModifyComponent implements OnInit, OnDestroy {

  @ViewChild(MitBaiduMapComponent) mitBaiduComponent: MitBaiduMapComponent;
  public form: FormGroup;
  public id: number;
  public disabled = false;

  public _checkAction_: any;
  public _getDatil_: any;
  public _getAddress_: any;
  public styleOptions = {
    strokeColor: '#0078ff',    // 边线颜色。
    fillColor: '#0078ff',      // 填充颜色。当参数为空时，圆形将没有填充效果。
    strokeWeight: 2,       // 边线的宽度，以像素为单位。
    strokeOpacity: 0.8,	   // 边线透明度，取值范围0 - 1。
    fillOpacity: 0.6,      // 填充的透明度，取值范围0 - 1。
    strokeStyle: 'solid' // 边线的样式，solid或dashed。
  };
  public overlays = [];

  public searcVal:any;

  constructor(private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private electricFenceService: ElectricFenceService,
    private mitBaiduMapService: MitBaiduMapService) {
    this.form = fb.group({
      'ID': 0,
      'RuleContent': this.fb.group({
        'FenceName': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(10)])], // 栅栏名称
        'FenceAddress': ['', [Validators.required]], // 	围栏地点 (超速可不设置)
        'AlarmType': [0, [Validators.required]], // 报警方式 1 进入报警 2 离开报警
        'Shape': [1, [Validators.required]], // 形状（0 圆形，1 多边形）
        'CircleCenter': 0, // 圆心
        'R': 0,  // 单位（米）
        'Points': 0 // 	如果shape为1，则填充点集合
      })
    });
  }


  ngOnInit() {
    this.mitBaiduComponent.LoadBMap('Iz0YCH1ZtoxHyzhlD7yyz2fNckw8FRq5').then(() => {
      this.mitBaiduComponent.Init(); // 初始化百度地图

      // this.mitBaiduComponent.currentMap.addControl(new BMap.CityListControl({
      //   anchor: 0,
      //   offset: new BMap.Size(10, 20)
      // }));

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
              BMAP_DRAWING_CIRCLE,
              BMAP_DRAWING_POLYGON,
              BMAP_DRAWING_RECTANGLE
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
    this._checkAction_ = this.activatedRoute.params.subscribe((params: { id: string }) => {
      if (params.id) {
        this.id = parseInt(params.id, 10);
        this.form.controls['ID'].setValue(this.id);
        this.getDatil(this.id);
      } else {
        this.mitBaiduComponent.IpCity(this.mitBaiduComponent.currentMap); // 定位到当前城市
      }
    });
  }


  // 获取详情
  getDatil(id) {
    const _data = { FenceId: id };
    this._getDatil_ = this.electricFenceService.GetElectronicFenceSettingByFenceId(_data).subscribe((res) => {
      if (res.State) {
        this.form.setValue({
          'ID': id,
          'RuleContent': {
            'FenceName': res.Data.RuleContent.FenceName || '',
            'FenceAddress': res.Data.RuleContent.FenceAddress || '',
            'AlarmType': res.Data.RuleContent.AlarmType || '',
            'Shape': res.Data.RuleContent.Shape,
            'CircleCenter': res.Data.RuleContent.CircleCenter || '',
            'R': res.Data.RuleContent.R || 0,
            'Points': res.Data.RuleContent.Points || ''
          }
        });
        this.setOverlay(res.Data.RuleContent.Points);
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

  // 搜索地点
  selected(data){
    this.mitBaiduComponent.LocalSearch(data);
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

  // 获取绘制结果
  getOverlayData(e) {
    const _p = [];
    const _pointArr = e.overlay.getPath();
    _pointArr.forEach((item) => {
      _p.push({ X: item.lng, Y: item.lat });
    });
    switch (e.drawingMode) {
      case 'circle':  // 圆形
        const _center = e.overlay.getCenter();
        const _radius = e.overlay.getRadius();
        this.form.controls['RuleContent']['controls']['Shape'].setValue(0);
        this.form.controls['RuleContent']['controls']['CircleCenter'].setValue({ X: _center.lng, Y: _center.lat });
        this.form.controls['RuleContent']['controls']['R'].setValue(_radius);
        this.form.controls['RuleContent']['controls']['Points'].setValue(_p);
        this.getAddress(_center);
        break;
      default: // 多边形
        this.form.controls['RuleContent']['controls']['Shape'].setValue(1);
        this.form.controls['RuleContent']['controls']['CircleCenter'].setValue({ X: 0, Y: 0 });
        this.form.controls['RuleContent']['controls']['Points'].setValue(_p);
        this.getAddress(_pointArr[_pointArr.length - 1]);
    }
  }

  // 通过中心标获取地理位置
  getAddress(point) {
    this._getAddress_ = this.mitBaiduMapService.getAddress(point.lat, point.lng).subscribe((res) => {
      this.form.controls['RuleContent']['controls']['FenceAddress'].setValue(res.result.formatted_address);
    });
  }


  // 提交
  onSubmit(form) {
    this.disabled = true;
    form.RuleContent.AlarmType = parseInt(form.RuleContent.AlarmType, 10);
    this.electricFenceService.AddOrUpdateElectronicFenceSetting(form).subscribe((res) => {
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

  ngOnDestroy() {
    if (this._checkAction_) {
      this._checkAction_.unsubscribe();
    }
    if (this._getAddress_) {
      this._getAddress_.unsubscribe();
    }
    if (this._getAddress_) {
      this._getAddress_.unsubscribe();
    }
  }

}
