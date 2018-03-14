import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Signer, API } from 'aws-amplify';

import { AuthService } from './../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { map, flatMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { environment } from './../../environments/environment';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  private getSignedParams(params): Observable<any> {
    const service_info = {
      service: 'execute-api',
      region: 'ap-northeast-1'
    };

    return this.auth.getCurrentUserCredentials()
      .pipe(
        flatMap(
          creds => {
            const access_info = {
              secret_key: creds.secretAccessKey,
              access_key: creds.accessKeyId,
              session_token: creds.sessionToken
            };
            return of(Signer.sign(params, access_info, service_info));
          }
        )
      );
  }

  private parseUrl (url) {
    const parts = url.split('/');
    return {
      host: parts[2],
      path: '/' + parts.slice(3).join('/')
    };
  }

  public get(path: string, params: HttpParams): Observable<any> {
    const url = `${environment.api.endpoint}/${path}?${params.toString()}`;
    const parsed_url = this.parseUrl(url);
    const headers = {
      'Content-Type': 'application/json',
    };
    const sign_params = {
      method: 'GET',
      url: url,
      host: parsed_url.host,
      path: parsed_url.path,
      headers: headers,
      data: null
    };
    return this.getSignedParams(sign_params)
      .pipe(
        flatMap(
          signed => {
            delete signed.headers['host'];
            console.log(signed.url);
            return this.http.get(
              signed.url,
              { headers: signed.headers }
            );
          }
        )
      );
  }

  getHello(): Observable<any> {
    const path = 'hello';
    const params = new HttpParams().set('hoge', 'moge');
    return this.get(path, params);
  }

  public getHello_API(): Observable<any> {
    const apiName = 'Test';
    // const helloPath = '/hello?ID=888';
    // const helloPath = '/hello?hoge=moge';
    const helloPath = '/hello';
    // return fromPromise(API.get(apiName, helloPath));
    return fromPromise(
      API.get(apiName, helloPath, {
        'queryStringParameters': {
          'hoge': 'moge'
        }
      })
    );
  }
}
