import sys
import time
import random
import rethinkdb as r

password = False
with open('./db-config.txt', 'r') as fin:
    password = fin.read().strip()

timerFunc = None
if sys.platform == "win32":
    # on Windows, the best timer is time.clock()
    timerFunc = time.clock
else:
    # on most other platforms, the best timer is time.time()
    timerFunc = time.time

conn = r.connect(user='admin', password=password, host='localhost')

def get_value(min, max):
    return round(random.uniform(min,max), 2)

def get_random_data():
    return [
        {
            "name": "Bin 2",
            "sampleName": "sample_10",
            "type": "bin",
            "time": time.time(),
            "value": get_value(get_value(0, 10), get_value(0, 100))
        },
        {
            "name": "Checksum",
            "sampleName": "sample_10",
            "time": time.time(),
            "type": "checksum",
            "value": get_value(get_value(0, 10), get_value(0, 100))
        },
        {
            "name": "Bin7 MToF",
            "sampleName": "sample_10",
            "time": time.time(),
            "type": "mtof",
            "value": get_value(get_value(0, 10), get_value(0, 100))
        },
        {
            "name": "PM1",
            "sampleName": "sample_10",
            "time": time.time(),
            "type": "pm1",
            "value": get_value(get_value(0, 10), get_value(0, 100))
        },
        {
            "name": "PM10",
            "sampleName": "sample_10",
            "time": time.time(),
            "type": "pm10",
            "value": get_value(get_value(0, 10), get_value(0, 100))
        },
        {
            "name": "PM2.5",
            "sampleName": "sample_10",
            "time": time.time(),
            "type": "pm2.5",
            "value": get_value(get_value(0, 10), get_value(0, 100))
        },
        {
            "name": "Pressure",
            "sampleName": "sample_10",
            "time": time.time(),
            "type": "pressure",
            "value": get_value(get_value(0, 10), get_value(0, 100))
        },
        {
            "name": "Sampling Period",
            "sampleName": "sample_10",
            "time": time.time(),
            "type": "sampling_period",
            "value": get_value(get_value(0, 10), get_value(0, 100))
        },
        {
            "name": "SFR",
            "sampleName": "sample_10",
            "time": time.time(),
            "type": "sfr",
            "value": get_value(get_value(0, 10), get_value(0, 100))
        },
        {
            "name": "Temperature",
            "sampleName": "sample_10",
            "time": time.time(),
            "type": "temperature",
            "value": get_value(get_value(0, 10), get_value(0, 100))
        }
    ];


while True:

    time.sleep(0.05)
    r.db('telemetry').table('data').insert(get_random_data()).run(conn)
