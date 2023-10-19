const db = require('../../db/config');

const categoriesModel = {};
categoriesModel.getAll = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM categories', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

categoriesModel.create = ({ name }) => {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO categories (name) VALUES ('${name}')`,
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

categoriesModel.getOneById = (id) => {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT * FROM categories WHERE id = '${id}' LIMIT 1`,
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

categoriesModel.update = (id, data) => {
    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE categories SET name='${data.name}' WHERE id=${id}`,
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

categoriesModel.delete = (id) => {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM categories WHERE id=${id}`, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

module.exports = categoriesModel;
