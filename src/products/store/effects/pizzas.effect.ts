import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";

import * as fromServices from "../../services";
import * as pizzaActions from "../actions";

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
}
