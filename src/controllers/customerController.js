const {
    serverErrorResponse,
    okResponse,
    errorResponse,
    resMessage,
    notFoundResponse,
} = require('../helpers/response');
const customerModel = require('../models/customerModel');

const customerController = {};

customerController.getAll = async (req, res) => {
    try {
        const customer = await customerModel.getAll();

        return okResponse(res, customer);
    } catch (err) {
        return serverErrorResponse(res, err.message);
    }
};

customerController.getOneById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || !Number(id)) {
            return errorResponse(res, 'id is required and must be a number');
        }

        const customer = await customerModel.getOneById(id);

        if (!customer || customer.length < 1) {
            return notFoundResponse(res);
        }

        return okResponse(res, customer[0]);
    } catch (err) {
        return serverErrorResponse(res, err.message);
    }
};

customerController.create = async (req, res) => {
    try {
        const { name, address, email } = req.body;

        if (
            !name ||
            !address ||
            !email ||
            !String(name) ||
            !String(address) ||
            !String(email)
        ) {
            return errorResponse(
                res,
                'name, address and email is required and must be a string'
            );
        }

        await customerModel.create({ name, address, email });

        return okResponse(res, null, resMessage.CREATED);
    } catch (err) {
        return serverErrorResponse(res, err.message);
    }
};

customerController.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, email } = req.body;

        if (
            !name ||
            !address ||
            !email ||
            !String(name) ||
            !String(address) ||
            !String(email)
        ) {
            return errorResponse(
                res,
                'name, address and email is required and must be a string'
            );
        }

        await customerModel.update(id, {
            name,
            address,
            email,
        });

        return okResponse(res, null, resMessage.UPDATED);
    } catch (err) {
        return serverErrorResponse(res, err.message);
    }
};

customerController.delete = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || !Number(id)) {
            return errorResponse(res, 'id is required');
        }

        const customer = await customerModel.getOneById(id);

        if (!customer || customer.length < 1) {
            return errorResponse(res, 'customer not found');
        }

        await customerModel.delete(id);

        return okResponse(res, null, resMessage.DELETED);
    } catch (err) {
        return serverErrorResponse(res, err.message);
    }
};

module.exports = customerController;
