import json
import abc
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
# from ethno_scrape import ethno_scrape

class Database():
    def __init__(self, flask_app):
        self.db = SQLAlchemy(flask_app)

    def get_db(self):
        return self.db


class MockDatabase():
    def search_db(self, type, name):
        db_file = open('mock_db.json')
        loaded_json = json.loads(db_file.read())
        of_type = loaded_json[type]

        output_data = None
        # if name in of_type:
        #     output_data = of_type[name]
        # else:
        #     output_data = ethno_scrape(type, name)
        #     loaded_json[type][name] = output_data
        #     with open('mock_db.json', 'w') as mock_db: # 'w' to open for writing
        #         json.dump(loaded_json, mock_db)

        output_data = of_type[name]
        return output_data

def load_mock_database():
    return MockDatabase()

def load_database(flask_app):
     # return MockDatabase()
    return Database(flask_app).get_db()
