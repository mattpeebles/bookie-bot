import { Create, GetAsync, DeleteAsync } from "./database/db.api"
import { EntityNames } from './database/entities'

// Function called when the "echo" command is issued:
function echo (twitchHelper){
    return function(target, context, params) {
        // If there's something to echo:
        if (params.length) {
            // Join the params into a string:
            const msg = params.join(' ')
            
            // Send it back to the correct place:
            twitchHelper(target, context, msg)
        } else { // Nothing to echo
            console.log(`* Nothing to echo`)
        }
    }
}

async function register(target, user : Twitch.User, params){
    var bUser = translate(user);
    let data = await Create<Bookie.User>(EntityNames.Users, bUser);
    console.log(data);
}

async function inspect(target, user: Twitch.User, params){
    let data = await GetAsync(EntityNames.Users, `Where Id='${user["user-id"]}'`, ['Id', 'DisplayName'])
    console.log(data)
    return data;
}


async function unsubscribe(target, user: Twitch.User, params) {
    let record = await DeleteAsync(EntityNames.Users, user["user-id"]);
    console.log(record)
}

function translate(user: Twitch.User) : Bookie.User{
    var ret : Bookie.User = {
        IsBanned: false,
        DisplayName: user["display-name"],
        Id: user["user-id"],
        Name: user.username
    }

    return ret;
}

export { echo, register, inspect, unsubscribe };