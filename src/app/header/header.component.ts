import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  @Output() selected = new EventEmitter<string>();

  collapsed = true;
  private userSub : Subscription;
  isAuthenticated=false;

  constructor(
    private dataStorageService:DataStorageService,
    private authService:AuthService
    ){}

  
  
  ngOnInit(): void{
    console.log(!this.isAuthenticated);
    console.log(!!this.isAuthenticated);
    this.userSub = this.authService.user.subscribe(user =>{
      //Equevalant of !user ? false : true;
      this.isAuthenticated = !!user;
      
    });
      
  }
  onSaveData(){
    this.dataStorageService.storeRecipes();
  }
  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
  onLogout(){
    this.authService.logout();
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}