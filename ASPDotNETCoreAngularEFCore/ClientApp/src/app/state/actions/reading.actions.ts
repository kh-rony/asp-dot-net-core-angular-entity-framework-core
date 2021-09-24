import { Reading } from "src/models/reading";
import { createAction, props } from '@ngrx/store';

export enum ReadingActionTypes
{
    GET_READINGS = "[READING] Get Readings",
    GET_READINGS_SUCCESS = "[READING] Get Readings Success",
    GET_READINGS_FAILURE = "[READING] Get Readings Failed"
}

export const GetReadings = createAction(
    ReadingActionTypes.GET_READINGS
)

export const GetReadingsSuccess = createAction(
    ReadingActionTypes.GET_READINGS_SUCCESS,
    props<{ readings: Reading[] }>()
)

export const GetReadingsFailure = createAction(
    ReadingActionTypes.GET_READINGS_FAILURE,
    props<{ error: any }>()
)