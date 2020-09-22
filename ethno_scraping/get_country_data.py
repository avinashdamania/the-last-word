import requests
import csv

url = 'http://api.worldbank.org/v2/country/{}?format=json'
print(url)
with open('../languages_to_countries.csv', 'r') as csv_file:
    with open('../countries2.csv', 'w') as target:
        csv_writer = csv.writer(target, delimiter=',')
        csv_reader = csv.reader(csv_file, delimiter=',')
        processed_countries = set()
        rownum = 0
        for row in csv_file:
            rownum += 1
            if rownum > 1:
                row = row.split(',')
                country_code = row[1].strip().lower()
                if country_code not in processed_countries:
                    try:
                        i = 0
                        while i < 3 and country_code not in processed_countries:
                            r = requests.get(url.format(country_code))
                            #print(url.format(country_code))
                            if r.status_code == 200:
                                #print('success')
                                data = r.json()
                                country = data[1][0]
                                #print(country)
                                id = rownum
                                name = country['name']
                                region = country['region']['value']
                                income_level = country['incomeLevel']['value']
                                capital = country['capitalCity']
                                longitude = country['longitude']
                                latitude = country['latitude']
                                csv_writer.writerow([id, name, country_code.upper(), region, income_level, capital, longitude, latitude])
                                processed_countries.add(country_code)
                            else:
                                i += 1
                        if i == 3:
                            print("Did not get response for country code: " + country_code)
                    except Exception as e:
                        processed_countries.add(country_code)
                        print('Error processing country code: ' + country_code)