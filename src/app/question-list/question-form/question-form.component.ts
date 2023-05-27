import { Component, Input, OnDestroy, OnInit} from '@angular/core';

import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../question.service';
import { Question } from '../question.model';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit, OnDestroy{
  questionForm!: FormGroup;
  levels = ['easy', 'meduim', 'hard'];
  onCreate: boolean = true;
  onUpdate!: boolean;
  question!: Question;

  constructor(private questionService: QuestionService,
              private location: Location,
              private router: Router){
  }

  ngOnInit(): void {
    this.questionForm = new FormGroup({
      questionData: new FormGroup({
        name: new FormControl(null, [Validators.required]),
        level : new FormControl('easy'),
        category : new FormControl(null, [Validators.required, Validators.maxLength(25)]),
        subCategory : new FormControl(null, [Validators.maxLength(25)]),
        mark : new FormControl(null, [Validators.required, Validators.min(0), Validators.max(25)]),
        correctedAnswersId: new FormArray([]),
        expectedTime : new FormControl(null, [Validators.required, Validators.min(1), Validators.max(30)]),
      }),
      answerData: new FormGroup({
        selected: new FormControl(false),
        name: new FormControl(null),
        description: new FormControl(null),
      }),
      answers: new FormArray([], [Validators.required])
    });
    this.question = history.state;
    if(this.question.name != null){
      this.onCreate = false;
      this.onUpdate = true;
      this.questionForm = this.questionService.questiontoForm(this.question, this.questionForm);
    }
  }
  
  ngOnDestroy(): void {
    this.onUpdate = false;
    this.onCreate = false;
    this.question = new Question();
    this.resetState();
    this.router.navigate(['']);
  }  
  
  onSubmit(){
    let event: Observable<any>;
    if(this.onCreate){
      event = this.questionService.addQuestion(this.questionForm);
    }
    else{
      event = this.questionService.updateQuestion(this.question.id, this.questionForm);
    }
    event.subscribe({
      next: (response)=>{
        console.log(response);
        this.router.navigate(['']);
      },
      error: (err) => {console.log(err)}
    })
  }

  onAddAnswer(){
    const control = new FormControl(this.questionForm.get('answerData')?.value);
    (<FormArray>this.questionForm.get('answers')).push(control);
    console.log(this.questionForm.value);
    this.questionForm.get('answerData')?.reset();
  }

  resetState(): void {
    const url = '';
    const state = '';
    this.location.replaceState(url, state);
  }
  

  get answerControls() {
    return (this.questionForm.get('answers') as FormArray).controls;
  }

  changeValue(idx: number){
    let temp = this.answerControls.at(idx)?.value;
    temp.selected = !temp.selected;
    this.answerControls.at(idx)?.setValue(temp);
  }

}