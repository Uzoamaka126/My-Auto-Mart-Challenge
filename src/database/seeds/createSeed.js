import bcrypt from 'bcrypt';
import moment from 'moment';

const seedTable = {
    usersTable: `INSERT INTO users(first_name, last_name, email, password, address, token)
    VALUES ('Grace', 'Anyanwu', 'uzoamakaawu26@gmail.com', '${bcrypt.hashSync('admin', 10)}', 'Gbagada', ''),
    ('Tommy', 'Peters', 'tommy@gmail.com', '${bcrypt.hashSync('userOne', 10)}', 'Gbagada', ''),
    ('Dada', 'Geneva', 'dada@gmail.com', '${bcrypt.hashSync('userTwo', 10)}', 'Gbagada', '')
    `,

    carsTable: `INSERT INTO cars(owner, created_on, state, status, price, manufacturer, model, image, body_type)
    VALUES ('1', to_date('${moment('2019-12-12').format('YYYY-MM-DD')}', 'YYYY MM DD'), 'Used', 'Available', '20000000', 'Honda', 'Accord', '', 'Saloon'),
    ('2', to_date('${moment('2019-04-06').format('YYYY-MM-DD')}', 'YYYY MM DD'), 'New', 'Sold', '14500000', 'Toyota', 'RAV4', '', 'SUV'),
    ('3', to_date('${moment('2019-02-13').format('YYYY-MM-DD')}', 'YYYY MM DD'), 'Used', 'Sold', '23000000', 'Kia', 'Rio', '', 'Sedan')
    `,

    ordersTable: `INSERT INTO orders(buyer, car_id, created_on, status, price_offered)
    VALUES ('1', '1', to_date('${moment('2019-12-12').format('YYYY-MM-DD')}', 'YYYY MM DD'), 'Sold', '20000000'),
    ('2', '2', to_date('${moment('2019-04-06').format('YYYY-MM-DD')}', 'YYYY MM DD'), 'Pending', '12500000'),
    ('3', '3', to_date('${moment('2019-02-13').format('YYYY-MM-DD')}', 'YYYY MM DD'), 'Pending', '23000000')
    `
};

export default seedTable;