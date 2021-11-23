import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {employee} from "./../Models/employee";
import {map} from "rxjs/operators";

@Injectable()
export class EmployeeService {

    constructor(private http:HttpClient) {

    }

    findById(id: string): Observable<employee> {
        return this.http.get<employee>(`/api/employeeapi/${id}`);
    }

    findAllEmployess(): Observable<employee[]> {
        return this.http.get('/api/employeeapi')
            .pipe(
                map((res:any) => res['payload'])
            );
    }

    // findAllCourseLessons(courseId:number): Observable<Lesson[]> {
    //     return this.http.get('/api/lessons', {
    //         params: new HttpParams()
    //             .set('courseId', courseId.toString())
    //             .set('pageNumber', "0")
    //             .set('pageSize', "1000")
    //     }).pipe(
    //         map(res =>  res["payload"])
    //     );
    // }

    findEmployees(EmpId:string, filter = '', sortOrder = 'asc',
        pageNumber = 0, pageSize = 3):  Observable<employee[]> {

        return this.http.get('/api/employee', {
            params: new HttpParams()
                .set('Oid', EmpId)
                .set('filter', filter)
                .set('sortOrder', sortOrder)
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
        }).pipe(
            map((res: any) =>  res["payload"])
        );
    }

}