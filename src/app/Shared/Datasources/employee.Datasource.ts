import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of} from "rxjs";
import {employee} from "../Models/employee";
import {EmployeeService} from "../Services/employee.service";
import {catchError, finalize} from "rxjs/operators";

export class EmployeesDataSource implements DataSource<employee> {

    private EmployeesSubject = new BehaviorSubject<employee[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private empService: EmployeeService) {

    }
    loadEmployees(EmpId:string,
                filter:string,
                sortDirection:string,
                pageIndex:number,
                pageSize:number) {

        this.loadingSubject.next(true);

        this.empService.findEmployees(EmpId, filter, sortDirection,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(employees => this.EmployeesSubject.next(employees));

    }

    connect(collectionViewer: CollectionViewer): Observable<employee[]> {
        console.log("Connecting data source");
        return this.EmployeesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.EmployeesSubject.complete();
        this.loadingSubject.complete();
    }

}