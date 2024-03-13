import { SharedModule } from './../../../../common/shared/shared.module';
import { ToastrService } from 'ngx-toastr';
import { TrainingProgramService } from './../../services/training-program.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgramMovementModel } from '../../models/program-movement.model';
import { ProgramMovementDayModel } from '../../models/program-movement-day.model';
import { AddProgramMovementComponent } from '../add-program-movement/add-program-movement.component';
import { UpdateProgramMovementComponent } from '../update-program-movement/update-program-movement.component';
import { SwalService } from '../../../../common/services/swal.service';
import {jsPDF} from "jspdf";
import html2canvas from 'html2canvas';
import { DetailsMovementComponent } from '../../../movements/components/details-movement/details-movement.component';


@Component({
  selector: 'app-training-program',
  standalone: true,
  imports: [SharedModule,AddProgramMovementComponent,UpdateProgramMovementComponent,DetailsMovementComponent],
  templateUrl: './training-program.component.html',
  styleUrl: './training-program.component.css'
})
export class TrainingProgramComponent implements OnInit{

  updatedMovementId :string;
  updatedNumberOfSets :number;
  updatedNumberOfRepetitions :number;

  currentMovementId:string;

  addedProgramDay:string;
  programId:string;
  program:ProgramMovementModel;
  pazartesi:ProgramMovementDayModel[];
  sali:ProgramMovementDayModel[];
  carsamba:ProgramMovementDayModel[];
  persembe:ProgramMovementDayModel[];
  cuma:ProgramMovementDayModel[];
  cumartesi:ProgramMovementDayModel[];
  pazar:ProgramMovementDayModel[];
  deneme:string='sad';

  constructor(
    private _activated: ActivatedRoute,
    private trainingProgramService:TrainingProgramService,
    private _toastr:ToastrService,
    private _swal:SwalService
  ){
   
  }


  makePDF() {
    const pdf = new jsPDF('landscape', 'pt', 'a3');
    const element = document.getElementById('kanban');

    if(this.isAdmin()){
      // @ts-ignore
      element.style.zoom = "0.55";
      const addMovementButtons = document.querySelectorAll('.addMovementButton');
      const icon = document.querySelectorAll('.fas');

      // @ts-ignore
      addMovementButtons.forEach(b=>b.style.display = 'none')
      // @ts-ignore
      icon.forEach(b=>b.style.display = 'none')
      
    }else{
      // @ts-ignore
      element.style.zoom = "0.6";
    }

    const elementHight = element.style.height;
    element.style.height = "120rem";

    const button = document.querySelector('#kanban .btn.btn-primary.float-right');
    // @ts-ignore
    button.style.display = 'none';


    html2canvas(element, {scrollY: -window.scrollY,scale:1.5}).then((canvas) => {
        const imgData = canvas.toDataURL();
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // HTML içeriğini döndür
        const ctx = canvas.getContext('2d');
        ctx.translate(canvas.width, canvas.height);
        ctx.rotate(Math.PI);
        
        // Döndürülmüş içeriği PDF'e ekle
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);

        pdf.save('program.pdf');
         // @ts-ignore
        element.style.zoom = "1";
        element.style.height = elementHight;
         // @ts-ignore
        button.style.display = 'block';

        if(this.isAdmin()){
          location.reload();
        }
    });
}

  async ngOnInit():Promise<void> {
        this._activated.params.subscribe(res=>{
      if(res["id"]){
      this.programId = res["id"];
      }
    })
    if(this.isAdmin()){
      await this.getById();

    }else{
      await this.get();
    }
  }

  async get() {
    try {
        const res = await this.trainingProgramService.getProgramMovement();
        this.program = res.data; 
        await this.setProgramDay();
    } catch (error) {
        console.error(error);
    }
  }

  async getById() {
    try {
        const res = await this.trainingProgramService.getProgramMovementById(this.programId);
        this.program = res.data; 
        await this.setProgramDay();
    } catch (error) {
        console.error(error);
    }
  }
  removeProgramMovement(id:string){
    this._swal.callSwal("Hareket Sil","Hareketi Silmek istiyor musnuz?","Sil",()=>{
      this.trainingProgramService.removeProgramMovementById(id,res=>
        this._toastr.error(res.message))
      location.reload();
    })
   
  }

  isAdmin():boolean{
    const role = localStorage?.getItem("role")
    if(role && role == 'admin'){
      return true;
    }
    else{
      const kanban = document.getElementById('kanban');
      kanban.style.marginLeft = '0px';
      return false;
    }
  }

  setProgramDay(){
    this.pazartesi= this.program.Pazartesi;
    this.sali= this.program.Sali;
    this.carsamba= this.program.Carsamba;
    this.persembe= this.program.Persembe;
    this.cuma= this.program.Cuma;
    this.cumartesi= this.program.Cumartesi;
    this.pazar= this.program.Pazar;
  }
  setUpdateValue( 
    movementId:string,
    numberOfSets:number,
    numberOfRepetitions:number
   ){
    this.updatedNumberOfRepetitions =numberOfRepetitions
    this.updatedNumberOfSets = numberOfSets;
    this.updatedMovementId = movementId;

  }
}
function html2pdf(element: HTMLElement, arg1: { margin: number; filename: string; image: { type: string; quality: number; }; html2canvas: { scale: number; }; jsPDF: { unit: string; format: string; orientation: string; }; }) {
  throw new Error('Function not implemented.');
}

