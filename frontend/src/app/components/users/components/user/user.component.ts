import { UserService } from './../../services/user.service';
import { Component, ViewChild } from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { Table, TableModule } from 'primeng/table';
import { UserModel } from '../../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [SharedModule,TableModule,IconFieldModule,InputIconModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  users:UserModel[]=[];
  @ViewChild('dt') dt: Table | undefined;
  constructor(private _toastr:ToastrService, private userService:UserService){

  }


  ngOnInit(){
    this.getAll();
  }
  getAll(){
    this.userService.getAll((res)=>
      this.users = res.data
    )
  }

}
