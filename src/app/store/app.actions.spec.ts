import * as fromActions from './app.actions';

describe('AppActions', () => {
  it('should create a setTheme action containing a theme in the props', () => {
    const props = { value: 'test-theme' };
    const action = fromActions.setTheme(props);
    expect(action.type).toEqual(fromActions.APP_SET_THEME);

    expect({ ...action }).toEqual({
      type: fromActions.APP_SET_THEME,
      value: props.value,
    });
  });

  it('should create a setUserPreferences action containing user preferences in the props', () => {
    const props = { value: { theme: 'test-theme ' } };
    const action = fromActions.setUserPreferences(props);
    expect(action.type).toEqual(fromActions.APP_SET_USER_PREFERENCES);

    expect({ ...action }).toEqual({
      type: fromActions.APP_SET_USER_PREFERENCES,
      value: props.value,
    });
  });
});
