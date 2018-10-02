import axios from 'axios';
import {key} from '../config';
import { parse } from 'url';

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
        console.log(this.ingredients);
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
            const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2)); //findIndex return the index when the call back function return true

            let objIng;
            if(unitIndex > -1) {  
                //There is a unit
                const arrCount = arrIng.slice(0, unitIndex);
                let count;
                if(arrCount.length === 1) {
                    count = eval(arrCount[0].replace('-', '+'));
                } else {
                    count = eval(arrCount.join('+'));
                }
                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }
            } 
            else if (parseInt(arrIng[0], 10)) { 
                // no unit but a quantity exist
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if ( unitIndex === -1) {
                //no unit and no quantity is found
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient //ES6 allows to write this instead of ingredient: ingredient when the value name is same
                }
            }
            return objIng;
        });
    }
}