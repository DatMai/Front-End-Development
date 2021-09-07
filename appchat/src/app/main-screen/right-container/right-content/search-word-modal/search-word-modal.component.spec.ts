import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchWordModalComponent } from './search-word-modal.component';

describe('SearchWordModalComponent', () => {
  let component: SearchWordModalComponent;
  let fixture: ComponentFixture<SearchWordModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchWordModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchWordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
