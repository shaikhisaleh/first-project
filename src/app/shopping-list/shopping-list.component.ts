import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import * as fromShoppingList from './store/shopping-list.reducer'
import * as ShoppingListActions from './store/shopping-list.actions'
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangeSub:Subscription;
  constructor(
    private shoppingListService:ShoppingListService,
    private store: Store<fromShoppingList.AppState>
    ) { }
    
  ngOnInit(): void {
    this.store.select('shoppingList').subscribe(e=>{
      this.ingredients =  (<Ingredient[]>e.ingredients);
      
    });

    console.log("Te log",this.ingredients);
    
    // this.igChangeSub=this.store.select('shoppingList').subscribe(ingredients=>{
    //   console.log(ingredients);
    //   this.ingredients = ingredients.ingredients;
    // });
    // this.ingredients = this.shoppingListService.getIngredients();   
    // this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
    //   (reIngredients:Ingredient[])=>{
    //     this.ingredients = reIngredients;
    //   }
    // );
    
    
  }
  onEditItem(index:number){
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
    console.log('start edit', index);
    
  }
  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
}
