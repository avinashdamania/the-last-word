import json
from util import make_api_call

gitlab_api_base = 'https://gitlab.com/api/v4'
bios = {
    "sghsri": "My name is Sriram Hariharan and I'm a sophomore this year at the University of Texas at Austin 🤘 studying Computer Science. I love to tinker around, but I'm especially interested in web and mobile development. I also can talk for hours about history, and am right now either coding or binge-watching some new TV show. Feel free to contact me if you want to chat!",
    "Alvin Lo": "Hi everyone, my name is Alvin and I'm a CS major at UT Austin. I'm interested in music and basketball.",
    "avinashdamania": "Hi, I'm Avinash! I'm a third year computer science student at UT Austin, and I'm interested in web development and computational linguistics. When I'm not drowning in classwork, I enjoy playing guitar, basketball, and Super Smash Bros.",
    "Anu Kriti Wadhwa": "Hey I'm Anu, a junior majoring in Computer Science + University Scholars' Programme from the National University of Singapore. My primary interests are computer graphics, artificial intelligence and multimedia information retrieval. In my spare time, I watch reruns of Gilmore Girls, make short films and play the drums.",
    "Sonali Kondapalli": "Sonali Kondapalli is a Computer Science student at the University of Texas at Austin. She likes trying new food, watching interesting movies, and writing short stories!"
}

def get_meta_data(settings):
    api_call = build_meta_api_call(settings)
    raw_meta_data = make_api_call(api_call)
#     print(raw_meta_data)
    return add_avatar_links(settings, raw_meta_data)

# build the api call using the config information
def build_meta_api_call(settings):
    try:
        gitlab_api_token = settings["gitlab_token"]
        project_id = settings["project_id"]
        gitlab_api_url = gitlab_api_base+'/projects/{}/repository/contributors?private_token={}'
        return gitlab_api_url.format(project_id, gitlab_api_token)
    except Exception as e:
        print("An error occurred in build_meta_api_call: " + str(e))

# add the links for the avatar image for every contributor
def add_avatar_links(settings, json_data):
    try:
        json_data = [contributor for contributor in json_data if contributor['name'] != 'Avinash Damania']
        print(json_data)
        for contributor in json_data:
            email = contributor["email"]
            name = contributor['name']
            if email == "avinashdamania@hotmail.com":
                contributor["email"] = "avinash.damania@utexas.edu"
                email = "avinash.damania@utexas.edu"
            contributor["avatar_url"] = get_gitlab_avatar(settings, email)
            contributor["bio"] = get_bio(name)
        return json_data
    except Exception as e:
        print("An error occurred in add_avatar_links: " + str(e))
        raise e

# get the image link for a given email (thus account)
def get_gitlab_avatar(settings, email):
    size = settings["avatar_image_size"]
    api_call = gitlab_api_base+'/avatar?email={}&size={}'.format(email, size)
    json_data = make_api_call(api_call)
    return json_data["avatar_url"]

def get_bio(name):
    return bios[name]
