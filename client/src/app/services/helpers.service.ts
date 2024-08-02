import { Injectable } from "@angular/core";
import { ENVIRONMENT } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor(
  ) {
    if(!ENVIRONMENT.production){
      (window as any).helpersService = this;
    }
  }

}
