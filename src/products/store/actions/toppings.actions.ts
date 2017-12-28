import { Action } from "@ngrx/store";

import { Topping } from "../../models/topping.model";

export const LOAD_TOPPINGS = "[Products] Load Toppings";
export const LOAD_TOPPINGS_FAIL = "[Products] Load Toppings Fail";
export const LOAD_TOPPINGS_SUCCESS = "[Products] Load Toppings Success";
export const VISUALIZE_TOPPINGS = "[Product] Visualize Toppings";

export class LoadToppings implements Action {
  readonly type: string = LOAD_TOPPINGS;
}

export class LoadToppingsFail implements Action {
  readonly type: string = LOAD_TOPPINGS_FAIL;
  constructor(public payload: any) {}
}

export class LoadToppingsSuccess implements Action {
  readonly type: string = LOAD_TOPPINGS_SUCCESS;
  constructor(public payload: Topping[]) {}
}

export class VisualizeToppings implements Action {
  readonly type: string = VISUALIZE_TOPPINGS;
  constructor(public payload: number[]) {}
}

// action types

export type ToppingsAction =
  | LoadToppings
  | LoadToppingsFail
  | LoadToppingsSuccess
  | VisualizeToppings;
