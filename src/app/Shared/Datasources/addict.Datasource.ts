import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {Addict} from "../models/Addict";
import {MatPaginator } from '@angular/material/paginator';
import {MatSort } from '@angular/material/sort';
import {addictService} from "../Services/addict.service";
import {map} from 'rxjs/operators';

export class AddictDataSource extends DataSource<Addict> {
    _filterChange = new BehaviorSubject('');
  
    get filter(): string {
      return this._filterChange.value;
    }
  
    set filter(filter: string) {
      this._filterChange.next(filter);
    }
  
    filteredData: Addict[] = [];
    renderedData: Addict[] = [];
  
    constructor(public _Service: addictService,
                public _paginator: MatPaginator,
                public _sort: MatSort) {
      super();
      // Reset to the first page when the user changes the filter.
      this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
    }
    
  


    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Addict[]> {
      // Listen for any changes in the base data, sorting, filtering, or pagination
      const displayDataChanges = [
        this._Service.dataChange,
        this._sort.sortChange,
        this._filterChange,
        this._paginator.page
      ];
  
      this._Service.getAll();
  
  
      return merge(...displayDataChanges).pipe(map( () => {
          // Filter data
          this.filteredData = this._Service.data.slice().filter((obj: Addict) => {
            
            const searchStr = (obj.addictCode + obj.currentAddress + obj.firstName + obj.lastName).toLowerCase();
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
    sortData(data: Addict[]): Addict[] {
      if (!this._sort.active || this._sort.direction === '') {
        return data;
      }
  
      return data.sort((a, b) => {
        let propertyA: number | string = '';
        let propertyB: number | string = '';
        let propertyC: number | string = '';
  
        switch (this._sort.active) {
          case 'AddictCode': [propertyA, propertyB] = [a.addictCode, b.addictCode]; break;
          case 'LastName': [propertyA, propertyB] = [a.lastName, b.lastName]; break;
          case 'FirstName': [propertyA, propertyB] = [a.firstName, b.firstName]; break;          
        }
  
        const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
        const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
  
        return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
      });
    }
  }