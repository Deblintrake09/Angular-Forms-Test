import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(private fb: FormBuilder, private validadores:ValidadoresService) {
    this.forma= this.fb.group({});
    this.crearFormulario();
    this.cargarData();
    this.crearListeners();
  }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.forma = this.fb.group({
      nombre:['',[Validators.minLength(5), Validators.required]],
      apellido:['',[Validators.minLength(5), Validators.required, this.validadores.noHerrera]],
      correo:['',[Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"), Validators.required]],
      usuario:['',,this.validadores.existeUsuario],
      direccion: this.fb.group({
        distrito:['', Validators.required],
        ciudad:['', Validators.required],
      }),
      pasatiempos:this.fb.array([]),
      password1:['',[Validators.required, Validators.minLength(8)]],
      password2:['',[Validators.required, Validators.minLength(8)]],
    },
    {
      validators: this.validadores.passwordsIguales('password1','password2')
    });

  }

  crearListeners(){
      /*this.forma.valueChanges.subscribe(valor=>{
        console.log(valor);
      })*/
      /*
      this.forma.statusChanges.subscribe(status=>{
        console.log(status);
      })
      */
      this.forma.get('nombre')?.valueChanges.subscribe(valor=>{
        console.log(valor);
      })
  }

  guardar(){

    if(this.forma.invalid){
      return Object.values(this.forma.controls).forEach(control=> {
        if(control instanceof FormGroup){
          Object.values(control.controls).forEach(control=> {control.markAsTouched();});
        } else{
          control.markAsTouched();
        }
      })

    }
    console.log(this.forma);
    this.forma.reset();
  }

  cargarData(){
    this.forma.reset({
      nombre:'Andrés',
      apellido:'Micalizzi',
      correo:'amicalizzi@stacktrace.com.ar',
      direccion:{
        distrito: 'San Luis',
        ciudad:' San Luis',
      }
    });
  }

  agregarPasatiempo(){
    this.pasatiempos.push( this.fb.control('') );
    console.log(this.pasatiempos);
  }

  borrarPasatiempo(index:number){
    this.pasatiempos.removeAt(index);
  }

  get pasatiempos(){
    return this.forma.get("pasatiempos") as FormArray ;
  }
  get nombreNoValido(){
    return this.forma.get("nombre")?.invalid && this.forma.get("nombre")?.touched;
  }
  get apellidoNoValido(){
    return this.forma.get("apellido")?.invalid && this.forma.get("apellido")?.touched;
  }
  get correoNoValido(){
    return this.forma.get("correo")?.invalid && this.forma.get("correo")?.touched;
  }
  get usuarioNoValido(){
    return this.forma.get("usuario")?.invalid && this.forma.get("usuario")?.touched;
  }

  get distritoNoValido(){
    return this.forma.get("direccion.distrito")?.invalid && this.forma.get("direccion.distrito")?.touched;
  }
  get ciudadNoValido(){
    return this.forma.get("direccion.ciudad")?.invalid && this.forma.get("direccion.ciudad")?.touched;
  }
  get password1NoValido(){
    return this.forma.get("password1")?.invalid && this.forma.get("password1")?.touched;
  }

  get password2NoValido(){
    const pass1= this.forma.get('password1')?.value;
    const pass2= this.forma.get('password2')?.value;
    return (pass1===pass2)?false:true;
  }
}
