import seed from './createSeed';
import pool from '../connections';

const run = async() => {
    console.log('seed is working');
    try {
        await pool.query(seed.usersTable);
        await pool.query(seed.carsTable);
        await pool.query(seed.ordersTable);
    } catch (error) {
        console.log(error);
    }
};

export default run();