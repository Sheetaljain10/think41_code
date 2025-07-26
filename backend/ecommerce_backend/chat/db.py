from pymongo import MongoClient
import os

MONGO_URI = "mongodb+srv://sheetaljain3618:sheetal1029@cluster0.o8x9fal.mongodb.net/ecommerce_bot?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client["ecommerce_bot"]
