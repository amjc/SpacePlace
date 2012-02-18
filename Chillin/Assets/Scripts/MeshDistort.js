public var inflateSpeed : float;

function Update () {
	var mesh : Mesh = GetComponent(MeshFilter).mesh;
	var vertices : Vector3[] = mesh.vertices;
	var normals : Vector3[] = mesh.normals;
	var center : Vector3 = transform.position;
	
	Gizmos.SetColor(Color.blue);
	for (var i = 0; i < vertices.Length; i++){
		vertices[i] += normals[i] * inflateSpeed;
		Gizmos.DrawRay( vertices[i], normals[i]*10 );
	
}
}