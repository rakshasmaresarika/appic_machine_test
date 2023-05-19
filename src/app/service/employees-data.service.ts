import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeesDataService {

  constructor(private httprequests: HttpClient) { }

  // get request for employee data
  getEmployees(){
     return this.httprequests.get("https://dummy.restapiexample.com/api/v1/employees")
  }
}
