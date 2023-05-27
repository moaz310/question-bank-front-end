import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Answer } from '../../answer.model';

@Component({
  selector: 'app-add-answer-dialog',
  templateUrl: './add-answer-dialog.component.html',
  styleUrls: ['./add-answer-dialog.component.css']
})
export class AddAnswerDialogComponent {
  
  answer: Answer;

  constructor(public modalRef: MdbModalRef<AddAnswerDialogComponent>){
    this.answer = new Answer();
  }

  onAddAnswer(){
    this.modalRef.close(this.answer);
  }
}
