import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Mesh,
  TorusKnotBufferGeometry,
  MeshNormalMaterial,
} from "https://three.revision.studio/build/three.module.js"

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

// Append Renderer to DOM
document.body.appendChild( renderer.domElement );

document.body.appendChild( WEBVR.createButton( renderer ) );

renderer.vr.enabled = true;

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

var geometry = new TorusKnotBufferGeometry( 3, 1, 100, 16 );
var material = new MeshNormalMaterial();
var torusKnot = new Mesh( geometry, material );
scene.add( torusKnot );
torusKnot.position.z = -15;


renderer.setAnimationLoop(() => {
  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.01;

  renderer.render( scene, camera );
});
   