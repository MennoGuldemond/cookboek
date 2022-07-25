import * as fromReducer from './app.reducer';
import * as fromActions from './app.actions';

describe('AppReducer', () => {
  afterEach(() => {
    fromReducer.initialState.theme = 'light-theme';
    fromReducer.initialState.userPreferences = { theme: '' };
  });

  it('should return the default state', () => {
    const state = fromReducer.appReducer(undefined, { type: null });

    expect(state).toBe(fromReducer.initialState);
  });

  it('should load data', () => {
    const props = {
      value: 'test-theme',
    };
    const action = fromActions.setTheme(props);
    const state = fromReducer.appReducer(fromReducer.initialState, action);

    expect(state.theme).toEqual(props.value);
  });
});
