import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/seachView';
import * as recipeView from './views/recipeView'
import * as listView from './views/listView'
import * as likesView from  './views/LikesView';
import { elements, renderLoader, clearLoader } from './views/base';
import Likes from './models/Likes';

/**Global State of the app
* - Search object
* - Current recipe object
* - Shopping list object
* - Liked recipes
**/
const state = {};

/**
 * Like Controller
 */
function controlLike() {
    if(!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;
    if(!state.likes.isLiked(currentID)){
        // recipe not liked yet
        //Add like to the state
        const newLike = state.likes.addLike(currentID, state.recipe.title, state.recipe.author, state.recipe.img);
        //Toggle the like button
        likesView.toggleLikeBtn(true);
        //Add like to UI list
        console.log(state.likes);
    } else {
        //recipe is liked
        //Remove like to the state
        state.likes.deleteLike(currentID);
        //Toggle the like button
        likesView.toggleLikeBtn(false);
        //Remove like from UI list
        console.log(state.likes);
    }
}

/**
 * List Controller
 */
function controlList() {
    //Create a new list IF there are none yet
    if(!state.list) state.list = new List();

    //Add each ingredients to the list
    state.recipe.ingredients.forEach(el => {
        listView.renderItem(state.list.addItem(el.count, el.unit, el.ingredient));
    });
}


/**
 * Recipe Controller
 */
async function controlRecipe(){
    // Get ID from URL
    const id = window.location.hash.replace('#', '');
    console.log(id);
    if (id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe)

        //Highlight selected search item
        if(state.search) searchView.highlightSelected(id);

        // Create new recipe object
        state.recipe = new Recipe(id, state.likes.isLiked(id));

        try {
            // Get recipe data & parse ingredent
            await state.recipe.getRecipe();
            console.log(state.recipe.ingredent)
            state.recipe.parseIngredients();
    
            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
    
            // Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch (error) {
            alert('Error getting recipe...');
            console.log(error);
        }
    }
}

/**
 * Search Controller
 */
async function controlSearch () {
    //1. Get query from view
    const query = searchView.getInput();
    console.log(query);
    if (query) {
        //2. New search object and add to state
        state.search = new Search(query);

        //3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.resultWindow);
        
        try {
            //4. Search for receipe
            await state.search.getResults();
    
            //5. Render results on UI
            clearLoader();
            console.log(state.search.recipes);
            if (state.search.recipes.length > 0) {
                searchView.renderResults(state.search.recipes);
            }
            else {
                searchView.renderNoResults(query);
            }
        } catch {
            clearLoader();
            alert('Error searching recipe...');
        }
    } 
}

// const r = new Recipe(35120);
// r.getRecipe()
// console.log(r);

// window.addEventListener('hashchange', controlRecipe)
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.resultsPage.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline'); //using cloesest because elements in .btn-inline can also be click on
    if (btn) {
        console.log('btn clicked');
        const goToPage = parseInt(btn.dataset.goto);
        console.log(btn.dataset);
        searchView.clearResults();
        searchView.renderResults(state.search.recipes, goToPage);
    }
});

//Handling button clicks in recipe
elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn-decrease, .btn-decrease *')) {   //.btn-descrease * any child of btn-decrease 
        //decrease button is clicked
        if(state.recipe.servings > 1){
            state.recipe.updateServings('decrease');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        //increase button is clicked
        state.recipe.updateServings('increase');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        //Add ingredients to shopping list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')){
        //Like Controller
        controlLike();
    }
    //console.log(state.recipe);
});

//Handling button clicks in shopping list
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        //Handle the delete button
        //Delete from state
        state.list.deleteItem(id);
        //Delete from interface
        listView.deleteItem(id);
    } else if (e.target.matches('.shopping__count-value')) {
        //Handle count update
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    } 
    
});

window.state = state;