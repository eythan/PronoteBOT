import json
from pronotepy import Client
from pronotepy.ent import occitanie_toulouse_edu
import datetime
import socket

with open("config.json", "r") as config_file:
    config = json.load(config_file)

client = Client(
    config.get("url"),
    username = config.get("username"),
    password = config.get("password"),
    ent = occitanie_toulouse_edu
)

print("request from pyton")

date_from = datetime.date(2024, 9, 2)
date_to = datetime.date(2024, 9, 20)

absences = client.lessons(date_from, date_to)

absence_data = []

for h in absences:
    absence_info = {
        "id": h.id,
        "teacher_name": h.teacher_name,
        "classroom": h.classroom,
        "canceled": h.canceled,
        "background_color": h.background_color,
        "start": h.start.isoformat(),
        "end": h.end.isoformat()
    }
    absence_data.append(absence_info)

json_data = json.dumps(absence_data)

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
server_address = ("localhost", 8000)

try:
    sock.sendto(json_data.encode("utf-8"), server_address)
finally:
    sock.close()