from flask import jsonify
import requests
import json




# add headers and jsonify any json data to send to the server
def prepare_response(json_data):
    response = jsonify(json_data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# make an api call and wrap the resulting json string in a python dictionary
def make_api_call(api_call):
    response = requests.get(api_call)
    return json.loads(response.text)

# make sure the input will work when scraping
def fix_input_code(input):
    return input.upper()
