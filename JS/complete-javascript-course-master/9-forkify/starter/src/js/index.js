import Search from './models/Search';
import * as searchView from './views/seachView';
import { elements, renderLoader, clearLoader } from './views/base';

/**Global State of the app
* - Search object
* - Current recipe object
* - Shopping list object
* - Liked recipes
**/
const state = {};

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
        searchView.renderResults(state.search.recipes);
    }

    
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});
