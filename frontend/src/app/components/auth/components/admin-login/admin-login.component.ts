import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginModel } from '../../models/login.model';
import { NgForm } from '@angular/forms';
import { SharedModule } from '../../../../common/shared/shared.module';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {


  constructor(
    private _auth: AuthService,
    private _toastr: ToastrService,
    private _router: Router
  ){}
  

  login(form:NgForm){
    if(form.valid){
      let model = new LoginModel();
      model.email = form.controls["email"].value;
      model.password = form.controls["password"].value;

      this._auth.adminLogin(model, res=>{
        if(!res.succeded){
          this._toastr.error("Hata!",res.data.message);
          return;
        }
        this._toastr.success("Giriş başarılı!");
        localStorage.setItem("role","admin");
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        this._router.navigateByUrl("/admin");
      })
    }
  }
}
