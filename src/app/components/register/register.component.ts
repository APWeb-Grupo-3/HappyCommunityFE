import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RolUsuario } from 'src/app/models/rolusuario';
import { Usuario } from 'src/app/models/usuario';
import { RolusuarioService } from 'src/app/services/rolusuario.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuario= new Usuario;
  mensaje: string= '';
  id: number = 0;
  edicion: boolean = false;
  listaRolUsuarios:RolUsuario[]=[]
  firstFormGroup:FormGroup=new FormGroup({})
  secondFormGroup:FormGroup=new FormGroup({})
  thirdFormGroup:FormGroup=new FormGroup({})

  tipos: { value: string; viewValue: string }[] = [
    { value: 'Varon', viewValue: 'Varon' },
    { value: 'Mujer', viewValue: 'Mujer' },
  ];
  constructor(

    private rS: RolusuarioService,
    private uS: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      idUsuario: [''],
      nombreUsuario: ['', Validators.required],
      clave: ['', Validators.required],
      rol: ['', Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', Validators.required],
    });
    this.thirdFormGroup = this.formBuilder.group({
      edad: ['', Validators.required],
      telefono: ['', Validators.required],
      genero: ['', Validators.required],
    });

    this.rS.list().subscribe((data)=>{
      this.listaRolUsuarios=data;
    })
  }

  aceptar(): void {
  

    if (this.firstFormGroup.valid) {

      this.usuario.idUsuario = this.firstFormGroup.value.idUsuario;
      this.usuario.nombreUsuario = this.firstFormGroup.value.nombreUsuario;
      this.usuario.clave=this.firstFormGroup.value.clave;
      this.usuario.rol.idRolUsuario = this.firstFormGroup.value.rol;

      if(this.secondFormGroup.valid){
        this.usuario.nombres = this.secondFormGroup.value.nombres;
        this.usuario.apellidos = this.secondFormGroup.value.apellidos;
        this.usuario.correo = this.secondFormGroup.value.correo;
        
        if(this.thirdFormGroup.valid){
          this.usuario.edad = this.thirdFormGroup.value.edad;
          this.usuario.telefono = this.thirdFormGroup.value.telefono;
          this.usuario.genero = this.thirdFormGroup.value.genero;
    
            this.uS.insert(this.usuario).subscribe(() => {
              this.uS.list().subscribe((data) => {
                this.uS.setList(data);
              });
            });
    
          this.router.navigate(['login']);
        }
        else{
          this.mensaje = 'Por favor complete todos los campos obligatorios del último formulario.';

        }
      }else{
        this.mensaje = 'Por favor complete todos los campos obligatorios del segundo formulario.';

      }
      
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios del primer formulario.';
    }
  }





  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.firstFormGroup.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
  obtenerControlCampo2(nombreCampo: string): AbstractControl {
    const control = this.secondFormGroup.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
  obtenerControlCampo3(nombreCampo: string): AbstractControl {
    const control = this.thirdFormGroup.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
}
