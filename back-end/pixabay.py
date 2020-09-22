from util import make_api_call
from config import load_from_config

settings = load_from_config()
pixabay_api_base = 'https://pixabay.com/api/?key={}&per_page=3'.format(settings["pixabay_token"])





# query and get the first image from the pixabay api given a query
def query_pixabay_image(query):
    api_call = pixabay_api_base+'&q={}'.format(query)
    json_data = make_api_call(api_call)
    hits = json_data["hits"]
    if len(hits):
        return hits[0]
    return settings["default_image"]
