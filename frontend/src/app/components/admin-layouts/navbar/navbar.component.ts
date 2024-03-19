import { Component } from '@angular/core';
import { SharedModule } from '../../../common/shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private _router:Router){

  }

  logout(){
    if(typeof localStorage !== 'undefined'){
      localStorage.clear();
    }
    this._router.navigateByUrl("/admin-login");
  }
}
