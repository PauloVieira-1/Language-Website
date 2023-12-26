import sqlite3

from sqlite3 import Error

def create_connection(db_file):            # ESTABLISHES CONNECTION TO DB # 
    conn = None 

    try:
        conn = sqlite3.connect(db_file)

    except Error as e:
        print(e)

    return conn


def create_table(conn, create_table_sql):       # CREATES TABLES # 
    
    try:
        c = conn.cursor()
        c.execute(create_table_sql)

    except Error as e:
        print(e)


def main():             # Contains tables, connection, etc #

    database = r"/Users/josevieira/Desktop/Language Website/sqlite.db"

    
    xyz_table = """ CREATE TABLE IF NOT EXISTS xyz (
                        id integer PRIMARY KEY,
                        name text NOT NULL,
                        ); """
    
    # OTHER TABLES #
    

    conn = create_connection(database)

    if conn is not None:
        create_table(conn, xyz_table)
    else:
        print("Cannot create connection")

if __name__ == '__main__':
    create_connection(r"/Users/josevieira/Desktop/Language Website/sqlite.db")