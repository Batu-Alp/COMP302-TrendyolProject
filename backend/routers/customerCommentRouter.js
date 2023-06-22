import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAuth, isAdmin } from '../utils';
import CustomerMessage from '../models/customerComment';

const supportRouter = express.Router();

/*
supportRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const searchKeyword = req.query.searchKeyword
      ? {
          name: {
            $regex: req.query.searchKeyword,
            $options: 'i',
          },
        }
      : {};
    const products = await CustomerMessage.find({ ...searchKeyword });
    res.send(products);
  })
);
*/

supportRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const orders = await CustomerMessage.find({});
    res.send(orders);
  })
);

supportRouter.get(
    '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await CustomerMessage.findById(req.params.id);
    res.send(product);
  })
);
 
// supportRouter.post(
//   '/',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//       /*const msg = new CustomerMessage({
//         name: 'sample product',
//         comment: 'sample desc',
//       });*/
//       const product = await CustomerMessage.findById(req.params.id);
//       if (product) {
//         const review = {
//           comment: "comment",
//           name: "name",
//         };
      
//       product.reviews.push(review);

//       const createdMessage = await product.save();
//       res.status(201).send({ message: 'ProdSupport message is reated', support_message: createdMessage });

//       /*
//       if (createdMessage) {
//         res.status(201).send({ message: 'ProdSupport message is reated', support_message: createdMessage });
//       }
//       */
//     }
//        else {
//         res.status(500).send({ message: 'Error in creating support message' });
//       }
    
//   })
// );

supportRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const product = await CustomerMessage();
    if (product) {
      const review = {
        comment: req.body.comment,
        name: req.body.name,
      };
      product.reviews.push(review);
      
      const createMessage = await product.save();
      res.status(201).send({
        message: 'Comment Created.',
        data: createMessage.reviews[createMessage.reviews.length - 1],
      });
    } else {
      throw Error('Message does not exist.');
    }
  })
);
/*
supportRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const product = await CustomerMessage.findById(req.params.id);
    if (product) {
      const review = {
        comment: req.body.comment,
        name: req.body.name,
      };
      product.reviews.push(review);
      
      const createMessage = await product.save();
      res.status(201).send({
        message: 'Comment Created.',
        data: createMessage.reviews[createMessage.reviews.length - 1],
      });
    } else {
      throw Error('Message does not exist.');
    }
  })
);
*/
/*
supportRouter.post(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const product = await CustomerMessage.findById(req.params.id);
    if (product) {
      const review = {
        comment: req.body.comment,
        name: req.body.name,
      };
      product.reviews.push(review);
      
      const createMessage = await product.save();
      res.status(201).send({
        message: 'Comment Created.',
        data: createMessage.reviews[createMessage.reviews.length - 1],
      });
    } else {
      throw Error('Message does not exist.');
    }
  })
);
*/
/*
supportRouter.post(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const customermessage = new CustomerMessage({
      name: 'sample product',
      comment: 'sample desc',

    });
    const createdComment = await customermessage.save();
    if (createdComment) {
      res
        .status(201)
        .send({ message: 'Product Created', customermessage: createdComment });
    } else {
      res.status(500).send({ message: 'Error in creating product' });
    }
  })
);
*/
supportRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await CustomerMessage.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.brand = req.body.brand;
      product.category = req.body.category;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      if (updatedProduct) {
        res.send({ message: 'Product Updated', product: updatedProduct });
      } else {
        res.status(500).send({ message: 'Error in updaing product' });
      }
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);
supportRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await CustomerMessage.findById(req.params.id);
    if (product) {
      const deletedProduct = await product.remove();
      res.send({ message: 'Product Deleted', product: deletedProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);
/*
supportRouter.post(
  '/:id',
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const product = await CustomerMessage.findById(req.params.id);
    if (product) {
      const review = {
        comment: req.body.comment,
        user: req.user._id,
        name: req.user.name,
      };
      product.reviews.push(review);
      const updatedProduct = await product.save();
      res.status(201).send({
        message: 'Comment Created.',
        data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });
    } else {
      throw Error('Product does not exist.');
    }
  })
);
*/
export default supportRouter;
