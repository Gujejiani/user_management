import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
interface PagingData {
  curPageIndex: number;
  endIndex: number;
  pageSize: number;
  disabled: boolean;
  pageIndex: number;
}
@Injectable()
export class UserFacade {
  curPageIndex = 0;
  endIndex = 4;
  pageSize = 4;
  disabled = false;
  pageIndex = 0;

  private pagingDataSubject = new BehaviorSubject({
    curPageIndex: this.curPageIndex,
    endIndex: this.endIndex,
    pageSize: this.pageSize,
    disabled: this.disabled,
    pageIndex: this.pageIndex,
  });
  pagingData$ = this.pagingDataSubject.asObservable();
  /**
   *
   * @returns retrieved paging data
   */
  getPagingData() {
    const pagingData = {
      curPageIndex: this.curPageIndex,
      endIndex: this.endIndex,
      pageSize: this.pageSize,
      disabled: this.disabled,
      pageIndex: this.pageIndex,
    };
    this.pagingDataSubject.next(pagingData);
    return pagingData;
  }

  /**
   *
   * @param data
   * @description whenever paging changes it updates properties
   */
  handlePageEvent(data: { pageIndex: number }) {
    if (this.pageIndex < data.pageIndex) {
      this.curPageIndex += 4;
      this.endIndex += 4;
    } else {
      this.curPageIndex -= 4;
      this.endIndex -= 4;
    }
    this.pageIndex = data.pageIndex;
    this.getPagingData();

    localStorage.setItem(
      'pagingData',
      JSON.stringify({
        curPageIndex: this.curPageIndex,
        endIndex: this.endIndex,
        pageSize: this.pageSize,
        disabled: this.disabled,
        pageIndex: this.pageIndex,
      })
    );
  }

  setSavedPagingData() {
    const data = localStorage.getItem('pagingData');
    if (data) {
      const parsedData = JSON.parse(data) as PagingData;
      this.curPageIndex = parsedData.curPageIndex;
      this.endIndex = parsedData.endIndex;
      (this.pageSize = parsedData.pageSize),
        (this.disabled = parsedData.disabled),
        (this.pageIndex = parsedData.pageIndex);
      this.getPagingData();
    }
  }

  resetPages() {
    this.curPageIndex = 0;
    this.endIndex = 4;
    this.pageIndex = 0;
    this.getPagingData();
  }
}
