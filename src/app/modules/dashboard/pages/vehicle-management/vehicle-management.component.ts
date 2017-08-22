import { Component, OnInit } from '@angular/core';

@Component( {
  selector: 'app-vehicle-management',
  templateUrl: './vehicle-management.component.html',
  styleUrls: [ './vehicle-management.component.scss' ]
})
export class VehicleManagementComponent implements OnInit {

  public ViolationNotDealtWith: any; // 违章未处理选项
  public AnnualInspectionExpire: any; // 年检即将过期选项
  public InsuranceExpires: any; // 保险即将过期选项
  constructor() { }

  ngOnInit() {
    // ---驾驶员管理---
    // 驾驶员人数
    this.ViolationNotDealtWith = {
      toolbox: {
        feature: {
          saveAsImage: {
            show: false
          }
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      grid: {
        left: '1%',
        right: '1%',
        top: '1%',
        bottom: '1%',
        containLabel: true
      },
      series: [
        {
          name: '违章未处理',
          type: 'pie',
          radius: [ '55%', '65%' ],
          center: [ '50%', '50%' ],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'left'
            },
            emphasis: {
              show: false,
              textStyle: {
                fontSize: '14',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 335, name: '所有' },
            { value: 310, name: '违章' }
          ]
        }
      ],
      color: [ '#e2e8f4', '#e74f5b' ]
    };
    // 安全驾驶
    this.AnnualInspectionExpire = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      grid: {
        left: '1%',
        right: '1%',
        top: '1%',
        bottom: '1%',
        containLabel: true
      },
      series: [
        {
          name: '年检即将到期',
          type: 'pie',
          radius: [ '55%', '65%' ],
          center: [ '50%', '50%' ],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'left'
            },
            emphasis: {
              show: false,
              textStyle: {
                fontSize: '14',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 335, name: '所有' },
            { value: 310, name: '年检即将到期' }
          ]
        }
      ],
      color: [ '#e2e8f4', '#dcc792' ]
    };
    // 驾驶行为
    this.InsuranceExpires = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      grid: {
        left: '1%',
        right: '1%',
        top: '1%',
        bottom: '1%',
        containLabel: true
      },
      series: [
        {
          name: '保险即将到期',
          type: 'pie',
          radius: [ '55%', '65%' ],
          center: [ '50%', '50%' ],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'left'
            },
            emphasis: {
              show: false,
              textStyle: {
                fontSize: '14',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 335, name: '所有' },
            { value: 310, name: '保险即将到期' }
          ]
        }
      ],
      color: [ '#e2e8f4', '#3598db' ]
    };
  }

}
