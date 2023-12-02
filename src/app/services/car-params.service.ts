import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CarParamsService {

  constructor(private http: HttpClient) { }

  getPropertyCars(idVehicle?: string) {
    return this.http.get(`${environment.API_URL}/carbrands${idVehicle != undefined ? '/' + idVehicle : ''}`)
  }
}
