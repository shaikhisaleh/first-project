import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pageId:string='recipe';


  onNavigate(event:string){
    console.log(event);
    
    this.pageId = event;
  }
  
}
