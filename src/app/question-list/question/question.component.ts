import { Component, OnInit } from '@angular/core';
import { Question } from '../question.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common'

import { QuestionService } from '../question.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DeleteQuestionDialogComponent } from './delete-question-dialog/delete-question-dialog.component';
import { AddAnswerDialogComponent } from './add-answer-dialog/add-answer-dialog.component';
import { Answer } from '../answer.model';
import { UpdateCorrectAnswersDialogComponent } from './update-correct-answers-dialog/update-correct-answers-dialog.component';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit{
  question!: Question;
  deleteModalRef: MdbModalRef<DeleteQuestionDialogComponent> | null = null;
  addAnswerModalRef: MdbModalRef<AddAnswerDialogComponent> | null = null;
  updateCorrectAnswersModalRef: MdbModalRef<UpdateCorrectAnswersDialogComponent> | null = null;

  constructor(private service: QuestionService,
            private router: Router,
            private location: Location,
            private modalService: MdbModalService){}

  ngOnInit(): void {
    this.question = history.state;
  }

  onDelete(){
    this.deleteModalRef = this.modalService.open(DeleteQuestionDialogComponent);
    this.deleteModalRef.onClose.subscribe((message: boolean) => {
      if(message)
      this.service.deleteQuestion(this.question.id).subscribe({
        next: (data) => {
          this.location.back();
          console.log(data);
        },
        error: () =>{this.router.navigate(['pageNotFound'])}
      });
    });
  }

  onDeleteAnswer(answerId: string, index: number){
    this.service.deleteAnswer(answerId, this.question.id).subscribe({
      next: (response)=>{
        console.log(response);
        this.question.answers.splice(index, 1);
        this.resetState();
        this.location.back();
      },
      error: (err) => {console.log(err)}
    });
  }

  onAddAnswer(){
    this.addAnswerModalRef = this.modalService.open(AddAnswerDialogComponent);
    this.addAnswerModalRef.onClose.subscribe((answer: Answer)=>{
      if(answer.name != null){
        this.service.addAnswer(this.question.id, answer).subscribe({
          next: (response)=>{
            this.question.answers.push(response);
            this.resetState();
          },
          error: (err)=>{
            console.log(err);
          }
        })
      }
    })
  }

  onUpdateCorrectAnswers(){
    console.log(this.question.answers);
    this.updateCorrectAnswersModalRef = this.modalService.open(UpdateCorrectAnswersDialogComponent,{
      data:{answers: this.question.answers},
    });
    this.updateCorrectAnswersModalRef.onClose.subscribe((selectedAnswers)=>{
      this.question.correctedAnswersId = selectedAnswers;
      console.log(this.question.correctedAnswersId);
      this.service.updateQuestion(this.question.id, this.question).subscribe({
        next: (response)=>{
          this.resetState();
          console.log(response);
        },
        error: (err) => {
          console.log(err);
        }
      })
      console.log(selectedAnswers);
    })
  }

  resetState(): void {
    const url = this.router.url;
    const state = this.question;
    this.location.replaceState(url, '', state);
  }
}
