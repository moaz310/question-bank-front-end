import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  userName!: string|null;
  userRole!: string|null;
  isTeacher = localStorage.getItem(this.aurhService.USER_ROLE) === 'Teacher';

  constructor(private router: Router,
              private aurhService: AuthService){}
  

  ngOnInit(): void {
    this.userRole = localStorage.getItem(this.aurhService.USER_ROLE);
    this.userName = this.aurhService.user.userName;
  }
  goToQuestions(){
    this.router.navigate(['questions-list']);
  }
}
