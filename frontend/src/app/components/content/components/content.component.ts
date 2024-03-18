import { ContentService } from './../services/content.service';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../common/shared/shared.module';
import { HomeComponent } from '../../home/home.component';
import { NavbarComponent } from '../../layouts/navbar/navbar.component';
import { FooterComponent } from '../../layouts/footer/footer.component';
import { LayoutsComponent } from '../../layouts/layouts.component';
import { NgForm } from '@angular/forms';
import { ContentModel } from '../models/content.model';
import { ContentDetails } from '../models/content-details.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [SharedModule,HomeComponent,NavbarComponent,FooterComponent,LayoutsComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit{
  selectedFile: File | undefined;
  selectedFileName: string | undefined;
  contentId:string;
  exceedMaxFiles: boolean = false;
  images: File[] = [];
  imageUrls: any[] = [];
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
  

  constructor(
    private contentService:ContentService,
    private _toastr:ToastrService
  ){

  }
  async ngOnInit():Promise<void> {
    await this.get();
   
  }

  setImage(){
    this.imageUrls.push(
      { imageUrl:  this.homeContents.slider1},
      { imageUrl:this.homeContents.slider2},
      { imageUrl:this.homeContents.slider3},
      { imageUrl:this.homeContents.slider4},
      { imageUrl:this.homeContents.slider5},
      
      )
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.selectedFileName = " - "+ this.selectedFile?.name;
  }
  getImages(event: any) {
    

    const file: File[] = Array.from(event.target.files);
    this.images.push(...file);
    if (file.length > 5) {
      this.exceedMaxFiles = true;
      this._toastr.error("En fazla 5 fotoğraf eklenebilir!")
      return;
    }
    for (let i = 0; i < event.target.files.length; i++) {
      const element = event.target.files[i];

      const reader = new FileReader();
      reader.readAsDataURL(element);

      reader.onload = () => {
        const imageUrl = reader.result as string;
        this.addImage(imageUrl, file);
      }
    }
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



  removeImage(name: string, size: number, index: number) {
    this.imageUrls.splice(index, 1);
    let i = this.images.findIndex(p => p.name == name && p.size == size);
    this.images.splice(i, 1);
  }
  addImage(imageUrl: string, file: any) {
    this.imageUrls.push(
      { imageUrl: imageUrl, name: file.name, size: file.size }
    );
  }
  add(form: NgForm){

    if (form.valid) {
      let movement = form.value;
      let address = movement["address"];
      let phone = movement["phone"];
      let email = movement["email"];

      const content : any ={
        address: address,
        phone:phone,
        email:email
      }

      

      let formData = new FormData();
      formData.append("content", JSON.stringify(content));
      formData.append("page", 'homepage');
      formData.append("type", 'sliderArena');
      formData.append("logo", this.selectedFile);

      formData.append("slider1", this.images[0]);
      formData.append("slider2", this.images[1]);
      formData.append("slider3", this.images[2]);
      formData.append("slider4", this.images[3]);
      formData.append("slider5", this.images[4]);

      this.contentService.update(formData,res=>  {
        this._toastr.warning(res.message);
        location.reload();
      })
    }
  }
}
