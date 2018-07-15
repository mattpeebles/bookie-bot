import { connection } from './db';
import { RowDataPacket, OkPacket } from 'mysql';

function createUser(tableName: Database.EntityNames, entity: Bookie.User){
    
    let result : RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[];

    connection.query(`INSERT INTO ${tableName} SET ?`, entity, (err, userResult) => {
        if(err) throw new Error("Unable to create " + entity)
        
        result = userResult;
    })

    return result;
}

export { createUser }