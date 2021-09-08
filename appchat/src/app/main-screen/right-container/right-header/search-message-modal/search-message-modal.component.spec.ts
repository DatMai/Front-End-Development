import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMessageModalComponent } from './search-message-modal.component';

describe('SearchMessageModalComponent', () => {
  let component: SearchMessageModalComponent;
  let fixture: ComponentFixture<SearchMessageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMessageModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMessageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
