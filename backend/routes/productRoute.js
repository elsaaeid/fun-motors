const express = require("express");
const router = express.Router();

const {
  protect
} = require("./authMiddleware");
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  likeProduct,
  unlikeProduct,
} = require("../controllers/productController");
const { upload } = require("../utils/fileUpload");

router.post("/", protect, upload.single("image"), createProduct);
router.patch("/:id", protect, upload.single("image"), updateProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.delete("/:id", protect, deleteProduct);
router.post('/:productId/like', protect, likeProduct);
router.post('/:productId/unlike', protect, unlikeProduct);

module.exports = router;
