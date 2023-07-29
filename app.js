import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Mesh,
  TorusKnotGeometry,
  MeshNormalMaterial,
  LineBasicMaterial,
  BufferGeometry,
  Line,
  Vector3,
  LineSegments,
} from "three"

import { BoxLineGeometry } from '../three.js/examples/jsm/geometries/BoxLineGeometry.js';

import { VRButton } from '../three.js/examples/jsm/webxr/VRButton.js';


var scene = new Scene();

// Create a basic perspective camera
var camera = new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );


let renderer = new WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.gammaInput = true;
renderer.gammaOutput = true;
renderer.shadowMap.enabled = true;
renderer.xr.enabled = true;
document.body.appendChild( renderer.domElement );
document.body.appendChild( VRButton.createButton( renderer ) );


// let controller1 = renderer.vr.getController( 0 );
// controller1.addEventListener( 'selectstart', onSelectStart );
// controller1.addEventListener( 'selectend', onSelectEnd );
// scene.add( controller1 );

var geometry = new BufferGeometry().setFromPoints( [ new Vector3( 0, 0, 0 ), new Vector3( 0, 0, - 1 ) ] );
var line = new Line( geometry );
line.name = 'line';
line.scale.z = 5;

// controller1.add( line.clone() );

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

var geometry = new TorusKnotGeometry( 1, .25, 256, 32, 2, 5 );
var material = new MeshNormalMaterial();
var torusKnot = new Mesh( geometry, material );
scene.add( torusKnot );
torusKnot.position.z = -3;
torusKnot.position.y = 1.5;

let room = new LineSegments(
  new BoxLineGeometry( 6, 6, 6, 10, 10, 10 ),
  new LineBasicMaterial( { color: 0x808080 } )
);
room.geometry.translate( 0, 3, -1.5 );
scene.add( room );


renderer.setAnimationLoop(() => {
  let t = Date.now() / 8000;
  torusKnot.rotation.x = Math.PI * Math.sin(t);
  torusKnot.rotation.y = Math.PI * Math.cos(t);
  torusKnot.rotation.z = t;

  renderer.render( scene, camera );
});
   
function onSelectStart(event) {

}

function onSelectEnd(event) {

}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
