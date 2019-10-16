var sql = require("mysql");

var inquirer = require("inquirer");

var connection = sql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "MMS71255",
    database: "bamazon"
});

connection.connect(function (err){
    if (err) throw err;
    showProducts();
})
//fucntion to show proudcts after connection is made
function showProducts() {
    connection.query(
//grabs the products table from bamazon database
        "SELECT * FROM products",
        function (err, res) {
            if (err) throw err;

            console.log("\n-------------------------------------------------\n  Welcome to Jacobs Store! Browse my products\n-------------------------------------------------");
            //loops through all of the products and displays the ID + NAME + PRICE
            for (var i = 0; i < res.length; i++) {
                console.log("\n" + res[i].item_id + ". " + res[i].product_name + " || $" + res[i].price);
            }
            console.log("\n-------------------------------------------\n");
            customerPrompt();

        }
    )
}
//prompts the customer asking them what product they want and how many units
function customerPrompt() {
    inquirer.prompt([{
     type: "input",
     message: "What's the ID of the product you would like to buy?",
     name: "id" },
        {
        type: "input",
        message: "How many units would you like to buy?",
        name: "units"
        }
    ]).then(answers => {
     
        connection.query(
            "SELECT * FROM products WHERE item_id = '" + answers.id + "'",
            function (err, res) {
                if (err) throw err;

                if (res[0].stock_quantity > answers.units) {

                    // updates the database depending on users actions
                    var newQuantity = res[0].stock_quantity - answers.units;
                    var itemID = answers.id
                    var unitsBought = answers.units;
                    makeSale(newQuantity, itemID, unitsBought);

                        //if none in stock alerts the customer (100 units for each product)
                } else {
                    console.log("Insufficient quantity!");
                    connection.end();
                }
            }
        )
    })
    }

function makeSale(newQuantity, itemID, unitsBought) {
    connection.query(
        "UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newQuantity, itemID],
    );
        //outputs the total for product(s purchased
    connection.query(
        "SELECT * FROM products WHERE item_id = ?", [itemID],
        function(err, res) {
            if (err) throw err;
            var total = res[0].price * unitsBought;
            console.log("\nTOTAL: $" + total);
            console.log("Thank you for your purchase\n");
            connection.end();
        }
    )
}