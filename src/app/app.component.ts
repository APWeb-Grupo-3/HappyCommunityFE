import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from './services/login.service';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'HappyCommunity';
  role:string="";
  isSubMenuOpen: boolean = false;
  username:string="";
  

  constructor(private loginService: LoginService) {

  }
  
  cerrar() {
    sessionStorage.clear();
  }

  verificar() {
    this.role=this.loginService.showRole();
    this.username=this.loginService.showUsername();
    return this.loginService.verificar();
  }
  validarRol(){
    if(this.role=='ADMINISTRADOR' || this.role=='VECINO'){
      return true;
    }else{
      return false;
    }
  }
  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }

}