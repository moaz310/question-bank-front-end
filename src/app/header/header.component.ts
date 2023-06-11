import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  constructor(public authService: AuthService,
              private router: Router){
                
              }

  logOut(){
    this.authService.logout().subscribe({
      next:()=>{
        this.router.navigate(['login']);
      }
    });
  }
}
