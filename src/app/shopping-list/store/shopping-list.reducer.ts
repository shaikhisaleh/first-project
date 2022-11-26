import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions" ;


export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIndex: number
}

export interface AppState {
    shoppingList: State;
}
const initialState: State = {
    ingredients:  [
        new Ingredient('tomatoes',3),
        new Ingredient('potatoes',1),
        new Ingredient('onion',2)
    ],
    editedIngredient:null,
    editedIndex:-1
};

export function shoppingListReducer(state: State = initialState, action:ShoppingListActions.ShoppingListActions){
    switch(action.type){
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients:[...state.ingredients, action.payload]
            }
            case ShoppingListActions.ADD_INGREDIENTS:
                return {
                    ...state,
                    // ... spread operator is used to get items of a list
                    ingredients:[...state.ingredients, ...action.payload]
                }
               
                case ShoppingListActions.UPDATE_INGREDIENT:
                    const ingredient:Ingredient = state.ingredients[action.payload.index];

                
                    //update the ingredient in a copy of the state
                    const updatedIngredient:Ingredient = new Ingredient(action.payload.ingredient.name,action.payload.ingredient.amount)

                    //modify a copy array of the state with the updated ingredient
                    const updatedIngredients:Ingredient[] = state.ingredients.slice();
                    updatedIngredients[action.payload.index] =  updatedIngredient;

                    return {
                        ...state,
                        ingredients: updatedIngredients
                    }

                    case ShoppingListActions.DELETE_INGREDIENT:
                        return {
                            ...state,
                            ingredients: state.ingredients.filter((ig,igIndex)=>{
                                return igIndex != action.payload;
                            })
                        }
                    case ShoppingListActions.START_EDIT:
                                               
                        return {
                            ...state,
                            editedIndex: action.payload,
                            //Spread operator is used to make a new copy of the array instead of manuplating the state by getting the reference.
                            editedIngredient: {...state.ingredients[action.payload]}
                        }

                    case ShoppingListActions.STOP_EDIT:
                        return {
                            ...state,
                            editedIndex: -1,
                            editedIngredient: null
                        }
        default:
            return state
    }
}

