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
//type: prev or next
const generateButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;
const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if (page === 1 && pages > 1){
        //Button to go to next page
        button = generateButton(page, 'next');
    } else if (page < pages){
        //Both Buttons
        button = `
            ${generateButton(page, 'prev')}
            ${generateButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1){
        //Button to go to previous page only
        button = generateButton(page, 'prev');
    }
    elements.resultsPage.insertAdjacentHTML('afterbegin', button);
}
export const clearInput = () => {
    elements.searchInput.value = '';
}
export const clearResults = () => {
    elements.resultList.innerHTML = '';
    elements.resultsPage.innerHTML = '';
}
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe); //no need to write .foreach(el => renderRecipe(el));
    
    //render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
}
export const renderNoResults = (query) => {
    console.log('no result found');
    elements.resultList.insertAdjacentHTML('beforeend', `<center><li>No recipe found for ${query}<li></center>`);
}