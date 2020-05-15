const Category = require("../models/category");


exports.getCatogoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: "Category Not Found in DB"
            });
        }
        req.category = category;
        next();
    });
}

exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Not able to save catogory in DB"
            });
        }
        res.json({ category });
    });
}

exports.getCategory = (req, res) => {
    return res.json(req.category);
}

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "No Cateogories Found"
            });
        }
        res.json(categories);
    })
}

exports.updateCategory = (req, res) => {
    Category.findByIdAndUpdate(
        { _id: req.category._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, updatedCategory) => {
            if (err) {
                return res.status(400).json({
                    error: "failed to update Cateogory"
                });
            }
            res.json(updatedCategory);
        }
    )
    // const category = req.category;
    // category.name = req.body.name;

    // category.updateOne((err, updatedCategory) => {
    //     if (err) {
    //         return res.status(400).json({
    //             error: "failed to update Cateogory"
    //         });
    //     }
    //     res.json(updatedCategory);
    // });

}

exports.removeCategory = (req, res) => {
    const category = req.category;

    category.remove((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to delete This categoy"
            });
        }
        res.json({
            message: 'successfully deleted item category'
        })
    })
}
