import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TestService } from "src/app/services/test.service";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { AddTest, AddTestFailure, AddTestSuccess, DeleteTest, DeleteTestSuccess, GetTest, GetTestFailure, GetTestSuccess, UpdateTest, UpdateTestFailure, UpdateTestSuccess } from "src/app/state/actions/test.actions";
import { of } from 'rxjs';
import { Router } from "@angular/router";

@Injectable()
export class TestEffect
{
    getTests$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GetTest),
            switchMap(() =>
                this._testService.getTests().pipe(
                    map((tests) => GetTestSuccess({tests})),
                    catchError(error => of(GetTestFailure({error})))
                )
            )
        ),
    )
    addTest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AddTest),
            mergeMap(({test}) =>
                this._testService.addTest(test).pipe(
                    map(() => AddTestSuccess({test})),
                    tap(() => this._router.navigate(['/get-test'])),
                    catchError(error => of(AddTestFailure({error})))
                ),
            )
        )
    )
    updateTest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UpdateTest),
            mergeMap(({test}) =>
                this._testService.updateTest(test).pipe(
                    map(() => UpdateTestSuccess({test})),
                    tap(() => this._router.navigate(['/get-test'])),
                    catchError(error => of(UpdateTestFailure({error})))
                ),
            )
        )
    )
    deleteTest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DeleteTest),
            mergeMap(({id}) =>
                this._testService.deleteTest(id).pipe(
                    map(() => DeleteTestSuccess({id})),
                )
            ),
        )
    )

    constructor(
        private actions$: Actions,
        private _testService: TestService,
        private _router: Router,
    )
    {
    }
}
