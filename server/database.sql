CREATE DATABASE petshop;

CREATE TABLE Customers (
    customer_id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL UNIQUE ,
    billing_address VARCHAR(255),
    country VARCHAR(255),
    province VARCHAR(255),
    city VARCHAR(255),
    zip_code VARCHAR(255)  
);

CREATE TABLE Orders (
    order_id SERIAL PRIMARY KEY,
    order_number INT NOT NULL,
    shipping_cost INT,
    promo_code INT,
    total_price INT,
    payment_method VARCHAR(255),
    pickup_date TIMESTAMP, 
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_status VARCHAR(255),
	customer_id INT NOT NULL, 
		FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE CASCADE
);

CREATE TABLE Order_rows (
    order_row_id SERIAL PRIMARY KEY,
	order_id INT NOT NULL,
    pet_id INT,
    FOREIGN KEY (pet_id) REFERENCES Pets (pet_id) ON DELETE CASCADE,
	FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE
);  

CREATE TABLE Pets (
    pet_id SERIAL PRIMARY KEY,
    pet_name VARCHAR(255),
    animal VARCHAR(255),
    tag_line VARCHAR(255)
    color VARCHAR(255),
    breed VARCHAR(255),
    age INT,
    price INT,
    pet_description VARCHAR(500),
    img_url VARCHAR(255),
    purchase_status VARCHAR(255)
);


INSERT INTO Customers (full_name, email, billing_address, country, province, city, zip_code) VALUES ('Angelika Johansson', 'angelika.johansson@mail.com', 'Vejbyslattsvagen 23', 'Sweden', 'Skane', 'Vejbystrand', '26655');
INSERT INTO Customers (full_name, email, billing_address, country, province, city, zip_code) VALUES ('Edvin Andersson', 'edvin.andersson@mail.com', 'Vejbyslattsvagen 23', 'Sweden', 'Skane', 'Vejbystrand', '26655')
SELECT * FROM Customers;
INSERT INTO Orders(order_number, shipping_cost, total_price, payment_method, pickup_date, customer_id) VALUES ('1000', '25', '2500', 'Visa', '2021-10-11 20:00:00-07', '2' );
SELECT * FROM Orders;
INSERT INTO Order_rows (order_id, pet_name, price) VALUES ('4', 'Fluffy the threeheaded dog', '2000');
SELECT * FROM Order_rows;
INSERT INTO Pets (pet_name, animal, tag_line, color, breed, age, price, pet_description, img_url, purchase_status) VALUES('Astrid the mighty cat', 'Cat', 'This is the most superb cat I have ever seen', 'Tabby', 'Stray Cat', 2, 2000, 'A beautiful kitty with fierce eyes and superb hunting skills looking for a new home.', 'http', 'Available')
SELECT * FROM Pets;