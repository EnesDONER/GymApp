import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';

import { SharedModule } from '../../../../common/shared/shared.module';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { LoginModel } from '../../models/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

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

      this._auth.login(model, res=>{
        if(!res.succeded){
          this._toastr.error("Hata!",res.data.message);
          return;
        }
        this._toastr.success("Giriş başarılı!");
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        this._router.navigateByUrl("/");
      })
    }
  }

}
