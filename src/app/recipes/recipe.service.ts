import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
    //This EventEmitter is subscraibable
    recipeSelected = new EventEmitter<Recipe>;
    private recipes:Recipe[]=[
        new Recipe(
            'Chicken Salad',
        'A healthy grilled chicken salad',
        'https://healthyfitnessmeals.com/wp-content/uploads/2021/04/Southwest-chicken-salad-7-868x1024.jpg',
        [
            new Ingredient('Checken breast',1),
            new Ingredient('Sliced tomatoe',4),
            new Ingredient('Sliced onion',3),
            new Ingredient('Feta cheese',1),
        ]
        ),
        new Recipe(
            'Smashed Burger',
        'Smashed style burger with gouda cheese',
        'https://natashaskitchen.com/wp-content/uploads/2021/06/Smashed-Burgers-5.jpg',
        [
            new Ingredient('Beef patty',1),
            new Ingredient('Sliced Gouda',1),
            new Ingredient('Slice tomatoe',2),
            new Ingredient('Slice onion',1),
            new Ingredient('Bun',1),
        ]
        ) 
      ];
      constructor(private shoppingListService:ShoppingListService){

      }
    getRecipe(id:number){
        return this.recipes[id];
    }
    getRecipes(){
        // We use slice() to get a new array that is a copy of the original
        // changing this array won't change the original one.
        return this.recipes.slice();
    }
    addIngredientToShoppingList(ingredients:Ingredient[]){
        this.shoppingListService.addAllIngredients(ingredients);
    }
}