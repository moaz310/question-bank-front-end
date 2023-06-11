import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {
  signupForm!: FormGroup;
  roles = ['Student', 'Teacher'];

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      role: new FormControl('Teacher'),
      email: new FormControl(null, [ Validators.required, Validators.email])
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm).subscribe({
        next: (data)=>{console.log(data)},
        error: (err) => {console.log(err)}
      });
    }
  }
}
