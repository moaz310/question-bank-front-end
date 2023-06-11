import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { User } from '../user.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit, OnChanges{
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem(this.authService.JWT_TOKEN)){
      this.router.navigate(['user'])
    }
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnChanges(): void {
    if(localStorage.getItem(this.authService.JWT_TOKEN)){
      this.router.navigate(['user'])
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm).subscribe({
        next: (data)=>{
          this.authService.setUser(this.loginForm.get('userName')?.value, data['access_token']);
          this.authService.storeToken(data['access_token'], data['refresh_token']);
          console.log(this.authService.user);
          this.router.navigate(['user']);
        },
        error: (err) => {console.log(err)}
      });
    }
  }
}
