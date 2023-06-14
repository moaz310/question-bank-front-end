import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { User } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  userName!: string|null;
  userRole!: string|null;
  userObject!: User;
  isTeacher = localStorage.getItem(this.aurhService.USER_ROLE) === 'Teacher';

  constructor(private router: Router,
              private aurhService: AuthService){}
  

  ngOnInit(): void {
    if(localStorage.getItem('USER') != null){
      this.userObject = JSON.parse(localStorage.getItem('USER')!);
    }
    this.userRole = localStorage.getItem(this.aurhService.USER_ROLE);
    this.userName = this.userObject.userName;
  }
  goToQuestions(){
    this.router.navigate(['questions-list']);
  }
}
