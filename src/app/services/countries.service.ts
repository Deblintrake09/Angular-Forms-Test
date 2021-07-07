import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { 

  }

  getpaises():Observable<any>{

    return this.http.get<any>('https://restcountries.eu/rest/v2/lang/es') .pipe(
      map( (resp: any[]) => 
        resp.map( pais => ({  nombre: pais.name, codigo: pais.alpha3Code })
        )
      )
);
  }
}
