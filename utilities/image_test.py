import csv
import requests
import uuid
import os

# Define the endpoint URL
url = "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericproduct/"

# Define custom headers
headers = {
    'student_number': 's4904968',
    'uqcloud_zone_id': '9476f1e5'
}

# Function to generate a short unique ID
def generate_short_id():
    # Generate a UUID4 and take the first 8 characters for a short unique ID
    return str(uuid.uuid4())[:8]

# Open the CSV file and read its contents
with open('community_data.csv', newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)

    # Loop through each row in the CSV file
    for row in reader:
        # Generate a unique ID for the destination
        unique_id = generate_short_id()
        
        # Prepend the unique ID to the product_name, delimited by a semicolon
        modified_product_name = f"{unique_id};{row['product_name']}"

        # Extract other data from each row
        data = {
            'product_name': modified_product_name,
            'product_owner': row['product_owner'],
            'product_description': row['product_description'],
            'website_code': row['website_code'],
            'product_info1': row['country'],
            'product_info2': row['filters'],
            'product_info3': row['sustainability_rating']
        }

        # Check if product_photo is provided
        if row['product_photo'] and os.path.isfile(row['product_photo']):
            # Open the image file
            with open(row['product_photo'], 'rb') as image_file:
                files = {
                    'product_photo': image_file
                }
                # Send the POST request with the image
                # response = requests.post(url, headers=headers, data=data, files=files)
            print(f"Response for product {row['product_name']}: image")
        else:
            # If no product_photo, send the request without the file
            # response = requests.post(url, headers=headers, data=data)
            print(f"Response for product {row['product_name']}: No product photo provided")

        # Print the response from the server