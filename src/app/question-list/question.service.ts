import { FormGroup } from "@angular/forms";
import { Question } from "./question.model";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class QuestionService{
    private question: Question;
    readonly url = 'http://localhost:8080/api/';
    readonly httpOptionsContentType = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };   
    
    constructor(private http: HttpClient){
        this.question = new Question();
    }
    
    addQuestion(form: FormGroup){
        const qData = form.get('questionData');
        const answers = form.get('answers');
        console.log(answers?.value);

        this.question.name = qData?.get('name')?.value;
        this.question.category = qData?.get('category')?.value;
        this.question.subCategory = qData?.get('subCategory')?.value;
        this.question.levelId = qData?.get('level')?.value;
        this.question.mark = qData?.get('mark')?.value;
        this.question.expectedTime = qData?.get('expectedTime')?.value;
        this.question.createdBy = qData?.get('createdBy')?.value;
        this.question.answers = answers?.value;
        const serializedForm = JSON.stringify(this.question);
        
        console.log(this.question.answers);
        console.log(serializedForm);
        
        this.http.post(
            this.url+'question/create', 
            serializedForm,
            this.httpOptionsContentType).
            subscribe(responseData => {
                console.log(responseData);
            });
    }
        
    getQuestions(page: number): Observable<any>{
        let queryParams = new HttpParams();
        queryParams = queryParams.append("page",page);
        queryParams = queryParams.append("size",5);
        return this.http.get<any>(this.url + 'questions', {params: queryParams});
    }

    getTotal(): Observable<number>{
        return this.http.get<number>(this.url + 'questions/count');
    }
}