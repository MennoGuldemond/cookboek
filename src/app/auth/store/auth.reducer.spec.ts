import * as fromReducer from './auth.reducer';
import * as fromActions from './auth.actions';
import { mockUser } from './auth.mock';

describe('AuthReducer', () => {
  afterEach(() => {
    fromReducer.initialState.user = null;
  });

  it('should return the default state', () => {
    const state = fromReducer.authReducer(undefined, { type: null });

    expect(state).toBe(fromReducer.initialState);
  });

  it('should load data', () => {
    const props = {
      user: mockUser,
    };
    const action = fromActions.setUser(props);
    const state = fromReducer.authReducer(fromReducer.initialState, action);

    expect(state.user).toEqual(props.user);
  });
});
