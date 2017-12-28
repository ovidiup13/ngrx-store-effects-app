import * as fromToppings from "../actions/toppings.actions";
import { Topping } from "../../models/topping.model";

export interface ToppingsState {
  entities: { [id: number]: Topping };
  loaded: boolean;
  loading: boolean;
}

export const initialState: ToppingsState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromToppings.ToppingsAction
): ToppingsState {
  switch (action.type) {
    case fromToppings.LOAD_TOPPINGS: {
      return {
        ...state,
        loading: true
      };
    }
    case fromToppings.LOAD_TOPPINGS_SUCCESS: {
      const toppings = (action as fromToppings.LoadToppingsSuccess).payload;

      // convert array to object
      // TODO: create utility folder and add function there
      const entities = toppings.reduce(
        (
          entities: {
            [id: number]: Topping;
          },
          topping: Topping
        ) => {
          return {
            ...entities,
            [topping.id]: topping
          };
        },
        {
          ...state.entities
        }
      );

      return { ...state, loaded: true, loading: false, entities: entities };
    }
    case fromToppings.LOAD_TOPPINGS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getToppingsEntities = (state: ToppingsState) => state.entities;
export const getToppingsLoaded = (state: ToppingsState) => state.loaded;
export const getToppingsLoading = (state: ToppingsState) => state.loading;
