import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor(
  ) {
    if(!environment.production){
      (window as any).helpersService = this;
    }
  }

}
