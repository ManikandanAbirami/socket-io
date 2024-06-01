const express = require("express");
const Book = require("../models/Book");
const { auth, verifyRole } = require("../middleware/auth");
const router = express.Router();

// Create an api to create and manage books
router.post("/", auth, verifyRole(["Admin", "Editor"]), async (req, res) => {
  try {
    const { title, author, description } = req.body;
    const book = new Book({ title, author, description });
    await book.save();
    res.status(201).send("Book added");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Create an api to edit book
router.put("/:id", auth, verifyRole(["Admin", "Editor"]), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, description } = req.body;
    await Book.findByIdAndUpdate(id, { title, description, author });
    res.status(201).send("Book updated");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

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

module.exports = router;
