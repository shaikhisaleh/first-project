import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {

  constructor(private shoppingListService:ShoppingListService) { }
  @ViewChild('f') slForm:NgForm;
  subscription:Subscription;
  editMode=false;
  editedItemIndex:number;
  editedItem:Ingredient;
  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index:number)=>{
      this.editMode=true;
      this.editedItemIndex=index;
      this.editedItem=this.shoppingListService.getIngredient(index);
      this.slForm.setValue(this.editedItem)
    })
  }

  onSubmit(form:NgForm){
    const ingredientName = form.value.name;
    const ingredientAmount = form.value.amount;
    const newIngredient = new Ingredient(ingredientName,ingredientAmount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex,newIngredient);
    }
    else{
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }
  onReset(){
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onReset();
    this.editMode = false;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
