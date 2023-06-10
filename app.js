const readline = require("readline-sync");
let transphobes = ["a cashier", "your parent", "a stranger in the restroom", "someone on social media", "a co-worker", "a childhood friend", "a stranger at a bar", "a stranger at the grocery store", "a classmate", "your cousin", "your sibling"]
let transphobeComments = ["uses the wrong pronoun", "uses your dead name", "makes fun of your appearance", "says something transphobic about a celebrity", "calls you a slur", "explains how gender is just basic biology", "calls women 'females'", "casually asks about your genitals", "says they just aren't personally attracted to trans people", "says you'll always be *dead name* to them", "talks/asks about your 'real name'"]
let awards = ["Marsha P. Johnson's rhinestone covered stilleto", "Lou Sullivan's teenage journal", "Elliot Page's oversized suit", "A big hug from Miss Major Griffen-Gracy", "Billy Tipton's hit jazz single", "Chaz Bono's beard trimmings", "Cece McDonald's handbag", "Patricio 'Cacahuate' Manuel's boxing gloves", "Indya Moore's gold earring", "Angelica Ross' laptop", "Laura Jane Grace's electric guitar", "Nolan Hanson's boxing glove", "a dedicated performance from Peppermint", "Janet Mock's latest article", "a spotlight on 'I am Jazz' with Jazz Jennings"]
const compliments = ["A stranger tells you they like your shoes", "Your parent sends you a birthday card that affirms your gender", "A cute person gives you their phone number", "You end up at a friends birthday party and have a great time", "A colleague nominates you for a prestigious award", "Someone you look up to compliments your work", "You try on a new outfit and feel major gender euphoria", "You go the whole day and nobody misgenders you", "A friend calls to invite you to a fun event", "You have a really peaceful walk in the park", "You try a new activity that always felt off-limits before"]

// facts will be integrated with battle sequence and should influence the outcome
// let transFacts = { 
//     facts: ["Trans people are twice as likely to be unemployed compared with the overall population. Looking at only black trans people, that rate doubles again.", "Trans people are four times more likely than cisgender people to experience violent physical or sexual assault", ], 
//     sources: [UCLA School of Law - Williams Institute https://williamsinstitute.law.ucla.edu/press/ncvs-trans-press-release/ ]

// }
let comment
let depression = 0
let answer
let patience
let transphobe
let transphobeRQ
let penalty
let energy = 0
let opponent
let trust
let award
let player = {
    awards: [],
    defeated: [],
    rq: patience, 
}

// Greeting
console.log("Welcome to the trans experience! \n\nImagine yourself existing in the world as a trans person. Life isn't easy, but there are good things too. You'll encounter all kinds of transphobic microaggressions and friends/community members in this world and will have to decide how to interact with them. This game is meant to be fun an educational while showing the kinds of microaggressions that embolden and enable the more insidious violence. The reality in the world is far more brutal, especially for trans women and even more so for trans women of color. \n\nYou can think of your Resistance Quotient (RQ) as your overall health - if you run all the way out the game is over. If you win ten awards by overcoming transphobes, you'll be declared pro trans. Try again and again to see how high you can score! \n\nType (q) at any time to quit the game, or (i) to check your inventory.")

player.name = readline.question("To get started, what is your name?")
console.log("Great! Thanks for playing, " + player.name + "!")
let level = readline.question("Level Select. Do you want to play as a trans youth (a), a trans adult (b), or a trans elder (c)?")

    if (level === "a") {
        patience = 50;
        opponent = 7;
    } else if (level === "b") {
        patience = 40;
        opponent = 12;
    } else if (level ==="c") {
        patience = 30;
        opponent = 15;
    } 

function walk() {
    answer = readline.question("Select an option: (a) go for a walk, (b) stay home?")
        if (answer === "a") {
            takeAChance()
        } else if (answer === "b") {
            hermit()
        } else if (answer === "c") {
            console.log(player);
        } else if (answer === "d") {
            console.log("Thanks for playing.")
            patience = 0
        }
}

function takeAChance() {
    depression = 0 
    random = Math.floor(Math.random() * transphobes.length)
    if (random % 2 === 0) {
        transphobe = transphobes[random]
        random = Math.floor(Math.random() * transphobeComments.length)
        comment = transphobeComments[random]
        console.log("You encounter " + transphobe + ", who " + comment) 
        encounter()
    } else if (random % 3 === 0) {
        friendTrust()
    } else {
        random = Math.floor(Math.random() * compliments.length)
        console.log(compliments[random] + ". Your Resistance Quotient increases by one point");
        patience++
    }
}
// When you encounter a transphobe, you can choose to do battle or keep walking.
function encounter() {
    answer = readline.question("Please choose: (a) walk away, (b) do battle?")
    if (answer === "b") {
        chooseEnergy();
    } else if (answer === "a") {
        keepWalking();
    }
}

// If you try to ignore a transphobe you have encountered, there is a chance of whether this will impact you positively or negatively and the amount will be random 1-11
function keepWalking()      { 
    random = Math.floor(Math.random() * 10);
    points = random + 1
        if (random % 2 === 0 & random > 0) {
            console.log("The encounter leaves you feeling dejected. Your Resistance Quotient drops " + points + " points.");
            patience = patience - points;
        }
        else {
            console.log("You walk away feeling empowered by ignoring the hater. Congratulations your Resistance Quotient has increased by " + points + " points!");
            patience = patience + points; 
        }
} 
// player can select how much RQ they want to risk in the encounter. this does not impact the opponents RQ
function chooseEnergy() {
    energy = patience + 1
        do {energy = readline.question("You have a total Resistance Quotient of " + patience + " points. How much are you willing to risk in this encounter?")}
        while (energy > patience || energy <= 0 );
        penalty = energy 
        console.log(penalty)
    battle();
}
//during the battle the player can choose with each attack whether they want to attack or run away. If the player runs away it runs the same function (keepWalking) as ignoring them to begin with, otherwise it is the attack function. Opponents strength is based on the initial level selection saved in the opponent variable. 
function battle() {
    transphobeRQ = (Math.floor(Math.random() * opponent) + 1)
    let fight = true    
    while ((transphobeRQ > 0) && (energy > 0) && (fight === true) && (answer != "q") && (answer != "i")) {
        console.log("You: " + energy + "\nTransphobe:" + transphobeRQ)
        answer = readline.question("Select (a) attack, or (b) run away?")
        if (answer === "a") {
            Attack()
        } else if (answer === "b") {
            fight = false
        }
    }
    if (fight === false) {
        keepWalking()
    } else if (energy <= 0) {
        console.log("Foiled again!! The transphobes have beat you but you'll get them next time!")
        patience = patience - penalty;
    } else if (transphobeRQ <= 0) {
        battleWon()
    }
}

// the player has a 50% - 50% chance of giving or recieving damage. The result is damage is weighted to recieve
function Attack() {
    random = Math.floor(Math.random() * 10)
    points = Math.floor(Math.random() * 5) + 1
    if (random % 2 === 0) {
        console.log("The transphobe is enraged and argues back ferociusly. Your Resistance Quotient decreases by " + points + " points.");
        energy = energy - points;
        }      
    else {
        console.log("You've made a good point. Your opponents' score drops by " + (points + 2) + " points.")
        transphobeRQ = transphobeRQ - (points + 2)
    } 
}
// When the transphobe loses all RQ first, the battlewon function runs. This filters the arrays into themselves so that opponents and awards will be randomized but not repeated. They are then pushed to the awards and defeated arrays stored in the player object
function battleWon() {        
    let i = Math.floor(Math.random() * transphobes.length)
    let j = Math.floor(Math.random() * awards.length)
    player.defeated.push(transphobe)
    transphobes = transphobes.filter(input => input != transphobe)
    award = awards[j]
    player.awards.push(award)
    awards = awards.filter(input => input != award)
    transphobeComments = transphobeComments.filter(input => input != comment)
    console.log("You have emerged victorious!!! Relish in the spoils. \n\nYour Resistance Quotient increases by 10 points. \n\nYou are awarded with " + award + ". \n\nWhat an honor!!!")
    patience = patience - (penalty - energy)
    patience = patience + 10
}

//when running into a friend on initial walk the player will select to confide or make small talk
function friendTrust() {
    let answer = readline.question("You've run into a friend! Do you (a) confide in them or (b) just make small talk")
    if (answer === "a") {
        friend()
    } else if (answer === "b") {
        SmallTalk()
    } 
}

//if the player chooses small talkthis will always increase by either 1 or 3. If they do this more than 5 times it will start to lower the RQ unless they choose confide and trust is reset to 0. 
function SmallTalk() {
    trust++
    let random = Math.floor(Math.random() * 10)
    if (trust > 5) {
        console.log("You know eventually you'll need to confide in your friend to build trust. Your RQ drops by one point")
        patience--
    } else if (random % 2 === 0) {
        console.log("It's nice seeing your friend. Hopefully next time you'll feel comfortable confiding in them. Your RQ increases by one point.")
        patience++
    } else {
        console.log("It was nice seeing your friend and you enjoy keeping everything light. Your Resistance Quotient increases by two points.")
        patience = patience + 3
    }
}

//if you confide, there is a 50% 50% chance that your friend needs support from you. A random amount of points is either taken or granted depending on the emotional availability of your friend. 
function friend() {
    trust = 0
    random = Math.floor(Math.random() * 6)
    points = Math.floor(random/2) + 1
    if (random % 2 === 0) {
        console.log("Your friend affirms your gender and helps you feel better. Your Resistance Quotient increases by " + points + " points.")
        patience = patience + points
    } else {
        console.log("Your friend is going through a hard time so you spend some time with them listening. While you feel good about helping, your Resistance Quotient decreases by " + points + " points.")
        patience = patience - points
    }
}
// if the player stays home it will initial increase their RQ 1 point. After 3 times it will begin to severely drop their RQ unless they reset depression by choosing walk. 
function hermit() {
    depression++
    if (depression <= 3) { 
        console.log("You feel re-energized after getting some time alone. Your Resistance Quotient increases one point.")
        patience++
    } else {
        console.log("You've been home alone too long. Your resistance quotience decreases by five points.")
        patience = patience - 5
    }
}

// The game runs while the player has RQ remaining. If they get 11 awards they will be declared a winner. The array of their awards and the array of opponents will be printed. 
while (patience > 0) {
    if (player.awards.length >= 10) {
        console.log("Congratulations! You are a winner!! \n\nYou have increased your social support network and are confidently living your best life!  \n\nThroughout your transition you gathered the following awards: ")
        for (let i = 0; i < player.awards.length; i++) {
            console.log(player.awards[i])
        } 
        console.log("\n\nYou successfully overcame transphobia from: ")
        for (let i = 0; i < player.defeated.length; i++) {
            console.log(player.defeated[i])
        } 
        console.log("\nYour final score was " + patience + " points. \n\nYou are PRO TRANS!")
        return null;
    } 
// All return values except for the initial Name are stored as answer, which is a global variable. If that ever comes back as i, the inventory prints. If it ever comes back as q, it returns null to close the program. 
    if (answer === "q") {
        return null
    } else if (answer === "i") {
        console.log("Hi, " + player.name + "! \n\nWelcome to your inventory. So far you've helped these people understand the errors of their ways: ")
        for (let i = 0; i < player.defeated.length; i++) {
            console.log(player.defeated[i])
        } 
        console.log("You have won these items for your troubles: ")
        for (let i = 0; i < player.awards.length; i++) {
            console.log(player.awards[i])
        }    
        console.log("Current RQ: " + patience)
        answer = ""
    }
    walk()
    }
