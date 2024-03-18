import { ContentService } from './../content/services/content.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { GalleriaModule } from 'primeng/galleria';
import { ContentDetails } from '../content/models/content-details.model';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule,GalleriaModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  images: any[] = [
    // { itemImageSrc: 'assets/user/img/gallery/gallery-1.jpg' },
    // { itemImageSrc: 'assets/user/img/gallery/gallery-2.jpg' },
    // { itemImageSrc: 'assets/user/img/gallery/gallery-3.jpg' },
    // { itemImageSrc: 'assets/user/img/gallery/gallery-4.jpg' },
    // { itemImageSrc: 'assets/user/img/gallery/gallery-5.jpg' },
  ];
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

  // valueChange olayını tanımlayın
  onValueChange(event: any) {
    this.images = event.value;
  }

  responsiveOptions: any[];

  constructor(private contentService:ContentService ) {
 



  }

  async setImage(){
    if(this.homeContents.slider1){
      this.images.push(
        { itemImageSrc: this.homeContents.slider1});
    }
    if(this.homeContents.slider2){
      this.images.push(
        { itemImageSrc: this.homeContents.slider2});
    }
    if(this.homeContents.slider3){
      this.images.push(
        { itemImageSrc: this.homeContents.slider3});
    }
    if(this.homeContents.slider4){
      this.images.push(
        { itemImageSrc: this.homeContents.slider4});
    }
    if(this.homeContents.slider5){
      this.images.push(
        { itemImageSrc: this.homeContents.slider5});
    }

  }


  async ngOnInit():Promise<void> {
    await this.get();
    this.whatsappUrl = "https://wa.me/90"+this.homeContents.phone+"?text=Merhaba%20bilgi%20alabilir%20miyim?"
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];
  }

  async get() {
  try {
    const res =  await this.contentService.get('homepage')
    this.homeContents =  res.data.find(d=>d.type=='sliderArena').content;
    this.setImage();
    
  } catch (error) {
      console.error(error);
  }
  }




}
