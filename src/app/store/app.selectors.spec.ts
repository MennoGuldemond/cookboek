import * as fromSelectors from './app.selectors';
import * as fromReducer from './app.reducer';

const createAppState = (): fromSelectors.AppState => fromReducer.initialState;

const createRootState = () => ({
  app: createAppState(),
});

describe('AppSelectors', () => {
  it('selectAppState', () => {
    const state = createRootState();
    expect(fromSelectors.selectAppState(state)).toEqual(fromReducer.initialState);
  });

  it('selectTheme', () => {
    const state = createRootState();
    expect(fromSelectors.selectTheme(state)).toEqual(fromReducer.initialState.theme);
  });

  it('selectUserPreferences', () => {
    const state = createRootState();
    expect(fromSelectors.selectUserPreferences(state)).toEqual(fromReducer.initialState.userPreferences);
  });
});
