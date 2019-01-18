
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../shared/student.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(public studentService: StudentService) { }
  submitted: boolean;
  showSuccessMessage: boolean;
  formControls = this.studentService.form.controls;
  
  ngOnInit() {
  }
  
  
  
  onSubmit() {
    this.submitted = true;
    if (this.studentService.form.valid) {
      if (this.studentService.form.get('$key').value == null)
        this.studentService.insertCustomer(this.studentService.form.value);
      else
        this.studentService.updateCustomer(this.studentService.form.value);
      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 3000);
      this.submitted = false;
      this.studentService.form.reset();
      //this is to be done for proper reset operation
      this.studentService.form.setValue({
        $key: null,
        name: '',
        email: '',
        phone: '',
        dob: ''
      });
    }

  }

    
  

   
}
