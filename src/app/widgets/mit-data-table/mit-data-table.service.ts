import { Injectable } from '@angular/core';




@Injectable()
export class MitDataTableService {

  constructor() { }
  /**
   * ？ 可选
   * currentPage: 当前页面
   *
   */
  check(currentPage?: number, pageSize?: number, array?: Array<any>): Promise<any> {
    const p = new Promise((resolve, reject) => {
      _.find(array, (o) => {
        if (o.pageNum === currentPage) {
          resolve(false);
        }
      });
      resolve(true);
    });
    return p;
  }
  get(currentPage?: number, pageSize?: number, array?: Array<any>): Promise<any> {
    const p = new Promise((resolve, reject) => {
      _.find(array, (item) => {
        if (item.pageNum === currentPage) {
          resolve(item.data);
        }
      });
    });
    return p;
  }

}
