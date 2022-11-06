import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{
    ingredientsChanged = new EventEmitter <Ingredient[]>();
    private ingredients:Ingredient[] = [
        new Ingredient('tomatoes',3),
        new Ingredient('potatoes',1),
        new Ingredient('onion',2)
    ];

    getIngredients(){
        return this.ingredients.slice();
    }
    addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
      }
    addAllIngredients(ingredients:Ingredient[]){
        // for(let ingredient of ingredients){
        //     this.ingredients.push(ingredient);
        // }
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
}