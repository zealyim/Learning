import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/seachView';
import { elements, renderLoader, clearLoader } from './views/base';

/**Global State of the app
* - Search object
* - Current recipe object
* - Shopping list object
* - Liked recipes
**/
const state = {};

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

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.resultsPage.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        console.log('btn clicked');
        const goToPage = parseInt(btn.dataset.goto);
        searchView.clearResults();
        searchView.renderResults(state.search.recipes, goToPage);
    }
})

/**
 * Recipe Controller
 */
async function constrolRecipe(){
    // Get ID from URL
    const id = window.location.hash.replace('#', '');
    console.log(id);
    if (id) {
        // Prepare UI for changes

        // Create new recipe object
        state.recipe = new Recipe(id);
        window.r = state.recipe;

        try {
            // Get recipe data
            await state.recipe.getRecipe();
    
            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
    
            // Render recipe
            console.log(state.recipe);

        } catch (error) {
            alert('Error getting recipe...');
            console.log(error);
        }
    }
}
// const r = new Recipe(35120);
// r.getRecipe()
// console.log(r);

// window.addEventListener('hashchange', controlRecipe)
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, constrolRecipe));