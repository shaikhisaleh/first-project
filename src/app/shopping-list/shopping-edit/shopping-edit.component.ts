import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') name:ElementRef
  @ViewChild('amountInput') amount:ElementRef
  @Output() IngredientAdded = new EventEmitter<Ingredient>();
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    
    this.IngredientAdded.emit(new Ingredient(
      this.name.nativeElement.value,
      this.amount.nativeElement.value)
    )
  }
}
