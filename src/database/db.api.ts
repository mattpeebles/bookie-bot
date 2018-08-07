import { pool, format } from './db';
import { RowDataPacket, OkPacket, PoolConnection, Query} from 'mysql';
import { EntityNames, BookieRecord } from './entities'
import { createDeflate } from 'zlib';
import { resolveAny } from 'dns';

async function Create<T extends Bookie.Record>(tableName: EntityNames, entity: T){
    
    let query = format(`INSERT INTO ${tableName} SET ?`, entity);
    let data = await Execute(query);
    return data;
}

async function Update<T extends Bookie.Record>(tableName: EntityNames, entity: T)
{    
    if(entity.Id == null || entity.Id == undefined) throw new Error("Record must have Id in order to update")
    let query = format(`UPDATE ${tableName} SET ? WHERE Id = '${entity.Id}'`, entity);
    let data = await Execute(query);
    return data;
}

async function DeleteAsync(tableName: EntityNames, id: string)
{
    let query = BuildQuery(OperationType.DELETE, tableName, `Where Id='${id}'`)
    let data = await Execute(query);
    return (<OkPacket>data).affectedRows;
}

async function GetAsync(tableName: EntityNames, queryString: string, columns: string[] = []) : Promise<Bookie.Record[]> {
    let query = BuildQuery(OperationType.GET, tableName, queryString, columns)    
    let data = await Execute(query)
    
    return Translate(data);
}

function Translate(results: RowDataPacket[] | RowDataPacket[][] | OkPacket[] | OkPacket) : Bookie.Record[]{
        
    if(Array.isArray(results[0])){
        TranslateRowDataArray(<RowDataPacket[][]>results);
    }
    
    if(typeof results[0] != null && typeof results[0] == 'object'){
        let records = <RowDataPacket[]>results;
        return records.map(translateRowData);
    }

    function translateRowData(result: RowDataPacket) : Bookie.Record{
        let translate : Bookie.Record = {};
    
        Object.keys(result).forEach((prop) => {
            if(prop == 'Id') translate.Id = result[prop];
            if(prop !== 'Id') translate[prop] = result[prop]
        })

        return translate;
    }
    
    function TranslateRowDataArray(result: RowDataPacket[][]){
        throw Error("TranslateRowDataArray is not implemented")
    }
}
async function Execute(query : string) : Promise<RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[]> 
 {
    let connection = await getConnection();
    return new Promise<RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[]>((resolve, reject) => {
        connection.query(query, (err, result) => {
            if(err) throw new Error(err.message)
            connection.release();
            resolve(result)
        })
    })
}

function BuildQuery(type: OperationType, tableName: EntityNames, queryString: string, columns: string[] = []) : string{
    let query: string;
    switch(type){
        case OperationType.GET:
            query = `Select ${columns.length == 0 ? '*' : columns.toString()} From ${tableName} ${queryString}`
            break;
        case OperationType.DELETE:
            query = `Delete From ${tableName} ${queryString}`
            break;
    }

    return query;
}

async function getConnection() : Promise<PoolConnection>{
    
    let data = () : Promise<PoolConnection> => {
        return new Promise((res, reject)  => {
            pool.getConnection(async (err, connection) => {
                if(err) reject(err.message)
                                
                res(connection)
            })
        })
    }

    return data()
}

enum MySqlError{
    BadField = 1054
}

enum OperationType{
    GET = 0,
    UPDATE = 1,
    CREATE = 2,
    DELETE = 3
}

export { Create, Update, DeleteAsync, GetAsync }