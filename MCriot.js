/*
MCriot made by n0nexist
simple minecraft spambot
*/


//libraries
const mineflayer = require("mineflayer");

// constants
const array = [];
const args = process.argv.slice(2);
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

// functions to manage bots
function addbot(h,p,n,v){
	/*
	adds a bot to the array
	*/
	array.push(mineflayer.createBot({
	    host: h,
	    username: n+"_"+Math.random().toString(36).slice(2).slice(0,5),
	    port: parseInt(p),
	    version: v,
	}));
}

function chatall(text){
    /*
    makes all bots in the array
    send a chat message
    */
    array.forEach(function(bot) {
        bot.chat(text)
    });
}


/*
main code
*/
if (args[4] == undefined){
	console.log("usage: MCriot.js (ip) (port) (bot name) (bot count) (version)\nexample: MCriot.js localhost 25565 hello 10 1.8.9");
	process.exit(1);
}
console.log(`

$$\\      $$\\  $$$$$$\\            $$\\            $$\\
$$$\\    $$$ |$$  __$$\\           \\__|           $$ |
$$$$\\  $$$$ |$$ /  \\__| $$$$$$\\  $$\\  $$$$$$\\ $$$$$$\\
$$\\$$\\$$ $$ |$$ |      $$  __$$\\ $$ |$$  __$$\\\\_$$  _|
$$ \\$$$  $$ |$$ |      $$ |  \\__|$$ |$$ /  $$ | $$ |
$$ |\\$  /$$ |$$ |  $$\\ $$ |      $$ |$$ |  $$ | $$ |$$\\
$$ | \\_/ $$ |\\$$$$$$  |$$ |      $$ |\\$$$$$$  | \\$$$$  |
\\__|     \\__| \\______/ \\__|      \\__| \\______/   \\____/
            < MINECRAFT SPAMBOT BY N0NEXIST >
`)
console.log("* starting",args[3],"bots against",args[0]+":"+args[1])
for(let i=0;i<parseInt(args[3])-1;i++){ // adds all bot except one
	addbot(args[0],args[1],args[2],args[4])
	console.log("+ created bot n."+(i+1)+"/"+args[3])
}
// creates last bot with chat event
const chatevent = mineflayer.createBot({
	host: args[0],
	username: args[2]+"_"+Math.random().toString(36).slice(2).slice(0,5),
	port: parseInt(args[1]),
	version: args[4],
})

chatevent.on('chat', (username, message) => { // prints chat messages
	if (username === chatevent.username) return
	console.log("[CHAT]", username, "->" ,message)
})

console.log("* bots are joining; you can now type commands")

function promptCMD(){
	readline.question('', command => {
	  console.log(`+ sending "${command}" to all bots..`);
	  chatall(command) // sends command to all bots in the array
	  chatevent.chat(command) // sends the command to the last bot which contains the chat listener
	  promptCMD() // show again the prompt for typing commands
	});
}
promptCMD()