const express = require("express")
const cors = require("cors")
const { MongoClient, ObjectId } = require("mongodb")
const bcrypt = require("bcrypt")
require("dotenv").config()

const port = process.env.PORT || 8080
const URI = process.env.DB_CONNECTION_STRING
const client = new MongoClient(URI)

const app = express()
app.use(cors())
app.use(express.json())

async function start() {
  try {
    await client.connect()
    console.log("Connected to the database")

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  } catch (err) {
    console.error("Error connecting to the database", err)
  }
}

start()

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body

  try {
    const existingUser = await client
      .db("forum-website")
      .collection("users")
      .findOne({ username })

    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = {
      username,
      email,
      password: hashedPassword,
    }

    const result = await client
      .db("forum-website")
      .collection("users")
      .insertOne(newUser)

    res.status(201).json({ message: "User registered successfully", userId: result.insertedId })
  } catch (error) {
    console.error("Error registering user", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
});


app.post("/login", async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await client
      .db("forum-website")
      .collection("users")
      .findOne({ username })

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    res.status(200).json({ message: "Login successful", userId: user._id })
  } catch (error) {
    console.error("Error logging in user", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await client
      .db("forum-website")
      .collection("users")
      .find()
      .toArray();

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/questions", async (req, res) => {
  try {
    const questions = await client
      .db("forum-website")
      .collection("questions")
      .find()
      .sort({ createdAt: -1 })
      .toArray()

    res.status(200).json(questions)
  } catch (error) {
    console.error("Error fetching questions", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

app.post("/questions", async (req, res) => {
  const { title, content, userId } = req.body

  try {
    const newQuestion = {
      title,
      content,
      userId: new ObjectId(userId),
      createdAt: new Date(),
      answers: [],
    }

    const result = await client
      .db("forum-website")
      .collection("questions")
      .insertOne(newQuestion)

    res.status(201).json({ message: "Question created successfully", questionId: result.insertedId })
  } catch (error) {
    console.error("Error creating question", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
})

app.patch("/questions/:id", async (req, res) => {
  const { title, content } = req.body
  const questionId = req.params.id

  try {
    const result = await client
      .db("forum-website")
      .collection("questions")
      .updateOne({ id: ObjectId(questionId) }, { $set: { title, content } })

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Question not found" })
    }

    res.status(200).json({ message: "Question updated successfully" })
  } catch (error) {
    console.error("Error updating question", error);
    res.status(500).json({ error: "Internal Server Error" })
  }
})

app.delete("/questions/:id", async (req, res) => {
  const questionId = req.params.id

  try {
    const result = await client
      .db("forum-website")
      .collection("questions")
      .deleteOne({ _id: ObjectId(questionId) })

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Question not found" })
    }

    res.status(200).json({ message: "Question deleted successfully" })
  } catch (error) {
    console.error("Error deleting question", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

app.get("/questions/:id/answers", async (req, res) => {
  const questionId = req.params.id

  try {
    const question = await client
      .db("forum-website")
      .collection("questions")
      .findOne({ _id: ObjectId(questionId) })

    if (!question) {
      return res.status(404).json({ error: "Question not found" })
    }

    res.status(200).json(question.answers)
  } catch (error) {
    console.error("Error fetching answers", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

app.post("/questions/:id/answers", async (req, res) => {
  const { content, userId } = req.body
  const questionId = req.params.id

  try {
    const newAnswer = {
      content,
      userId: ObjectId(userId),
      createdAt: new Date(),
      likes: 0,
      dislikes: 0,
    }

    const result = await client
      .db("forum-website")
      .collection("questions")
      .updateOne({ _id: ObjectId(questionId) }, { $push: { answers: newAnswer } })

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(201).json({ message: "Answer created successfully", answerId: newAnswer._id })
  } catch (error) {
    console.error("Error creating answer", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

app.patch("/answers/:id", async (req, res) => {
  const { content } = req.body
  const answerId = req.params.id

  try {
    const result = await client
      .db("forum-website")
      .collection("questions")
      .updateOne({ "answers._id": ObjectId(answerId) }, { $set: { "answers.$.content": content } })

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Answer not found" });
    }

    res.status(200).json({ message: "Answer updated successfully" })
  } catch (error) {
    console.error("Error updating answer", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

app.delete("/answers/:id", async (req, res) => {
  const answerId = req.params.id

  try {
    const result = await client
      .db("forum-website")
      .collection("questions")
      .updateOne({}, { $pull: { answers: { _id: ObjectId(answerId) } } })

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Answer not found" })
    }

    res.status(200).json({ message: "Answer deleted successfully" })
  } catch (error) {
    console.error("Error deleting answer", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})


app.post("/answers/:id/like", async (req, res) => {
  const answerId = req.params.id

  try {
    const result = await client
      .db("forum-website")
      .collection("questions")
      .updateOne({ "answers._id": ObjectId(answerId) }, { $inc: { "answers.$.likes": 1 } })

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Answer not found" })
    }

    res.status(200).json({ message: "Like added successfully" })
  } catch (error) {
    console.error("Error adding like to answer", error);
    res.status(500).json({ error: "Internal Server Error" })
  }
})

app.post("/answers/:id/dislike", async (req, res) => {
  const answerId = req.params.id;

  try {
    const result = await client
      .db("forum-website")
      .collection("questions")
      .updateOne({ "answers._id": ObjectId(answerId) }, { $inc: { "answers.$.dislikes": 1 } })

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Answer not found" })
    }

    res.status(200).json({ message: "Dislike added successfully" })
  } catch (error) {
    console.error("Error adding dislike to answer", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

app.get("/questions/answered", async (req, res) => {
  try {
    const questions = await client
      .db("forum-website")
      .collection("questions")
      .find({ answers: { $exists: true, $not: { $size: 0 } } })
      .sort({ createdAt: -1 })
      .toArray()

    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching answered questions", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

app.get("/questions/unanswered", async (req, res) => {
  try {
    const questions = await client
      .db("forum-website")
      .collection("questions")
      .find({ answers: { $exists: false } })
      .sort({ createdAt: -1 })
      .toArray()

    res.status(200).json(questions)
  } catch (error) {
    console.error("Error fetching unanswered questions", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})