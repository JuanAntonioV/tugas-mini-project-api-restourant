const db = require('../../db/config');

const orderModel = {};
orderModel.getAllCustomerOrders = () => {
    return new Promise((resolve, reject) => {
        db.all(
            'SELECT * FROM orders INNER JOIN customer ON customer.id = orders.customer_id GROUP BY customer.id',
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

orderModel.getAllCustomerItems = (customerId) => {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT * FROM orders INNER JOIN menu ON menu.id = orders.menu_id WHERE customer_id = ${customerId}`,
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

orderModel.create = ({ customerId, menuId, qty, now }) => {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO orders (customer_id, menu_id, qty, order_date) VALUES ('${customerId}', '${menuId}', '${qty}', '${now}')`,
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

module.exports = orderModel;
