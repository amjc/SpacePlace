/*
There are many different ways to smooth the rotation but doing it this way gives you a lot of control over how the camera behaves.

For every of those smoothed values we calculate the wanted value and the current value.
Then we smooth it using the Lerp function.
Then we apply the smoothed values to the transform's position.
*/

// The target we are following
var target : Transform;
// The distance in the x-z plane to the target
public var distance : float = 10.0;
// Probability that the EMU will diverge.
public var wanderFactor : float = 0.3;
public var speed : float = 2;

public var maxspeed : float = 2;
public var maxforce : float = 1;
public var drift : float = 0.33;

private var noise = new Perlin();
var XYDamping = 2.0;
var rotationDamping = 3.0;

function seek(seekTarget : Vector3) {
	var difference = seekTarget - transform.position  + Vector3.one * distance;
	desired = difference.normalized;
	desired = desired * maxspeed;

	var wanderVector = (Vector3(noise.Noise(Time.time), noise.Noise(Time.time), noise.Noise(Time.time)) - Vector3(.5, .5, .5)) * maxforce * drift;
	var steer = Vector3(desired.x, desired.y, desired.z) + wanderVector - rigidbody.velocity;
  Debug.Log( "EMU::::::: " + difference + " : " + difference.magnitude + " : " + steer);
	return Vector3.ClampMagnitude(steer, maxforce);
}

function FixedUpdate () {
	// Early out if we don't have a target
	if (!target)
		return;
	
	// Calculate the current rotation angles
	var wantedRotationAngle = target.eulerAngles.y;

	var accel = seek(target.position);
	rigidbody.AddRelativeForce(accel);
	rigidbody.velocity = Vector3.ClampMagnitude(rigidbody.velocity, speed);
	
	var deltaRotation : Quaternion = Quaternion.Euler(transform.position * Time.deltaTime * 0.05);
//	rigidbody.MoveRotation(rigidbody.rotation * deltaRotation);
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