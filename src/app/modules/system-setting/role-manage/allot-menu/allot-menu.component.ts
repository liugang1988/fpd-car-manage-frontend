import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
import { EventsService } from '../../../../services/events-service.service';
import { RoleManageService } from '../role-manage.service';

// 动画
import { zoomInRight } from '../../../../animation/zoomInRight';

@Component({
  selector: 'app-allot-menu',
  templateUrl: './allot-menu.component.html',
  styleUrls: ['./allot-menu.component.scss'],
  animations: [zoomInRight]
})
export class AllotMenuComponent implements OnInit {
  @Input() item: any;
  @Output() close = new EventEmitter();  // 用于向父级发送弹窗关闭事件
  public menuTree: Array<any>;  // 目录树
  public allotMenuArr: Array<any> = []; // 临时数组

  public data: any[] = [];

  public disabled = false;

  public treeOptions: Object = { displayField: 'MenuName', childrenField: 'SubLinks', isExpandedField: 'expanded' };  // 树组件设置
  constructor(
    private fb: FormBuilder,
    private eventsService: EventsService,
    private roleManageService: RoleManageService
  ) { }

  ngOnInit() {
    this.GetAllMenuTree(this.item);
  }

  saveHandler(e) {
    this.filterArr(this.menuTree[0]);
  }

  filterArr(node) {
    const arr = (node) => {
      node.SubLinks.forEach((child) => {
        if (child.HasRight) {
          this.allotMenuArr.push(child.ID);
        }

        if (child.SubLinks && child.SubLinks.length) {
          arr(child);
        }
      });
    };
    arr(node);
    this.AllotMenuIdToRole(this.item, this.allotMenuArr);
  }


  closeHandler(e) {
    this.close.emit(null);
  }



  onChange(toggleNode: any) {

    const toggleChildren = (node: any) => {
      if (node.SubLinks) {
        node.SubLinks.forEach((child: any) => {
          child.HasRight = node.HasRight;
          if (child.SubLinks && child.SubLinks.length) {
            toggleChildren(child);
          }
        });
      }
    };
    toggleChildren(toggleNode);
    const updateParent = (tree, toggleNode, parentID) => {
      const equalSiblings = true;
      tree.SubLinks.forEach((node) => {
        if (node.ID === parentID) {
          node.HasRight = true;
          findParent(this.menuTree[0], node, -1);
        } else if (node.SubLinks && node.SubLinks.length) {
          updateParent(node, toggleNode, parentID);
        }
      });
    };

    const findParent = (tree, childNode, parentID?) => {
      tree.SubLinks.forEach((item) => {
        if (item.ID === childNode.ID) {
          updateParent(this.menuTree[0], toggleNode, parentID);
        } else if (item.SubLinks && item.SubLinks.length) {
          findParent(item, childNode, item.ID);
        }
      });
    };

    findParent(this.menuTree[0], toggleNode, -1);
  }

  GetAllMenuTree(data) {
    const _data = { RoleId: data.ID };
    this.roleManageService.GetAllMenuTreeByRoleId(_data).subscribe((res) => {
      if (res.State) {
        const _arr = [];  // 临时数组
        _arr.push(res.Data);
        _arr[0].expanded = true; // 设置默认展开
        this.menuTree = _arr;  // 渲染树
      }
    });
  }



  AllotMenuIdToRole(data, array) {
    const _data = { RoleId: data.ID, MenuIds: array };
    this.disabled = true;
    this.roleManageService.AllotMenuIdToRole(_data).subscribe((res) => {
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      this.close.emit(null);
    });
  }


}
