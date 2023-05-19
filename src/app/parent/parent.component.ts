import { Component, OnInit } from '@angular/core';
import { EmployeesDataService } from '../service/employees-data.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {
  employees: any;

  constructor(private empDataService: EmployeesDataService) {}

  // get api data
  ngOnInit() {
    this.empDataService.getEmployees().subscribe((empData: any) => {
      this.employees = empData.data;
      console.log(this.employees)
    }, (error)=> {
      console.log(error.message);
      
    });
  }
}
