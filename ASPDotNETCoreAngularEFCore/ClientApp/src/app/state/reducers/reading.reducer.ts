import { Reading } from "src/models/reading";
import * as ReadingActions from 'src/app/state/actions/reading.actions';
import { createSelector, createReducer, on } from "@ngrx/store";
import { Action } from "@ngrx/store/src/models";
import { AppState } from "../app.state";

export interface ReadingState
{
    list: Reading[],
    loading: boolean,
    error: Error
}

export const initialState = {
    list: [],
    loading: false,
    error: undefined
};

export const readingReducer = createReducer(initialState,
    on(ReadingActions.GetReadings, state => ((console.log('GetReadings reducer called'), {
        ...state,
        loading: true
    }))),
    on(ReadingActions.GetReadingsSuccess, (state, {readings}) => ((console.log('GetReadingsSuccess reducer called'), {
        ...state,
        list: readings,
        loading: false
    }))),
    on(ReadingActions.GetReadingsFailure, (state, {error}) => ((console.log('GetReadingsFailure reducer called'), {
        ...state,
        error: error,
        loading: false
    })))
);

export function reducer(state: ReadingState | undefined, action: Action)
{
    return readingReducer(state, action);
}

const getReadingsFeatureState = (state: AppState) => state.reading;

export const getReadings = createSelector(getReadingsFeatureState, (state: ReadingState) => state.list);
