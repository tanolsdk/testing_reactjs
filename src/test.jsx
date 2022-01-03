import { createStore } from "redux";

const UP = "UP";
const DOWN = "DOWN";
const RESET = "RESET";

const actionAdd = {
  type: UP,
  paylaod: 1,
};

const actionRemove = {
  type: DOWN,
  paylaod: 1,
};

const actionReset = {
  type: RESET,
};

const countertReducer = (state, action) => {
  switch (action.type) {
    case UP:
      return state + action.paylaod;
    case DOWN:
      return state - action.paylaod;
    case RESET:
      return 0;
    default:
      return state;
  }
};

// let newState = countertReducer(-1, actionReset);
// newState = countertReducer(newState, actionAdd);
// countertReducer(newState, actionRemove);

const store = createStore(countertReducer);

store.dispatch(actionReset);
store.dispatch(actionAdd);
store.dispatch(actionAdd);
store.dispatch(actionRemove);

store.getStore();

store.subscribe(() => {
    console.log(store.getStore());
});
