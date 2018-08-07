import * as dataService from '../database/db.api'
import { EntityNames } from '../database/entities'


function createUser(Id: string, Name: string, DisplayName: string){
    var entity : Bookie.User = {
        DisplayName,
        Id,
        Name,
        IsBanned: false
    }
    
    return dataService.Create<Bookie.User>(EntityNames.Users, entity);
}

export { createUser };