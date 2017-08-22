import { Component, OnInit, Input, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { fadeIn } from '../../../animation/fadeIn';
import { EventsService } from '../../../services/events-service.service';

@Component({
  selector: 'app-mit-sidebar',
  templateUrl: './mit-sidebar.component.html',
  styleUrls: ['./mit-sidebar.component.scss'],
  animations: [fadeIn]
})
export class MitSidebarComponent implements OnInit {

  @Input() isExpand: boolean;

  toggleLink: string;

  toggleSubLink: string;

  current_url: string;


  links: Array<any> = [
    {
      'MenuName': '首页',
      'IconName': 'fpd-mini-logo',
      'Url': '/page/dashboard'
    },
    {
      'MenuName': '车辆位置',
      'IconName': 'fpd-geolocation',
      'Url': '/page/car-location'
    },
    {
      'MenuName': '基础数据',
      'IconName': 'fpd-base-data',
      'SubLinks': [
        {
          'MenuName': '车辆信息',
          'Url': '/page/base-data/vehicle-information',
        },
        {
          'MenuName': '设备安装',
          'Url': '/page/base-data/device-install',
        },
        {
          'MenuName': '司机管理',
          'Url': '/page/base-data/driver-manage',
        },
        {
          'MenuName': '人车绑定',
          'Url': '/page/base-data/people-car-binding',
        }
      ]
    },
    {
      'MenuName': '智能运营',
      'IconName': 'fpd-intelligent-operating',
      'SubLinks': [
        {
          'MenuName': '行车数据',
          'Url': '/page/intelligent-operating/driving-data',
        },
        {
          'MenuName': '运行管控',
          'SubLinks': [
            {
              'MenuName': '区域栅栏',
              'Url': '/page/intelligent-operating/operation-control/region',
            },
            {
              'MenuName': '超速',
              'Url': '/page/intelligent-operating/operation-control/speed',
            },
            {
              'MenuName': '怠速',
              'Url': '/page/intelligent-operating/operation-control/idling',
            },
            {
              'MenuName': '电子围栏',
              'Url': '/page/intelligent-operating/operation-control/electric',
            },
            {
              'MenuName': '汽车点名',
              'Url': '/page/intelligent-operating/operation-control/name-of-car',
            },
            {
              'MenuName': '疲劳驾驶',
              'Url': '/page/intelligent-operating/operation-control/fatigue',
            }
          ]
        },
        {
          'MenuName': '安全警报',
          'Url': '/page/intelligent-operating/security-alert'
        },
        {
          'MenuName': '故障提示',
          'Url': '/page/intelligent-operating/vehicle-fault'
        },
        {
          'MenuName': '车况监控',
          'Url': '/page/intelligent-operating/vehicle-condition-monitor'
        },
        {
          'MenuName': '追车管理',
          'Url': '/page/intelligent-operating/chase-car'
        },
        {
          'MenuName': '电量管理',
          'Url': '/page/intelligent-operating/power-manage'
        }
      ]
    },
    {
      'MenuName': '车务管理',
      'IconName': 'fpd-car',
      'SubLinks': [
        {
          'MenuName': '违章管理',
          'SubLinks': [
            {
              'MenuName': '违章记录',
              'Url': '#'
            },
            {
              'MenuName': '手工查询',
              'Url': '#'
            },
            {
              'MenuName': '短信通知',
              'Url': '#'
            }
          ],
        },
        {
          'MenuName': '保险管理',
          'SubLinks': [
            {
              'MenuName': '保单管理',
              'Url': '#',
            },
            {
              'MenuName': '保单管理',
              'Url': '#',
            }
          ]
        },
        {
          'MenuName': '年检管理',
          'Url': '/page/3',
        },
        {
          'MenuName': '保养维修',
          'SubLinks': [
            {
              'MenuName': '保养管理',
              'Url': '/page/3',
            },
            {
              'MenuName': '维修管理',
              'Url': '/page/3',
            }
          ],
        }
      ]
    },
    {
      'MenuName': '保险管理',
      'IconName': 'fpd-baoxian',
      'SubLinks': [
        {
          'MenuName': '保单管理',
          'Url': '/page/insurance-management/guarantee-management',
        },
        {
          'MenuName': '出险记录',
          'Url': '/page/insurance-management/insurance-report',
        },
        {
          'MenuName': '车辆位置',
          'Url': '/page/insurance-management/car-location',
        }
      ]
    },
    {
      'MenuName': '统计报表',
      'IconName': 'fpd-statistical',
      'SubLinks': [
        {
          'MenuName': '里程统计',
          'Url': '/page/statistical-report/mileage',
        },
        {
          'MenuName': '油耗统计',
          'Url': '/page/statistical-report/fuel-consumption',
        },
        {
          'MenuName': '运管统计',
          'Url': '/page/statistical-report/operation-management',
        },
        {
          'MenuName': '安全警报统计',
          'Url': '/page/statistical-report/security-alerts',
        },
        {
          'MenuName': '驾驶行为统计',
          'Url': '/page/statistical-report/driving-behavior',
        },
        {
          'MenuName': '运营数据统计',
          'Url': '/page/statistical-report/operational-data',
        },
        {
          'MenuName': '驾驶员排名统计',
          'Url': '/page/statistical-report/driver-rank',
        },
        {
          'MenuName': '综合报表',
          'Url': '/page/statistical-report/integrate',
        },
        {
          'MenuName': '每日出车统计',
          'Url': '/page/statistical-report/dailycar',
        },
        {
          'MenuName': '车辆状态统计',
          'Url': '/page/statistical-report/vehicle-off-line',
        }
      ]
    },
    {
      'MenuName': '系统设置',
      'IconName': 'fpd-system-setting',
      'SubLinks': [
        {
          'MenuName': '部门管理',
          'Url': '/page/system-setting/department-manage',
        },
        {
          'MenuName': '用户管理',
          'Url': '/page/system-setting/user-manage',
        },
        {
          'MenuName': '角色管理',
          'Url': '/page/system-setting/role-manage',
        },
        {
          'MenuName': '栅栏设置',
          'SubLinks': [
            {
              'MenuName': '汽车点名',
              'Url': '/page/system-setting/fence-setting/ncar',
            },
            {
              'MenuName': '区域栅栏',
              'Url': '/page/system-setting/fence-setting/region',
            },
            {
              'MenuName': '电子围栏',
              'Url': '/page/system-setting/fence-setting/electric',
            },
            {
              'MenuName': '怠速栅栏',
              'Url': '/page/system-setting/fence-setting/idling',
            },
            {
              'MenuName': '疲劳驾驶',
              'Url': '/page/system-setting/fence-setting/fatigue',
            },
            {
              'MenuName': '速度栅栏',
              'Url': '/page/system-setting/fence-setting/speed',
            }
          ]
        },
        {
          'MenuName': '日志管理',
          'Url': '/page/system-setting/log-manage/login-log',
        },
        {
          'MenuName': '事件设置',
          'Url': '/page/system-setting/event-set',
        }
      ]
    },
    {
      'MenuName': '后台管理',
      'IconName': 'fpd-background-management',
      'SubLinks': [
        {
          'MenuName': '系统设置',
          'SubLinks': [{
            'MenuName': '菜单管理',
            'Url': '/page/backend-management/system-setting/menu-manage',
          }]
        },
        {
          'MenuName': '基础数据管理',
          'SubLinks': [{
            'MenuName': '客户管理',
            'Url': '/page/backend-management/base-data/customer-manage',
          },
          {
            'MenuName': '用户注册管理',
            'Url': '/page/backend-management/base-data/user-register-manage',
          },
          {
            'MenuName': '供应商管理',
            'Url': '/page/backend-management/base-data/supplier-manage',
          },
          {
            'MenuName': '产品类型管理',
            'Url': '/page/backend-management/base-data/product-type',
          },
          {
            'MenuName': '产品型号管理',
            'Url': '/page/backend-management/base-data/product-number',
          },
          {
            'MenuName': '软件版本管理',
            'Url': '/page/backend-management/base-data/software-version',
          },
          {
            'MenuName': 'APP版本管理',
            'Url': '/page/backend-management/base-data/app-version-manage',
          }]
        },
        {
          'MenuName': '产品管理',
          'SubLinks': [{
            'MenuName': '设备库',
            'Url': '/page/backend-management/product-manage/device-library',
          },
          {
            'MenuName': '设备入库',
            'Url': '/page/backend-management/product-manage/device-in',
          },
          {
            'MenuName': '设备出库',
            'Url': '/page/backend-management/product-manage/device-out',
          },
          {
            'MenuName': '生产测试',
            'Url': '/page/backend-management/product-manage/product-test',
          },
          {
            'MenuName': '采购订单',
            'Url': '/page/backend-management/product-manage/puchase-order',
          },
          {
            'MenuName': '销售订单',
            'Url': '/page/backend-management/product-manage/sales-order',
          },
          {
            'MenuName': 'SIM卡管理',
            'Url': '/page/backend-management/product-manage/sim-manage',
          },
          {
            'MenuName': '退货管理',
            'Url': '/page/backend-management/product-manage/return-manage',
          }
          ]
        },
        {
          'MenuName': '设备运维',
          'SubLinks': [
            {
              'MenuName': '工作状态',
              'Url': '/page/backend-management/device-maintenance/work-condition',
            },
            {
              'MenuName': '升级管理',
              'Url': '/page/backend-management/device-maintenance/upgrade-manage',
            },
            {
              'MenuName': '参数设置',
              'Url': '/page/backend-management/device-maintenance/param-setting',
            },
            {
              'MenuName': '车辆安装',
              'Url': '/page/backend-management/device-maintenance/vehicle-install',
            }
          ]
        },
        {
          'MenuName': '车辆管理',
          'SubLinks': [
            {
              'MenuName': '车辆档案管理',
              'Url': '/page/backend-management/vehicle-management/vehicle-record-manage',
            }
          ]
        },
        {
          'MenuName': '保险管理',
          'SubLinks': [
            {
              'MenuName': '常规保险管理',
              'Url': '/page/backend-management/insurance-management/convention-insurance',
            },
            {
              'MenuName': 'UBI保险管理',
              'Url': '/page/backend-management/insurance-management/ubi-insurance',
            }
          ]
        },
        {
          'MenuName': 'UBI模型管理',
          'SubLinks': [
            {
              'MenuName': 'UBI模型管理',
              'Url': '/page/backend-management/ubi-model-management/ubi-model',
            },
            {
              'MenuName': '保险公司',
              'Url': '/page/backend-management/ubi-model-management/insurance-company',
            },
            {
              'MenuName': '保险公司保险项目',
              'Url': '/page/backend-management/ubi-model-management/insurance-project',
            },
            {
              'MenuName': '保险报价算法',
              'Url': '/page/backend-management/ubi-model-management/insurance-quote',
            }
          ]
        },
        {
          'MenuName': '400报表导出',
          'Url': '/page/backend-management/report-export'
        },
        {
          'MenuName': '安全报警',
          'Url': '/page/backend-management/security-alert'
        },
        {
          'MenuName': '数据字典',
          'SubLinks': [
            {
              'MenuName': '车辆系列管理',
              'Url': '/page/backend-management/data-dictionary/vehicle-series-manage',
            },
            {
              'MenuName': '车辆年款管理',
              'Url': '/page/backend-management/data-dictionary/vehicle-style-manage',
            }
          ]
        },
      ]
    }
  ];
  constructor(public router: Router, private eventsService: EventsService) {

  }

  ngOnInit() {
    this.getMenu().then((res) => {
      if (res.length) {
        this.links = res;
      } else {
        localStorage.clear();
        this.router.navigate(['/account/login']);
      }
    }, (err) => {
      // 开发模式下显示所有菜单
      this.links = err;
    });
    // 获取当前URL

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (!this.current_url) {
          this.isExpend(event.url);
        }
        this.current_url = event.url;
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


  getMenu(): Promise<any> {
    const menu = localStorage.getItem(environment.local_storage_menu) ? JSON.parse(localStorage.getItem(environment.local_storage_menu)) : [];
    const p = new Promise((resolve, reject) => {
      if (menu && environment.production) {
        resolve(menu);
      } else if (!environment.production) {
        reject(this.links);
      }
    });
    return p;
  }

  // 遍历数组查找与当前URL对应的子项并展开
  isExpend(current_url) {
    this.links.forEach((item, key) => {
      // 一级菜单
      if (!item.SubLinks && item.Url === current_url) {
        this.toggleLink = item.MenuName;
      } else if (item.SubLinks) {

        // 二级菜单
        item.SubLinks.forEach((subItem, subKey) => {
          if (subItem.Url === current_url) {
            this.toggleLink = item.MenuName;
          }

          // 三级菜单
          if (subItem.SubLinks) {
            subItem.SubLinks.forEach((threeItem, threeKey) => {
              if (threeItem.Url === current_url) {
                this.toggleLink = item.MenuName;
                this.toggleSubLink = subItem.MenuName;
              }
            });
          }
        });
      }
    });
  }

  // 菜单Toggle 通过菜单MenuName来判断
  onToggle(MenuName) {
    if (MenuName !== this.toggleLink) {
      this.toggleLink = MenuName;
    } else {
      this.toggleLink = undefined;
    }
  }

  onSubToggle(MenuName) {
    if (MenuName !== this.toggleSubLink) {
      this.toggleSubLink = MenuName;
    } else {
      this.toggleSubLink = undefined;
    }
  }

}
