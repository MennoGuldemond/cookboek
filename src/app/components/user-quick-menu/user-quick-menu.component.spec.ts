import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { UserQuickMenuComponent } from './user-quick-menu.component';

describe('UserQuickMenuComponent', () => {
  let component: UserQuickMenuComponent;
  let fixture: ComponentFixture<UserQuickMenuComponent>;
  let store: MockStore;
  const initialState = { theme: 'test-theme' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserQuickMenuComponent],
      imports: [MatMenuModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(UserQuickMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
