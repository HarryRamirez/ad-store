import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnExit } from 'src/app/guards/exit.guard';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({

      email: ['', [Validators.required, Validators.email]],

      password: [ '', Validators.required ],
    });
  }

  send(): any {
    console.log(this.formLogin.value);
    this.login();
  }

  login() {
    this.authService.loginAndGet(
      this.formLogin.value.email,
      this.formLogin.value.password,
 )
    .subscribe(() => {
      this.router.navigate(['/profile']);
    });
  }

  // onExit() {
  //   const rta = confirm('estas seguro que quieres salir?');
  //   return rta;
  // }

}
