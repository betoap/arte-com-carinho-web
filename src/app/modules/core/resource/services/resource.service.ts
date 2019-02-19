import { IRequest } from './../interfaces/request.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ISerializer } from './../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ResourceService implements OnInit {
  public url: String = 'http://localhost:4100';
  public endPoint: String = '';
  public serializer: ISerializer;

  constructor(
    protected httpClient: HttpClient
  ) { }

  public ngOnInit() { }

  setEndPoint( endPoint ) {
    this.endPoint = endPoint;
  }

  public execute( params: IRequest ): Observable<IRequest> {
    if ( params.hasOwnProperty('endPoint') ) {
      this.endPoint = params['endPoint'];
    }
    if ( params.hasOwnProperty('queryString') ) {
      this.endPoint = this.getEndPoint( params['queryString'] );
    }
    return this.httpClient
      .post<any>(
        `${this.url}/${this.endPoint}`,
        params['body'],
        { params: params.queryString }
      );
  }

  post<T>( entity: T ): Observable<T> {
    if ( entity.hasOwnProperty('endPoint') ) {
      this.endPoint = entity['endPoint'];
    }
    const params = { ...entity['queryString']};
    return this.httpClient
      .post<any>(`${this.url}/${this.endPoint}`, entity['body'], { params });
  }

  get( params ): Observable<Array<any>> {
    return this.getAll( params );
  }

  getOne(): Observable<any> {
    return this.httpClient
      .get(`${this.url}/${this.endPoint}`);
  }

  configEndpoint( _params ) {
    if ( _params.hasOwnProperty('endPoint') ) {
      this.endPoint = _params['endPoint'];
    }
    if ( _params.hasOwnProperty('queryString') ) {
      this.endPoint = this.getEndPoint( _params['queryString'] );
    }
  }

  getAll( _params ): Observable<Array<any>> {
    this.configEndpoint( _params );
    const params = { ..._params.queryString};
    return this.httpClient
      .get<Array<any>>(
        `${this.url}/${this.endPoint}`, { params } );
  }

  getOneBy(): Observable<any> {
    return this.httpClient
      .get(`${this.url}/${this.endPoint}`);
  }

  getAllBy(): Observable<Array<any>> {
    return this.httpClient
      .get<Array<any>>(`${this.url}/${this.endPoint}`);
  }

  put<T>( entity: T ): Observable<T> {
    this.configEndpoint( entity );
    return this.httpClient
      .put<T>(`${this.url}/${this.endPoint}`, entity);
  }

  delete<T>( entity: T ): Observable<T> {
    this.configEndpoint( entity );
    return this.httpClient
      .delete<T>(`${this.url}/${this.endPoint}`, entity);
  }

  getQueryString( queryString: any ): string {
    return '?' + Object.keys(queryString).map(key => key + '=' + queryString[key]).join('&');
  }

  getEndPoint( params: any ): String {
    let endPoint: String = this.endPoint;
    Object.keys(params).forEach( key => { endPoint = endPoint['replaceAll']( key, params[key] ); } );
    return endPoint;
  }

}

if ( ! String.prototype.hasOwnProperty('replaceAll')  ) {
  String.prototype['replaceAll'] = function(str1, str2, ignore) {
    return this
    .replace(
      new RegExp(
        str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, '\\$&'),
        (ignore ? 'gi' : 'g')), (typeof(str2) === 'string')
        ? str2.replace(/\$/g , '$$$$')
        : str2);
  };
}
