import { SwalService } from './../../../../common/services/swal.service';
import { UpdateUserProgramComponent } from './../update-user-program/update-user-program.component';
import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { TableModule } from 'primeng/table';
import { UserModel } from '../../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SetProgramToUserComponent } from '../set-program-to-user/set-program-to-user.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [SharedModule,TableModule,IconFieldModule,InputIconModule,SetProgramToUserComponent,UpdateUserProgramComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  userId:string;
  updatedUserId:string;
  updatedUserProgramId:string;
  users:UserModel[]=[];
  constructor(private _toastr:ToastrService, private userService:UserService,private _swal:SwalService){

  }


  ngOnInit(){
    this.getAll();
  }
  getAll(){
    this.userService.getAll((res)=>
      this.users = res.data
    )
  }
  removeUserProgram(userProgramId:string){
    this._swal.callSwal("Programı kaldır","Programı kaldırmak istiyor musunuz?","Kaldır",()=>{
      this.userService.removeUserProgram(userProgramId,res=>{
        this._toastr.error(res.message);
        location.reload();
      }
     )
    })
 
  }
  setUpdate(userId:string,userProgramId:string){
    this.updatedUserId = userId;
    this.updatedUserProgramId = userProgramId;
  } 
  statusChange(userId:string){
    this._swal.callSwal("Kullanıcı durumunu değiştirmek istiyor musunuz?","Kullanıcı Durumunu Değiştir","Değiştir",()=>{
      this.userService.statusChange(userId,res=>{
        this._toastr.info(res.message)
        location.reload();
      })
    })

  }
}
