import * as fromSelectors from './auth.selectors';
import * as fromReducer from './auth.reducer';

const createAuthState = (): fromSelectors.AuthState => fromReducer.initialState;

const createRootState = () => ({
  auth: createAuthState(),
});

describe('AuthSelectors', () => {
  it('selectAuthState', () => {
    const state = createRootState();
    expect(fromSelectors.selectAuthState(state)).toEqual(fromReducer.initialState);
  });

  it('selectUser', () => {
    const state = createRootState();
    expect(fromSelectors.selectUser(state)).toEqual(fromReducer.initialState.user);
  });
});
