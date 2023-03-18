import { Request, Response } from "express";
import Product from "../models/product.model";

const productController = {
  async create(req: Request, res: Response) {
    const { name, price, description, quantity } = req.body;
    const image = (req.file && req.file.path) || "";
    try {
      // Create new product
      const product = await Product.create({
        name,
        price,
        description,
        quantity,
        image,
      });
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      // Get all products
      console.log(req);
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  },

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      // Get product by ID
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  },

  async updateById(req: Request, res: Response) {
    const { id } = req.params;
    const { name, price, description, quantity } = req.body;
    const image = (req.file && req.file.path) || "";
    try {
      // Update product by ID
      const product = await Product.findByIdAndUpdate(
        id,
        { name, price, description, quantity, image },
        { new: true }
      );
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  },

  async deleteById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      // Delete product by ID
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json({ message: "Product deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  },
};

export default productController;
