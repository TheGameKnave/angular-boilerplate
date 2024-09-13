import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-api',
  standalone: true,
  imports: [],
  templateUrl: './api.component.html',
  styles: ``
})
export class ApiComponent {
  results: any = null;
  error: any = null;

  constructor(
    private http: HttpClient,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.initializeApi().pipe(
      catchError(error => {
        this.error = error;
        return of(null); // Return an empty observable to continue the chain
      })
    ).subscribe(response => {
      this.results = response;
      this.cd.detectChanges();
    });
  }
  initializeApi(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.get('/api', httpOptions);
  }
}
