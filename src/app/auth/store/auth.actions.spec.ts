import * as fromActions from './auth.actions';
import { mockUser } from './auth.mock';

describe('AuthActions', () => {
  it('should create a setUser action containing user data in the props', () => {
    const props = { value: mockUser };
    const action = fromActions.setUser(props);
    expect(action.type).toEqual(fromActions.AUTH_SET_USER);

    expect({ ...action }).toEqual({
      type: fromActions.AUTH_SET_USER,
      value: props.value,
    });
  });

  it('should create a login action', () => {
    const action = fromActions.login();
    expect(action.type).toEqual(fromActions.AUTH_LOGIN);
  });
});
