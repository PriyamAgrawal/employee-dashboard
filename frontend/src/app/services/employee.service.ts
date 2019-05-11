import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { employee } from '../employee';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: Http) { }

  getEmployees() {
  	return this.http.get('http://localhost:9000/employee/list')
  		.pipe(map(res => res.json()));
  }

  getSingleEmployee(id) {
    return this.http.get('http://localhost:9000/employee/get?empID='+id)
      .pipe(map(res => res.json()));
  }

  addEmployee(newEmployee) {
  	var headers = new Headers();
  	headers.append('Content-Type', 'application/json');
  	return this.http.post('http://localhost:9000/employee/add', newEmployee, {headers: headers})
  		.pipe(map(res => res.json()));
  }

  deleteEmployee(id) {
  	return this.http.get('http://localhost:9000/employee/delete?empID='+id)
  		.pipe(map(res => res.json()));
  }

  editEmployee(id, newEmployee) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:9000/employee/edit?empID='+id, newEmployee, {headers: headers})
      .pipe(map(res => res.json()));
  }

}
