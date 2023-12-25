import sqlite3

from sqlite3 import Error

def create_connection(db_file):            # ESTABLISHES CONNECTION TO DB # 
    conn = None 

    try:
        conn = sqlite3.connect(db_file)

    except Error as e:
        print(e)

    return conn

if __name__ == '__main__':
    create_connection(r"/Users/josevieira/Desktop/Language Website/sqlite.db")



def create_table(conn, create_table_sql):       # CREATES TABLES # 
    
    try:
        c = conn.cursor()
        c.execute(create_table_sql)

    except Error as e:
        print(e)


def main():             # Contains tables, connection, etc #
    pass 