import table from './createTables';
import pool from '../connections';

const run = async() => {
    console.log('working');
    try {
        await pool.query(table.usersTable);
        await pool.query(table.carsTable);
        await pool.query(table.ordersTable);
    } catch (error) {
        console.log(error)
    }
};

export default run();
