import { Dispatch, SetStateAction } from "react";

/**
 * React useState hook setter
 */
export type SetState<T> = Dispatch<SetStateAction<T>>;
