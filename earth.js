var renderer	= new THREE.WebGLRenderer({
		antialias	: true
	});

	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	renderer.shadowMapEnabled	= true
	
	//set scene
	var onRenderFcts= [];
	var scene	= new THREE.Scene();
	var camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 100 );
	camera.position.z = 2;

	// // STATS
	// stats = new Stats();
	// stats.domElement.style.position = 'absolute';
	// stats.domElement.style.bottom = '0px';
	// stats.domElement.style.zIndex = 100;
	// container.appendChild( stats.domElement );


	//i love light
	scene.add(new THREE.AmbientLight( 0x777777 ));
	


	var light	= new THREE.PointLight( 0xcccccc, 2 )
	light.position.set(5,5,1)
	scene.add( light )
	// light.castShadow	= true
	// light.shadowCameraNear	= 0.01
	// light.shadowCameraFar	= 15
	// light.shadowCameraFov	= 45
	// light.shadowCameraLeft	= -1
	// light.shadowCameraRight	=  1
	// light.shadowCameraTop	=  1
	// light.shadowCameraBottom= -1
	// //light.shadowCameraVisible	= true

	// light.shadowBias	= 0.001
	// light.shadowDarkness	= 0.2

	// light.shadowMapWidth	= 1024
	// light.shadowMapHeight	= 1024

	
	
	//this does work
	var starSphere	= THREEx.Planets.createStarfield()
	scene.add(starSphere)
	
	// // this doesn't
	// // create the geometry sphere
	// var geometry  = new THREE.SphereGeometry(90, 32, 32)
	// // create the material, using a texture of startfield
	// var materialstar  = new THREE.MeshBasicMaterial()
	// materialstar.map   = THREE.ImageUtils.loadTexture('images/omegacentauri.jpg')
	// materialstar.side  = THREE.BackSide
	// // create the mesh based on geometry and material
	// var mesh  = new THREE.Mesh(geometry, materialstar)




	// var datGUI	= new dat.GUI()
	// make earth container & rotate it
	var containerEarth	= new THREE.Object3D()
	containerEarth.rotateZ(-23.4 * Math.PI/180)
	containerEarth.position.z	= 0
	scene.add(containerEarth)



	// make the moon
	// var moonMesh	= THREEx.Planets.createMoon()
	// moonMesh.position.set(0.5,0.5,0.5)
	// moonMesh.scale.multiplyScalar(1/5)
	// moonMesh.receiveShadow	= true
	// moonMesh.castShadow	= true
	// containerEarth.add(moonMesh)

	//sphere and material map
	var geometry   = new THREE.SphereGeometry(0.5, 32, 32)
	var material  = new THREE.MeshPhongMaterial()
	var earthMesh = new THREE.Mesh(geometry, material)
	scene.add(earthMesh)
	//ground map
	material.map    = THREE.ImageUtils.loadTexture('images/Earth2.jpg')
	//bump map
	material.bumpMap    = THREE.ImageUtils.loadTexture('images/earthbump1k.jpg')
	material.bumpScale = 0.008
	//specular map
	material.specularMap    = THREE.ImageUtils.loadTexture('images/specular.jpg');
	material.specular  = new THREE.Color('grey');
	//sky map


	

	


	onRenderFcts.push(function(delta, now){
		earthMesh.rotation.y += 1/32 * delta;		
	})

	// var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	// var material	= THREEx.createAtmosphereMaterial()
	// material.uniforms.glowColor.value.set(616161)
	// material.uniforms.coeficient.value	= 0.8
	// material.uniforms.power.value		= 2.0
	// var mesh	= new THREE.Mesh(geometry, material );
	// mesh.scale.multiplyScalar(1.01);
	// containerEarth.add( mesh );
	// new THREEx.addAtmosphereMaterial2DatGui(material, datGUI)

	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var material	= THREEx.createAtmosphereMaterial()
	material.side	= THREE.BackSide
	material.uniforms.glowColor.value.set(0x00b3ff)
	material.uniforms.coeficient.value	= 0.5
	material.uniforms.power.value		= 10.0
	var mesh	= new THREE.Mesh(geometry, material );
	mesh.scale.multiplyScalar(1.15);
	containerEarth.add( mesh );
	// new THREEx.addAtmosphereMaterial2DatGui(material, datGUI)

	var earthCloud	= THREEx.Planets.createEarthCloud()
	earthCloud.receiveShadow	= false
	earthCloud.castShadow	= false
	containerEarth.add(earthCloud)
	onRenderFcts.push(function(delta, now){
		earthCloud.rotation.y += 1/8 * delta;		
	})

	//camera?
	// var mouse	= {x : 0, y : 0}
	// document.addEventListener('mousemove', function(event){
	// 	mouse.x	= (event.clientX / window.innerWidth ) - 0.5
	// 	mouse.y	= (event.clientY / window.innerHeight) - 0.5
	// }, false)
	onRenderFcts.push(function(delta, now){
		// camera.position.x += (mouse.x*5 - camera.position.x) * (delta*3)
		// camera.position.y += (mouse.y*5 - camera.position.y) * (delta*3)
		camera.lookAt( scene.position )

	})
	// NOT WORKING DON'T USE IT NO REALLY DON'T PLEASE
	// controls = new THREE.OrbitControls( camera, renderer.domElement );
	
	//end camera

	//render it, very important
	onRenderFcts.push(function(){
		renderer.render( scene, camera );		
	})
	
	// loop the runner (using it from some other guy on the interwebz)
	var lastTimeMsec= null
	requestAnimationFrame(function animate(nowMsec){
		// keep looping
		requestAnimationFrame( animate );
		// measure time
		lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
		var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
		lastTimeMsec	= nowMsec
		// call each update function
		onRenderFcts.forEach(function(onRenderFct){
			onRenderFct(deltaMsec/1000, nowMsec/1000)
		})

	function render() {

				renderer.render( scene, camera );
				stats.update();
				controls.update();

			}
	})

//music!

var musicA = document.getElementById('Spore');
//	okay so there's a bit of code redundancy, I admit it
musicA.play();	