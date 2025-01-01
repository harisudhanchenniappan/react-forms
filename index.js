const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectDB } = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
connectDB();

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  
});

const formSchema = new mongoose.Schema({
  title: String,
  description: String,
  questions: [
    {
      text: { type: String, required: true },
      required: { type: Boolean, required: true },
      type: { type: String, required: true, enum: ["text", "radio", "checkbox"] },
      options: { type: [String], default: [] },  // Store options for radio and checkbox questions
      
    },
  ],
  acceptingResponses: {
    type: Boolean,
    default: true, // Default to accepting responses
  },
  username: {type: String, required: true},
});

const responseSchema = new mongoose.Schema({
  formId: String,
  answers: [String],  // Answers will store an array of answers for each response
});

const UserModel = mongoose.model('User', userSchema);
const Form = mongoose.model("Form", formSchema);
const Response = mongoose.model("Response", responseSchema);

// Routes

app.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;

  try {

      const existingUser = await UserModel.findOne({ username });
      if (existingUser) {
          return res.status(400).json({ error: 'Username already exists.' });
      }


      const newUser = new UserModel({ username, password, email });
      await newUser.save();
      res.status(201).json({ message: 'User created successfully!' });
      console.log('user created successfully')
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(400).json({ error: 'Invalid username or password.' });
    }

    res.status(200).json({ message: 'Login successful!', user });
    console.log('User logged in successfully');
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});


app.post("/forms", async (req, res) => {
  try {
    const form = new Form(req.body);  // Body contains title, description, and questions
    await form.save();
    res.json({ id: form._id });
  } catch (error) {
    console.error("Error creating form:", error);
    res.status(400).send(error.message);
  }
});

app.get("/forms", async (req, res) => {
  const { username } = req.query;
  const forms = await Form.find({ username: username });
  res.json(forms);
});

app.get("/forms/:id/responses", async (req, res) => {
  const responses = await Response.find({ formId: req.params.id });
  res.json(responses);
});

app.get("/forms/:id", async (req, res) => {
  const form = await Form.findById(req.params.id);
  res.json(form);
});

app.post("/forms/:id/responses", async (req, res) => {
  const response = new Response({
    formId: req.params.id,
    answers: req.body.answers,  // Expecting an array of answers
  });
  await response.save();
  res.json({ success: true });
});

// Delete a specific form and all its responses
app.delete('/forms/:formId', async (req, res) => {
  try {
    const formId = req.params.formId;

    // Delete all responses for the form
    await Response.deleteMany({ formId });

    // Delete the form
    const form = await Form.findByIdAndDelete(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.status(200).json({ message: "Form and its responses deleted successfully" });
  } catch (error) {
    console.error("Error deleting form:", error);
    res.status(500).json({ message: "Failed to delete form" });
  }
});

// Route to delete a specific response
app.delete("/forms/:formId/responses/:responseId", async (req, res) => {
  const { formId, responseId } = req.params;
  try {
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).send("Form not found.");
    }

    // Delete the response by its ID
    await Response.findByIdAndDelete(responseId);

    // Optionally, send back the remaining responses for the form
    const remainingResponses = await Response.find({ formId });
    res.json(remainingResponses);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to stop accepting responses
app.patch("/forms/:id/stop-receiving", async (req, res) => {
  const { id } = req.params;

  try {
    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).send("Form not found.");
    }

    form.acceptingResponses = false;
    await form.save();

    res.status(200).send("Form stopped receiving responses.");
  } catch (error) {
    console.error("Error stopping responses:", error);
    res.status(500).send("An error occurred while stopping responses.");
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
