import axios from 'axios';
import {key} from '../config';

export default class Recipe {
    constructor (id){
        this.id = id;
    }
    async getRecipe() {
        try {
            //const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=35382`);
            const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.image = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (error) {
            console.log(error);
            alert('Something went wrong :(');
        }
    }
    calcTime() {
        const numOfIng = this.ingredients.length;
        this.time = (Math.ceil(numOfIng / 3)) * 15
    }
    calcServings() {
        this.servings = 4;
    }
    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teasoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        this.ingredients = this.ingredients.map(el => {
            // Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            //Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // Parse ingredients into count, unit and ingreident
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2))

            return ingredient;

        });
    }
}