from dotenv import load_dotenv
import requests
import os

load_dotenv()

payload = {
     'api_key': 'os.getenv("SCRAPER_API_KEY")', 
     'url': 'https://walmart.com', 
     'output_format': 'json', 
     'autoparse': 'true', 
     'country_code': 'us', 
     'device_type': 'desktop' }
r = requests.get('https://api.scraperapi.com/', params=payload)
print(r.text)
