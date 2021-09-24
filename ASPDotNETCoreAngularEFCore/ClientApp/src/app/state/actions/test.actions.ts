import { Test } from "src/models/test";
import { createAction, props } from '@ngrx/store';

export enum TestActionTypes
{
    GET_TEST = "[TEST] Get Test",
    GET_TEST_SUCCESS = "[TEST] Get Test Success",
    GET_TEST_FAILURE = "[TEST] Get Test Failed",
    ADD_TEST = '[TEST] Add Test',
    ADD_TEST_SUCCESS = "[TEST] Add Test Success",
    ADD_TEST_FAILURE = "[TEST] Add Test Failed",
    UPDATE_TEST = '[TEST] Update Test',
    UPDATE_TEST_SUCCESS = "[TEST] Update Test Success",
    UPDATE_TEST_FAILURE = "[TEST] Update Test Failed",
    DELETE_TEST = "[TEST] Delete Test",
    DELETE_TEST_SUCCESS = "[TEST] Delete Test Success",
    DELETE_TEST_FAILURE = "[TEST] Delete Test Failed"
}

export const GetTest = createAction(
    TestActionTypes.GET_TEST
)

export const GetTestSuccess = createAction(
    TestActionTypes.GET_TEST_SUCCESS,
    props<{ tests: Test[] }>()
)

export const GetTestFailure = createAction(
    TestActionTypes.GET_TEST_FAILURE,
    props<{ error: any }>()
)

export const AddTest = createAction(
    TestActionTypes.ADD_TEST,
    props<{ test: Test }>()
)

export const AddTestSuccess = createAction(
    TestActionTypes.ADD_TEST_SUCCESS,
    props<{ test: Test }>()
)

export const AddTestFailure = createAction(
    TestActionTypes.ADD_TEST_FAILURE,
    props<{ error: any }>()
)

export const UpdateTest = createAction(
    TestActionTypes.UPDATE_TEST,
    props<{ test: Test }>()
)

export const UpdateTestSuccess = createAction(
    TestActionTypes.UPDATE_TEST_SUCCESS,
    props<{ test: Test }>()
)

export const UpdateTestFailure = createAction(
    TestActionTypes.UPDATE_TEST_FAILURE,
    props<{ error: any }>()
)

export const DeleteTest = createAction(
    TestActionTypes.DELETE_TEST,
    props<{ id: number }>()
)
export const DeleteTestSuccess = createAction(
    TestActionTypes.DELETE_TEST_SUCCESS,
    props<{ id: number }>()
)
