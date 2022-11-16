import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions'

@Injectable()
export class ShoppingListService{
    
    ingredientsChanged = new Subject <Ingredient[]>();
    startedEditing = new Subject <number>();
    private ingredients:Ingredient[] = [
        new Ingredient('tomatoes',3),
        new Ingredient('potatoes',1),
        new Ingredient('onion',2)
    ];
    constructor(private store:Store<{shoppingList: {ingredients: Ingredient[]}}>){}
    getIngredients(){
        return this.ingredients.slice();
    }
    getIngredient(index:number):Ingredient{
        return this.ingredients[index];
      }
    addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
      }
    addAllIngredients(ingredients:Ingredient[]){
        // for(let ingredient of ingredients){
        //     this.ingredients.push(ingredient);
        // }
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
   updateIngredient(index:number,ingredient:Ingredient){
    this.ingredients[index]=ingredient;
    this.ingredientsChanged.next(this.ingredients.slice());
    
   }
   deleteIngredient(index:number){
    // this.ingredients.splice(index,1);
    // this.ingredientsChanged.next(this.ingredients.slice());
    this.store.dispatch(new ShoppingListActions.DeleteIngredients(index))
   }
}