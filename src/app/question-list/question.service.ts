import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Question } from "./question.model";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Answer } from "./answer.model";

@Injectable()
export class QuestionService{
    private question: Question;
    readonly url = 'http://localhost:8083/api/';
    
    readonly httpOptionsContentType = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json'
        })
    };   
    
    constructor(private http: HttpClient){
        this.question = new Question();
    }
    
    deleteQuestion(id: String) : Observable<any>{
        return this.http.delete(
            this.url + 'question/delete/' + id
            );
    }
        
    deleteAnswer(answerId: string, questionId: string) : Observable<any> {
        return this.http.delete(
            this.url + 'question/delete/' + questionId + '/answer/' + answerId
            );
    }
        
    addAnswer(questionId: string, answer: Answer): Observable<any>{
        const serializedForm = JSON.stringify(answer);
        return this.http.patch(
            this.url + 'question/update/' + questionId + '/answer/create',
            serializedForm,
            this.httpOptionsContentType
        )
    }
    
    addQuestion(form: FormGroup): Observable <any>{
        this.question = this.questionFormtoQuestion(form);
        const serializedForm = JSON.stringify(this.question);
        
        return this.http.post(
            this.url+'question/create', 
            serializedForm,
            this.httpOptionsContentType);
    }
    
    updateQuestionForm(questionId: string, questionForm: FormGroup): Observable <any>{
        this.question = this.questionFormtoQuestion(questionForm);
        return this.updateQuestion(questionId, this.question);
    }

    updateQuestion(questionId: string, question: Question): Observable <any>{
        const serializedForm = JSON.stringify(question);
        return this.http.put(
            this.url + 'question/update/' + questionId,
            serializedForm,
            this.httpOptionsContentType);
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
    
    questionFormtoQuestion(form: FormGroup): Question{
        const question: Question = new Question();
        const qData = form.get('questionData');
        const answers = form.get('answers');
        question.name = qData?.get('name')?.value;
        question.category = qData?.get('category')?.value;
        question.subCategory = qData?.get('subCategory')?.value;
        question.levelId = qData?.get('level')?.value;
        question.mark = qData?.get('mark')?.value;
        question.expectedTime = qData?.get('expectedTime')?.value;
        question.answers = answers?.value;
        return question;
    }
        
    questiontoForm(question: Question, questionForm: FormGroup) : FormGroup{
        questionForm.get('questionData')?.get('name')?.setValue(question.name);
        questionForm.get('questionData')?.get('category')?.setValue(question.category);
        questionForm.get('questionData')?.get('subCategory')?.setValue(question.subCategory);
        questionForm.get('questionData')?.get('level')?.setValue(question.levelId);
        questionForm.get('questionData')?.get('mark')?.setValue(question.mark);
        questionForm.get('questionData')?.get('expectedTime')?.setValue(question.expectedTime);
        for(const answer of question.answers){
            (<FormArray>questionForm.get('answers')).push(new FormControl(answer));
        }
        console.log(questionForm.get('answers'));
        return questionForm;
    }
}