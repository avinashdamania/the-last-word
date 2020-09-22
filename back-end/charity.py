import requests
from bs4 import BeautifulSoup
import re

eins = ["412183857","061459207","203840826"]
charity_navigator_base = "https://www.charitynavigator.org/index.cfm?bay=search.profile&ein={}"



def get_charity_data():
    charity_objects = []
    for ein in eins:
        data = scrape_for_ein(ein)
        charity_objects.append(data)
    return charity_objects

def scrape_for_ein(ein):
    page = get_souped_page_from_url(ein)
    rows = page.select('table>tr')
    out = {}
    for row in rows:
        label,data = scrape_data_from_row(row)
        out[label] = data
    return out


def scrape_data_from_row(row):
    tds = row.select('td')
    label = clean_up_item(tds[0].text.strip())
    data = clean_up_item(tds[1].text.strip())
    return label, data



# given an array of beautifulsoup tags, return a list of all the texts of all the tags
def extract_text_from_tag_array(tags):
    return list(map(lambda x: x.text.strip(), tags))

# given an array of beautifulsoup tags, return a list of the specified attribute for those tags
def extract_attr_from_tag_array(tags, attr):
    return list(map(lambda x: x[attr], tags))



# build a url based on the ethnologue base, and return the "souped" i.e wrapped html string response of the page
def get_souped_page_from_url(ein):
    api_url = charity_navigator_base.format(ein)
    page_string = get_page_as_string(api_url)
    return BeautifulSoup(page_string, "html.parser")

# get the page html as a string
def get_page_as_string(link):
    response = requests.get(link)
    return response.content

# clean up the item text, by removing the bracket text and the random new line characters
def clean_up_item(item):
    item = re.sub("[\(\[].*?[\)\]]", "", item) # remove braket text
    item = item.replace("\n\n", "  ") #replace the double new lines with double space for language maps
    item = item.replace("\xa0", "")
    return item.replace("\n","").rstrip()

if __name__ == '__main__':
    scrape_for_ein(eins[0])
