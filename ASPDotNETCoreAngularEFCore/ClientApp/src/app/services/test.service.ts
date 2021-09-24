import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Test } from 'src/models/test';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TestService
{
    myAppUrl = '';

    constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string)
    {
        this.myAppUrl = baseUrl;
    }

    getTests()
    {
        console.log('service called');
        return this._http.get<Test[]>(this.myAppUrl + 'api/test/get').pipe(map(
            response =>
            {
                return response;
            }));
    }

    getTestById(id: number)
    {
        return this._http.get(this.myAppUrl + 'api/test/get/' + id)
        .pipe(map(
            response =>
            {
                return response;
            }));
    }

    addTest(test: Test)
    {
        console.log('service called');
        return this._http.post(this.myAppUrl + 'api/test/add', test)
        .pipe(map(
            response =>
            {
                return response;
            }));
    }

    updateTest(test: Test)
    {
        return this._http.put(this.myAppUrl + 'api/test/update', test)
        .pipe(map(
            response =>
            {
                return response;
            }));
    }

    deleteTest(id: number): Observable<any>
    {
        return this._http.delete(this.myAppUrl + 'api/test/delete/' + id)
        .pipe(map(
            response =>
            {
                return response;
            }));
    }
}
