import rethinkdb as r

password = False
with open('./db-config.txt', 'r') as fin:
    password = fin.read().strip()

conn = r.connect(user='admin', password=password, host='localhost')

def create_db(name):
    try:
        r.db_create(name).run(conn)
        return name
    except Exception as e:
        return name
        pass

def create_table(dbName, name):
    try:
        return r.db(dbName).table_create(name).run(conn)
    except Exception as e:
        pass


db = create_db('telemetry');
create_table(db, 'data');
create_table(db, 'users');
create_table(db, 'config');

## Configuration for the administration page
r.db('telemetry').table('config')\
  .insert({
    "id": 'drone-configuration',
    "config": {
      "active": { "value": False, "type": 'toggle' },
      "sampleName": { "value": 'first', "type": 'text' },
      "table_name": { "value": 'data', "type": 'text', "disabled": True },
    }
  }, conflict='update'
)\
  .run(conn)
