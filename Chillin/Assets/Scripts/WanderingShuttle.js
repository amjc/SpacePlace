// Make a shuttle wander around the dang space.

// This craft will try to move around a large sphere.
// Give the sphere a center and a radius.
public var center : Vector3 = Vector3.zero;
public var radius : float = 2000.0;
// Probability with which the craft will diverge from its path.
public var wanderFactor : float = 0.3;
// Top velocity
public var maxSpeed : float = 10;
// Top acceleration
public var maxForce : float = 3;
// Define drift as a percentage of the acceleration.
// This adds variety to the movement, but not so much as
// to derail staying on path.
public var drift : float = 0.33;

public var arrival : float = 300.0;

// Where is the shuttle trying to go?
private var destination : Vector3;
// Initialize Perlin
private var noise = new Perlin();
// Current acceleration, to add as a force to the rigidbody.
private var accel : Vector3 = Vector3.zero;
private var dist : float;

function seek(seekTarget : Vector3) {
	var difference = seekTarget - transform.position;
	dist = difference.magnitude;
	var wanderVector = (Vector3(noise.Noise(Time.time), noise.Noise(Time.time), noise.Noise(Time.time)) - Vector3(.5, .5, .5)) * maxForce * drift;
	var steer = difference + wanderVector - rigidbody.velocity;
	return Vector3.ClampMagnitude(steer, maxForce);
}

function Start() {
  destination = Random.onUnitSphere * radius + transform.position;
//  rigidbody.AddRelativeForce(Random.onUnitSphere * 20);
//	transform.rotation = Quaternion.LookRotation(rigidbody.velocity);
}

function Update () {
  if( Random.value < wanderFactor || dist <= arrival) {
    destination = Vector3.ClampMagnitude(destination + Random.onUnitSphere * radius, 6000);
  }
  
  // Calculate the acceleration and apply to the object.  
	var accel = seek(destination);
	rigidbody.AddForce(accel);
  
//   Restrain velocity to maxSpeed.
	rigidbody.velocity = Vector3.ClampMagnitude(rigidbody.velocity, maxSpeed);
  
  // Watch where you're driving.
  // transform.LookAt(destination);
  var m = Quaternion.FromToRotation(transform.forward, rigidbody.velocity);
  transform.rotation = Quaternion.Lerp(transform.rotation, m, Time.time * 0.01);
}