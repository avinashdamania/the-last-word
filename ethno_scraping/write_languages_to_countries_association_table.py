import csv

with open('../languages.csv') as csv_file:
    with open('../languages_to_countries.csv', 'w') as target:
        csv_reader = csv.reader(csv_file, delimiter=',')
        csv_writer = csv.writer(target, delimiter=',')
        for row in csv_reader:
            try:
                id = row[0]
                countries = [x.strip() for x in row[3].split(',')]
                for country in countries:
                    csv_writer.writerow([id, country])
            except:
                print('Error reading row: ' + str(row))
