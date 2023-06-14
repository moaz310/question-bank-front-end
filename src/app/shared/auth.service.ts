import { FormGroup } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../user/user.model";

@Injectable()
export class AuthService{
    readonly url = 'http://localhost:8081/api/user/';
    readonly JWT_TOKEN:string = 'JWT_TOKEN';
    readonly REFRESH_TOKEN:string = 'REFRESH_TOKEN';
    readonly USER_ROLE: string = 'USER_ROLE';

    user!: User;

    readonly httpOptionsContentType = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Anonymous': '' 
        })
    };   

    constructor(private http: HttpClient){
        this.user = new User();
    }

    setUser(userName: string, token: string){
        this.user.userName = userName;
        this.user.role = JSON.parse(atob(token.split('.')[1]))['resource_access']['login-microservice']['roles'][0];
        localStorage.setItem('USER', JSON.stringify(this.user));
        localStorage.setItem(this.USER_ROLE, this.user.role);
    }

    login(userInfo: FormGroup): Observable<any>{
        const serializedForm = JSON.stringify(userInfo.value);
        this.startRefreshTokenTimer();
        return this.http.post(this.url + 'login',
        serializedForm,
        this.httpOptionsContentType);
    }

    logout(): Observable<any>{
        const serializedForm = JSON.stringify({refresh_token: this.getRefreshToken()});
        this.stopRefreshTokenTimer();
        localStorage.clear();
        return this.http.post(this.url+'logout',
            serializedForm,
            this.httpOptionsContentType
        )
    }

    signup(userInfo: FormGroup): Observable<any>{
        const serializedForm = JSON.stringify(userInfo.value);
        return this.http.post(this.url + 'signup',
        serializedForm,
        this.httpOptionsContentType);
    }

    refreshToken(): Observable<any>{
        const refreshToken = this.getRefreshToken();
        console.log(refreshToken);
        const serializedForm = JSON.stringify({refresh_token: refreshToken});
        this.startRefreshTokenTimer();
        return this.http.post(this.url + 'refresh-token',
                            serializedForm,
                            this.httpOptionsContentType)
    }

    storeToken(jwtToken: string, refreshToken: string){
        localStorage.setItem(this.JWT_TOKEN, jwtToken);
        localStorage.setItem(this.REFRESH_TOKEN, refreshToken);
    }

    getAccessToken(): string|null{
        return localStorage.getItem(this.JWT_TOKEN);
    }

    getRefreshToken(): string|null{
        return localStorage.getItem(this.REFRESH_TOKEN);
    }

    private refreshTokenTimeout?: NodeJS.Timeout;

    private startRefreshTokenTimer() {
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(
            {
                next: (data) => {
                    this.storeToken(data['access_token'], data['refresh_token']);
                }
            }
        ), 200000);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }

    public isTeacher(): boolean{
        return localStorage.getItem(this.USER_ROLE) === 'Teacher';
    } 
}