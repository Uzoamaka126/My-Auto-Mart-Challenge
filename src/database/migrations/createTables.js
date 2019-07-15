const createTables = {
  usersTable: `CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR not null,
    last_name VARCHAR not null,
    email VARCHAR UNIQUE not null,
    password VARCHAR not null,
    address VARCHAR not null,
    token VARCHAR not null,
    is_admin BOOLEAN DEFAULT false 
  )`,

  carsTable: `CREATE TABLE IF NOT EXISTS cars(
    id SERIAL PRIMARY KEY,
    owner INTEGER not null REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    state VARCHAR not null,
    status VARCHAR not null,
    price VARCHAR not null,
    manufacturer VARCHAR not null,
    model VARCHAR not null,
    image VARCHAR not null,
    body_type VARCHAR not null
  )`,
    
  ordersTable: `CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY,
    buyer INTEGER not null REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    car_id INTEGER REFERENCES cars (id) ON DELETE CASCADE ON UPDATE CASCADE,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR DEFAULT 'Pending',
    price_offered NUMERIC not null,
    old_price_offered NUMERIC,
    new_price_offered NUMERIC
  )`,
};
  
export default createTables;
  