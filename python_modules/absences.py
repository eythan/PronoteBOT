import json
import socket
import datetime

def process_absences(client, seen_absences_ids):
    date_from = datetime.date(2024, 9, 2)
    date_to = datetime.date(2025, 3, 2)

    absences = client.lessons(date_from, date_to)
    absences_data = []
    lessons_dict = {}

    for h in absences:
        lessons_dict[h.id] = {
            "status": h.status,
            "start": h.start,
            "end": h.end
        }

    for h in absences:
        if h.id not in seen_absences_ids:
            if h.status in ["Cours annulé", "Prof absent"]:
                overlapping = any(
                    lesson["status"] != "None" and
                    (h.start < lesson["end"] and h.end > lesson["start"])
                    for lesson in lessons_dict.values()
                )

                if overlapping:
                    continue

                absences_info = {
                    "id": h.id,
                    "type": "absences",
                    "subject": h.subject.name if h.subject else "Unknown",
                    "teacher_name": h.teacher_name if h.teacher_name else "Unknown",
                    "classroom": h.classroom if h.classroom else "Unknown",
                    "background_color": h.background_color if h.background_color else "Unknown",
                    "start": h.start.isoformat() if h.start else "Unknown",
                    "end": h.end.isoformat() if h.end else "Unknown"
                }
                absences_data.append(absences_info)
                seen_absences_ids.add(h.id)

    absences_data.sort(key=lambda x: x["start"])

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