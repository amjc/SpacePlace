var speed : float = 5.5;
var rate : float = 1.0;
function Update () {
direction = transform.forward * Time.deltaTime * speed;
transform.Rotate(Vector3.up * Time.deltaTime * rate, Space.World);

//move our object
transform.Translate(direction);

}
