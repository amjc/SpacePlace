var zeroAc: Vector3;

var start = false;

public var scaling : float = 1;
public var breakingPower : float = 0.333333333;


// Readings from accelerometer
private var accelerometer : Vector3;
private var previousAccelerometer : Vector3;
private var trailingReadings : Vector3[];
private var trailingIndex : int = 0;
private var trailingLength : int = 10;
private var trailingAvg : Vector3;

var AccelerometerUpdateInterval : float = 1.0 / 60.0;
var LowPassKernelWidthInSeconds : float = 1.0;

private var LowPassFilterFactor : float = AccelerometerUpdateInterval / LowPassKernelWidthInSeconds; // tweakable
private var lowPassValue : Vector3 = Vector3.zero;

function Start () {
	accelerometer = Vector3.zero;
	previousAccelerometer = Vector3.zero;
	lowPassValue = Vector3.zero;
	trailingReadings = [Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero];
}


function LowPassFilterAccelerometer() : Vector3 {
	lowPassValue = Vector3.Lerp(lowPassValue, trailingAvg, LowPassFilterFactor);
	return lowPassValue;
}

function Update () {
	var trailingSum = Vector3.zero;
	for( i = 0; i < trailingLength; i++) {
		trailingSum += trailingReadings[i];
	}
	trailingAvg = trailingSum / 10.0;
	Debug.Log(trailingAvg);
	var newSpot = LowPassFilterAccelerometer();
  // rigidbody.AddRelativeForce(newSpot * scaling);
}

function OSCMessageReceived(message : OSC.NET.OSCMessage){
//	Debug.Log("Message Received with address " + message.Address + " with " + message.Values[0] + " values");
	accelerometer = new Vector3(-1 * message.Values[0], -1 * message.Values[2], -1 *message.Values[1]);
	trailingReadings[trailingIndex] = accelerometer - previousAccelerometer;

	if(message.Values[3] == 1) {
		rigidbody.drag = breakingPower;
	} else {
	  rigidbody.drag = 0;
	}

	previousAccelerometer = accelerometer;
	trailingIndex = (trailingIndex + 1) % trailingLength;

}