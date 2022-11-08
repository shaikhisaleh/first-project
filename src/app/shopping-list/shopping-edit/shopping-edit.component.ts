import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    const ingredientName = form.value.name;
    const ingredientAmount = form.value.amount;
    this.shoppingListService.addIngredient(new Ingredient(ingredientName,ingredientAmount));
  }
}
