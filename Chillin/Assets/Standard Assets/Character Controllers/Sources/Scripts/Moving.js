var speed : float = 150.0;

function Update() {
 
	//is the user pressing left or right (or "a &amp; "d") on the keyboard?
	horMovement = Input.GetAxis("Horizontal");
	//is the user pressing up or down (or "w" &amp; "s") on the keyboard?
	forwardMovement = Input.GetAxis("Vertical");
 
	if (horMovement) {
		rigidbody.AddRelativeForce(Vector3.right * horMovement * Time.deltaTime * speed);
	} 
 
	if (forwardMovement) {
		rigidbody.AddRelativeForce(Vector3.forward * forwardMovement * Time.deltaTime * speed);
	}
 }