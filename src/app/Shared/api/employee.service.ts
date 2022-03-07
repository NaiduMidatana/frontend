import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import M_Employee from '../models/Employee';

@Injectable()
export default class SugarLevelService {
  // public API = 'http://localhost:64861/api';
  public API = 'http://10.22.28.5:1993/api';
  public EMPLOYEE_API = `${this.API}/Employee/GetAllEmployee`;
  public EMPLOYEE_EDITAPI = `${this.API}/Employee/GetEmployeeById?id=`;
  public EMPLOYEE_SAVEAPI = `${this.API}/Employee/SaveEmployee`;
  public EMPLOYEE_DELETAPI = `${this.API}/Employee/SaveEmployee`;

  constructor(private http: HttpClient) {}

  

  save(sugarLevel: M_Employee): Observable<M_Employee> {
    let result: Observable<M_Employee>;
    if (sugarLevel.EmployeeId) {
      result = this.http.put<M_Employee>(
        `${this.EMPLOYEE_SAVEAPI}/${sugarLevel.EmployeeId}`,
        sugarLevel
      );
    } else {
      result = this.http.post<M_Employee>(this.EMPLOYEE_SAVEAPI, sugarLevel);
    }
    return result;
  }

  remove(id: number) {
    return this.http.delete(`${this.EMPLOYEE_DELETAPI}/${id.toString()}`);
  }
}
