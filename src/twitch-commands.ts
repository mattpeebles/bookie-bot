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

export { echo };