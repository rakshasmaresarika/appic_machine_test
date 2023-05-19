import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'employees'
})
export class EmployeesPipe implements PipeTransform {

  transform(employees: any[], searchKeyword: string): any[] {
    if (!searchKeyword) {
      return employees;
    }

    const filteredEmployees = employees.filter(employee =>
      employee.employee_name.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    return filteredEmployees;
  }

}
