import * as fromActions from './app.actions';

describe('AppActions', () => {
  it('should create a setTheme action containing a theme in the props', () => {
    const props = { theme: 'test-theme' };
    const action = fromActions.setTheme(props);
    expect(action.type).toEqual(fromActions.APP_SET_THEME);

    expect({ ...action }).toEqual({
      type: fromActions.APP_SET_THEME,
      theme: props.theme,
    });
  });

  it('should create a setUserPreferences action containing user preferences in the props', () => {
    const props = { userPreferences: { theme: 'test-theme ' } };
    const action = fromActions.setUserPreferences(props);
    expect(action.type).toEqual(fromActions.APP_SET_USER_PREFERENCES);

    expect({ ...action }).toEqual({
      type: fromActions.APP_SET_USER_PREFERENCES,
      userPreferences: props.userPreferences,
    });
  });
});
