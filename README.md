# 🛒 GreenMart – Online Grocery Store

> A full-stack online grocery store built with Node.js, Express, and MySQL.
Designed to simulate a real-world e-commerce ordering workflow with database-driven cart and order management.
>
## 📌 Overview
GreenMart is a database-driven e-commerce application that allows customers to:
- Browse grocery products
- Add items to a shopping cart
- Place orders
- Store order history in a relational database

This project demonstrates:

- RESTful API design
- Relational database modeling
- Order processing logic
- Server-side validation
- Asynchronous JavaScript handling

## ✨ Key Features
-  Product listing from database
-  Dynamic cart system
-  Order creation workflow (Orders + Order_Items relationship)
-  MySQL relational schema with foreign keys
-  Async/await backend logic
-  MVC-inspired folder structure

## 🏗 Architecture

Client → Express Server → MySQL Database

**Order Flow:**
1. Customer submits order
2. Total calculated and stored
3. Order record created in orders table
4. Related items inserted into order_items

## 🛠 Tech Stack
**Backend**
- Node.js
- Express.js
  
**Database**
- MySQL

**Frontend**
- HTML
- CSS
- JavaScript

**Development Tools**
- Git & GitHub
- Postman
- MySQL Server
- Cloudinary
- VS Code

## 🗄 Database Schema
**Customers**
| Field    | Type     |
| -------- | -------- |
| id       | INT (PK) |
| name     | VARCHAR  |
| email    | VARCHAR  |
|address   | VARCHAR
| password | VARCHAR  |

**Products**
| Field    | Type     |
| -------- | -------- |
| product_id       | INT (PK) |
| name     | VARCHAR  |
| category    | VARCHAR  |
|price   | VARCHAR
| stock | VARCHAR  |
| image | VARCHAR  |
| created_at | TIMESTAMP  |


**Orders**
| Field       | Type      |
| ----------- | --------- |
| id          | INT (PK)  |
| customer_id | INT (FK)  |
| total       | DECIMAL   |
| created_at  | TIMESTAMP |

**Order Items**
| Field      | Type     |
| ---------- | -------- |
| id         | INT (PK) |
| order_id   | INT (FK) |
| product_id | INT (FK) |
| quantity   | INT      |
| price      | DECIMAL  |

## ⚙ Installation & Setup
### 1. Clone Repository
``git clone https://github.com/Nokwanda09/GreenMartShop.git``

### 2. Install Dependencies
``npm install``

### 3. Configure Environment Variables
Create a .env file in /backend_node
```
MYSQL_HOST='127.0.0.1'
MYSQL_USER='node_user'
MYSQL_PASSWORD='password'
MYSQL_DATABASE='greenmart_db'
```

### 4. Run the server
``node app.js``

Server runs on :
`http://localhost:3000`

## 📡 Example API Endpoints 
| Method | Endpoint    | Description        |
| ------ | ----------- | ------------------ |
| GET    | /products   | Fetch all products |
| POST   | /order     | Create new order   |
| GET    | /customer/:id | Get order details  |

## 📂 Project Structure
greenmart/
├────backend_node
  ├── controllers/
  ├── routes/
  ├── database/
  ├──service/
  ├──── app.js
  └── package.json
├────web
  ├── assets/
    ├── icons/
    ├── images/
  ├── src/
    ├── css/
    ├── js/
  ├── cart.html
  ├── index.html
  ├── shop.html

## Future Improvements
- JWT Authentication
- Payment gateway integration
- Admin dashboard
- Product search
- Deployment

## 👩🏽‍💻 Author
**Singabenkosi N. Mpungose**
GitHub: https://github.com/Nokwanda09


