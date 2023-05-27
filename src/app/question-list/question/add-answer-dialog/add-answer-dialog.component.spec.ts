import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnswerDialogComponent } from './add-answer-dialog.component';

describe('AddAnswerDialogComponent', () => {
  let component: AddAnswerDialogComponent;
  let fixture: ComponentFixture<AddAnswerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAnswerDialogComponent]
    });
    fixture = TestBed.createComponent(AddAnswerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
