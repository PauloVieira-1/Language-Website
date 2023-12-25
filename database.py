
### Test ###

import sqlite3

from sqlite3 import Error

def create_connection(db_file):
    conn = None 

    try:
        conn = sqlite3.connect(db_file)

    except Error as e:
        print(e)

    finally:
        if conn is True:
            conn.close()


if __name__ == '__main__':
    create_connection(r"/Users/josevieira/Desktop/Language Website/pythonsqlite.db")