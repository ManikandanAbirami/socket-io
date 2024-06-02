const express = require("express");
const Book = require("../models/Book");
const { auth, verifyRole } = require("../middleware/auth");
const router = express.Router();
const parser = require("../config/multerConfig");

// Create an api to create and manage books
// router.post("/", auth, verifyRole(["Admin", "Editor"]), async (req, res) => {
//   try {
//     const { title, author, description } = req.body;
//     const book = new Book({ title, author, description });
//     await book.save();
//     res.status(201).send("Book added");
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// });

// Create an api to edit book
router.put(
  "/:id",
  auth,
  verifyRole(["Admin", "Editor"]),
  parser.single("image"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, author, description } = req.body;
      const imageUrl = req.file ? req.file.path : undefined;
      const update = { title, author, description };
      if (imageUrl) update.imageUrl = imageUrl;
      await Book.findByIdAndUpdate(id, update);
      res.status(201).send("Book updated");
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
);

// Create an api to delete book
router.delete("/:id", auth, verifyRole(["Admin"]), async (req, res) => {
  try {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.status(201).send("Book deleted");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Create an api to view the books
router.get(
  "/",
  auth,
  verifyRole(["Admin", "Editor", "Viewer"]),
  async (req, res) => {
    const books = await Book.find({});
    res.json(books);
  }
);

// Create an api to create and manage books
router.post(
  "/",
  // auth,
  // verifyRole(["Admin", "Editor"]),
  parser.single("image"),
  async (req, res) => {
    try {
      const { title, author, description } = req.body;
      console.log("req.file.path:::::", req.file.path);
      const imageUrl = req.file.path; // URL of the uploaded image
      const book = new Book({ title, author, description, imageUrl });
      await book.save();
      res.status(201).send("Book added");
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
);

module.exports = router;
