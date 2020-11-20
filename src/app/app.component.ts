import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  registerArray = []
  registerform: FormGroup;
  toggleBool: boolean = true;

  constructor(private formBuilder: FormBuilder) { }
  title = 'assessment2';

  
  private words2: Array<any> = [];
  private newAttribute: any = {};


  ngOnInit() {
    this.registerform = this.formBuilder.group({
      firstname: ['', Validators.required],
      zip: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$|^\d{10}-\d{9}$/)]],
      dob: ['', Validators.required],
      email: ['', Validators.required],
      lastname: ['', Validators.required],
      phone2: ['', Validators.pattern(/^\d{10}$|^\d{10}-\d{9}$/)],
    })
  }

  get f() { return this.registerform.controls;}

  connt = 0
  async onSubmit() {
    var value = await this.validemial(this.registerform.getRawValue().email)
    if (!value) {
      Swal.fire({
        icon: 'error',
        // title: 'Oops...',
        text: 'Please enter valid Email [example@gmail.com]',
        // footer: '<a href>Why do I have this issue?</a>'
      })
      return
    }
    var obj = {
      id: Number(this.connt++),
      firstname: this.registerform.getRawValue().firstname,
      zip: this.registerform.getRawValue().zip,
      state: this.registerform.getRawValue().state,
      country: this.registerform.getRawValue().country,
      address: this.registerform.getRawValue().address,
      phone: this.registerform.getRawValue().phone,
      dob: this.registerform.getRawValue().dob,
      email: this.registerform.getRawValue().email,
      lastname: this.registerform.getRawValue().lastname,
      phone2: this.registerform.getRawValue().phone2,
      check: false
    }
    this.registerArray.push(obj)
    this.registerform.reset()
    this.registerform.setErrors({ 'firstname': null });
    this.words2 = []
    this.registerform.updateValueAndValidity();
  }

  numbers = []
  addmore(): void {
    this.words2.push(this.newAttribute);
    this.newAttribute = {};
  }


  deletemore(index: number) {
    this.words2.splice(index, 1);
  }
  validemial(email) {
    var value
    if (this.emilavalid(email)) {
      return value = true
    } else {
    }
    return value
  }
  emilavalid(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  checktrue(user) {
    for (let m of this.registerArray) {
      if (m.id == user.id) {
        if (m.check) {
          m.check = false
        } else {
          m.check = true
        }
      }
    }
  }


  checktrueall() {
    for (let m of this.registerArray) {
      if (m.check) {
        m.check = false
      } else {
        m.check = true
      }
    }
  }

  show = false
  onOptionsSelected() {
    if (this.registerform.getRawValue().country) {
      this.show = true
    } else {
      this.show = false
    }
  }

  _numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  delete() {
    var connt = 0
    for (let d of this.registerArray) {
      if (d.check) {
        connt++
      }
    }
    var data = this.registerArray
    var arry = []
    Swal.fire({
      title: `${connt} records are selected ,Are you sure`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.registerArray = []
        for (let m of data) {
          if (!m.check) {
            arry.push(m)
          }
        }

        this.registerArray = arry
        console.log(this.registerArray)
        Swal.fire(
          'Deleted!',
          'Selected rocords deleted sucessfully.',
          'success'
        )
      }
    })
  }

  deleteRow(user) {
    if (confirm("Are you sure you want to delete this?")) {
      const index = this.registerArray.indexOf(user);
      this.registerArray.splice(index, 1);
      alert("Yes i want to delete")
    }else{
      alert("No i don't want to delete")
    }
  }


}
