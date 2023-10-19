const db = require("../../db/config")

const menuModel = {}
menuModel.getAll = () => {
    return db.all("SELECT * FROM menu",(err,rows) => {
        if(err) {
            throw err
        }else {
            return rows
        }
    })
}
// lanjutkan disini
menuModel.create = (data) => {
    return db.run(`INSERT INTO menu (name,price) VALUES ('${data.name,data.price}')`,(err,rows) => {
        if(err) {
            throw err
        }else {
            return rows
        }
    })
}

module.exports = menuModel