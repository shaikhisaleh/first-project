import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import { MyConfig } from "src/config/my-config";
import { Router } from "@angular/router";

export interface AuthResponseData{
    idToken:string,	
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean
}

@Injectable()
export class AuthService{
    
    user = new BehaviorSubject<User>(null);
    constructor(private http: HttpClient, private config:MyConfig, private router:Router){}
    private apiKey = this.config.getKey();
    private tokenExpirationTimer: any;
    signUp(email:string, password:string){
       return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,{
            email: email,
            password:password,
            returnSecureToken:true
        }).pipe(catchError(this.handleError),
        tap(resData =>{
            this.HandleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn //string coverted to number by adding plus sign
                );
        }));
    }
    autoLogin(){
        const userData:{
            email:string,
            id:string,
            _token:string,
            _tokenExpirationDate:string
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return
        }
        const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
        //This executes user.getToken() and checks if it is still valid then emits the user if true
        if(loadedUser.token){
            this.user.next(loadedUser);
            //Future expiration date in milliseconds (getTime) - current expiration date = remaining time to auto logout.
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }

    }
    login(email:string,password:string){
        return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,{
            email: email,
            password:password,
            returnSecureToken:true
        }).pipe(catchError(this.handleError),
        tap(resData =>{
            this.HandleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn //string coverted to number by adding plus sign
                );
        }));  
    }
    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);   
        }
        this.tokenExpirationTimer = null;
    }
    autoLogout(userExpiration:number){
        setTimeout(() => {
            this.logout();
        }, userExpiration);
    }
    private HandleAuthentication(email:string,userId:string,token:string,expiresIn:number){
            // Create new date object with get time a milliseconds then adds seconds which is 
            //multiplied by 1000 to convert seconds to milliseconds wrapped in a date object
            const expirationDate = new Date(new Date().getTime()+ expiresIn * 1000);
            const userData = new User(email,userId,token,expirationDate);
            this.user.next(userData);
            this.autoLogout(expiresIn * 1000);
            localStorage.setItem('userData',JSON.stringify(userData));
        }
    
    private handleError(errorRes:HttpErrorResponse){
        let errorMessage = 'An unknown error occured'
            if(!errorRes.error || !errorRes.error.error){
                return throwError(errorMessage);
            }
            switch(errorRes.error.error.message){
                case 'EMAIL_EXISTS':
                    errorMessage='This email exists already!';
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage='This password is not correct.';
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage='This email does not exist.';
                    break;
            }
            return throwError(errorMessage);
    }
}
    
    //sign up
    //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

    //login
    //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]