import Search from './models/Search';

/**Global State of the app
* - Search object
* - Current recipe object
* - Shopping list object
* - Liked recipes
**/
const state = {};

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
});

const search = new Search('pizza');
search.getResults();