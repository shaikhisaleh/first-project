import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() selected = new EventEmitter<string>();
  constructor(private dataStorageService:DataStorageService){}
  collapsed = true;

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }
  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
}