import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../common/shared/shared.module';
import { OffcanvasComponent } from '../offcanvas/offcanvas.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule,OffcanvasComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isOpen :boolean =false;

  canvasOpen(){
    this.isOpen != this.isOpen;
  }

  ngOnInit(){
    this.isAuth();
  } 
  logout(){
    localStorage.clear();
  }
  
  
  isAuth(){
    let token;
    if(localStorage){
      token = localStorage.getItem('token');
    }
  
    if (token) {
      return true;
    }else{
      return false
    }
  }
}
