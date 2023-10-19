const {
    okResponse,
    serverErrorResponse,
    errorResponse,
    resMessage,
    notFoundResponse,
} = require('../helpers/response');
const categoryModel = require('../models/categoriesModel');

const categoriesController = {};

categoriesController.getAll = async (req, res) => {
    try {
        const categories = await categoryModel.getAll();

        return okResponse(res, categories);
    } catch (err) {
        return serverErrorResponse(res, err.message);
    }
};

categoriesController.getOneById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return errorResponse(res, 'id is required');
        }

        const categories = await categoryModel.getOneById(id);

        if (!categories || categories.length < 1) {
            return notFoundResponse(res);
        }

        return okResponse(res, categories[0]);
    } catch (err) {
        return serverErrorResponse(res, err.message);
    }
};

categoriesController.create = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return errorResponse(res, 'name is required');
        }

        await categoryModel.create({ name });

        return okResponse(res, null, resMessage.CREATED);
    } catch (err) {
        return serverErrorResponse(res, err.message);
    }
};

categoriesController.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return errorResponse(res, 'name is required');
        }

        await categoryModel.update(id, { name });

        return okResponse(res, null, resMessage.UPDATED);
    } catch (err) {
        return serverErrorResponse(res, err.message);
    }
};

categoriesController.delete = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return errorResponse(res, 'id is required');
        }

        const categories = await categoryModel.getOneById(id);

        if (!categories || categories.length < 1) {
            return notFoundResponse(res);
        }

        await categoryModel.delete(id);

        return okResponse(res, null, resMessage.DELETED);
    } catch (err) {
        return serverErrorResponse(res, err.message);
    }
};

module.exports = categoriesController;
