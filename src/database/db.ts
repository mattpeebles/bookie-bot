import {createConnection, QueryError, RowDataPacket, createPool, Connection, format} from 'mysql';

const pool  = createPool({
    connectionLimit : 10,
    host     : process.env.RDS_HOSTNAME,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    port     : parseInt(process.env.RDS_PORT),
    database : 'ebdb'
});

function load(){          
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Database connection failed: ' + err.stack);
            return;
        }
        
        console.log('Connected to database.');
          
        connection.release();
    })
    
    
}

export {
    pool,
    load,
    format
}

