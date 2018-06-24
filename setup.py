import rethinkdb as r

password = False
with open('./db-config.txt', 'r') as fin:
    password = fin.read().strip()

conn = r.connect(user='admin', password=password, host='localhost')

try:
    r.db_create('data').run(conn)
except Exception as e:
    pass

try:
    r.db('data').table_create('drone_test_1').run(conn)
except Exception as e:
    pass

