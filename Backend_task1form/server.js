const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(
  "mongodb+srv://sinhaishita2409:VpluIs123@cluster0.1r44eab.mongodb.net/"
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// MongoDB schema
const formDataSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  alternatePhoneNumber: String,
  address: String,
  password: String,
  recheckPassword: String,
});

const FormDataModel = mongoose.model("FormData", formDataSchema);

// API routes
// Create form data
app.post("/api/formData", async (req, res) => {
  try {
    const formData = req.body;
    const newFormData = await FormDataModel.create(formData);
    res.status(201).json(newFormData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all form data
app.get("/api/formData", async (req, res) => {
  try {
    const formDataList = await FormDataModel.find();
    res.status(200).json(formDataList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Read form data by ID
app.get("/api/formData/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const formData = await FormDataModel.findById(id);
    if (!formData) {
      return res.status(404).json({ error: "Form data not found" });
    }
    res.status(200).json(formData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update form data
app.put("/api/formData/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const formData = req.body;
    const updatedFormData = await FormDataModel.findByIdAndUpdate(
      id,
      formData,
      { new: true }
    );
    res.status(200).json(updatedFormData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete form data
app.delete("/api/formData/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await FormDataModel.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
