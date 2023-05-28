import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCorrectAnswersDialogComponent } from './update-correct-answers-dialog.component';

describe('UpdateCorrectAnswersDialogComponent', () => {
  let component: UpdateCorrectAnswersDialogComponent;
  let fixture: ComponentFixture<UpdateCorrectAnswersDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCorrectAnswersDialogComponent]
    });
    fixture = TestBed.createComponent(UpdateCorrectAnswersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
