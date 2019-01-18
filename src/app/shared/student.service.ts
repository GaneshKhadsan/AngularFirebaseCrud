import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private firebase: AngularFireDatabase) { }
  studentList: AngularFireList<any>;

    form = new FormGroup({
    $key: new FormControl(null),
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    phone: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]),
    dob: new FormControl(''),
  });


  getStudents(){
    this.studentList = this.firebase.list('students');
    return this.studentList.snapshotChanges();
  }

  insertCustomer(student) {
    this.studentList.push({
      name: student.name,
      email: student.email,
      phone: student.phone,
      dob: student.dob
    });
  }


  populateForm(student) {
    this.form.setValue(student);
  }

  updateCustomer(student) {
    this.studentList.update(student.$key,
      {
      name: student.name,
      email: student.email,
      phone: student.phone,
      dob: student.dob
      });
  }

  deleteCustomer($key: string) {
    this.studentList.remove($key);
  }



}
