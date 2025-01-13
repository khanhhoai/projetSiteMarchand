# projetSiteMarchand

## Run project
- For the frontend, go the folder 'frontend' then use 'npm install && npm run start' in your terminal. The site will automatically launch at https://localhost:3000
- For the backend, go the folder 'backend' then use 'npm install && npm run start' in your terminal. The address of backend is https://localhost:5000

## Features
- The application will offer the following features:
   - A user can add different products to his cart (depending on whether the stock allows it)
   - A user can confirm his cart and "reserve" his order (no payment module!)
   - A user can modify his profile (postal address, password, name, etc.)
   - A user can cancel his order as long as it has not been validated by a seller
   - A seller can validate orders
   - An administrator can modify the stock and can modify the role of users

## API
### Users
- **POST /users/register**: Register new user
- **POST /users/login**: Login to the site
- **PUT /users/update**: Update imformation of user
- **GET /users**: Get list all users
- **PUT /users/:id/role**: Update role of user

### Products
- **GET /products**: Get list all products
- **GET /products/sellers**: Get list all sellers
- **POST /products/create**: Create the product
- **PUT /products/:id**: Update the stock
- 
### Orders
- **GET /orders/:/userId**: Get all orders of user
- **GET /orders/seller/:sellerId**: Get all orders of seller
- **PUT /orders/:orderId/status**: Update the status of product


## Note
- There is an example for database with some data. You can use:
  - Account admin (email: admin@gmail.com, password: admin)
  - Account seller (email: seller@apple.com, password: 12345)
  - Account user (email: hoaimifa@gmail.com, password: 12345)
