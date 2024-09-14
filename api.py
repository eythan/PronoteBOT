import json
from pronotepy import Client
from pronotepy.ent import occitanie_toulouse_edu
import datetime
import socket
import time

with open("config.json", "r") as config_file:
    config = json.load(config_file)

client = Client(
    config.get("url"),
    username=config.get("username"),
    password=config.get("password"),
    ent=occitanie_toulouse_edu
)

sent_ids = set()

def fetch_and_send_absences():
    global sent_ids
    
    date_from = datetime.date(2024, 9, 2)
    date_to = datetime.date(2024, 9, 20)

    absences = client.lessons(date_from, date_to)

    absence_data = []

    for h in absences:
        if h.canceled and h.id not in sent_ids:
            absence_info = {
                "id": h.id,
                "teacher_name": h.teacher_name,
                "classroom": h.classroom,
                "background_color": h.background_color,
                "start": h.start.isoformat(),
                "end": h.end.isoformat()
            }
            absence_data.append(absence_info)
            sent_ids.add(h.id)

    if absence_data:
        absence_data.sort(key=lambda x: x["start"])

        json_data = json.dumps(absence_data)

        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        server_address = ("localhost", 8000)

        try:
            sock.sendto(json_data.encode("utf-8"), server_address)
        except Exception as e:
            print(e)
        finally:
            sock.close()

while True:
    print("PY: Update")
    fetch_and_send_absences()
    time.sleep(10)