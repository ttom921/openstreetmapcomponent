import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestShowPageComponent } from './test-show-page.component';

describe('TestShowPageComponent', () => {
  let component: TestShowPageComponent;
  let fixture: ComponentFixture<TestShowPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestShowPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestShowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
