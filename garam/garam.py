import re

text = """
Ryujin :lightstick_itzy: 1333
💎 ITZY KMD
💟 IKR1.0db5
Ryujin :lightstick_itzy: 263
💎 ITZY R
💟 IRR1.a8ea"""

# 1. Namen vor dem ersten Emoji extrahieren
names = re.findall(r'^(\w+)', text, re.MULTILINE)
print("Namen:", names)

# 2. Emojis extrahieren
emojis = re.findall(r'[\U0001F300-\U0001FAFF]', text)
print("Emojis:", emojis)

# 3. Zahlen extrahieren
numbers = re.findall(r'\b\d+\b', text)
print("Zahlen:", numbers)

# 4. Spezielle Codes wie "IKR1.0db5" oder "IRR1.a8ea" extrahieren
codes = re.findall(r'\b[A-Z]{3,}\d\.[a-z0-9]+\b', text)
print("Codes:", codes)

print("")

text = """Ryujin :lightstick_itzy: 1333
💎 ITZY KMD
💟 IKR1.0db5
Ryujin :lightstick_itzy: 263
💎 ITZY R
💟 IRR1.a8ea"""

# Text in Zeilen aufteilen
lines = text.split("\n")

# Erstelle eine Liste von Objekten, die jeweils drei Zeilen umfassen
entries = []
for i in range(0, len(lines), 3):
    if i + 2 < len(lines):  # Prüfen, ob drei Zeilen vorhanden sind
        number = re.search(r'\b\d+\b', lines[i])
        number = int(number.group()) if number else None  # Konvertiere, wenn gefunden

        entry = {
            "name_line": lines[i],
            "zahl": number,
            "group_line": lines[i + 1],
            "code_line": re.findall(r'\b[A-Z]{3,}\d\.[a-z0-9]+\b', lines[i + 2]),
        }
        entries.append(entry)

# Zeige die resultierenden Objekte
# listen für lock und unlock
# iwie noch auf distinct für eine Era jeweils hinkriegen
for entry in entries:
    print(entry)
    for entry2 in entries:
        # era Überprüfen
        # 
        if entry["zahl"] > entry2["zahl"]:
            print("Größer", entry["zahl"], entry2["zahl"])
        if entry["zahl"] < entry2["zahl"]:
            print("Kleiner", entry["zahl"], entry2["zahl"])
