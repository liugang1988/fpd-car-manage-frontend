import { MitDataTableService } from './mit-data-table.service';

export class MitDataTableBase {
  public showLoading: boolean; // loading
  private mitDataTableService: MitDataTableService;  // 表格服务
  private activatedRoutes: any; // 路由
  private routers: any; // 路由

  public currentPage = 1; // 当前页面
  public rows: Array<any> = []; // 临时数组 用于缓存
  public list: Array<any>; // 表格渲染的数据集
  public totalCount = 0; // 数据总条目
  public query: any = { PageIndex: 1, PageSize: 10, IsSearchTotal: true }; // 传递过去接口的参数集合

  public text:any;
  public isModal:boolean = false;

  constructor(router, activatedRoute) {
    this.mitDataTableService = new MitDataTableService();
    this.activatedRoutes = activatedRoute;
    this.routers = router;

  }

  // 触发页面更改事件
  pageChange(e): void {
    this.currentPage = e;
    this.query.PageIndex = e;
    if (this.totalCount !== 0 && this.query.IsSearchTotal) {
      this.query.IsSearchTotal = false;
    };
    if(!this.query.IsSearchTotal && e > 1 ){
      this.isModal = true;
      this.text = '查询中...';
    }
    this.checkLocalData();
  }



  // 判断是否需要发起请求
  checkLocalData(): any {
    this.mitDataTableService.check(this.query.PageIndex, this.query.PageSize, this.rows).then((res) => {
      if (res) {
        this.rows = [];
        this.getList();
      } else {
        this.getLocalData();
      }
    });
  }

  // 获取所有数据
  getList(): any {
  }

  // 获取本地数据
  getLocalData(): any {
    this.currentPage = this.rows[0].pageNum;
    this.mitDataTableService.get(this.query.PageIndex, this.query.PageSize, this.rows).then((res) => {
      this.list = res;
      this.showLoading = false;
    });
  }

  //  新增
  add(): void {
    this.routers.navigate(['./add'], { relativeTo: this.activatedRoutes });
  }

  // 详情
  detail(item: any): void {
    this.routers.navigate(['./detail', item], { relativeTo: this.activatedRoutes });
  }


  // 修改
  modify(item: any): void {
    this.routers.navigate(['./edit', item], { relativeTo: this.activatedRoutes });
  }






}
