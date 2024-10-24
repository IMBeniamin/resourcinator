import requests
import json

url = ""

with open("risorse.json", "r") as file:
    data = json.load(file)

for resource in data["resources"]:
    response = requests.post(url, json=resource, verify=False)
    
    if response.status_code == 200:
        print(f"{resource['title']} inviato correttamente.")
    else:
        print(f"{resource['title']} non inviato, codice di errore {response.status_code}.")
