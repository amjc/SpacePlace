
// port of MouseLook.cs to javascript and using physics.

enum RotationAxes { MouseXAndY = 0, MouseX = 1, MouseY = 2 }

public var MouseY = 2;
public var axes = RotationAxes.MouseXAndY;
public var sensitivityX : float = 15.0;
public var sensitivityY : float = 15.0;

public var minimumX : float = -360.0;
public var maximumX : float= 360.0;

public var minimumY : float = -60.0;
public var maximumY : float = 60.0;

var rotationY : float = 0.0;

function Update () {
	if (axes == RotationAxes.MouseXAndY)
	{
		var rotationX : float = transform.localEulerAngles.y + Input.GetAxis("Mouse X") * sensitivityX;
		
		rotationY += Input.GetAxis("Mouse Y") * sensitivityY;
		rotationY = Mathf.Clamp (rotationY, minimumY, maximumY);
		
		transform.localEulerAngles = new Vector3(-rotationY, rotationX, 0);
	}
	else if (axes == RotationAxes.MouseX)
	{
		transform.Rotate(0, Input.GetAxis("Mouse X") * sensitivityX, 0);
	}
	else
	{
		rotationY += Input.GetAxis("Mouse Y") * sensitivityY;
		rotationY = Mathf.Clamp (rotationY, minimumY, maximumY);
		
		transform.localEulerAngles = new Vector3(-rotationY, transform.localEulerAngles.y, 0);
	}
}

function Start () {
	// Make the rigid body not change rotation
	if (rigidbody)
		rigidbody.freezeRotation = true;
}