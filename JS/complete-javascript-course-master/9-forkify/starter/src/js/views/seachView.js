import {elements} from './base';
export const getInput = () => elements.searchInput.value;

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="Test">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.resultList.insertAdjacentHTML('beforeend', markup);
}
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if(title.length > limit){
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit){
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}
const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    if (page === 1 && pages > 1){
        //Button to go to next page
    } else if (page < pages){

    } else if (page === pages && pages > 1){
        //Button to go to previous page only
    }
}
export const clearInput = () => {
    elements.searchInput.value = '';
}
export const clearResults = () => {
    elements.resultList.innerHTML = '';
}
export const renderResults = (recipes, page = 1, recipePerPage = 10) => {
    const start = (page - 1) * recipePerPage;
    const end = page * recipePerPage;
    recipes.slice(start, end).forEach(renderRecipe); //no need to write .foreach(el => renderRecipe(el));
}