import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {ManagePlace} from "../Models/ManagePlace";
import {MatPaginator } from '@angular/material/paginator';
import {MatSort } from '@angular/material/sort';
import {ManagePlaceService} from "../Services/manageplace.service";
import {map} from 'rxjs/operators';

export class ManagePlaceDataSource extends DataSource<ManagePlace> {
    _filterChange = new BehaviorSubject('');
  
    get filter(): string {
      return this._filterChange.value;
    }
  
    set filter(filter: string) {
      this._filterChange.next(filter);
    }
  
    filteredData: ManagePlace[] = [];
    renderedData: ManagePlace[] = [];
  
    constructor(public _Service: ManagePlaceService,
                public _paginator: MatPaginator,
                public _sort: MatSort) {
      super();
      // Reset to the first page when the user changes the filter.
      this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
    }
  
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<ManagePlace[]> {
      // Listen for any changes in the base data, sorting, filtering, or pagination
      const displayDataChanges = [
        this._Service.dataChange,
        this._sort.sortChange,
        this._filterChange,
        this._paginator.page
      ];
  
      this._Service.getAllPlaces();  
      
  
      return merge(...displayDataChanges).pipe(
        map(() => {
          // Filter data
          
          this.filteredData = this._Service.data.slice().filter((obj: ManagePlace) => {
            
            const searchStr = (obj.placeName + obj.address).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
  
          // Sort filtered data
          const sortedData = this.sortData(this.filteredData.slice());
  
          // Grab the page's slice of the filtered sorted data.
          const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
          this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
          return this.renderedData;
        }
      ));
    }
  
    disconnect() {}
  
  
    /** Returns a sorted copy of the database data. */
    sortData(data: ManagePlace[]): ManagePlace[] {
      if (!this._sort.active || this._sort.direction === '') {
        return data;
      }
  
      return data.sort((a, b) => {
        let propertyA: number | string = '';
        let propertyB: number | string = '';
  
        switch (this._sort.active) {
          case 'PlaceName': [propertyA, propertyB] = [a.placeName, b.placeName]; break;
          case 'Address': [propertyA, propertyB] = [a.address, b.address]; break;          
        }
  
        const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
        const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
  
        return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
      });
    }
  }



  // initialLoad(){
  //   let currentPage = (this.paginator?.pageIndex ?? 0)+1;
  //   this.appService.getTodos(currentPage, (this.paginator?.pageSize ?? 0))
  //   .subscribe(result => {
  //     this.totalRecords = result.totalCount;
  //     this.todos = result.data;
  //   })
  // }
 
  // pageChange(){
  //   this.paginator?.page.pipe(
  //     switchMap(() => {
  //       let currentPage = (this.paginator?.pageIndex ?? 0)+1;
  //       return this.appService.getTodos(currentPage, (this.paginator?.pageSize ?? 0));
  //     }),
  //     map( result => {
  //       if(!result){
  //         return [];
  //       }
  //       this.totalRecords = result.totalCount;
  //       return result.data;
  //     })
  //   )
  //   .subscribe(data => {
  //     this.todos = data;
  //   });
  // }
