import { Component, OnDestroy, OnInit } from '@angular/core';
import {  State, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import * as fromShoppingList from './store/shopping-list.reducer'
import * as ShoppingListActions from './store/shopping-list.actions'

import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangeSub:Subscription;
  constructor(
    private store: Store<fromShoppingList.AppState>
    ) { }
    
  ngOnInit(): void {
    this.store.select('shoppingList').pipe(tap( e=>{
          // on next 11, etc.
          this.ingredients= e.ingredients.slice();
      } 
    )).subscribe();
       

    
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
