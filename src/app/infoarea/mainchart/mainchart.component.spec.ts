import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainchartComponent } from './mainchart.component';

describe('MainchartComponent', () => {
  let component: MainchartComponent;
  let fixture: ComponentFixture<MainchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
