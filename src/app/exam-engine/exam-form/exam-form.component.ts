import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AddQuestionDialogComponent } from './add-question-dialog/add-question-dialog.component';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.css']
})
export class ExamFormComponent implements OnInit{
  examForm!: FormGroup;

  constructor(private modalService: MdbModalService){}

  ngOnInit(): void {
    this.examForm = new FormGroup({
      name: new FormControl(),
      passingScore: new FormControl(),
      questionsId: new FormArray([])
    })
  }
  onSubmit() {
  }

  onAddQuestion() {
    this.modalService.open(AddQuestionDialogComponent);
  }

  get questionsControl() {
    return (this.examForm.get('questionsId') as FormArray).controls;
  }
}
