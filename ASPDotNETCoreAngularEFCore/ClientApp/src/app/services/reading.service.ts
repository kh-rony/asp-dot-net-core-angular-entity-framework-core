import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Reading } from 'src/models/reading';

@Injectable({
    providedIn: 'root'
})
export class ReadingService
{
    myAppUrl = '';

    constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string)
    {
        this.myAppUrl = baseUrl;
    }

    getReadings()
    {
        console.log('service called');
        return this._http.get<Reading[]>(this.myAppUrl + 'api/reading/get').pipe(map(
            response =>
            {
                return response;
            }));
    }
}
