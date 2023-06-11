import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from "./auth.service";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (req.headers.get('Anonymous') !== null) {
            const newHeaders = req.headers.delete('Anonymous')
            const newRequest = req.clone({ headers: newHeaders });
            return next.handle(newRequest);
        } else {
            const authToken = this.authService.getAccessToken();
            const newHeaders = req.headers.append('Authorization', 'Bearer ' + authToken);
            const newRequest = req.clone({ headers: newHeaders });
            return next.handle(newRequest);
        }
    }
}