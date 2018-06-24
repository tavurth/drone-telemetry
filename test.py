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

last_temperature = 0
def temperature(time):
    global last_temperature
    last_temperature += get_value(-1, 1) / 10
    return {
        "time": time,
        "type": 'temperature',
        "value": last_temperature,
    }

last_humidity = 0
def humidity(time):
    global last_humidity
    last_humidity += get_value(-1, 1) / 10
    return {
        "time": time,
        "type": 'humidity',
        "value": last_humidity,
    }

last_windspeed = 0
def windspeed(time):
    global last_windspeed
    last_windspeed += get_value(-1, 1) / 10
    return {
        "time": time,
        "type": 'windspeed',
        "value": last_windspeed,
    }

def random_data(index=0):
    return random.choice([
        temperature,
        humidity,
        windspeed
    ])(timerFunc() * 1000)

while True:
    randomData = random_data()
    print("Inserting", randomData)
    r.db('data').table('drone_test_1').insert(randomData).run(conn)
    time.sleep(0.1)
