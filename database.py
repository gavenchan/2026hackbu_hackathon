import sqlite3
import json


def init_db():
    conn = sqlite3.connect('recipes.db')
    

    conn.execute("DELETE FROM recipes")
    conn.execute("DELETE FROM sqlite_sequence WHERE name='recipes'")

    conn.execute(""" CREATE TABLE IF NOT EXISTS recipes(
                 id                INTEGER PRIMARY KEY AUTOINCREMENT,
                 name              TEXT UNIQUE, 
                 ready_in_minutes  INTEGER,
                 servings          INTEGER,
                 price_per_serving REAL,
                 tags              TEXT
                 ) 
                 """
    )
    conn.commit()
    conn.close()

init_db()

def add_to_db():
    with open("cache.json", "r") as f:
        cache = json.load(f)
    
    conn = sqlite3.connect("recipes.db")

    for query, data in cache.items():
        results = data["results"]
        for r in results:
            name = r["title"]
            ready_in_minutes = r["cookingMinutes"] + r["preparationMinutes"]
            servings = r["servings"]
            price_per_serving = r["pricePerServing"]
            tags = ', '.join(r["cuisines"])
            conn.execute("""
                INSERT INTO recipes (name, ready_in_minutes, servings, price_per_serving, tags)
                VALUES (?, ?, ?, ?, ?)
            """, (name, ready_in_minutes, servings, price_per_serving, tags))
    conn.commit()
    conn.close()

def search_db(query):
    print(query)


add_to_db()


def check_db():
    conn = sqlite3.connect("recipes.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM recipes")

    rows = cursor.fetchall()

    for row in rows:
        print(row)

    conn.close()

check_db()
    