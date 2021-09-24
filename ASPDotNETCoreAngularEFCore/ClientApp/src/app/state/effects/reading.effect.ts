import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ReadingService } from "src/app/services/reading.service";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { GetReadings, GetReadingsSuccess, GetReadingsFailure } from "src/app/state/actions/reading.actions";
import { of } from 'rxjs';
import { Router } from "@angular/router";

@Injectable()
export class ReadingEffect
{
    getReadings$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GetReadings),
            switchMap(() =>
                this._readingService.getReadings().pipe(
                    map((readings) => GetReadingsSuccess({readings})),
                    catchError(error => of(GetReadingsFailure({error})))
                )
            )
        ),
    )

    constructor(
        private actions$: Actions,
        private _readingService: ReadingService,
        private _router: Router,
    )
    {
    }
}
