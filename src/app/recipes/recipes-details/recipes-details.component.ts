import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrls: ['./recipes-details.component.scss']
})
export class RecipesDetailsComponent implements OnInit {
  @Input() recipe:Recipe;
  constructor(private recipeService:RecipeService) { }

  ngOnInit(): void {
  }
  onAddtoShoppinglist(){
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
  }
}
