import axios from 'axios';
import {key} from '../config';

export default class Recipe {
    constructor (id){
        this.id = id;
    }
    async getRecipe() {
        try {
            const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = rex.data.recipe.publisher;
            this.image = res.data.recipe.img_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (error) {
            alert(error);
        }
    }
}