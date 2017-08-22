import { Component, OnInit, AfterContentInit, ViewChild } from '@angular/core';
import { DepartmentManageService } from '../department-manage.service';
import { EventsService } from '../../../../services/events-service.service';
import { bounceIn } from '../../../../animation/bounceIn';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  animations: [bounceIn]
})
export class TreeComponent implements OnInit, AfterContentInit {
  public deptTree: Array<any>;  // 目录树
  public showLoading = true;  // Loading
  public showModifyAlert = false; // 显示修改或编辑组件
  public showDeleteAlert = false; // 显示删除确认弹窗组件
  public treeOptions: Object = { displayField: 'DepartmentName', childrenField: 'SubDepts', isExpandedField: 'expanded' };  // 树组件设置
  public modifyContent: any; // 用于传递修改的菜单内容
  public selectedMenu: string; // 当前选择的菜单
  public tree: any;
  public showOptionId: number;
  constructor(private departmentManageService: DepartmentManageService, private eventsService: EventsService, private router: Router) {
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.getTree();
  }


  add(e, tree) {
    this.tree = tree;
    e.data.action = 'add';
    this.modifyContent = e.data;
    this.showModifyAlert = true;
  }

  edit(e, tree) {
    this.tree = tree;
    e.data.action = 'edit';
    this.modifyContent = e.data;
    this.showModifyAlert = true;
  }

  delete(e, tree) {
    this.tree = tree;
    this.modifyContent = e.data;
    this.showDeleteAlert = true;
  }

  getTree() {
    this.departmentManageService.GetAllDeptTree().subscribe((res) => {
      if (res.State) {
        this.showLoading = false;
        const _arr = [];  // 临时数组
        _arr.push(res.Data);
        _arr[0].expanded = true; // 设置默认展开
        this.deptTree = _arr;  // 渲染树
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

  treeEach(array, val, tree) {
    array.forEach((item, index) => {
      if (item.ID === val) {
        // this.tree.treeModel.nodes.remove( item );
        // this.tree.treeModel.update();
      }

      if (item.SubDepts !== null) {
        this.treeEach(item.SubDepts, 10, tree);
      }
    });
  }

  updateTree(tree) {
    this.treeEach(tree.treeModel.nodes, 10, tree);
  }

  closeAlert(e) {

    // 回调并弹窗通知
    if (e) {
      this.getTree();
      this.eventsService.emitMessageEvent(e.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, e.Message);
    }

    this.updateTree(this.tree);

    // 关闭弹窗
    this.showDeleteAlert = false;
    this.showModifyAlert = false;
  }


}

