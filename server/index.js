const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a customer
app.post("/customers/", async (req, res) => {
  try {
    const {
      full_name,
      email,
      billing_address,
      country,
      province,
      city,
      zip_code,
    } = req.body;

    const newCustomer = await pool.query(
      "INSERT INTO Customers(full_name, email, billing_address, country, province, city, zip_code) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [full_name, email, billing_address, country, province, city, zip_code]
    );

    res.json(newCustomer.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all customers
app.get("/customers/", async (req, res) => {
  try {
    const allCustomers = await pool.query("SELECT * FROM Customers");
    res.json(allCustomers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a customer
app.get("/customers/:id/", async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await pool.query(
      "SELECT * FROM Customers WHERE customer_id = $1",
      [id]
    );

    res.json(customer.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//update a customer
app.put("/customers/:id/", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      full_name,
      email,
      billing_address,
      country,
      province,
      city,
      zip_code,
    } = req.body;

    const updateCustomer = await pool.query(
      "UPDATE Customers SET full_name = $1, email = $2, billing_address = $3, country = $4, province = $5, city = $6, zip_code = $7 WHERE customer_id = $8",
      [full_name, email, billing_address, country, province, city, zip_code, id]
    );

    res.json("Customer was updated.");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a customer
app.delete("/customers/:id/", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCustomer = await pool.query(
      "DELETE FROM Customers WHERE customer_id = $1",
      [id]
    );

    res.json("Customer was deleted.");
  } catch (err) {
    console.log(err.message);
  }
});

//create an order
app.post("/orders/", async (req, res) => {
  try {
    const {
      order_number,
      shipping_cost,
      promo_code,
      total_price,
      payment_method,
      pickup_date,
      customer_id,
    } = req.body;

    const newOrder = await pool.query(
      "INSERT INTO Orders(order_number, shipping_cost, promo_code, total_price, payment_method, pickup_date, customer_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        order_number,
        shipping_cost,
        promo_code,
        total_price,
        payment_method,
        pickup_date,
        customer_id,
      ]
    );

    res.json(newOrder.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all orders
app.get("/orders/", async (req, res) => {
  try {
    const allOrders = await pool.query("SELECT * FROM Orders");
    res.json(allOrders.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get an order
app.get("/orders/:id/", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await pool.query("SELECT * FROM Orders WHERE order_id = $1", [
      id,
    ]);

    res.json(order.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//update an order
app.put("/orders/:id/", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      order_number,
      shipping_cost,
      promo_code,
      total_price,
      payment_method,
      pickup_date,
      customer_id,
    } = req.body;

    const updateOrder = await pool.query(
      "UPDATE Orders SET order_number = $1, shipping_cost = $2, promo_code = $3, total_price = $4, payment_method = $5, pickup_date = $6, customer_id = $7 WHERE order_id = $8",
      [
        order_number,
        shipping_cost,
        promo_code,
        total_price,
        payment_method,
        pickup_date,
        customer_id,
        id,
      ]
    );

    res.json("Order was updated.");
  } catch (err) {
    console.error(err.message);
  }
});

//delete an order
app.delete("/orders/:id/", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteOrder = await pool.query(
      "DELETE FROM Orders WHERE order_id = $1",
      [id]
    );

    res.json("Customer was deleted.");
  } catch (err) {
    console.log(err.message);
  }
});

//create an orderrow
app.post("/orders/:id/orderrow/", async (req, res) => {
  try {
    const { id } = req.params;
    const { pet_id } = req.body;

    const newOrderrow = await pool.query(
      "INSERT INTO Order_rows(order_id, pet_id) VALUES($1, $2) RETURNING *",
      [id, pet_id]
    );

    res.json(newOrderrow.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all orderrows
app.get("/orders/:id/orderrow/", async (req, res) => {
  try {
    const { id } = req.params;
    const orderrow = await pool.query(
      "SELECT * FROM Order_rows WHERE order_id = $1",
      [id]
    );

    res.json(orderrow.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get an orderrow
app.get("/orders/:id/orderrow/:rowId/", async (req, res) => {
  try {
    const { id } = req.params;
    const { rowId } = req.params;
    const orderrow = await pool.query(
      "SELECT * FROM Order_rows WHERE order_id = $1 AND order_row_id = $2",
      [id, rowId]
    );

    res.json(orderrow.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//update an orderrow
app.put("/orders/:id/orderrow/:rowId/", async (req, res) => {
  try {
    const { id } = req.params;
    const { rowId } = req.params;
    const { pet_id } = req.body;

    const updateOrderrow = await pool.query(
      "UPDATE Order_rows SET pet_name = $1, price = $2 WHERE order_row_id = $3",
      [pet_id, rowId]
    );

    res.json("Order row was updated.");
  } catch (err) {
    console.error(err.message);
  }
});

//delete an orderrow
app.delete("/orders/:id/orderrow/:rowId/", async (req, res) => {
  try {
    const { rowId } = req.params;
    const deleteOrderrow = await pool.query(
      "DELETE FROM Order_rows WHERE order_row_id = $1",
      [rowId]
    );

    res.json("Order row was deleted.");
  } catch (err) {
    console.log(err.message);
  }
});

//create a pet
app.post("/pets/", async (req, res) => {
  try {
    const {
      pet_name,
      animal,
      tag_line,
      color,
      breed,
      age,
      price,
      pet_description,
      img_url,
      purchase_status,
    } = req.body;

    const newPet = await pool.query(
      "INSERT INTO Pets (pet_name, animal, tag_line, color, breed, age, price, pet_description, img_url, purchase_status) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [
        pet_name,
        animal,
        tag_line,
        color,
        breed,
        age,
        price,
        pet_description,
        img_url,
        purchase_status,
      ]
    );

    res.json(newPet.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all pets
app.get("/pets/", async (req, res) => {
  try {
    const allPets = await pool.query("SELECT * FROM Pets;");
    res.json(allPets.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a pet
app.get("/pets/:id/", async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await pool.query("SELECT * FROM Pets WHERE pet_id = $1", [id]);
    res.json(pet.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//update a pet
app.put("/pets/:id/", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      pet_name,
      animal,
      tag_line,
      color,
      breed,
      age,
      price,
      pet_description,
      img_url,
      purchase_status,
    } = req.body;

    const pet = await pool.query(
      "UPDATE Pets SET pet_name = $1, animal = $2, tag_line = $3, color = $4, breed  = $5, age = $6, price = $7, pet_description = $8, img_url = $9, purchase_status = $10 WHERE pet_id = $11",
      [
        pet_name,
        animal,
        tag_line,
        color,
        breed,
        age,
        price,
        pet_description,
        img_url,
        purchase_status,
        id,
      ]
    );

    res.json("Pet was updated.");
    
  } catch (err) {
    console.error(err.message);
  }
});

//delete a pet
app.delete("/pets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletePet = await pool.query(
      "DELETE FROM Pets WHERE pet_id = $1",
      [id]
    );

    res.json("Pet was deleted.");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
