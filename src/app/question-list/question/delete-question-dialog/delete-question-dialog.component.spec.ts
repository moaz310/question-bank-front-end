import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteQuestionDialogComponent } from './delete-question-dialog.component';

describe('DeleteQuestionDialogComponent', () => {
  let component: DeleteQuestionDialogComponent;
  let fixture: ComponentFixture<DeleteQuestionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteQuestionDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
