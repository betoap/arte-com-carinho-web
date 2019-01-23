import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogApiService {
  private logApiEndpoint: string;
  constructor(
    private http: HttpClient) {
      this.logApiEndpoint = environment.endpoint;
  }

  public postLogs(logs: string[]): Observable<any> {
    return this.http.post(this.logApiEndpoint, logs);
  }
}
