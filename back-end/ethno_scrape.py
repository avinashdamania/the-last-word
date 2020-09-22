import requests
from bs4 import BeautifulSoup
from pixabay import query_pixabay_image
import re


ethnologue_base = 'https://www.ethnologue.com'


def ethno_scrape(type, search_for):
    if type == "language":
        return ethno_by_lang_abrv(search_for)
    if type == "country":
        return ethno_by_country_code(search_for)

# for a specific language abreviation (ie eng), scrape and return its language data representation
def ethno_by_lang_abrv(lang_abr):
    page = get_souped_page_from_url("/language/{}", lang_abr)
    raw_data = scrape_indiv_lang(page)
    return add_language_image(raw_data)

# for a specific country code, scrape and return all the data we can about it's languages
def ethno_by_country_code(country_code):
    return build_country_data(country_code)


# get the pixabay image for a language based on it's name
def add_language_image(scraped_data):
    scraped_data["Meta"]["Image"] = query_pixabay_image(scraped_data["Data"]["Mainly Spoken"])
    return scraped_data


# handle for first page, language status page, and maps page for a specific country
def build_country_data(country_code):
    country_data = {"Meta": {"country_code": country_code}, "Data":{}}
    scrape_country_main_page(country_data, country_code)
    add_status_profile_image(country_data, country_code)
    scrape_country_status_page(country_data, country_code)
    scrape_country_maps(country_data, country_code)
    return country_data

# scrape the main page for a country (the one with all the data in rows)
def scrape_country_main_page(country_data, country_code):
    page = get_souped_page_from_url("/country/{}", country_code)
    name, labels, contents = extract_main_page_data(page)
    for label, content in zip(labels, contents):
        country_data["Data"][label] = content
    country_data["Meta"]["fields"] = labels
    country_data["Meta"]["name"] = name
    return country_data


# for a country, get the status and language data for all the languages of the country
def scrape_country_status_page(country_data, country_code):
    page = get_souped_page_from_url("/country/{}/status", country_code)
    languages_spoken = extract_country_status_data(page)
    country_data["Data"]["Spoken Languages"] = languages_spoken
    country_data["Meta"]["fields"] += ["Status Languages"]
    return country_data

# for a country, get the links to the maps of the languages
def scrape_country_maps(country_data, country_code):
    page = get_souped_page_from_url("/country/{}/maps", country_code)
    country_data["Data"]["Maps"] = extract_country_map_links(page)
    country_data["Meta"]["fields"] += ["Maps"]
    return country_data

# scrape the map links and titles from the map page
def extract_country_map_links(page):
    maps = []
    titles = extract_text_from_tag_array(page.select('.field-name-map-title-link'))
    images = extract_attr_from_tag_array(page.select('.field-name-map-image-map img'), "src")
    for title, image in zip(titles, images):
        cleaned_url = image.replace('map', 'original', 1).split('?')[0]
        maps.append({
            "title": title,
            "map_url": cleaned_url
        })
    return maps

# get the languages and build a language object for a country
def extract_country_status_data(page):
    languages_spoken = []
    rows = page.select('.view-content > fieldset')
    for row in rows:
        status = row.select_one('.fieldset-legend').text
        language_names = extract_text_from_tag_array(row.select('.title'))
        language_data = extract_text_from_tag_array(row.select('.content'))
        for name, data in zip(language_names, language_data):
            abrev_search = re.search("[\(\[].*?[\)\]]", data) # search for abreviation in brackets
            abrev = "n/a" if abrev_search is None else abrev_search.group(0)
            clean_abrev = abrev[1:-1].upper()
            language_obj = {
                "name": name,
                "status": status,
                "data": (data.split(abrev+" "+status+ ".")[1]).strip(),
                "abreviation": clean_abrev
            }
            languages_spoken.append(language_obj)
    return languages_spoken

# get all the important information from the main page for a country
def extract_main_page_data(page):
    name = page.select_one('#page-title').text
    rows = page.select_one('.view-content')
    labels = extract_text_from_tag_array(rows.select('.views-label'))
    contents = extract_text_from_tag_array(rows.select('.field-content'))
    return name, labels, contents

# given an array of beautifulsoup tags, return a list of all the texts of all the tags
def extract_text_from_tag_array(tags):
    return list(map(lambda x: x.text.strip(), tags))

# given an array of beautifulsoup tags, return a list of the specified attribute for those tags
def extract_attr_from_tag_array(tags, attr):
    return list(map(lambda x: x[attr], tags))

# add the languages status profile
def add_status_profile_image(country_data, country_code):
    country_data["Data"]["Status Profile"] = ethnologue_base + '/sites/default/files/styles/large/public/graphs/22/full-{}.png'.format(country_code)
    country_data["Meta"]["fields"] += ["Status Profile"]
    return country_data

# scrape an individual language page
def scrape_indiv_lang(page):
    name = page.select_one('#page-title').text
    rows = page.select('.view-content > div > div > div')
    language_data = get_basic_language_data(rows)
    return append_language_data(page, language_data, name)

# get the basic data on the page
def get_basic_language_data(rows):
    language_data = {"Meta": {}, "Data":{}}
    fields = []
    for row in rows:
        if 'field-name-a-language-of' not in row["class"]:
            label = row.select_one('.field-label').text.strip()
            item = row.select_one('.field-items').text
            language_data["Data"][label] = clean_up_item(item)
            fields.append(label)
        else:
            fields.append("Mainly Spoken")
            title = row.select_one('.field-items').text.strip()
            language_data["Data"]["Mainly Spoken"] = title.split('of')[-1].strip()
    language_data["Meta"]["fields"] = fields
    return language_data

# add extra language information from the page to the data
def append_language_data(page, language_data, name):
    language_data["Meta"]['Name'] = name
    language_data = fix_language_maps(language_data)
    language_data = build_also_spoken(page, language_data)
    language_data["Data"]['Language Cloud'] = ethnologue_base+"/sites/default/files/styles/large/public/graphs/22/lang-{}.png".format(language_data["Data"]['ISO 639-3'])
    return language_data

# refactor the language maps field to an array
def fix_language_maps(language_data):
    if 'Language Maps' in language_data["Data"]:
        split_maps = language_data["Data"]['Language Maps'].split('  ')
        language_data["Data"]['Language Maps'] = list(filter(lambda x: x!= "", split_maps))
    return language_data

# return an array of the countries where the language is also spoken
def build_also_spoken(page, language_data):
    language_data["Data"]['Also Spoken'] = []
    language_data["Meta"]['fields'].append('Also Spoken')
    for also in page.select('.fieldset-legend'):
        language_data["Data"]['Also Spoken'].append(also.text)
    return language_data

# clean up the item text, by removing the bracket text and the random new line characters
def clean_up_item(item):
    item = re.sub("[\(\[].*?[\)\]]", "", item) # remove braket text
    item = item.replace("\n\n", "  ") #replace the double new lines with double space for language maps
    return item.replace("\n","").rstrip()

# build a url based on the ethnologue base, and return the "souped" i.e wrapped html string response of the page
def get_souped_page_from_url(url_path, code):
    full_url = ethnologue_base + url_path.format(code)
    page_string = get_page_as_string(full_url)
    return BeautifulSoup(page_string, "html.parser")

# get the page html as a string
def get_page_as_string(link):
    response = requests.get(link)
    return response.content
