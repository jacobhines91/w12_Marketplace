var sql = require("mysql");

var inquirer = require("inquirer");

var connection = sql.createConnection({
    host: "localhost",
    port: 8001,
    user: "root",
    password: "MMS71255",
    database: "bamazon"
});

connection.connect(function (err){
    if (err) throw err;
    showProducts();
})
function showProducts() {
    connection.query(
        "SELECT * FROM products",
        function (err, res) {
        if (err) throw err;
        console.log("\nPRODUCTS *********************************");
        for (var i = 0; i < res.length; i++) {
            console.log("\n" + i < res[i].item_id + ". " + res[i].product_name + " --  $" + res[i].price;
            
        }
        console.log("\n*********************************");
        customerPrompt();

        }
    )
}

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
        // console.log("\nID: " + answers.id);
        // console.log("Units: " + answers.units);

        // If quantity of desired item > 0 . . . 
        connection.query(
            "SELECT * FROM products WHERE item_id = '" + answers.id + "'",
            function (err, res) {
                if (err) throw err;

                if (res[0].stock_quantity > answers.units) {

                    // updates the database based on how user actions
                    var newQuantity = res[0].stock_quantity - answers.units;
                    var itemID = answers.id
                    var unitsBought = answers.units;
                    makeSale(newQuantity, itemID, unitsBought);

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