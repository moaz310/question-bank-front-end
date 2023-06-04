import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class UserService{
    readonly url = 'http://localhost:8081/api/user/';
    
    readonly httpOptionsContentType = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json'
        })
    };   

    constructor(private http: HttpClient){}

    login(userInfo: FormGroup): Observable<any>{
        console.log(userInfo);
        const serializedForm = JSON.stringify(userInfo.value);
        console.log(serializedForm);
        return this.http.post(this.url + 'login',
        serializedForm,
        this.httpOptionsContentType);
    }
}