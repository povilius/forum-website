const express = require("express")
const cors = require("cors")
const { MongoClient, ObjectId } = require('mongodb')
require("dotenv").config()

const port = process.env.PORT || 8080
const URI = process.env.DB_CONNECTION_STRING
const client = new MongoClient(URI)

const app = express()
app.use(cors())
app.use(express.json())