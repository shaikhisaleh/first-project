import { Component, OnDestroy, ViewChild, ViewContainerRef } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector:'app-auth',
    templateUrl:'auth.component.html',
    styleUrls: ['auth.component.scss'],
})
export class AuthComponent implements OnDestroy{
    @ViewChild(PlaceHolderDirective) alertHost:PlaceHolderDirective;

    isLoginMode = true;
    isLoading = false;
    error:string = null;
    private closeSub: Subscription;
    constructor(
        private authService: AuthService,
        private router:Router
        ){}

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }
    onSubmit(authForm:NgForm){
        if(!authForm.valid){
            return;
        }

        const email = authForm.value.email;
        const password = authForm.value.password;
        let authObs:Observable<AuthResponseData>;
        this.isLoading=true;

        if(this.isLoginMode){
            authObs = this.authService.login(email,password);
        }
        else{
            authObs = this.authService.signUp(email,password);
        }

        authObs.subscribe(resData => {
            this.isLoading=false;
            this.error = null;
            this.router.navigate(['/recipes']);
        },errorMessage => {
            this.error = errorMessage;
            this.showErrorAlert(errorMessage);
            this.isLoading=false;
        });
        authForm.reset();
    }
    onHandleError(){
        this.error=null;
    }
    ngOnDestroy(): void {
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
    }
    
    //Create components programmatically. Uses my appPlaceholder directive <ng-tmplate> to mark the view point.
    private showErrorAlert(message:string){
        const hostViewContainerRef = this.alertHost;
        hostViewContainerRef.viewContainerRef.clear();
        const componentRef = hostViewContainerRef.viewContainerRef.createComponent(AlertComponent);
        componentRef.instance.message=message;
        this.closeSub = componentRef.instance.close.subscribe(()=>{
            this.closeSub.unsubscribe();
            hostViewContainerRef.viewContainerRef.clear();
        });
    }
   
}