var renderer, scene, camera, composer, circle, particle, luminor, halo;
var lights = [];
window.onload = function() {
  init();
  animate();
}

function init() {
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.setClearColor(0x00FF00, 0.0);
  document.getElementById('canvas').appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 5, 2000);
  camera.position.z = 400;
  scene.add(camera);

  circle = new THREE.Object3D();
  particle = new THREE.Object3D();
  halo = new THREE.Object3D();
  luminor = new THREE.Object3D();
 
  scene.add(circle);
  scene.add(particle);
  scene.add(halo);
  scene.add(luminor);

  var geometry = new THREE.TetrahedronGeometry(10, 1);
  var geo_planet = new THREE.SphereGeometry(10, 64, 32);
  var geom3 = new THREE.SphereGeometry(16, 32, 16);
 
  var material = new THREE.MeshPhongMaterial({
    color: 0x111111,
    shading: THREE.FlatShading
  });

 for (var i = 0; i < 500; i++) {
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    mesh.position.multiplyScalar( 200 + (Math.random() * 500));
    mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    particle.add(mesh);
  }
  
  var mat = new THREE.MeshPhongMaterial({
    color: 0x0000FF,
    emissive: 0x000000,
    shading : THREE.SmoothShading
  });
  
  var mat3 = new THREE.ShaderMaterial({
    uniforms: {},
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true
  });

  var planet = new THREE.Mesh(geo_planet, mat);
  planet.scale.x = planet.scale.y = planet.scale.z = 15;
  circle.add(planet);

  var ball = new THREE.Mesh(geom3, mat3);
  ball.scale.x = ball.scale.y = ball.scale.z = 16;
  halo.add(ball);
  
  var ball2 = new THREE.Mesh(geom3, mat3);
  ball2.scale.x = ball2.scale.y = ball2.scale.z = 12;
  ball2.position.set(25,5,1)
  halo.add(ball2);
  
  var ambientLight = new THREE.AmbientLight(0x000000);
  scene.add(ambientLight);
  
  var hemiLight = new THREE.HemisphereLight(0x000000, 0x1111111, 20);
        hemiLight.position.set(-1, -1, 2);
  luminor.add(hemiLight);
 
  lights[1] = new THREE.DirectionalLight(0x000000, 7);
  lights[1].position.set(-1, 0, 0.5);
  lights[2] = new THREE.DirectionalLight(0x000000, 7);
  lights[2].position.set(1, 0, 0.5);

  scene.add(lights[1]);
  scene.add(lights[2]);
  
  window.addEventListener('resize', onWindowResize, false);

};

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  var timer = 0.0001 * Date.now();
  requestAnimationFrame(animate);

  particle.rotation.x += 0.0000;
  particle.rotation.y -= 0.0040;
   
  renderer.clear();
  renderer.render(scene, camera)
};