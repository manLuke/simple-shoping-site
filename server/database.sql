CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    price NUMERIC(10,2) NOT NULL,
    img_src VARCHAR(255),
    is_visible BOOLEAN DEFAULT true
);

CREATE TABLE users(
    user_id SERIAL,
    user_name VARCHAR(255) NOT NULL PRIMARY KEY,
    user_password VARCHAR(255) NOT NULL
);