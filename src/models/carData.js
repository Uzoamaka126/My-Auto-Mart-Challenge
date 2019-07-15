import pool from '../database/connections';
import moment from 'moment';

class Cars {
    static createNewCar(details) {
        // const newHappeningOn = moment(details.happeningOn).format('YYYY-MM-DD');
        // const car = moment(details.happeningOn).format('YYYY-MM-DD');
        const carDetails = {
          owner: details.owner,
          created_on: moment.format(),
          state: details.state,
          status: details.status,
          price: details.price,
          manufacturer: details.manufacturer,
          model: details.model,
          image: details.image ? details.image : '',
          body_type: details.body_type
        };
        return new Promise((resolve, reject) => {
          pool.query(`INSERT INTO cars ( owner, created_on, state, status, price, manufacturer, model, image, body_type) VALUES ('${carDetails.owner}', '${carDetails.created_on}','${carDetails.state}', '${carDetails.status}', '${carDetails.price}', '${carDetails.manufacturer}', '${carDetails.model}', '${carDetails.image}', '${carDetails.body_type}') returning *`)
            .then(results => resolve(results))
            .catch(error => reject(error));
        });
    }

    static getSingleCar(id) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM cars WHERE id = '${id}'`)
            .then(response => resolve(response))
            .catch(error => reject(error));
        });
    }
    
    static getAllCars() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM cars')
            .then(response => resolve(response))
            .catch(error => reject(error));
        });
    }

    static deleteSingleCar(id) {
        return new Promise((resolve, reject) => {
            pool.query(`DELETE FROM cars WHERE id = '${id}'`)
            .then(response => resolve(response))
            .catch(error => reject(error));
        });
    }

    static getCarStatus(status) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM cars WHERE LOWER(status) = LOWER('${status}')`)
            .then(response => resolve(response))
            .catch(error => reject(error));
        });
    }

    static getCarStatusAndState(status, state) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM cars WHERE status = '${status}' and state = '${state}' `)
            .then(response => resolve(response))
            .catch(error => reject(error));
        });
    }

    static getCarStatusAndManufacturer(status, state, manufacturer) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM cars WHERE status = '${status}'AND state = '${state}' state AND manufacturer = '${manufacturer}'`)
            .then(response => resolve(response))
            .catch(error => reject(error));
        });
    }

    static updateCarStatus(id, status) {
        return new Promise((resolve, reject) => {
        pool.query(`UPDATE cars SET status = '${status}' WHERE id = ${id} returning *`)
            .then(response => resolve(response))
            .catch(error => reject(error));
        });
    }

    static getPriceRange(min_price, max_price) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM cars WHERE price BETWEEN '${min_price}' AND '${max_price}'`)
            .then(response => resolve(response))
            .catch(error => reject(error));
        });
    }

    static getCarBodyType(body_type) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM cars WHERE body_type = '${body_type}'`)
            .then(response => resolve(response))
            .catch(error => reject(error));
        });
    }
    
};

export default Cars;