//control the interaction and update interface
var UIController = (function () {
    var DomStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        addButton: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list'
    }
    return {
        getInput: function () {
            return {
                type: document.querySelector(DomStrings.inputType).value, //will be either income or expense
                description: document.querySelector(DomStrings.inputDescription).value,
                value: document.querySelector(DomStrings.inputValue).value
            }
        },
        addListItem: function(obj, type) {
            var html, netHtml, element;

            //Create HTML string with placeholder text
            if (type === 'inc'){
                element = DomStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%desciption%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
            }
            else if (type === 'exp') {
                element = DomStrings.expenseContainer;
                htl = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%desctiption%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
            }
            //Replace the paceholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%desctiption', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //Insert the HTML into Dom
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        getDomStrings: function () {
            return DomStrings;
        }
    }
})();


var MainController = (function (budgetCtrl, UICtrl) {
    var setupEventListener = function () {
        document.querySelector(DomStrings.addButton).addEventListener('click', addItem);
        document.addEventListener('keypress', function (event) {
            if (event.keycode === 13 || event.which === 13)
                addItem();
        });
    }
    var DomStrings = UICtrl.getDomStrings();
    var addItem = function () {
        //Get the field input data
        var input = UICtrl.getInput();
        console.log(input);

        //Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        //Add the item to UI
        UICtrl.addListItem(newItem, input.type);

        //Calculate the budget


        //Display the budget on the UI
    }
    return {
        init: function () {
            console.log('Application has started.');
            setupEventListener();
        }
    }
    
    
})(budgetController, UIController);

//control the budget component
var budgetController = (function () {
    var data = {
        allItems: {
            inc: [],
            exp: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;

    }
    var Income = function(id, desciption, value) {
        this.id = id;
        this.desciption = desciption;
        this.value = value;
    }
    return {
        //Create and add item. return the new item if item is created successfully
        addItem: function(type, des, val){
            var id, newItem;

            //Crate new ID
            if (data.allItems[type].length > 0){
                id = data.allItems[type][data.allItems[type].length - 1].id + 1
            }
            else {
                id = 0;
            }

            //Create new item
            if(type === 'inc'){
                newItem = new Income(id, des, val);
            }
            else if (type === 'exp') {
                newItem = new Expense(id, des, val);
            }

            //Push to array
            data.allItems[type].push(newItem);

            //return the item
            return newItem;

        }
    }
})();

MainController.init();