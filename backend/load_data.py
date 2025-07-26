import pandas as pd
from pymongo import MongoClient
import os

client = MongoClient("mongodb+srv://sheetaljain3618:sheetal1029@cluster0.o8x9fal.mongodb.net/ecommerce_bot?retryWrites=true&w=majority&appName=Cluster0")
db = client['ecommerce_bot']  

dataset_dir = os.path.join(os.path.dirname(__file__), '../dataset/archive')

files = {
    'distribution_centers.csv': 'distribution_centers',
    'inventory_items.csv': 'inventory_items',
    'order_items.csv': 'order_items',
    'orders.csv': 'orders',
    'products.csv': 'products',
    'users.csv': 'users'
}

def load_csv_to_mongodb(file_name, collection_name):
    file_path = os.path.join(dataset_dir, file_name)

    if not os.path.exists(file_path):
        print(f"[ERROR] File not found: {file_path}")
        return

    df = pd.read_csv(file_path)

    df = df.head(1000)
    
    records = df.to_dict(orient='records')

    db[collection_name].delete_many({})

    if records:
        db[collection_name].insert_many(records)
        print(f"[OK] Loaded {len(records)} records into '{collection_name}'")
    else:
        print(f"[WARN] No records to load for {file_name}")

if __name__ == "__main__":
    for csv_file, collection in files.items():
        load_csv_to_mongodb(csv_file, collection)
