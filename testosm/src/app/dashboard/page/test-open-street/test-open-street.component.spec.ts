import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestOpenStreetComponent } from './test-open-street.component';

describe('TestOpenStreetComponent', () => {
  let component: TestOpenStreetComponent;
  let fixture: ComponentFixture<TestOpenStreetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestOpenStreetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestOpenStreetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
