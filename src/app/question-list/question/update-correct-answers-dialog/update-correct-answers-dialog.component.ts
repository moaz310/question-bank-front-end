import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Answer } from '../../answer.model';

class CorrectAnswers{
  answerInfo!: Answer;
  checked!: boolean;
}

@Component({
  selector: 'app-update-correct-answers-dialog',
  templateUrl: './update-correct-answers-dialog.component.html',
  styleUrls: ['./update-correct-answers-dialog.component.css']
})
export class UpdateCorrectAnswersDialogComponent implements OnInit{

  correctAnswers!: CorrectAnswers[];
  selectedAnswersId !: string[];
  answers!: Array<Answer>;

  constructor(public modalRef: MdbModalRef<UpdateCorrectAnswersDialogComponent>){
  }
  
  ngOnInit(): void {
    console.log(this.answers);
    this.correctAnswers = [];
    this.selectedAnswersId = [];
    console.log(this.answers);
    this.answers.forEach((answer)=>{
      console.log(answer);
      this.correctAnswers.push({answerInfo: answer, checked: false});
    });
  }
  onUpdate(){
    this.modalRef.close(this.selectedAnswersId);
  }

  onCheckboxChange(event: any) {
    if (event.target.checked) {
      this.selectedAnswersId.push(event.target.value);
    } else {
      const index = this.selectedAnswersId.findIndex(id => id === event.target.value);
      this.selectedAnswersId.splice(index, 1);
    }
  }
}
