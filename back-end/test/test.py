import unittest
import json
import sys
from bs4 import BeautifulSoup
from unittest.mock import patch
sys.path.insert(0, '../app/')


def load_html_page(file_name):
    with open('./html/{}.html'.format(file_name)) as html_file:
        return html_file.read()

def load_json_object(file_name):
    with open('./json/{}.json'.format(file_name)) as json_file:
        return json.loads(json_file.read())

def souped_from_string(html_str):
    return BeautifulSoup(html_str, features="html.parser")


def build_tag_list(text, attr):
    list = []
    for i in range(2):
        tag_string = "<a {}>{}</a>".format(attr, text)
        list.append(souped_from_string(tag_string))
    return list





class Test_Backend(unittest.TestCase):
    def test_clean_up_item(self):
        from ethno_scrape import clean_up_item
        self.assertEqual(clean_up_item('Myanmar[Burma]'), 'Myanmar')
        self.assertEqual(clean_up_item('America\n\n\nCanada'), 'America  Canada')

    def test_extract_text_from_tag_array(self):
        from ethno_scrape import extract_text_from_tag_array
        array = build_tag_list('hello', '')
        self.assertEqual(extract_text_from_tag_array(array), ['hello', 'hello'])
        array = build_tag_list('hello', 'style="color:black"')
        self.assertEqual(extract_text_from_tag_array(array), ['hello', 'hello'])


    def test_get_basic_language(self):
        from ethno_scrape import get_basic_language_data

        english_html = load_html_page('english')
        souped_english = souped_from_string(english_html)
        rows = souped_english.select('.view-content > div > div > div')

        basic_data = get_basic_language_data(rows)
        self.assertEqual(basic_data, load_json_object('english_basic'))

    def test_append_language_data(self):
        from ethno_scrape import append_language_data
        english_html = load_html_page('english')
        souped_english = souped_from_string(english_html)
        name = souped_english.select_one('#page-title').text
        basic_data = load_json_object('english_basic')

        appended_data = append_language_data(souped_english, basic_data, name)
        self.assertEqual(appended_data['Meta']['Name'],'English')

    def test_build_also_spoken(self):
        from ethno_scrape import build_also_spoken
        english_html = load_html_page('english')
        souped_english = souped_from_string(english_html)
        basic_data = load_json_object('english_basic')
        full_data = load_json_object('english_full')

        also_spoken = build_also_spoken(souped_english, basic_data)
        self.assertEqual(also_spoken['Data']['Also Spoken'], full_data['Data']['Also Spoken'])

    def test_fix_input_code(self):
        from util import fix_input_code
        self.assertEqual(fix_input_code('inD'), 'IND')


    def test_extract_country_map_links(self):
        from ethno_scrape import extract_country_map_links
        uk_html = load_html_page('uk_maps')
        souped_uk = souped_from_string(uk_html)
        uk_data = load_json_object('uk_full')

        maps = extract_country_map_links(souped_uk)
        self.assertEqual(uk_data['Data']['Maps'], maps)

    def test_extract_country_status_data(self):
        from ethno_scrape import extract_country_status_data
        uk_html = load_html_page('uk_status')
        souped_uk = souped_from_string(uk_html)
        uk_data = load_json_object('uk_full')

        status = extract_country_status_data(souped_uk)
        self.assertEqual(uk_data['Data']['Spoken Languages'], status)

    def test_extract_main_page_data(self):
        from ethno_scrape import extract_main_page_data
        uk_html = load_html_page('uk')
        souped_uk = souped_from_string(uk_html)
        uk_data = load_json_object('uk_full')
        label_list = ['Official Name', 'Population Full', 'Principal Languages', 'Literacy Rate', 'Immigrant Languages', 'International Conventions', 'General References', 'Deaf Population', 'Language Counts', 'Products']

        name, labels, contents = extract_main_page_data(souped_uk)
        self.assertEqual(name, 'United Kingdom')
        self.assertEqual(labels, label_list)

    def test_add_status_profile_image(self):
        from ethno_scrape import add_status_profile_image

        full_data = load_json_object('uk_full')
        country_code = 'GB'
        self.assertEqual(full_data["Data"]["Status Profile"], add_status_profile_image(full_data, country_code)["Data"]["Status Profile"])





if __name__ == '__main__':
    unittest.main()
