# The Last Word

## WHEN PUSHING PLEASE SET:
    > gcloud config set project <project-id>

## Front-End:
	 > npm install
	 > npm run start

## Back-End:
	> python3 -m venv venv
    > . venv/bin/activate
	> pip3 install -r requirements.txt
	> export FLASK_APP=main.py
	> flask run

for debugging server in realtime (restart server on file saved), set environment variable by running:
   > export FLASK_ENV=development

#### Config
- need to get a gitlab personal token [info here](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)
- need to get a pixabay api key [info here](https://pixabay.com/api/docs/)
- put it into a `"gitlab"` and `"pixabay"` fields of key_store.json file within the json folder in the back-end folder
