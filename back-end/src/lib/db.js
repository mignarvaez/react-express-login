import mariadb from 'mariadb'

const FIND_USER_QUERY = "SELECT * FROM user WHERE email = ?";
const INSERT_USER_QUERY = "INSERT INTO user(name, email, password) VALUE(?, ?, ?)"
const FIND_USER_QUERY_ID = "SELECT * FROM user WHERE id = ?";
let pool;
let conn;

export const insertValue = async (values) => {
    try {
        conn = await getPool().getConnection();
        await conn.query(INSERT_USER_QUERY, values)
    } catch (err) {
        throw err;
    } finally{
        if (conn)
            conn.end();
    }
}

export const queryValue = async (email) => {
    try {
        conn = await getPool().getConnection();
        const responseFromDB = await conn.query(FIND_USER_QUERY, [email]) 
        return responseFromDB;
    } catch (err) {
        throw err;
    } finally{
        if (conn)
            conn.end();
    }
}

export const queryId = async (id) => {
    try {
        conn = await getPool().getConnection();
        const responseFromDB = await conn.query(FIND_USER_QUERY_ID, [id])
        return responseFromDB;
    } catch (err) {
        throw err;
    } finally{
        if (conn)
            conn.end();
    }
}

const getPool = () => {
    if(!pool){
        pool =  mariadb.createPool({
            host: process.env.DB_HOST, 
            user:process.env.DB_USER, 
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            connectionLimit: 5
       });
    }
    return pool;
}
