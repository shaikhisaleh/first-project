import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {
  recipes:Recipe[];
  constructor(private recipeService:RecipeService) { }
  @Output() recipeDetails = new EventEmitter<Recipe>();
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  onRecipeSelected(recipeEl:Recipe){
    this.recipeDetails.emit(recipeEl);
  }
}
