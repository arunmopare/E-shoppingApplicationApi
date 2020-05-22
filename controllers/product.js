const Product = require("../models/product");
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');


exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
        .populate("category")
        .exec((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "Product not found"
                });
            }
            req.product = product;
            next();
        });
}

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) => {
        if (err) {
            res.status(400).json({
                error: "problem with image"
            });
        }
        //destructure th field
        const { name, description, price, category, stock, photo } = fields;

        if (
            !name ||
            !description ||
            !price ||
            !category ||
            !stock
        ) {
            return res.status(400).json({
                error: "Please Include all fields"

            });

        }
        let product = new Product(fields);

        //handle file here
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: " File sze is too big!"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }
        //save to db
        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "saving T-shirt to DB is Failed"
                })
            }
            res.json(product);
        })
    });
}

exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product)
}

//middleware
exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
}

//delete controllers
exports.removeProduct = (req, res) => {
    let product = req.product;
    product.remove((err, Removedproduct) => {
        if (err) {
            return status(400).json({
                error: "Not able to delete Product"
            })
        }
        res.json({
            message: "Deletion of Product is successfull",
            Removedproduct
        });
    });
}

//update conttrolleres
exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            res.status(400).json({
                error: "problem with image"
            });
        }

        //updation code
        let product = req.product;
        product = _.extend(product, fields)

        //handle file here
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: " File sze is too big!"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }
        //save to db
        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "Updation of product failed"
                })
            }
            res.json(product);
        });
    });
}

//product listing
exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    Product.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy, "asc"]])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: "Not able get to list of products"
                })
            }
            res.json(products)
        })
}

//get all Unique catogories
exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (err, category) => {
        if (err) {
            return res.status(400).json({
                error: "NO category found"
            })
        }
        res.json(category)
    })
}

exports.updateStock = (req, res, next) => {

    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: { _id: prod._id },
                update: { $inc: { stock: -prod.count, sold: +prod.count } }
            }
        }
    })
    Product.bulkWrite(myOperations, {}, (err, products) => {
        if (err) {
            return res.status(400).json({
                error: "Bulk operations failed"
            });
        }
        next();
    })
}