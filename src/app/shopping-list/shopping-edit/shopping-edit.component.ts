import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') name:ElementRef
  @ViewChild('amountInput') amount:ElementRef

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const ingredientName = this.name.nativeElement.value;
    const ingredientAmount = this.amount.nativeElement.value;
    this.shoppingListService.addIngredient(new Ingredient(ingredientName,ingredientAmount));
  }
}
