import { Component, OnInit} from '@angular/core';

import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit{
  questionForm!: FormGroup;
  levels = ['easy', 'meduim', 'hard'];

  constructor(private questionService: QuestionService){
    
  }

  ngOnInit(): void {
    this.questionForm = new FormGroup({
      questionData: new FormGroup({
        name: new FormControl(null),
        level : new FormControl(null),
        category : new FormControl(null),
        subCategory : new FormControl(null),
        mark : new FormControl(null),
        correctedAnswersId: new FormArray([]),
        expectedTime : new FormControl(null),
      }),
      answerData: new FormGroup({
        selected: new FormControl(false),
        name: new FormControl(null),
        description: new FormControl(null),
      }, [Validators.required]),
      answers: new FormArray([])
    });
  }

  onSubmit(){
    this.questionService.addQuestion(this.questionForm);
  }

  onAddAnswer(){
    const control = new FormControl(this.questionForm.get('answerData')?.value);
    (<FormArray>this.questionForm.get('answers')).push(control);
    console.log(this.questionForm.value);
    this.questionForm.get('answerData')?.reset();
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