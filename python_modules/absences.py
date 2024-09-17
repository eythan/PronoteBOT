import json
import socket
import datetime

def process_absences(client, seen_absences_ids):
    date_from = datetime.date.today()
    date_to = date_from + datetime.timedelta(days=30)

    absences = client.lessons(date_from, date_to)
    absences_data = []

    for h in absences:
        if h.canceled and h.id not in seen_absences_ids:
            absences_info = {
                "id": h.id,
                "type": "absences",
                "teacher_name": h.teacher_name,
                "classroom": h.classroom,
                "background_color": h.background_color,
                "start": h.start.isoformat(),
                "end": h.end.isoformat()
            }
            absences_data.append(absences_info)
            seen_absences_ids.add(h.id)

    if absences_data:
        json_data = json.dumps(absences_data)
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
