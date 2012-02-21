var projectile : Rigidbody;
var speed = 5;
var RocketsOn : boolean = false;
var missileSlots:Transform[]; //Assigne dummy objects to hold each missiles position.
var timeInterval:float = 0.1; //seconds to wait before next launch.
var startTime:float; //used in Timer().
var missileIndex:int = 0;

function Update() {
    if(Input.GetButtonDown("Fire1")) {
        RocketsOn= true;
    }
        if (Timer(timeInterval) && RocketsOn){ //Check whether it's the time for the next launch.
            if (missileIndex <=missileSlots.length-1){
                LaunchMissiles(missileSlots[missileIndex]);
                missileIndex++; 
            } else {
                missileIndex =0;
                RocketsOn = false;
            }
        }

}


function Timer(interval:float):boolean{

    var timer =  interval - (Time.time - startTime);
    if (timer <= 0){
        startTime = Time.time;
        timer =0;
        return true;
    } else {
        return false;
    }

}

function LaunchMissiles(slot:Transform){

    if(RocketsOn == true){
        print("ML Reached - Rockets = true");

        var instantiatedProjectile : Rigidbody = Instantiate(projectile, slot.position, slot.rotation);

        instantiatedProjectile.velocity =
            transform.TransformDirection(Vector3(0, 0, speed));

        Physics.IgnoreCollision(instantiatedProjectile. collider,
            transform.root.collider);

            return;

    }

}