public var rate = 1.0;
function Update () {
     transform.Rotate(Vector3.up * Time.deltaTime * rate, Space.World);
}

