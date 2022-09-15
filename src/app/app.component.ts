import { Component, VERSION, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ValidatorFn,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  myForm: FormGroup;
  userList: any = [];
  submitted: boolean = false;
  isUpdate: boolean = false;
  updateId: number = -1;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group(
      {
        fName: ['', Validators.required],
        lName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        company: ['', Validators.required],
        gender: ['', Validators.required],
        dt: ['', Validators.required],
        pass: ['', Validators.required],
        cPass: ['', Validators.required],
      },
      { validators: passwordMatchingValidatior }
    );
  }

  add() {
    this.myForm.reset();
    this.updateId = -1;
  }

  onSubmit(form: FormGroup) {
    console.log(form);
    console.log(form.valid);
    if (form.valid) {
      this.submitted = true;
      let data = {
        fName: form.value.fName,
        lName: form.value.lName,
        email: form.value.email,
        phone: form.value.phone,
        company: form.value.company,
        gender: form.value.gender,
        dt: form.value.dt,
        pass: form.value.pass,
        cPass: form.value.cPass,
      };

      if (this.updateId > -1) {
        this.userList[this.updateId] = data;
      } else {
        this.userList.push(data);
      }

      this.myForm.setValue({
        fName: '',
        lName: '',
        email: '',
        phone: '',
        company: '',
        gender: '',
        dt: '',
        pass: '',
        cPass: '',
      });

      this.myForm.reset();
      this.updateId = -1;
    }
  }

  reset() {
    this.myForm.reset();
  }

  setValues(i: number) {
    this.isUpdate = true;
    this.updateId = i;
    let user = this.userList[i];
    this.myForm.setValue({
      fName: user.fName,
      lName: user.lName,
      email: user.email,
      phone: user.phone,
      company: user.company,
      gender: user.gender,
      dt: user.dt,
      pass: user.pass,
      cPass: user.cPass,
    });
  }

  delete(i: number) {
    this.userList.splice(i, 1);
  }
}

export const passwordMatchingValidatior: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('pass');
  const confirmPassword = control.get('cPass');
  return password?.value === confirmPassword?.value
    ? null
    : { notmatched: true };
};
