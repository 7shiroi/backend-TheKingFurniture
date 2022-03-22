const Sequelize = require('sequelize');
const Product = require('../models/product');

exports.getAllProduct = async (req, res) => {
  const { search = '' } = req.query;
  const results = await Product.findAll({
    where: {
      name: {
        [Sequelize.Op.like]: `%${search}%`,
      },
      is_deleted: 0,
    },
    limit: 5,
    offset: 0,
  });
  return res.send({
    success: true,
    message: 'List all product',
    results,
  });
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.send({
      success: true,
      message: 'Product created!',
      results: product,
    });
  } catch (e) {
    return res.status(400).send({
      success: false,
      message: 'Cant create product',
      results: e.errors.map((err) => ({ field: err.path, message: err.message })),
    });
  }
};

// exports.updateproduct = async (req, res)=> {
//     const {id} = req.params
//     const product = await product.findByPk(id)
//     if(product){
//         for(let key in req.body){
//             product[key] = req.body[key]
//         }
//         await product.save()
//         return res.send({
//             success: true,
//             message: "product updated!",
//             results: product
//         })
//     }else{
//         return res.status(404).send({
//             success: false,
//             message: "product post not found!"
//         })
//     }
// }

exports.productDetail = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (product) {
    return res.send({
      success: true,
      message: 'product Detail',
      results: product,
    });
  } else{
    return res.status(404).send({
      success: false,
      message: 'product not found!',
    });
  };
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (product && product.dataValues.is_deleted === false) {
    for(const key in req.body) {
      product[key] = req.body[key];
    }
    await product.save();
    return res.send({
      success: true,
      message: 'product Updated',
      results: product,
    });
  } else {
    return res.status(404).send({
      success: false,
      message: 'product not found!',
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (product && product.dataValues.is_deleted === false) {
    product.is_deleted = 1;
    await product.save();
    return res.send({
      success: true,
      message: 'product deleted',
    });
  } else {
    return res.status(404).send({
      success: false,
      message: 'product not found!',
    });
  }
};
