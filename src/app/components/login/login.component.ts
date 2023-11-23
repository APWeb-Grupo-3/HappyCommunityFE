import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtRequest } from 'src/app/models/jwtRequest';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private loginService: LoginService, private router: Router, private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    ) { }
  username: string = ""
  password: string = ""
  mensaje: string = ""
  form: FormGroup = new FormGroup({});

  ngOnInit(): void {

  }
  login() {
    let request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;
    
    this.loginService.login(request).subscribe((data: any) => {
      sessionStorage.setItem("token", data.jwttoken);

      this.router.navigate(['components/condominios']);
    }, error => {
      this.mensaje = "Credenciales incorrectas!!!"
      this.snackBar.open(this.mensaje, "Aviso",{duration:2000});
    });
  }
  
}
