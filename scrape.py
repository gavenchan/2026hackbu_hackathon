from dotenv import load_dotenv
import requests
import os
import json
import re

load_dotenv()
measurements = ["lb", "oz"]

key = os.getenv("SCRAPER_API_KEY")
item = "chicken breast"

# walmart_payload = {
#      'api_key': key,
#      'url': f'https://www.walmart.com/search?q={item}&stores=1835&ps=1', 
#      'output_format': 'json', 
#      'autoparse': 'true', 
#      'country_code': 'us', 
#      'device_type': 'desktop' 
# }

# sams_payload = {
#      'api_key': key,
#      'url': f'https://www.samsclub.com/search?q={item}&stores=6366&ps=5', 
#      'output_format': 'json', 
#      'autoparse': 'true', 
#      'country_code': 'us', 
#      'device_type': 'desktop' 
# }

# walmart_Request = requests.get('https://api.scraperapi.com/', params=walmart_payload)
# #sams_Request = requests.get('https://api.scraperapi.com/', params=sams_payload)

# with open('walmart_response.json', 'w') as f:
#     f.write(json.dumps(walmart_Request.json(), indent=2))

# print(walmart_Request.json())

with open('walmart_response.json', 'r') as f:
    walmart_response = json.load(f)

thing = walmart_response['items'][0]
product_name = thing['name']
price = thing['price']


def calculate_unit_price(price, product_name):
    ct_match = re.search(r'(\d+)\s*(ct|count|pack|pk)(?=\s|,|\)|$)', product_name, re.IGNORECASE) # Ex: 3 ct of protein shake
    size_match = re.search(r'(\d+\.?\d*)\s*(oz|lb|kg|g|fl\s?oz)(?=\s|,|\)|$)', product_name, re.IGNORECASE) # 12 oz, 1.4 lb
    multi_match = re.search(
        r'(\d+)\s*[xX×/]\s*(\d+\.?\d*)\s*(oz|lb|kg|g|fl\s?oz)',
        product_name, re.IGNORECASE
    ) # 3x24 oz

    if multi_match: 
        count = float(multi_match.group(1))
        size  = float(multi_match.group(2))
        unit  = multi_match.group(3)
        return price / (count * size)
    elif ct_match and size_match:
        total_size = float(ct_match.group(1)) * float(size_match.group(1))
        unit_price = price / total_size
        return unit_price
    elif ct_match and not size_match:
        return price / float(ct_match.group(1)) 
    elif size_match:
        return price / float(size_match.group(1))
    else:
        return None
    

def calc_purchase(recipe_amount, unit_price): #assume same units so far, we are going to have unit conversions later
    return recipe_amount * unit_price

def convert_units(amount, og_units, isSolid): #assume we convert everything to oz and fl oz. Ex: 1.4 lb -> 22.4 oz
    if isSolid:
        if og_units == "oz":
            return amount
        elif og_units == "lb":
            return amount * 16
        elif og_units == "kg":
            return amount * 35.274
        elif og_units == "0.035274":
            return amount * 0.035274
        else:
            return None
    else:
        return None #implement this later 

            





    


    

calculate_unit_price(price,product_name)



#print(json.dumps(thing, indent=2))
#print(sams_Request.text)
