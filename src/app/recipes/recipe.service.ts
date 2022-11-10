import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
    recipesChanged = new Subject<Recipe[]>()
    // private recipes:Recipe[]=[
    //     new Recipe(
    //         'Chicken Salad',
    //     'A healthy grilled chicken salad',
    //     'https://healthyfitnessmeals.com/wp-content/uploads/2021/04/Southwest-chicken-salad-7-868x1024.jpg',
    //     [
    //         new Ingredient('Checken breast',1),
    //         new Ingredient('Sliced tomatoe',4),
    //         new Ingredient('Sliced onion',3),
    //         new Ingredient('Feta cheese',1),
    //     ]
    //     ),
    //     new Recipe(
    //         'Smashed Burger',
    //     'Smashed style burger with gouda cheese',
    //     'https://natashaskitchen.com/wp-content/uploads/2021/06/Smashed-Burgers-5.jpg',
    //     [
    //         new Ingredient('Beef patty',1),
    //         new Ingredient('Sliced Gouda',1),
    //         new Ingredient('Slice tomatoe',2),
    //         new Ingredient('Slice onion',1),
    //         new Ingredient('Bun',1),
    //     ]
    //     ) 
    //   ];
    private recipes:Recipe[]=[];

      constructor(private shoppingListService:ShoppingListService){

      }

    setRecipes(recipes:Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
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
    addRecipe(recipe:Recipe){
        this.recipes.push(recipe)
        this.recipesChanged.next(this.recipes.slice())
    }
    updateRecipe(index:number,newRecipe:Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice())
    }
    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
}