import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario ={ 
            nombre:'',
            apellido:'',
            correo:'',
            pais:'',
            genero:'M'
          };
  paises:any[]=[];
  
  constructor(private countriesService: CountriesService) { 
     
    }

  ngOnInit(): void {
    this.countriesService.getpaises().subscribe(paises=>{
      this.paises=paises;
      this.paises.unshift({ nombre:'[Selecciones País]', codigo:''})
    })
  }

  guardar(forma:NgForm):void{

    if(forma.invalid){
      Object.values(forma.controls).forEach(control=> control.markAsTouched())
      return;
    }
    console.log(forma);
  }

}
