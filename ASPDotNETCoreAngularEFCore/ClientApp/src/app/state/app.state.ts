import { TestState } from "./reducers/test.reducer";
import { ReadingState } from "./reducers/reading.reducer";

export interface AppState
{
    readonly test: TestState;
    readonly reading: ReadingState;
}