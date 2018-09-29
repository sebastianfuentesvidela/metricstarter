import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechstartComponent } from './techstart.component';

describe('TechstartComponent', () => {
  let component: TechstartComponent;
  let fixture: ComponentFixture<TechstartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechstartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechstartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
