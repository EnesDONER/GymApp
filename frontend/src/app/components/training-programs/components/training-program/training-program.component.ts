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
    const pdf = new jsPDF('p', 'pt', 'a4');
    const table = document.getElementById('table');
    table.style.display = 'block';

    html2canvas(table, { scrollY: -window.scrollY, scale: 2  }).then((canvas) => { // Ölçek faktörü 2 olarak belirlendi (örneğin)
        const imgData = canvas.toDataURL('image/jpeg');
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        pdf.addImage(imgData, 'JPEG', 10, 10, imgWidth/1.5, imgHeight/2);

        pdf.save('program.pdf');
    });
    table.style.display = 'none';
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

