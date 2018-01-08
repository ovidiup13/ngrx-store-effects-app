import { Pizza } from "src/products/models/pizza.model";

import * as fromPizzas from "../actions/pizzas.actions";

export interface PizzaState {
  entities: { [id: number]: Pizza };
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzaState = {
  loaded: false,
  loading: false,
  entities: {}
};

export function reducer(
  state = initialState,
  action: fromPizzas.PizzasActions
): PizzaState {
  switch (action.type) {
    case fromPizzas.LOAD_PIZZAS: {
      return { ...state, loading: true };
    }
    case fromPizzas.LOAD_PIZZAS_FAIL: {
      return { ...state, loading: false, loaded: false };
    }
    case fromPizzas.LOAD_PIZZAS_SUCCESS: {
      const pizzas = action.payload;
      // convert array to object
      const entities = pizzas.reduce(
        (entities: { [id: number]: Pizza }, pizza: Pizza) => {
          return {
            ...entities,
            [pizza.id]: pizza
          };
        },
        {
          ...state.entities
        }
      );

      return { ...state, loading: false, loaded: true, entities };
    }
    case fromPizzas.UPDATE_PIZZA_SUCCESS:
    case fromPizzas.CREATE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      const entities = { ...state.entities, [pizza.id]: pizza };
      return { ...state, entities };
    }

    case fromPizzas.DELETE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      console.log("DeletePizzaReducer:::", pizza);
      // destructure remaining entities without deleted pizza
      const { [pizza.id]: removed, ...entities } = state.entities;
      console.log("DeletePizzaReducer:::", removed);
      console.log("DeletePizzaReducer:::", entities);
      return {
        ...state,
        entities
      };
    }
  }

  return state;
}

export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
export const getPizzasEntities = (state: PizzaState) => state.entities;
