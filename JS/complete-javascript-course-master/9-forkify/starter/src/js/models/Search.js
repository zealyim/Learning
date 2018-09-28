
import axios from 'axios'; //just the name of the plugin
import {key} from '../config';

export default class Search {
    constructor(query){
        this.query = query;
    }
    async getResults(){
        try{
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);//automaticaly return json
            //console.log(res);
            this.recipes = res.data.recipes;
        } catch (error){
            alert(error);
        }
    }

}