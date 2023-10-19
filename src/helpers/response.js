const resStatus = {
    OK: 'OK',
    ERROR: 'ERROR',
};

const resMessage = {
    CREATED: 'Data Berhasil Ditambahkan',
    UPDATED: 'Data Berhasil Diperbarui',
    DELETED: 'Data Berhasil Dihapus',
    NOT_FOUND: 'Data Tidak Ditemukan',
    SERVER_ERROR: 'Terjadi Kesalahan Pada Server',
    ERROR: 'Terjadi Kesalahan',
};

const okResponse = (res, data, message) => {
    const resData = {
        status: resStatus.OK,
    };

    if (message) resData.message = message;
    if (data) resData.data = data;

    return res.status(200).json(resData);
};

const errorResponse = (res, message) => {
    const resData = {
        status: resStatus.ERROR,
        message: message || resMessage.ERROR,
    };

    return res.status(400).json(resData);
};

const serverErrorResponse = (res, message) => {
    const resData = {
        status: resStatus.ERROR,
        message: message || resMessage.SERVER_ERROR,
    };

    return res.status(500).json(resData);
};

const notFoundResponse = (res, message) => {
    const resData = {
        status: resStatus.ERROR,
        message: message || resMessage.NOT_FOUND,
    };

    return res.status(404).json(resData);
};

module.exports = {
    okResponse,
    errorResponse,
    serverErrorResponse,
    notFoundResponse,
    resMessage,
    resStatus,
};
