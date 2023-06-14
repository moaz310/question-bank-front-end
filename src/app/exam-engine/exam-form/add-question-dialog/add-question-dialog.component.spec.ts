import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionDialogComponent } from './add-question-dialog.component';

describe('AddQuestionDialogComponent', () => {
  let component: AddQuestionDialogComponent;
  let fixture: ComponentFixture<AddQuestionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddQuestionDialogComponent]
    });
    fixture = TestBed.createComponent(AddQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
