const db = require('../../db/config');

const menuModel = {};
menuModel.getAll = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM menu', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

menuModel.create = ({ item, price }) => {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO menu (item,price) VALUES ('${item}', ${price})`,
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

menuModel.getOneById = (id) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM menu WHERE id = '${id}' LIMIT 1`, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

menuModel.update = (id, data) => {
    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE menu SET item='${data.item}', price='${data.price}' WHERE id=${id}`,
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

menuModel.delete = (id) => {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM menu WHERE id=${id}`, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

module.exports = menuModel;
