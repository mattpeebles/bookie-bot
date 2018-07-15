import {createConnection, QueryError, RowDataPacket} from 'mysql';

const connection  = createConnection({
    host     : process.env.RDS_HOSTNAME,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    port     : parseInt(process.env.RDS_PORT)
});

function load(){          
    connection.connect(function(err) {
      if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
      }
    
      console.log('Connected to database.');
    });
    
    connection.end(err => {
        if(err){
            console.error('Database connection failed to end: ' + err.stack);
            connection.destroy();
            return;
        }
    
        console.log("Connection to database ended")
    });
}

export {
    connection,
    load
}

