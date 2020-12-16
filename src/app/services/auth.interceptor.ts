import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AppState, selectAuthToken, selectIsLoggedIn } from "../reducers";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  isLoggedIn: boolean;
  token: string;

  constructor(private store: Store<AppState>) {
    this.store.pipe(
      select(selectIsLoggedIn)
    ).subscribe(r => this.isLoggedIn = r);

    this.store.pipe(
      select(selectAuthToken)
    ).subscribe(r => this.token = r);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //if the url is for the API and not for the auth url
    if (req.url !== environment.apiUrl + 'auth/token' && this.isLoggedIn) {
      const newheaders = req.headers.append('Authorization', 'Bearer ' + this.token);
      const AuthRequest = req.clone({ headers: newheaders });
      return next.handle(AuthRequest);
    } else {
      return next.handle(req);
    }
    // then check to see if they are logged in. If they are, then add the token to the authorization header
  }

}
