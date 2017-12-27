import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector
} from "@ngrx/store";

import * as fromPizzas from "./pizzas.reducers";

export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.reducer
};

export const getProductsState = createFeatureSelector<ProductsState>(
  "products"
);

// pizzas state
export const getPizzasState = createSelector(
  getProductsState,
  (state: ProductsState) => state.pizzas
);

// only pass the slices that we need
export const getAllPizzas = createSelector(
  getPizzasState,
  fromPizzas.getPizzas
);
export const getAllPizzasLoaded = createSelector(
  getPizzasState,
  fromPizzas.getPizzasLoaded
);
export const getAllPizzasLoading = createSelector(
  getPizzasState,
  fromPizzas.getPizzasLoading
);
