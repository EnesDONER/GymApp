import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../common/shared/shared.module';
import { OffcanvasComponent } from '../offcanvas/offcanvas.component';
import { ContentDetails } from '../../content/models/content-details.model';
import { ContentService } from '../../content/services/content.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule,OffcanvasComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isOpen :boolean =false;
  whatsappUrl:string='';
  homeContents:ContentDetails={
    email:'',
    address:'',
    phone:'',
    logo:'',
    instagram:'',
    slider1:undefined,
    slider2:undefined,
    slider3:undefined,
    slider4:undefined,
    slider5:undefined

  };
  constructor(private contentService:ContentService){
    this.get();
  }
  async ngOnInit():Promise<void> {
    await this.get();
    this.isAuth();
    this.whatsappUrl = "https://wa.me/90"+this.homeContents.phone+"?text=Merhaba%20bilgi%20alabilir%20miyim?"

   
  }

  async get() {
    try {
      const res =  await this.contentService.get('homepage')
      this.homeContents =  res.data.find(d=>d.type=='sliderArena').content;
      
    } catch (error) {
        console.error(error);
    }
    }
  
  canvasOpen(){
    this.isOpen != this.isOpen;
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
