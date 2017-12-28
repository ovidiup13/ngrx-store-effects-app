import { createSelector } from "@ngrx/store";

import * as fromRoot from "../../../app/store";
import * as fromFeature from "../reducers/";
import * as fromPizzas from "../reducers/pizzas.reducer";
import * as fromToppings from "../reducers/toppings.reducer";
import { getPizzasEntities } from "../reducers/pizzas.reducer";
import { Pizza } from "src/products/models/pizza.model";

export const getPizzasState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.pizzas
);

// only pass the slices that we need
export const getAllPizzasEntities = createSelector(
  getPizzasState,
  fromPizzas.getPizzasEntities
);

// use the router state to look up an entity
export const getSelectedPizza = createSelector(
  getAllPizzasEntities, // feature state
  fromRoot.getRouterState, // router state
  (entities, router): Pizza => {
    return router.state && entities[router.state.params.pizzaId];
  }
);

export const getPizzaVisualized = createSelector(
  getSelectedPizza,
  fromToppings.getToppingsEntities,
  fromToppings.getSelectedToppings,
  (pizza, toppingEntities, selectedToppings) => {
    const toppings = selectedToppings.map(id => toppingEntities[id]);
    return {
      ...pizza,
      toppings // new toppings selected
    };
  }
);

export const getAllPizzas = createSelector(getAllPizzasEntities, entities => {
  return Object.keys(entities).map(id => entities[parseInt(id)]);
});

export const getAllPizzasLoaded = createSelector(
  getPizzasState,
  fromPizzas.getPizzasLoaded
);
export const getAllPizzasLoading = createSelector(
  getPizzasState,
  fromPizzas.getPizzasLoading
);
