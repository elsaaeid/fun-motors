const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const { error } = require("console");
const cloudinary = require("cloudinary").v2;

// Create Prouct
const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, category, liveDemo, description } = req.body;

  //   Validation
  if (!name || !category || !liveDemo || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Portfolio React",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Create Product
  const product = await Product.create({
    user: req.user.id,
    name,
    sku,
    category,
    liveDemo,
    description,
    image: fileData,
  });

  res.status(201).json(product);
});

// Get all Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('likedBy');
    res.json(products);
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Get single product
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  // if (product.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }
  res.status(200).json(product);
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await product.remove();
  res.status(200).json({ message: "Product deleted." });
});

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
  const { name, category, liveDemo, description } = req.body;
  const { id } = req.params;

  const product = await Product.findById(id);

  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Portfolio React",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Update Product
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      name,
      category,
      liveDemo,
      description,
      image: Object.keys(fileData).length === 0 ? product?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedProduct);
});

// Function to like a product post
const likeProduct = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id; // Assuming req.user is set by the protect middleware

  try {
      // Find the product post by ID
      const product = await Product.findById(productId);
      if (!product) {
          return res.status(404).json({ message: 'Blog not found' });
      }

      // Check if the user has already liked the product
      if (product.likedBy.includes(userId)) {
          return res.status(400).json({ message: 'You have already liked this blog' });
      }

      // Add the user to the likedBy array
      product.likedBy.push(userId); // Add the user ID to the array
      product.likeCount += 1; // Increment the like count
      await product.save(); // Save the updated product post

      return res.status(200).json({ message: 'Product liked successfully', likeCount: product.likeCount });
  } catch (error) {
      console.error('Error liking product:', error);
      return res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Function to unlike a product post
const unlikeProduct = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id; // Assuming req.user is set by the protect middleware

  try {
      // Find the product post by ID
      const product = await Product.findById(productId);
      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }

      // Check if the user has already liked the product
      const likedIndex = product.likedBy.indexOf(userId);
      if (likedIndex === -1) {
          return res.status(400).json({ message: 'You have not liked this product yet' });
      }

      // Remove the user from the likedBy array
      product.likedBy.splice(likedIndex, 1); // Remove the user ID from the array

      // Decrement the like count, ensuring it doesn't go below zero
      if (product.likeCount > 0) {
          product.likeCount -= 1; // Decrement the like count only if it's greater than zero
      }

      await product.save(); // Save the updated product post

      return res.status(200).json({ message: 'Product unliked successfully', likeCount: product.likeCount });
  } catch (error) {
      console.error('Error unliking product:', error);
      return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  likeProduct,
  unlikeProduct,
};

