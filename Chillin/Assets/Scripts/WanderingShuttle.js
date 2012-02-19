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

function seek(seekTarget : Vector3) {
	var difference = seekTarget - transform.position;
	desired = difference.normalized;
	desired = desired * maxSpeed;

	var wanderVector = (Vector3(noise.Noise(Time.time), noise.Noise(Time.time), noise.Noise(Time.time)) - Vector3(.5, .5, .5)) * maxForce * drift;
	var steer = Vector3(desired.x, desired.y, desired.z) + wanderVector - rigidbody.velocity;
  // Debug.Log(destination + " :: " + difference + " : " + difference.magnitude + " : " + steer);
	return Vector3.ClampMagnitude(steer, maxForce);
}

function Start() {
  destination = SmoothRandom.GetVector3(3) * radius + center;
}

function FixedUpdate () {
  location = Vector3.Distance(transform.position, destination);
  if( location <= arrival) {
    destination = Random.onUnitSphere * radius + center;
  }
  
  // Calculate the acceleration and apply to the object.  
	var accel = seek(destination);
	rigidbody.AddRelativeForce(accel);
  
  // Restrain velocity to maxSpeed.
	rigidbody.velocity = Vector3.ClampMagnitude(rigidbody.velocity, maxSpeed);
  
  // Watch where you're driving.
  // transform.LookAt(destination);

	var deltaRotation : Quaternion = Quaternion.Euler(transform.position * Time.deltaTime * 0.05);
  // rigidbody.MoveRotation(rigidbody.rotation * deltaRotation);
	// Convert the angle into a rotation
  //	var currentRotation = Quaternion.Euler (0, currentRotationAngle, 0);
	
	// Set the position of the camera on the x-z plane to:
	// distance meters behind the target
  //	transform.position = target.position;
  //	transform.position -= currentRotation * Vector3.forward * distance;
	
	// Always look at the target. The EMU model is facing the wrong direction to its
	// axes. So flip the Z direction.
  //	wanderRotation = Quaternion.Lerp(transform.rotation, Random.rotation, Time.time * 2);
  //	rigidbody.rotation = Quaternion.Lerp(wanderRotation, target.rotation, Time.time * 4);
}