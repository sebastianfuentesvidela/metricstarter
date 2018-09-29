import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import { AppState } from '@app/core';

import { todosReducer } from '../examples/todos/todos.reducer';
import { TodosState } from '../examples/todos/todos.model';
import { stockMarketReducer } from '../examples/stock-market/stock-market.reducer';
import { StockMarketState } from '../examples/stock-market/stock-market.model';

export const INFO_FEATURE_NAME = 'infografys';

export const reducers: ActionReducerMap<InfoState> = {
  alarms: todosReducer,
  alerts: stockMarketReducer
};

export const selectExamples = createFeatureSelector<State, InfoState>(
  INFO_FEATURE_NAME
);

export interface InfoState {
  alarms: TodosState;
  alerts: StockMarketState;
}

export interface State extends AppState {
  infografys: InfoState;
}
