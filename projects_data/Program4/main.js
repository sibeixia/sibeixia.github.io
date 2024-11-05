//"use strict";
var scene = new THREE.Scene();
var width = 800;
var height = 600;
var renderer = new THREE.WebGLRenderer();
var light = new THREE.AmbientLight(0xffffff);
var camera;
var box;
var controls;
var lives = 3;
//var live;

var frog;
var frogDefault;
var road;
var river;
var bank1; // x=45; y=2; z=3
var bank2;
var bank3;
var vehicle;
var ambulance;
var twoVehicles;
var threeVehicles;
var vehicles = new Array();
var vehicleR1_1;
var vehicleR1_2;
var vehicleR1_3;
var vehicleR1_4;
var vehicleR2_1;
var vehicleR2_2;
var vehicleR2_3;
var vehicleR3_1;
var vehicleR3_2;
var vehicleR4_1;
var vehicleR4_2;
var vehicleR4_3;

var log;
var logs = new Array();
var logIndex = -1;
var twologs;
var threelogs;
var logR1_1;
var logR1_2;
var logR1_3;
var logR1_4;
var logR2_1;
var logR2_2;
var logR2_3;
var logR3_1;
var logR3_2;
var logR4_1;
var logR4_2;
var logR4_3;
// make vehicle and log groups
function makeGroup(single, n, length) {
    var output = single.clone();

   // output.position.z = 0;
    for (var i = 0; i < n - 1; i++) {
        var add = single.clone();
        add.position.x = -(i + 1) * (length + 0.5);
        output.add(add);
    }
    //output.position.z = 1.7
    return output;
}

function initScene() {


    // box = new THREE.Mesh(new THREE.BoxGeometry(20, 20, 20), new THREE.MeshBasicMaterial({ color: 0xFF0000 }));
    // box.name = "box";
    //scene.add(box);
    var textureBrick = THREE.ImageUtils.loadTexture('brick.jpg');
    textureBrick.wrapS = THREE.RepeatWrapping;
    textureBrick.wrapT = THREE.RepeatWrapping;
    textureBrick.repeat.set(8, 1);
    bank1 = new THREE.Mesh(new THREE.BoxGeometry(45, 2, 3), new THREE.MeshBasicMaterial({ map: textureBrick }) /*new THREE.MeshBasicMaterial({ color: 0x8B8682, transparent: true, opacity: 0.2 })*/);
    bank1.position.y = -10;
    bank1.name = "bank1"
    scene.add(bank1);
    // bank2 = new THREE.Mesh(new THREE.BoxGeometry(45, 2, 3), new THREE.MeshBasicMaterial({ color: 0x8B8682 }));
    bank2 = bank1.clone();
    bank2.position.y = 0;
    bank2.name = "bank2"
    scene.add(bank2);
    // bank3 = new THREE.Mesh(new THREE.BoxGeometry(45, 2, 3), new THREE.MeshBasicMaterial({ color: 0x8B8682 }));
    bank3 = bank1.clone();
    bank3.position.y = 10;
    bank3.name = "bank3"
    scene.add(bank3);
    river = new THREE.Mesh(new THREE.BoxGeometry(45, 8, 1), new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('water.jpg'), transparent: true, opacity: 0.6
    })/*new THREE.MeshBasicMaterial({ color: 0x3399ff, transparent: true, opacity: 0.2 })*/);
    river.position.y = 5;
    river.position.z = -1;
    river.name = "river"
    scene.add(river);

    var textureRoad = THREE.ImageUtils.loadTexture('street.jpg');
    textureRoad.wrapS = THREE.RepeatWrapping;
    textureRoad.wrapT = THREE.RepeatWrapping;
    textureRoad.repeat.set(4, 4);



    road = new THREE.Mesh(new THREE.BoxGeometry(45, 8, 3), new THREE.MeshBasicMaterial({ map: textureRoad }));
    road.position.y = -5;
    road.name = "road"
    scene.add(road);



   // frog = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.3, 1), new THREE.MeshBasicMaterial({ color: 0x84BD00, transparent: true, opacity: 1 }));
   // frog.position.y = -10;
  //  frog.position.z = 2;






    // vehicles
   /* vehicle = new THREE.Mesh(new THREE.BoxGeometry(4, 1.5, 2), new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('Car.jpg')
    })new THREE.MeshBasicMaterial({ color: 0xA00103, transparent: true, opacity: 0.2 }));
    vehicle.name = "vehicle"*/
    
    // row 1
    vehicleR1_1 = ambulance.clone();
    vehicleR1_1.position.y = -8;
    vehicleR1_1.position.x = 24.5;
    vehicleR1_1.position.z = 1.7
    // vehicleR1_1.name = "vehicleR1_1";
    vehicles.push(vehicleR1_1);
    // scene.add(vehicleR1_1);
    /*
    ambulance = new THREE.Mesh(new THREE.BoxGeometry(4, 1.5, 2), new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('ambulance.jpg')
    })new THREE.MeshBasicMaterial({ color: 0xA00103, transparent: true, opacity: 0.2 }));
    ambulance.name = "ambulance";
    */
    

    vehicleR1_2 = ambulance.clone();
    vehicleR1_2.position.y = -8;
    vehicleR1_2.position.x = 12.5;
    vehicleR1_2.position.z = 1.7
    vehicles.push(vehicleR1_2);
    // scene.add(vehicleR1_2);
    vehicleR1_3 = vehicleR1_1.clone();
    vehicleR1_3.position.x = 0.5;
    vehicles.push(vehicleR1_3);
    //scene.add(vehicleR1_3);
    vehicleR1_4 = vehicleR1_1.clone();
    vehicleR1_4.position.x = -11.5;
    vehicles.push(vehicleR1_4);
    //scene.add(vehicleR1_4);
    // row 2
    twoVehicles = makeGroup(vehicle, 2, 4);
    vehicleR2_1 = twoVehicles.clone();
    vehicleR2_1.position.y = -6;
    vehicleR2_1.position.x = -24.5
    vehicleR2_1.position.z = 1.7;
    vehicleR2_1.rotation.z = Math.PI ;
    vehicles.push(vehicleR2_1);
    //scene.add(vehicleR2_1);
    vehicleR2_2 = vehicleR2_1.clone();
    vehicleR2_2.position.x = -6.75;
    vehicles.push(vehicleR2_2);
    //scene.add(vehicleR2_2);
    vehicleR2_3 = vehicleR2_1.clone();
    vehicleR2_3.position.x = 11.25;
    vehicles.push(vehicleR2_3);
    // scene.add(vehicleR2_3);
    // row 3
    threeVehicles = makeGroup(vehicle, 3, 4);
    vehicleR3_1 = threeVehicles.clone();
    vehicleR3_1.position.y = -4;
    vehicleR3_1.position.x = 33.5;
    vehicleR3_1.position.z = 1.7;
    vehicles.push(vehicleR3_1);
    // scene.add(vehicleR3_1);
    vehicleR3_2 = vehicleR3_1.clone();
    vehicleR3_2.position.x = 4.5;
    vehicles.push(vehicleR3_2);
    //scene.add(vehicleR3_2);
    // row 4
    vehicleR4_1 = vehicle.clone();
    vehicleR4_1.position.y = -2;
    vehicleR4_1.position.x = -24.5;
    vehicleR4_1.position.z = 1.7;
    vehicles.push(vehicleR4_1);
    vehicleR4_1.rotation.z = Math.PI;
    //scene.add(vehicleR4_1);
    vehicleR4_2 = twoVehicles.clone();
    vehicleR4_2.position.y = -2;
    vehicleR4_2.position.x = -8;
    vehicleR4_2.position.z = 1.7;
    vehicleR4_2.rotation.z = Math.PI;
    vehicles.push(vehicleR4_2);
    //scene.add(vehicleR4_2);
    vehicleR4_3 = threeVehicles.clone();
    vehicleR4_3.position.y = -2;
    vehicleR4_3.position.x = 15;
    vehicleR4_3.position.z = 1.7;
    vehicleR4_3.rotation.z = Math.PI;
    vehicles.push(vehicleR4_3);
    //scene.add(vehicleR4_3);
    for (var i = 0; i < vehicles.length; i++) {
        scene.add(vehicles[i]);
    }

    // logs
    log = new THREE.Mesh(new THREE.BoxGeometry(5, 1.5, 3.1), new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('logs.jpg')
    })/*new THREE.MeshBasicMaterial({ color: 0x7E5B3D, transparent: true, opacity: 0.2 })*/);
    log.name = "log"

    twologs = new THREE.Mesh(new THREE.BoxGeometry(9, 1.5, 3), new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('logs.jpg')
    })/*new THREE.MeshBasicMaterial({ color: 0x7E5B3D, transparent: true, opacity: 0.2 })*/);
    threelogs = new THREE.Mesh(new THREE.BoxGeometry(13, 1.5, 3), new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('logs.jpg')
    })/*new THREE.MeshBasicMaterial({ color: 0x7E5B3D, transparent: true, opacity: 0.2 })*/);
    // twoLogs.position.y = 2;
    // log.position.y = 4;
    //  threeLogs.position.y = 6;
    // scene.add(log);
    //  scene.add(twoLogs);
    // scene.add(threeLogs);

    logR1_1 = log.clone();
    logR1_1.name = "logR1_1";
    logR1_1.position.y = 8;
    logR1_1.position.x = 24.5;
    logs.push(logR1_1);

    //scene.add(logR1_1);
    logR1_2 = logR1_1.clone();
    logR1_2.position.x = 12.5;
    logR1_2.name = "logR1_2";
    // scene.add(logR1_2);
    logs.push(logR1_2);
    logR1_3 = logR1_1.clone();
    logR1_3.position.x = 0.5;
    logR1_3.name = "logR1_3";
    //scene.add(logR1_3);
    logs.push(logR1_3);
    logR1_4 = logR1_1.clone();
    logR1_4.position.x = -11.5;
    logR1_4.name = "logR1_4";
    //scene.add(logR1_4);
    logs.push(logR1_4);
    // row 2
    //twologs = makeGroup(log, 2, 4);
    logR2_1 = twologs.clone();
    logR2_1.position.y = 6;
    logR2_1.position.x = -24.5
    logR2_1.name = "logR2_1";
    //scene.add(logR2_1);
    logs.push(logR2_1);
    logR2_2 = logR2_1.clone();
    logR2_2.position.x = -6.75;
    logR2_2.name = "logR2_2";
    //scene.add(logR2_2);
    logs.push(logR2_2);
    logR2_3 = logR2_1.clone();
    logR2_3.position.x = 11.25;
    logR2_3.name = "logR2_3";
    //scene.add(logR2_3);
    logs.push(logR2_3);
    // row 3
    //threelogs = makeGroup(log, 3, 4);
    logR3_1 = threelogs.clone();
    logR3_1.position.y = 4;
    logR3_1.position.x = 33.5;
    logR3_1.name = "logR3_1";
    //scene.add(logR3_1);
    logs.push(logR3_1);
    logR3_2 = logR3_1.clone();
    logR3_2.position.x = 4.5;
    logR3_2.name = "logR3_2";
    //scene.add(logR3_2);
    logs.push(logR3_2);
    // row 4
    logR4_1 = log.clone();
    logR4_1.position.y = 2;
    logR4_1.position.x = -24.5;
    logR4_1.name = "logR4_1";
    //scene.add(logR4_1);
    logs.push(logR4_1);
    logR4_2 = twologs.clone();
    logR4_2.position.y = 2;
    logR4_2.position.x = -8;
    logR4_2.name = "logR4_2";
    //scene.add(logR4_2);
    logs.push(logR4_2);
    logR4_3 = threelogs.clone();
    logR4_3.position.y = 2;
    logR4_3.position.x = 15;
    logR4_3.name = "logR4_3";
    //scene.add(logR4_3);
    logs.push(logR4_3);
    for (var i = 0; i < logs.length; i++) {
        scene.add(logs[i]);
    }


}

function render() {
    // box.rotation.y += 0.01;
    vehicleR1_1.position.x = (vehicleR1_1.position.x < -24.5) ? vehicleR1_1.position.x = 24.5 : vehicleR1_1.position.x -= 0.1;
    vehicleR1_2.position.x = (vehicleR1_2.position.x < -24.5) ? vehicleR1_2.position.x = 24.5 : vehicleR1_2.position.x -= 0.1;
    vehicleR1_3.position.x = (vehicleR1_3.position.x < -24.5) ? vehicleR1_3.position.x = 24.5 : vehicleR1_3.position.x -= 0.1;
    vehicleR1_4.position.x = (vehicleR1_4.position.x < -24.5) ? vehicleR1_4.position.x = 24.5 : vehicleR1_4.position.x -= 0.1;
    vehicleR2_1.position.x = (vehicleR2_1.position.x > 29) ? vehicleR2_1.position.x = -24.5 : vehicleR2_1.position.x += 0.05;
    vehicleR2_2.position.x = (vehicleR2_2.position.x > 29) ? vehicleR2_2.position.x = -24.5 : vehicleR2_2.position.x += 0.05;
    vehicleR2_3.position.x = (vehicleR2_3.position.x > 29) ? vehicleR2_3.position.x = -24.5 : vehicleR2_3.position.x += 0.05;
    vehicleR3_1.position.x = (vehicleR3_1.position.x < -24.5) ? vehicleR3_1.position.x = 33.5 : vehicleR3_1.position.x -= 0.05;
    vehicleR3_2.position.x = (vehicleR3_2.position.x < -24.5) ? vehicleR3_2.position.x = 33.5 : vehicleR3_2.position.x -= 0.05;
    vehicleR4_1.position.x = (vehicleR4_1.position.x > 33.5) ? vehicleR4_1.position.x = -24.5 : vehicleR4_1.position.x += 0.05;
    vehicleR4_2.position.x = (vehicleR4_2.position.x > 33.5) ? vehicleR4_2.position.x = -24.5 : vehicleR4_2.position.x += 0.05;
    vehicleR4_3.position.x = (vehicleR4_3.position.x > 33.5) ? vehicleR4_3.position.x = -24.5 : vehicleR4_3.position.x += 0.05;

    logR1_1.position.x = (logR1_1.position.x < -24.5) ? logR1_1.position.x = 24.5 : logR1_1.position.x -= 0.05;
    logR1_2.position.x = (logR1_2.position.x < -24.5) ? logR1_2.position.x = 24.5 : logR1_2.position.x -= 0.05;
    logR1_3.position.x = (logR1_3.position.x < -24.5) ? logR1_3.position.x = 24.5 : logR1_3.position.x -= 0.05;
    logR1_4.position.x = (logR1_4.position.x < -24.5) ? logR1_4.position.x = 24.5 : logR1_4.position.x -= 0.05;
    logR2_1.position.x = (logR2_1.position.x > 29) ? logR2_1.position.x = -24.5 : logR2_1.position.x += 0.05;
    logR2_2.position.x = (logR2_2.position.x > 29) ? logR2_2.position.x = -24.5 : logR2_2.position.x += 0.05;
    logR2_3.position.x = (logR2_3.position.x > 29) ? logR2_3.position.x = -24.5 : logR2_3.position.x += 0.05;
    logR3_1.position.x = (logR3_1.position.x < -24.5) ? logR3_1.position.x = 33.5 : logR3_1.position.x -= 0.05;
    logR3_2.position.x = (logR3_2.position.x < -24.5) ? logR3_2.position.x = 33.5 : logR3_2.position.x -= 0.05;
    logR4_1.position.x = (logR4_1.position.x > 33.5) ? logR4_1.position.x = -24.5 : logR4_1.position.x += 0.05;
    logR4_2.position.x = (logR4_2.position.x > 33.5) ? logR4_2.position.x = -24.5 : logR4_2.position.x += 0.05;
    logR4_3.position.x = (logR4_3.position.x > 33.5) ? logR4_3.position.x = -24.5 : logR4_3.position.x += 0.05;
    if (!checkForVehicleCollision()) {
        lives -= 1;
        document.getElementById('lives').innerHTML = "# of lives left is " + lives;
        frog.position.x = frogDefault.position.x;
        frog.position.y = frogDefault.position.y;
        frog.position.z = frogDefault.position.z;
    }
    var result = checkForOnLog();
    if (result == -1) {
        lives -= 1;
        document.getElementById('lives').innerHTML = "# of lives left is " + lives;
        frog.position.x = frogDefault.position.x;
        frog.position.y = frogDefault.position.y;
        frog.position.z = frogDefault.position.z;
    }
    if (result == 2) {
        alert('YOU WIN! Refresh the page to play again.');
    }
    if (lives == 0) {
        document.getElementById('lives').innerHTML = "You lose!";
        alert('Game over! Refresh the page to restart.');
    }
    //console.log(vehicles);
    controls.update();

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

function checkForVehicleCollision() {
    var frogPosition = new THREE.Box3().setFromObject(frog);
    for (var i = 0; i < vehicles.length; i++) {
        var temp = new THREE.Box3().setFromObject(vehicles[i]);
        //console.log(i);
        if (temp.isIntersectionBox(frogPosition)) {
            document.getElementById('frog').innerHTML = "Frog is dead";
            return false;
        } else {
            document.getElementById('frog').innerHTML = "Frog is alive";
        }
    }
    return true;
}

function checkForOnLog() {
    var flag = 1;
    var frogPosition = new THREE.Box3().setFromObject(frog);
    var logCheck = logs.slice();
    tempFrog = frog.clone();
    var tempFrogParent = frog.parent.clone();
    for (var i = 0; i < logCheck.length; i++) {
        var temp = new THREE.Box3().setFromObject(logCheck[i]);
        //console.log(i);
        if (temp.isIntersectionBox(frogPosition)) {
            //var tempFrog1 = frog.clone();
            if (logIndex > -1) {
                logs[logIndex].remove(frog);
            }
            logIndex = i;
            //frog.position.x = logs[i].position.x-frog.position.x;
            logs[i].add(frog);
            frog.position.x = tempFrog.position.x+tempFrogParent.position.x - logCheck[i].position.x;
            frog.position.y = tempFrog.position.y + tempFrogParent.position.y - logCheck[i].position.y;
            document.getElementById('log').innerHTML = "Frog is on logs";
            return 1;
        } else {
            var yValue = tempFrog.position.y + tempFrogParent.position.y;
            if (yValue == 10) {
                if (logIndex > -1) {
                    logs[logIndex].remove(frog);
                    logIndex = -1;
                    frog.position.x = tempFrogParent.position.x + tempFrog.position.x;
                    frog.position.y = tempFrogParent.position.y + tempFrog.position.y;
                    frog.position.z = tempFrogParent.position.z + tempFrog.position.z;
                    scene.add(frog);
                }
                flag = 2;
                document.getElementById('lives').innerHTML = "You win!";
            }
            else if (yValue > 0) {
                flag = -1;
                if (logIndex > -1) {
                    logs[logIndex].remove(frog);
                    logIndex = -1;
                    frog.position.x = tempFrogParent.position.x + tempFrog.position.x;
                    frog.position.y = tempFrogParent.position.y + tempFrog.position.y;
                    frog.position.z = tempFrogParent.position.z + tempFrog.position.z;
                    scene.add(frog);
                }
                document.getElementById('log').innerHTML = "Frog is in the river";
            }
            else {
                if (logIndex > -1) {
                    logs[logIndex].remove(frog);
                    logIndex = -1;
                    frog.position.x = tempFrogParent.position.x + tempFrog.position.x;
                    frog.position.y = tempFrogParent.position.y + tempFrog.position.y;
                    frog.position.z = tempFrogParent.position.z + tempFrog.position.z;
                    scene.add(frog);
                }
                document.getElementById('log').innerHTML = "Frog is on bank";
                flag = 1;
            }
        }
    }
    return flag;
}


function checkKey(e) {

    var left = 37,
        up = 38,
        right = 39,
        down = 40,
        increment = 1;

    e = e || window.event;

    if (e.keyCode == up) {
        frog.position.y += 2;
       // frog.position.y += 2;
    } else if (e.keyCode == down) {
        frog.position.y -= 2;
    } else if (e.keyCode == left) {
        frog.position.x -= 1;
    } else if (e.keyCode == right) {
        frog.position.x += 1;
    }


}


function loadFroger() {
    renderer.setSize(width, height);
    document.getElementById("webgl-container").appendChild(renderer.domElement);
    scene.add(light);
    camera = new THREE.PerspectiveCamera(35, width / height, 1, 1000);

    camera.position.z = 60;
    scene.add(camera);
    var loader = new THREE.JSONLoader();
    var loader2 = new THREE.JSONLoader();
    loader.load("ambulance.json", function (geometry, mat) {
        var material = new THREE.MeshFaceMaterial(mat);
        ambulance = new THREE.Mesh(geometry, material);
        // ambulance = new THREE.Mesh(geometry, material);
        loader.load("car.json", function (geometry, mat) {
            var material = new THREE.MeshFaceMaterial(mat);
            vehicle = new THREE.Mesh(geometry, material);
           // vehicle.position.z = 1.7;
            // ambulance = new THREE.Mesh(geometry, material);
            loader.load("frog7.json", function (geometry, mat) {
                var material = new THREE.MeshFaceMaterial(mat);
                frog = new THREE.Mesh(geometry, material);
                frog.position.y = -10;
                frog.position.z = 1.6;
                frog.name = "frog"
                frogDefault = frog.clone();
                scene.add(frog);

                initScene();
                controls = new THREE.OrbitControls(camera, renderer.domElement);
                //controls.addEventListener('change', render);

                render();
            });
        });
    });

    
}
function main() {
    loadFroger();
    window.onkeydown = checkKey;
  


}
