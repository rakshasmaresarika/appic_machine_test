import { Component, Input } from '@angular/core';
import { EmployeesDataService } from '../service/employees-data.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})

export class ChildComponent {

  constructor(private empDataService: EmployeesDataService) { }
  // receiving property from parent
  @Input() employees: any;

  originalEmployeesData: any;
  searchKeyword!: string;

  ngOnInit() {
    // store original data
    this.originalEmployeesData = [...this.employees]
  }

  // getter
  get columns(): string[] {
    if (this.employees.length > 0) {
      return Object.keys(this.employees[0]);
    }
    return [];
  }

  // sorting by salary
  sortOrder: 'ascending' | 'descending' | null = null;

  sortData() {
    if (this.sortOrder === 'ascending') {
      this.employees.sort((a: any, b: any) => a.employee_salary - b.employee_salary);
    } else if (this.sortOrder === 'descending') {
      this.employees.sort((a: any, b: any) => b.employee_salary - a.employee_salary);
    }
    if (this.sortOrder == null) {
      this.employees = this.originalEmployeesData
    }
  }


  //  dropdown of age ranges
  ageRengesSelector: any = []

  ngAfterViewInit() {
    this.ageRengesSelectorOption()
  }

  // functionality for age range selector dropdown
  ageRengesSelectorOption() {
    this.originalEmployeesData = this.employees
    let ageRanges: any = []
    this.employees.map((element: any) => {
      ageRanges.push(element.employee_age)
    });
    let selectrosValue = Math.ceil(Math.max(...ageRanges) / 20);
    let start = 1;
    for (let i = 1; i <= selectrosValue; i++) {
      this.ageRengesSelector.push({ start: start, end: start + 19 });
      start += 20;
    }
    console.log(this.ageRengesSelector);
  }


  // filter by age functionality
  filterDataByAge(selectedAge: any) {
    if (!selectedAge) {
      // not selected any range 
      return this.employees = this.originalEmployeesData
    } else {
      // filter data according to selected range
      this.employees = this.originalEmployeesData;
      let ageRenge = selectedAge.split("-")

      // get age range
      ageRenge = ageRenge.map((strNum: any) => { return strNum * 1 })

      // filtered array according to age range
      this.employees = this.employees.filter((employee: any) => {
        return parseInt(employee.employee_age) >= (ageRenge[0]) && parseInt(employee.employee_age) <= (ageRenge[1])

      })
      // console.log(this.employees);
      return this.employees
    }

  }

  // search box and search by employee name using a pipe
  searchQuery: string = '';

  filterDataByName() {
    if (this.searchQuery.trim() !== '') {
      const searchRegex = new RegExp(this.searchQuery.trim(), 'i');
      this.employees = this.employees.filter((employee: any) => searchRegex.test(employee.employee_name));
    }
  }

  //  reset button to reset all the filters
  resetFilters() {
    this.sortOrder = null;
    this.searchKeyword = '';
    this.fetchEmployees();

  }

  // fetching data for reset
  fetchEmployees() {
    this.empDataService.getEmployees().subscribe((empData: any) => {
      this.employees = empData.data;
      console.log(this.employees);
      this.filterDataByAge("")

    }, (error) => {
      console.log(error.message);
    });
    this.employees = [...this.originalEmployeesData]

  }

}
