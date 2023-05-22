import { FormGroup } from "@angular/forms";
import { Question } from "./question.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class questionService{
    question: Question;
    
    constructor(private http: HttpClient){
        this.question = new Question();
    }

    addQuestion(form: FormGroup){
        const qData = form.get('questionData');

        this.question.name = qData?.get('name')?.value;
        this.question.category = qData?.get('category')?.value;
        this.question.subCategory = qData?.get('subCategory')?.value;
        this.question.levelId = qData?.get('level')?.value;
        this.question.mark = qData?.get('mark')?.value;
        this.question.expectedTime = qData?.get('expectedTime')?.value;
        this.question.createdBy = qData?.get('createdBy')?.value;

        let serializedForm = JSON.stringify(this.question);
        
        console.log(serializedForm);

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
          };   
        this.http.post(
            'http://localhost:8080/api/question/create', 
            serializedForm,
            httpOptions).
            subscribe(responseData => {
                console.log(responseData);
            });
    }
}