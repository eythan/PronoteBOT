import json
import time
from pronotepy import Client
from pronotepy.ent import occitanie_toulouse_edu
from python_modules.absences import process_absences
from python_modules.homeworks import process_homeworks

with open("config.json", "r") as config_file:
    config = json.load(config_file)

client = Client(
    config.get("pronoteURL"),
    username=config.get("username"),
    password=config.get("password"),
    ent=occitanie_toulouse_edu
)

while True:
    process_absences(client)
    process_homeworks(client)
    time.sleep(1800)