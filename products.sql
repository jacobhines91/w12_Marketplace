DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(50),
  department_name VARCHAR(100),
  price DEC(10,2),
  stock_quantity INT,
  PRIMARY KEY (item_id) 
  );
  
  INSERT INTO products(product_name, department_name, price, stock_quantity)
  VALUES("XboxOne", "Electronics", 300.99, 100), ("55' Samsung HDTV", "Electronics", 600.99, 100), ("Office Chair", "Office", 129.99, 100);
  
    INSERT INTO products(product_name, department_name, price, stock_quantity)
    VALUES("RTX2060", "Electronics", 400.99, 100),("L-shape Glass Desk", "Office", 199.99, 100), ("Couch", "home", 799.99, 100);
    
      INSERT INTO products(product_name, department_name, price, stock_quantity)
    VALUES("Garden Hose", "Outdoor", 30.99, 100),("Pergolla", "Outdoor", 999.99, 100), ("Ring Door Bell", "Outdoor", 199.99, 100);
    
          INSERT INTO products(product_name, department_name, price, stock_quantity)
    VALUES("Rug", "home", 24.99, 100),("Dining Set", "home", 79.99, 100), ("Smart Fridge", "Aplliances", 2999.99, 100);
    
    
    
  
  
  
