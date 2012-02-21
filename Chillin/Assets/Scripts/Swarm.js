//What enemy are we spawning?
var Enemy: GameObject;
var spawning = false;

//Add regular timer here and rest timer
function Update () {
    //Is the enemy already Out?
    //Change to timer in future?
    if (!spawning && GameObject.FindWithTag("MKIII") == null){
        MassSpawn();
    }
}

function MassSpawn() {
    spawning = true;
    //Set up a loop to add until i =5, loop 5 times, make 5 respawns
    for(var i: int = 0; i < 5; i++ ){
        yield WaitForSeconds(1); //this should work now
        Instantiate(Enemy, transform.position, Quaternion.identity);
    }
    spawning = false;
}