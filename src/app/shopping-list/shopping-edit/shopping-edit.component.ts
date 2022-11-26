import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {

  constructor(
     private store:Store <fromApp.AppState>
     ) {}

  @ViewChild('f') slForm:NgForm;
  subscription:Subscription;
  editMode=false;
  editedItemIndex:number;
  editedItem:Ingredient;
  storeSub:Subscription;

  ngOnInit(): void {
   
   this.storeSub =  this.store.select('shoppingList').subscribe(stateData=>{

      if(stateData.editedIndex > -1){
        
        this.editMode=true;
        this.editedItem=stateData.editedIngredient;
        this.editedItemIndex = stateData.editedIndex;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
        
      }
      else{
        this.editMode=false;
        
      }
    });
    
  }

  onSubmit(form:NgForm){
    const ingredientName = form.value.name;
    const ingredientAmount = form.value.amount;
    const newIngredient = new Ingredient(ingredientName,ingredientAmount);
    if(this.editMode){
      // this.shoppingListService.updateIngredient(this.editedItemIndex,newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredients({index:this.editedItemIndex,ingredient:newIngredient}));
      console.log("UPDATEEEE");
      
    }
    else{
      // this.shoppingListService.addIngredient(newIngredient);
       this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      
      
    }
    this.editMode = false;
    form.reset();
  }
  onReset(){
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
  onDelete(){
    this.onReset();
    this.store.dispatch(new ShoppingListActions.DeleteIngredients(this.editedItemIndex));
    this.editMode = false;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.storeSub.unsubscribe();
  }
}
