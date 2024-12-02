# Strassenverzeichnis

Das Berliner Strassenverzeichnis (aus dem Geoportal) als sqlite Datenbank.

Beinhaltet alle Strassenverzeichnise aus den Jahren 2015, 2017, 2019, 2021, 2023 und 2024.

Die `adressen` Tabelle sieht so aus:

| strasse | nummer | ost | plr | jahr | wohnlage | plz |
| ------- | ------ | --- | --- | ---- | -------- | --- |

## Aktualisieren

Um die WFS Daten einzulesen kann z.B. [QGIS](https://www.qgis.org/download/) benutzt werden.
Auf der [Geodatensuche](https://gdi.berlin.de/geonetwork/srv/ger/catalog.search) kann dann nach
"Wohnlagen" gesucht werden und z.B. für "Wohnlagen nach Adressen zum Berliner Mietspiegel 2024"
der WFS Link kopiert werden und in QGIS via "Layer/Add WFS Layer" hinzugefügt werden. Diese Layer
muss dann als CSV exportiert werden.

Install [Deno](https://docs.deno.com/runtime/) to run the csv transform script (example for year 2024):

```sh
deno run --allow-all csv-transform.ts wl2024.csv 2024
```

After that it can be imported into sqlite like this:

```sh
sqlite3 strassenverzeichnis.sqlite3
sqlite> .import wl2024_sql.csv addressen --csv
```
