import json
import socket
import datetime

def process_homeworks(client, seen_homeworks_ids):
    date_from = datetime.date.today()
    date_to = date_from + datetime.timedelta(days=30)

    homeworks = client.homework(date_from, date_to)
    homeworks_data = []

    for h in homeworks:
        if h.id not in seen_homeworks_ids:
            homeworks_info = {
                "id": h.id,
                "type": "homeworks",
                "description": h.description,
                "background_color": h.background_color,
                "date": h.date.isoformat(),
            }
            homeworks_data.append(homeworks_info)
            seen_homeworks_ids.add(h.id)

    if homeworks_data:
        json_data = json.dumps(homeworks_data)
        send_data(json_data, 8000)

def send_data(json_data, port):
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    server_address = ("localhost", port)

    try:
        sock.sendto(json_data.encode("utf-8"), server_address)
    except Exception as error:
        print(f"Error sending data: {error}")
    finally:
        sock.close()
