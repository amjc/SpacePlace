public var acceleration : float = 4.0;
public var breakingPower : float = 0.125;
public var maxSpeed : float = 200;
public var chillDampening : float = 0.0125;
public var torqueCoefficient : float = 6;
public var torqueSensitivity: float = 1;

// Readings from accelerometer
private var accelerometer : Vector3;
private var previousAccelerometer : Vector3;
private var trailingReadings : Vector3[];
private var trailingIndex : int = 0;
private var trailingLength : int = 30;
private var trailingAvg : Vector3;
private var chillRate : float = 1;

private var AccelerometerUpdateInterval : float = 1.0 / 120.0;
private var LowPassKernelWidthInSeconds : float = 1.5;

private var LowPassFilterFactor : float = AccelerometerUpdateInterval / LowPassKernelWidthInSeconds; // tweakable
private var lowPassValue : Vector3 = Vector3.zero;

function Start () {
  accelerometer = Vector3.zero;
  previousAccelerometer = Vector3.zero;
  lowPassValue = Vector3.zero;
  trailingReadings = [Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero];
}

function LowPassFilterAccelerometer(accelerometer : Vector3) : Vector3 {
  lowPassValue = Vector3.Lerp(lowPassValue, trailingAvg, LowPassFilterFactor);
  return lowPassValue;
}

function trailingAverage() {
  var trailingSum = Vector3.zero;
  for( i = 0; i < trailingLength; i++) {
    trailingSum += trailingReadings[i];
  }
  return trailingSum / trailingLength;
}

function Update () {
  var averageAccelerometer = trailingAverage();

  if(averageAccelerometer.magnitude >= torqueSensitivity) {
    var torque = averageAccelerometer * torqueCoefficient;
    rigidbody.AddRelativeTorque(torque);
  }

  // Clamp speed
  rigidbody.velocity = Vector3.ClampMagnitude(rigidbody.velocity, maxSpeed);

  Debug.Log(chillRate + " => " + acceleration * chillRate * chillRate + " => " + rigidbody.velocity);

  // Debug.Log("V=" + rigidbody.velocity + " D=" + rigidbody.rotation);
}

function OSCMessageReceived(message : OSC.NET.OSCMessage){
  if(message.Address == "/read/accelerometer") {
    receiveAccelerometer(message);
  }
}

// When the OSC message is from the accelerometer, do this.
function receiveAccelerometer(message : OSC.NET.OSCMessage) {
 accelerometer = new Vector3(-1 *message.Values[2], message.Values[1], 0);
  trailingReadings[trailingIndex] = accelerometer - previousAccelerometer;

  // Turn on the brake
  if(message.Values[3] == 1) {
    rigidbody.drag = breakingPower;
  } else {
    rigidbody.drag = 0;
  }
  // Turn on the thruster
  if(message.Values[4] == 1) {
    rigidbody.AddRelativeForce(Vector3.forward * acceleration * chillRate * chillRate);
  }
  // Scale acceleration
  chillRate = message.Values[5] * chillDampening + 1;

  previousAccelerometer = accelerometer;
  trailingIndex = (trailingIndex + 1) % trailingLength;
}