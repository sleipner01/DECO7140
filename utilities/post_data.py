import csv
import requests

# Define the endpoint URL
url = "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericproduct/"

# Define custom headers
headers = {
    'student_number': 's4904968',
    'uqcloud_zone_id': '9476f1e5'
}

# Open the CSV file and read its contents
with open('product_data.csv', newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)

    # Loop through each row in the CSV file
    for row in reader:
        # Extract data from each row
        data = {
            'product_name': row['product_name'],
            'product_owner': row['product_owner'],
            'product_description': row['product_description'],
            'website_code': row['website_code']
        }

        # Open the image file
        with open(row['product_photo'], 'rb') as image_file:
            files = {
                'product_photo': image_file
            }

            # Send the POST request
            response = requests.post(url, headers=headers, data=data, files=files)

            # Print the response from the server
            print(f"Response for product {row['product_name']}: {response.text}")