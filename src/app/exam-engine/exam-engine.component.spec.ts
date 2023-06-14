import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamEngineComponent } from './exam-engine.component';

describe('ExamEngineComponent', () => {
  let component: ExamEngineComponent;
  let fixture: ComponentFixture<ExamEngineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamEngineComponent]
    });
    fixture = TestBed.createComponent(ExamEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
