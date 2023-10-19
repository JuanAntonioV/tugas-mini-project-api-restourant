const {
    errorResponse,
    okResponse,
    resMessage,
    resStatus,
    serverErrorResponse,
} = require('../helpers/response');
const customerModel = require('../models/customerModel');
const menuModel = require('../models/menuModel');
const orderModel = require('../models/orderModel');

const orderController = {};

orderController.getAll = async (req, res) => {
    try {
        const customerOrders = await orderModel.getAllCustomerOrders();

        for (let i = 0; i < customerOrders.length; i++) {
            const customer = customerOrders[i];
            const items = await orderModel.getAllCustomerItems(customer.id);
            customer.orders = items;
        }

        const resData = customerOrders.map((customer) => {
            const totalOrder = customer.orders.reduce((acc, item) => {
                return acc + item.price * item.qty;
            }, 0);

            const resOrder = customer.orders.map((item) => {
                return {
                    menu: item.item,
                    price: item.price,
                    qty: item.qty,
                };
            });

            return {
                customerName: customer.name,
                orders: resOrder,
                totalOrder,
                orderDate: customer.order_date,
            };
        });

        return okResponse(res, resData);
    } catch (err) {
        return serverErrorResponse(res, err.message);
    }
};

orderController.create = async (req, res) => {
    try {
        const { customerId, items } = req.body;

        if (!customerId) {
            return errorResponse(res, 'Customer ID is required');
        }

        if (!items || items.length === 0) {
            return errorResponse(res, 'Items is required');
        }

        const customer = await customerModel.getOneById(customerId);

        if (!customer || customer.length < 1) {
            return errorResponse(res, 'Customer not found');
        }

        const menus = await menuModel.getAll();

        // check if the items.name is exist in menus
        const validItems = items.filter((item) => {
            const menu = menus.find((menu) => {
                const name = menu.item.split(' ').join('').toLowerCase();
                const itemName = item.menu.split(' ').join('').toLowerCase();
                item.id = menu.id;
                item.price = menu.price;
                return name === itemName;
            });
            return menu;
        });

        if (validItems.length !== items.length) {
            return errorResponse(res, 'Some items not found');
        }

        const now = new Date();

        for (let i = 0; i < validItems.length; i++) {
            const item = validItems[i];
            await orderModel.create({
                customerId,
                menuId: item.id,
                qty: item.qty,
                now: now.toLocaleDateString(),
            });
        }

        const totalPrices = await validItems.reduce((acc, item) => {
            return acc + item.price * item.qty;
        }, 0);

        const resData = {
            status: resStatus.OK,
            message: resMessage.CREATED,
            orders: validItems,
            totalOrder: totalPrices,
            orderDate: now.toLocaleDateString(),
        };

        return res.status(200).json(resData);
    } catch (err) {
        return errorResponse(res, err.message);
    }
};

module.exports = orderController;
