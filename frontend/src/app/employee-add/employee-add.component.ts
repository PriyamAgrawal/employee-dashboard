import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router'
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';

const uri = 'http://localhost:9000/employee/upload';
@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  skills = new FormControl();
  skillsList: string[] = ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5', 'Skill 6', 'Skill 7', 'Skill 8', 'Skill 9', 'Skill 10'];

  uploader:FileUploader = new FileUploader({url:uri});
  attachmentList:any = [];
  imageName: string;

  name: string;
  salary: number;
  dob: Date;
  msg: string;
  constructor(private employeeService: EmployeeService, private router: Router) {
    this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {
      this.attachmentList.push(JSON.parse(response));
      this.imageName = this.attachmentList[0].uploadname
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.salary)
    if(this.name == undefined || this.dob == undefined || this.salary == undefined || this.skills.value == null) {
      this.msg = "There are some Fields missing"
    } else {
      const newEmployee ={
        name: this.name,
        dob: this.dob,
        salary: this.salary,
        skills: this.skills.value,
        image: this.imageName
      }
      // console.log(newEmployee)
      this.employeeService.addEmployee(newEmployee)
        .subscribe(data => {
          if(data) {
            if(data.msg) {
              this.msg = data.msg;
            }
            else {
              this.router.navigateByUrl('/')
            }
          } else {
            console.log('error')
          }
        })
      // console.log(this.skills.value)
    }
  }

}
