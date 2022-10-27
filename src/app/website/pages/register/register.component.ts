import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements  OnInit {

  formSignUp!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formSignUp = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(15),
        ],
      ],

      email: ['', [Validators.required, Validators.email]],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
        ],
      ],

      role: ['', [Validators.required]],
    });
  }

  send(): any {
    console.log(this.formSignUp.value);
    this.createUser();
  }

  createUser() {
    this.usersService
      .create({
        name: this.formSignUp.value.name,
        email: this.formSignUp.value.email,
        password: this.formSignUp.value.password,
        role: this.formSignUp.value.role,
      })
      .subscribe((rta) => {
        this.router.navigate(['/login']);
        console.log(rta);

      });
  }

  // onExit() {
  //   const rta = confirm('estas seguro que quieres salir?');
  //   return rta;
  // }
}
