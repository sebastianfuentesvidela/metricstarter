import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinchartComponent } from './dinchart.component';

describe('DinchartComponent', () => {
  let component: DinchartComponent;
  let fixture: ComponentFixture<DinchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
