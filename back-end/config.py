import json
import sys
# read and return the key_store object
def load_tokens():
    with open('./json/key_store.json') as token_file:
        return json.loads(token_file.read())


# return a dictionary of the settings/config for this app
def load_from_config():
    tokens = load_tokens()
    return {
        "sql_database_uri" : tokens["sql_database_uri"],
        "gitlab_token": tokens['gitlab'],
        "pixabay_token": tokens['pixabay'],
        "project_id": 14540580,
        "avatar_image_size": 32,
        "default_image": 'http://985thejewel.com/wp-content/uploads/beeplugin_languages.png'
    }
