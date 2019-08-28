import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Mesh,
  TorusKnotBufferGeometry,
  MeshNormalMaterial,
  LineBasicMaterial,
  BufferGeometry,
  Line,
  Vector3,
  LineSegments,
} from "https://three.revision.studio/build/three.module.js"

import { BoxLineGeometry } from 'https://three.revision.studio/examples/jsm/geometries/BoxLineGeometry.js';

import { WEBVR } from 'https://three.revision.studio/examples/jsm/vr/WebVR.js'

var scene = new Scene();

// Create a basic perspective camera
var camera = new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

// Create a renderer with Antialiasing
var renderer = new WebGLRenderer({antialias:true});

// Configure renderer clear color
renderer.setClearColor("#000000");

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

let controller1 = renderer.vr.getController( 0 );
controller1.addEventListener( 'selectstart', onSelectStart );
controller1.addEventListener( 'selectend', onSelectEnd );
scene.add( controller1 );

var geometry = new BufferGeometry().setFromPoints( [ new Vector3( 0, 0, 0 ), new Vector3( 0, 0, - 1 ) ] );
var line = new Line( geometry );
line.name = 'line';
line.scale.z = 5;

controller1.add( line.clone() );


// Append Renderer to DOM
document.body.appendChild( renderer.domElement );

document.body.appendChild( WEBVR.createButton( renderer ) );

renderer.vr.enabled = true;

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

var geometry = new TorusKnotBufferGeometry( 1, .3, 128, 16, 3, 5 );
var material = new MeshNormalMaterial();
var torusKnot = new Mesh( geometry, material );
scene.add( torusKnot );
torusKnot.position.z = -3;
torusKnot.position.y = 1.5;

let room = new LineSegments(
  new BoxLineGeometry( 6, 6, 6, 10, 10, 10 ),
  new LineBasicMaterial( { color: 0x808080 } )
);
room.geometry.translate( 0, 3, 0 );
scene.add( room );


renderer.setAnimationLoop(() => {
  let t = Date.now() / 2000;
  torusKnot.rotation.x = Math.PI * Math.sin(t);
  torusKnot.rotation.y = Math.PI * Math.cos(t);
  torusKnot.rotation.z = t;

  renderer.render( scene, camera );
});
   
function onSelectStart(event) {

}

function onSelectEnd(event) {

}