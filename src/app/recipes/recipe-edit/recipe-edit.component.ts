import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode = false;
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id = +params['id'];
        // False for a link without id meaning it is a new recipe
        this.editMode = params['id'] != null
      }
    )
  }

}