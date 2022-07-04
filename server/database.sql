CREATE TABLE products(
    product_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    price NUMERIC(10,2) NOT NULL
);