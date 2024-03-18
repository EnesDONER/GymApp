import { LoginComponent } from './../../auth/components/login/login.component';
import { ContentService } from './../../content/services/content.service';
import { ContentComponent } from './../../content/components/content.component';
import { Component, OnInit } from '@angular/core';
import { ContentDetails } from '../../content/models/content-details.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{

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
  }

  async ngOnInit():Promise<void> {
    await this.get();
   
  }

  async get() {
    try {
      const res =  await this.contentService.get('homepage')
      this.homeContents =  res.data.find(d=>d.type=='sliderArena').content;
      
    } catch (error) {
        console.error(error);
    }
    }

}
