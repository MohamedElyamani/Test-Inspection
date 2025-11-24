import { HttpHandler, HttpInterceptor, HttpEvent, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiU2Fib29yVXNlcjEiLCJJbnNwZWN0aW9uTXVsdGl0ZW5hbnRDbGFpbXNUZW5hbnRVc2VyTmFtZSI6IlNhYm9vclVzZXIxIiwiSW5zcGVjdGlvbk11bHRpdGVuYW50Q2xhaW1zVGVuYW50TmFtZSI6InNhYm9vciIsImV4cCI6MTc2NzA5MTYxNiwiaXNzIjoiQXBwIEF1dGhvcml6YXRpb24gSXNzdXJlIn0.pTleo4Q_OrggETj94Lw1iicWWWgFFr_-k288KaK6CYw`;
        if (token){
            const cloned = req.clone({
                setHeaders: {
                     Authorization: `Bearer ${token}`
                }
            });
            return next.handle(cloned);
    }
        return next.handle(req);
}
}