import * as dataService from '../database/db.api'

function createUser(Id: string, Name: string, DisplayName: string){
    var entity : Bookie.User = {
        DisplayName,
        Id,
        Name,
        Banned: false
    }
    
    return dataService.createUser(Database.EntityNames.Users, entity);
}

export { createUser };