import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'

import { RecipeService } from '../recipes/recipe.service'
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';


@Injectable()
export class DataStorageService {
    constructor(private http:HttpClient, private recipeService:RecipeService){}

    storeRecipes(){
       const recipes= this.recipeService.getRecipes();
       this.http.put('https://recipe-book-7bf79-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',recipes).subscribe((res)=>{
        console.log(res);       
       })
    }
    fetchRecipes(){
        this.http.get<Recipe[]>('https://recipe-book-7bf79-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
        .pipe(map(res=>{
            return res.map(recipe=>{
                return {...recipe, ingredients: recipe.ingredients? recipe.ingredients : []};
            })
        }))
        .subscribe((res)=>{
        this.recipeService.setRecipes(res)       
       })
    }
}
