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
async function recipeController(){
}
const r = new Recipe(35120);
r.getRecipe();