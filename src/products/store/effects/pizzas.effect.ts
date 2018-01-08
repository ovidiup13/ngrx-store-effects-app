import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";

import * as fromRoot from "../../../app/store/";
import * as fromServices from "../../services";
import * as pizzaActions from "../actions";
import { Pizza } from "src/products/models/pizza.model";

@Injectable()
export class PizzaEffects {
  constructor(
    private actions$: Actions,
    private pizzaService: fromServices.PizzasService
  ) {}

  @Effect()
  loadPizzas$ = this.actions$.ofType(pizzaActions.LOAD_PIZZAS).pipe(
    switchMap(() => {
      return this.pizzaService
        .getPizzas()
        .pipe(map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)));
    }),
    catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
  );

  @Effect()
  createPizza$ = this.actions$.ofType(pizzaActions.CREATE_PIZZA).pipe(
    map((action: pizzaActions.CreatePizza) => action.payload),
    switchMap((pizza: Pizza) => {
      return this.pizzaService
        .createPizza(pizza)
        .pipe(
          map(pizza => new pizzaActions.CreatePizzaSuccess(pizza)),
          catchError(error => of(new pizzaActions.CreatePizzaFail(error)))
        );
    })
  );

  @Effect()
  createPizzaSuccess$ = this.actions$
    .ofType(pizzaActions.CREATE_PIZZA_SUCCESS)
    .pipe(
      map((action: pizzaActions.CreatePizzaSuccess) => action.payload),
      map(
        pizza =>
          new fromRoot.Go({
            path: ["/products", pizza.id]
          })
      )
    );

  @Effect()
  updatePizza$ = this.actions$.ofType(pizzaActions.UPDATE_PIZZA).pipe(
    map((action: pizzaActions.UpdatePizza) => action.payload),
    switchMap((pizza: Pizza) => {
      return this.pizzaService
        .updatePizza(pizza)
        .pipe(
          map(pizza => new pizzaActions.UpdatePizzaSuccess(pizza)),
          catchError(error => of(new pizzaActions.UpdatePizzaFail(error)))
        );
    })
  );

  @Effect()
  deletePizza$ = this.actions$.ofType(pizzaActions.DELETE_PIZZA).pipe(
    map((action: pizzaActions.DeletePizza) => action.payload),
    switchMap((pizza: Pizza) => {
      console.log("DeletePizzaEffect:::", pizza);
      return this.pizzaService.removePizza(pizza).pipe(
        map(() => {
          console.log("DeletePizzaEffectSuccess:::", pizza);
          return new pizzaActions.DeletePizzaSuccess(pizza);
        }),
        catchError(error => of(new pizzaActions.DeletePizzaFail(error)))
      );
    })
  );

  @Effect()
  handlePizzaSuccess$ = this.actions$
    .ofType(
      pizzaActions.UPDATE_PIZZA_SUCCESS,
      pizzaActions.DELETE_PIZZA_SUCCESS
    )
    .pipe(
      map(
        pizza =>
          new fromRoot.Go({
            path: ["/products"]
          })
      )
    );
}
