import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { employee } from '../employee';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';

const tableData: employee[] = [];

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
    animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EmployeeComponent implements OnInit {

	employees: employee[];
	employee: employee;
	employeeID: number;
	name: string;
	dob: Date;
	salary: number;
	skills: boolean[];
  columnsToDisplay: string[] = ['employeeID', 'name', 'dob', 'salary', 'skills'];
  dataSource:any;

  constructor(private employeeService: EmployeeService) { }

   @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
  	this.employeeService.getEmployees()
  		.subscribe( employees => {
  			this.employees = employees
        console.log(this.employees)
        this.dataSource = new MatTableDataSource<employee>(employees);
        this.dataSource.paginator = this.paginator;
  		})
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: any) {
  	this.employeeService.deleteEmployee(id)
  		.subscribe( data => {
  			console.log(data)
  		})
    window.location.reload();
  }

  editEmployee(id: any) {
  	console.log(id)
  }

}