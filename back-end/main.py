from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy.dialects.postgresql import JSONB

from config import load_from_config
from util import prepare_response, fix_input_code
from database import load_database, load_mock_database
from meta import get_meta_data
import json
from charity import get_charity_data

app = Flask(__name__)
settings = load_from_config()
app.config["SQLALCHEMY_DATABASE_URI"] = settings["sql_database_uri"]
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)

# db = load_mock_database()

class Test(db.Model):
    __tablename__ = "test"
    __table_args__ = {"schema": "public"}
    id = db.Column(db.Integer, primary_key = True)
    value = db.Column(db.TEXT)

    def __init__(self, id, value):
        self.id = id
        self.value = value

    def __iter__(self):
        for attr, value in self.__dict__.items():
            yield attr, value


class TestSchema(ma.Schema):
	class Meta:
		fields = ('id', 'value')

test_schema = TestSchema()
tests_schema = TestSchema(many=True)

class Country(db.Model):
    __tablename__ = "countries"
    __table_args__ = {"schema": "public"}
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), unique = True, nullable = False)
    country_code = db.Column(db.String(3))
    region = db.Column(db.String(50))
    income_level = db.Column(db.Text)
    capital = db.Column(db.String(100))
    longitude = db.Column(db.Float)
    latitude = db.Column(db.Float)


    def __init__(self, id, name, country_code, region, income_level, capital, longitude, latitude):
        self.id = id
        self.name = name
        self.country_code = country_code
        self.region = region
        self.income_level = income_level
        self.capital = capital
        self.longitude = longitude
        self.latitude = latitude

    def __iter__(self):
        for attr, value in self.__dict__.items():
            yield attr, value

class CountrySchema(ma.Schema):
    class Meta:
        fields = ['id', 'name', 'country_code', 'region', 'income_level', 'capital', 'longitude', 'latitude']

country_schema = CountrySchema()
countries_schema = CountrySchema(many=True)

class Language(db.Model):
    __tablename__ = "languages"
    __table_args__ = {"schema": "public"}
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(200), unique = True, nullable = False)
    countries = db.Column(db.Text)
    country_codes = db.Column(db.Text)
    iso = db.Column(db.Text)
    severity = db.Column(db.String(50))
    population = db.Column(db.Integer)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    description = db.Column(db.Text)
    french_name = db.Column(db.Text)
    spanish_name = db.Column(db.Text)


    def __init__(self, id, countries, country_codes, iso, severity, population, latitude, longitude, description, french_name, spanish_name):
        self.id = id
        self.name = name
        self.countries = countries
        self.country_codes = country_codes
        self.iso = iso
        self.severity = severity
        self.population = population
        self.latitude = latitude
        self.longitude = longitude
        self.description = description
        self.french_name = french_name
        self.spanish_name = spanish_name

class LanguageSchema(ma.Schema):
    class Meta:
        fields = ['id', 'name', 'countries', 'country_codes', 'iso', 'severity', 'population', 'latitude', 'longitude', 'description', 'french_name', 'spanish_name']

language_schema = LanguageSchema()
languages_schema = LanguageSchema(many=True)

class Charity(db.Model):
    __tablename__ = "charities"
    __table_args__ = {"schema": "public"}
    id = db.Column(db.Integer, primary_key = True)
    ein = db.Column(db.String(20))
    name = db.Column(db.Text)
    address = db.Column(db.Text)
    ntee_code = db.Column(db.String(10))
    ntee_classification = db.Column(db.Text)
    ntee_type = db.Column(db.Text)
    classification = db.Column(db.Text)
    subsection = db.Column(db.Integer)
    activities = db.Column(db.Text)
    foundation_status = db.Column(db.Text)
    deductibility = db.Column(db.Text)
    affiliation = db.Column(db.Text)
    asset_amount = db.Column(db.Integer)
    income_amount = db.Column(db.Integer)
    form_990_revenue_amount = db.Column(db.Integer)
    filing_requirement = db.Column(db.Text)

    def __init__(self, id, ein, name, address, ntee_code, ntee_classification, ntee_type, classification, subsection, activities, foundation_status, deductibility, affiliation, asset_amount, income_amount, form_990_revenue_amount, ):
        self.id = id
        self.ein = ein
        self.name = name
        self.address = address
        self.ntee_code = ntee_code
        self.ntee_classification = ntee_classification
        self.ntee_type = ntee_type
        self.classification = classification
        self.subsection = subsection
        self.activities = activities
        self.foundation_status = foundation_status
        self.deductibility = deductibility
        self.affiliation = affiliation
        self.asset_amount = asset_amount
        self.income_amount = income_amount
        self.form_990_revenue_amount = form_990_revenue_amount
        self.filing_requirement = filing_requirement

class CharitySchema(ma.Schema):
    class Meta:
        fields = ['id', 'ein', 'name', 'address', 'ntee_code', 'ntee_classification', 'ntee_type', 'classification',
        'subsection', 'activities', 'foundation_status', 'deductibility', 'affiliation', 'asset_amount', 'income_amount',
        'form_990_revenue_amount', 'filing_requirement']

charity_schema = CharitySchema()
charities_schema = CharitySchema(many=True)


def load_json_object(file_name):
    with open('./all_json/{}.json'.format(file_name)) as json_file:
        return json.loads(json_file.read())

@app.route('/all/languages')
def get_languages():
    try:
        result = Language.query.all()
        json_obj = languages_schema.dump(result)
        return prepare_response(json_obj), 200
    except Exception as e:
        return "An error occurred: " + str(e), 500

@app.route('/languages/<language_id>')
def get_language_by_id(language_id):
    try:
        result = Language.query.filter_by(id = language_id).all()
        json_obj = languages_schema.dump(result)
        return str(json_obj), 200
    except Exception as e:
        return "An error occurred: " + str(e), 500

@app.route('/all/countries')
def get_countries(country_abbreviation = None):
    try:
        result = Country.query.all()
        json_obj = countries_schema.dump(result)
        return prepare_response(json_obj), 200
    except Exception as e:
        return "An error occurred: " + str(e), 500

@app.route('/countries/<code>')
def get_country_by_code(code):
    try:
        result = Country.query.filter_by(country_code = code.upper()).all()
        json_obj = countries_schema.dump(result)
        return str(json_obj), 200
    except Exception as e:
        return "An error occurred: " + str(e), 500


@app.route('/all/charities')
def get_charities(charity_name = None):
    try:
        result = Charity.query.all()
        json_obj = charities_schema.dump(result)
        return prepare_response(json_obj), 200
    except Exception as e:
        return "An error occurred: " + str(e), 500

@app.route('/charities/<code>')
def get_charity_by_id(code):
    try:
        result = Charity.query.filter_by(id = code).all()
        json_obj = charities_schema.dump(result)
        return prepare_response(json_obj), 200
    except Exception as e:
        return "An error occurred: " + str(e), 500
def get_tests():
    try:
        result = Test.query.all()
        json_obj = tests_schema.dump(result)
        return str(json_obj), 200
    except Exception as e:
        return "An error occurred: " + str(e) + " DB conn string: " + app.config["SQLALCHEMY_DATABASE_URI"] + str(), 500

@app.route('/tests/<test_id>')
def get_tests_by_id(test_id):
    try:
        result = Test.query.filter_by(id = test_id).all()
        json_obj = tests_schema.dump(result)
        return str(json_obj), 200
    except Exception as e:
        return "An error occurred: " + str(e) + " DB conn string: " + app.config["SQLALCHEMY_DATABASE_URI"] + str(), 500

# default route
@app.route('/')
def hello():
    return 'hello this is the backend for our swe project:)'

# route for language data by abbreviation. example: /language/eng
@app.route('/language/<abbreviation>')
def language_data(abbreviation):
    # check in db for language, if not there scrape it manually
    scraped_data = db.search_db('language', abbreviation)
    return prepare_response(scraped_data)

# route for language data by abbreviation. example: /language/eng
@app.route('/country/<country_code>')
def country_data(country_code):
    country_code = fix_input_code(country_code)
    # check in db for country, if not there scrape it manually
    scraped_data = db.search_db('country',country_code)
    scraped_data['Meta']['country_code'] = country_code
    return prepare_response(scraped_data)

# get the meta_data about the project, mainly the contributors and their contribute data
@app.route('/meta')
def commit_data():
    try:
        meta_data = get_meta_data(settings)
        return prepare_response(meta_data)
    except Exception as e:
        return "An error occurred: " + str(e)

@app.route('/charities')
def charity_data():
    charities = get_charity_data()
    return prepare_response(charities)


@app.route('/all/languages')
def all_languages():
    languages = load_json_object('languages')
    temp = prepare_response(languages)
    print(temp)
    return temp

@app.route('/all/countries')
def all_countries():
    countries = load_json_object('countries')
    return prepare_response(countries)

if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)
