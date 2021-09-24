import { Component, OnInit } from '@angular/core';
import { Test } from 'src/models/test';
import { Store, select } from "@ngrx/store";
import { AppState } from '../state/app.state';
import { Observable } from 'rxjs';
import { GetTest, DeleteTest } from 'src/app/state/actions/test.actions';
import { getTests } from "../state/reducers/test.reducer";

@Component({
    // selector: 'app-get-test',
    templateUrl: './get-test.component.html',
    styleUrls: ['./get-test.component.css']
})
export class GetTestComponent implements OnInit
{
    loading$: Observable<Boolean>;
    error$: Observable<Error>

    public testList: Observable<Test[]>;

    constructor(private store: Store<AppState>)
    {
    }

    ngOnInit()
    {
        this.store.dispatch(GetTest());
        this.testList = this.store.pipe(select(getTests));
        this.loading$ = this.store.select(store => store.test.loading);
    }

    deleteTest(id)
    {
        const ans = confirm('Do you want to delete test with Id: ' + id);
        if( ans )
        {
            this.store.dispatch(DeleteTest({id: id}));
        }
    }
}
