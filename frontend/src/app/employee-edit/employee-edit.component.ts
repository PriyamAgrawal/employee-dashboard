import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  empID: number;
  skills = new FormControl();
  skillsList: string[] = ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5', 'Skill 6', 'Skill 7', 'Skill 8', 'Skill 9', 'Skill 10'];
  mySkills: any;
  name: string;
  salary: number;
  dob: Date;
  constructor(private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute) {
  	this.route.queryParams.subscribe(params => {
	  this.empID = params['id'];
	})
  }
  ngOnInit() {
  	this.employeeService.getSingleEmployee(this.empID)
		.subscribe(data => {
			this.name = data[0].name;
			this.salary = data[0].salary;
			this.dob = data[0].dob;
      this.mySkills = data[0].skills
		})
  }

  onSubmit() {
  	const newEmployee ={
  		name: this.name,
  		dob: this.dob,
  		salary: this.salary,
  		skills: this.skills.value
  	}

  	this.employeeService.editEmployee(this.empID, newEmployee)
		.subscribe(data => {
			if(data) {
  				this.router.navigateByUrl('/')
  			} else {
  				console.log('error')
  			}
		})
  }

  deleteEmployee() {
  	this.employeeService.deleteEmployee(this.empID)
  		.subscribe( data => {
  			if(data) {
  				this.router.navigateByUrl('/')
  			} else {
  				console.log('error')
  			}
  		})
  }

}
