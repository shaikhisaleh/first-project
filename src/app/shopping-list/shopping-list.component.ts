import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredientsValue:{ ingredients: Ingredient[] };
  private igChangeSub:Subscription;
  constructor(
    private shoppingListService:ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
    ) { }

  ngOnInit(): void {
     this.store.select('shoppingList').pipe(take(1)).subscribe(ingredients => {
      this.ingredientsValue = ingredients;
    });
    // this.ingredients = this.shoppingListService.getIngredients();   
    // this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
    //   (reIngredients:Ingredient[])=>{
    //     this.ingredients = reIngredients;
    //   }
    // );
    console.log('store selected',this.store.select('shoppingList'));
    
  }
  onEditItem(index:number){
    this.shoppingListService.startedEditing.next(index);
  }
  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
}
