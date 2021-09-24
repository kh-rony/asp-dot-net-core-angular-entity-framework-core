import { Test } from "src/models/test";
import * as TestActions from 'src/app/state/actions/test.actions';
import { createSelector, createReducer, on } from "@ngrx/store";
import { Action } from "@ngrx/store/src/models";
import { AppState } from "../app.state";

export interface TestState
{
    list: Test[],
    loading: boolean,
    error: Error
}

export const initialState = {
    list: [],
    loading: false,
    error: undefined
};

export const testReducer = createReducer(initialState,
    on(TestActions.GetTest, state => ((console.log('GetTest reducer called'), {
        ...state,
        loading: true
    }))),
    on(TestActions.GetTestSuccess, (state, {tests}) => ((console.log('GetTestSuccess reducer called'), {
        ...state,
        list: tests,
        loading: false
    }))),
    on(TestActions.GetTestFailure, (state, {error}) => ((console.log('GetTestFailure reducer called'), {
        ...state,
        error: error,
        loading: false
    }))),
    on(TestActions.AddTest, state => ((console.log('AddTest reducer called'), {
        ...state,
        loading: true
    }))),
    on(TestActions.AddTestSuccess, (state, {test}) => ((console.log('AddTestSuccess reducer called'), {
        ...state,
        list: [...state.list, test],
        loading: false
    }))),
    on(TestActions.AddTestFailure, (state, {error}) => ((console.log('AddTestFailure reducer called'), {
        ...state,
        error: error,
        loading: false
    }))),
    on(TestActions.UpdateTest, state => ((console.log('UpdateTest reducer called'), {
        ...state,
        loading: true
    }))),
    on(TestActions.UpdateTestSuccess, (state, {test}) => ((console.log('UpdateTestSuccess reducer called'), {
        ...state,
        list: [...state.list, test],
        loading: false
    }))),
    on(TestActions.UpdateTestFailure, (state, {error}) => ((console.log('UpdateTestFailure reducer called'), {
        ...state,
        error: error,
        loading: false
    }))),
    on(TestActions.DeleteTest, state => ((console.log('DeleteTest reducer called'), {
        ...state,
        loading: true
    }))),
    on(TestActions.DeleteTestSuccess, (state, {id}) => ((console.log('DeleteTestSuccess reducer called'), {
        ...state,
        list: state.list.filter(item => item.id !== id),
        loading: false
    })))
);

export function reducer(state: TestState | undefined, action: Action)
{
    return testReducer(state, action);
}

const getTestFeatureState = (state: AppState) => state.test;

export const getTests = createSelector(getTestFeatureState, (state: TestState) => state.list);
