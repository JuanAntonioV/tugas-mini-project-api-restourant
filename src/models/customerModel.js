const db = require('../../db/config');

const customerModel = {};
customerModel.getAll = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM customer', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

customerModel.create = ({ name, address, email }) => {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO customer (name,address,email) VALUES ('${name}', '${address}', '${email}')`,
            (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            }
        );
    });
};

customerModel.getOneById = (id) => {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT * FROM customer WHERE id = '${id}' LIMIT 1`,
            (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            }
        );
    });
};

customerModel.update = (id, data) => {
    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE customer SET name='${data.name}', address='${data.address}', email='${data.email}' WHERE id=${id}`,
            (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            }
        );
    });
};

customerModel.delete = (id) => {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM customer WHERE id=${id}`, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

module.exports = customerModel;
