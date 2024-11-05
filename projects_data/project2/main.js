/* GLOBAL CONSTANTS AND VARIABLES */

/* assignment specific globals */
const WIN_Z = 0;  // default graphics window z coord in world space
const WIN_LEFT = 0; const WIN_RIGHT = 1;  // default left and right x coords in world space
const WIN_BOTTOM = 0; const WIN_TOP = 1;  // default top and bottom y coords in world space
const INPUT_TRIANGLES_URL = "https://ncsucgclass.github.io/prog2/triangles.json"; // triangles file loc 
const INPUT_SPHERES_URL = "https://ncsucgclass.github.io/prog2/spheres.json"; // spheres file loc
var Eye = new vec4.fromValues(0.5, 0.5, -0.5, 1.0); // default eye position in world space
var LightColor = new vec3.fromValues(1.0, 1.0, 1.0);
var LightLocation = new vec3.fromValues(0.5, 0.5, -0.5);
//var LightLocation = new vec3.fromValues(2, 4, 0.5);
var LatitudeBands = 30;
var LongitudeBands = 30;

var gl = null; // the all powerful gl object. It's all here folks!
var shaderProgram;

// var mvMatrix = mat4.create();
// added
var mvMatrixListTri = [];
var indivKeyTri = [];
var mvMatrixListSphere = [];
var indivKeySphere = [];
// added ends
var pMatrix = mat4.create();
var highlightListTri = [];
var highlightListSphere = [];


// ASSIGNMENT HELPER FUNCTIONS

// get the JSON file from the passed URL
function getJSONFile(url, descr) {
    try {
        if ((typeof (url) !== "string") || (typeof (descr) !== "string"))
            throw "getJSONFile: parameter not a string";
        else {
            var httpReq = new XMLHttpRequest(); // a new http request
            httpReq.open("GET", url, false); // init the request
            httpReq.send(null); // send the request
            var startTime = Date.now();
            while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
                if ((Date.now() - startTime) > 3000)
                    break;
            } // until its loaded or we time out after three seconds
            if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE))
                throw "Unable to open " + descr + " file!";
            else
                return JSON.parse(httpReq.response);
        } // end if good params
    } // end try    

    catch (e) {
        console.log(e);
        return (String.null);
    }
} // end get input spheres

// set up the webGL environment
function setupWebGL() {

    // Get the canvas and context
    var canvas = document.getElementById("myWebGLCanvas"); // create a js canvas
    gl = canvas.getContext("webgl"); // get a webgl object from it

    // added
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
    // added

    try {
        if (gl == null) {
            throw "unable to create gl context -- is your browser gl ready?";
        } else {
            gl.clearColor(0.0, 0.0, 0.0, 1.0); // use black when we clear the frame buffer
            gl.clearDepth(1.0); // use max when we clear the depth buffer
            gl.enable(gl.DEPTH_TEST); // use hidden surface removal (with zbuffering)

        }
    } // end try

    catch (e) {
        console.log(e);
    } // end catch

} // end setupWebGL



var xRot = 0;
//var xSpeed = 0;

var yRot = 0;
//var ySpeed = 0;

var zRot = 0;
//var xSpeed = 0;

var keyZ = Eye[2];
var keyX = -Eye[0];
var keyY = -Eye[1];

//var filter = 0;
var currentTri = -1;
var currentSphere = -1;

var currentlyPressedKeys = {};
var lastTime = 0;
// added
function handleKeyDown(event) {
    currentlyPressedKeys[event.keyCode] = true;
}

function handleKeyUp(event) {
    currentlyPressedKeys[event.keyCode] = false;
}
// This webpage saved my life 
// http://stackoverflow.com/questions/750486/javascript-closure-inside-loops-simple-practical-example 

function returnMatrixTri(i) {
    var temp = mat4.create();
    mat4.identity(temp);
    var outputTrans = mat4.create();
    outputTrans = mat4.translate(temp, temp, [(keyX + indivKeyTri[i].keyX), (keyY + indivKeyTri[i].keyY), (keyZ + indivKeyTri[i].keyZ)]);

    mat4.rotate(outputTrans, outputTrans, degToRad(xRot + indivKeyTri[i].yRot), [0, 1, 0]);
    mat4.rotate(outputTrans, outputTrans, degToRad(yRot + indivKeyTri[i].zRot), [0, 0, 1]);
   
    var output = mat4.create();
    output = mat4.rotate(outputTrans, outputTrans, degToRad(zRot + indivKeyTri[i].xRot), [1, 0, 0]);
    return output;
}

function returnMatrixSphere(i) {
    var temp = mat4.create();
    mat4.identity(temp);
    var outputTrans = mat4.create();
    outputTrans = mat4.translate(temp, temp, [(keyX + indivKeySphere[i].keyX), (keyY + indivKeySphere[i].keyY), (keyZ + indivKeySphere[i].keyZ)]);
    mat4.rotate(outputTrans, outputTrans, degToRad(xRot + indivKeySphere[i].yRot), [0, 1, 0]);
    mat4.rotate(outputTrans, outputTrans, degToRad(yRot + indivKeySphere[i].zRot), [0, 0, 1]);
    output = mat4.rotate(outputTrans, outputTrans, degToRad(zRot + indivKeySphere[i].xRot), [1, 0, 0]);
    return output;
}


function allMove() {

    for (var triIndex = 0; triIndex < mvMatrixListTri.length; triIndex++) {
      //  console.log("changed" + triIndex);
       // mat4.identity(mvMatrixListTri[triIndex]);
       // console.log(mvMatrixListTri[0]);
       // console.log(indivKeyTri[0]);
        //mat4.translate(mvMatrixListTri[triIndex], mvMatrixListTri[triIndex], [(keyX + indivKeyTri[triIndex].keyX), (keyY + indivKeyTri[triIndex].keyY), (keyZ + indivKeyTri[triIndex].keyZ)]);
        mvMatrixListTri[triIndex] = returnMatrixTri(triIndex);
        //console.log(mvMatrixListTri[1]);
        //console.log(mvMatrixListTri[3]);
       // console.log(mvMatrixListTri[0]);
        //mat4.translate(mvMatrixListTri[triIndex], mvMatrixListTri[triIndex], [keyX, keyY, keyZ]);
        //console.log()

    }
    for (var sphereIndex = 0; sphereIndex < mvMatrixListSphere.length; sphereIndex++) {
       // console.log("changed" + sphereIndex);
       // mat4.identity(mvMatrixListSphere[sphereIndex]);
        mvMatrixListSphere[sphereIndex] = returnMatrixSphere(sphereIndex);
        //mat4.translate(mvMatrixListSphere[sphereIndex], mvMatrixListSphere[sphereIndex], [keyX + indivKeySphere[sphereIndex].keyX, keyY + indivKeySphere[sphereIndex].keyY, keyZ + indivKeySphere[sphereIndex].keyZ]);
        //mat4.rotate(mvMatrixListSphere[sphereIndex], mvMatrixListSphere[sphereIndex], degToRad(xRot), [0, 1, 0]);
       // mat4.rotate(mvMatrixListSphere[sphereIndex], mvMatrixListSphere[sphereIndex], degToRad(yRot), [0, 0, 1]);
       // mat4.rotate(mvMatrixListSphere[sphereIndex], mvMatrixListSphere[sphereIndex], degToRad(zRot), [1, 0, 0]);
    }

}



function handleKeys() {
    if (!currentlyPressedKeys[16]) {
        if (currentlyPressedKeys[65]) {
            // a
            keyX += 0.005;
            allMove();
        }
        if (currentlyPressedKeys[68]) {
            // d
            keyX -= 0.005;
            allMove();
        }
        if (currentlyPressedKeys[81]) {
            // q
            keyY -= 0.005;
            allMove();
        }
        if (currentlyPressedKeys[69]) {
            // e
            keyY += 0.005;
            allMove();
        }
        if (currentlyPressedKeys[87]) {
            // w
            keyZ += 0.005;
            allMove();
        }
        if (currentlyPressedKeys[83]) {
            // s
            keyZ -= 0.005;
            allMove();
        }
        //k
        if (currentlyPressedKeys[75]) {
            for (var indexTri = 0; indexTri < highlightListTri.length; indexTri++) {
                if (highlightListTri[indexTri] == "true") {
                    //var temp = indivKeyTri[index][0] + 0.5;
                    indivKeyTri[indexTri].keyX -= 0.005;
                }
            }
            for (var indexSphere = 0; indexSphere < highlightListSphere.length; indexSphere++) {
                if (highlightListSphere[indexSphere] == "true") {
                    //var temp = indivKeyTri[index][0] + 0.5;
                    indivKeySphere[indexSphere].keyX -= 0.005;
                }
            }
            allMove();
        }
        // ;
        if (currentlyPressedKeys[186]) {
            for (var indexTri = 0; indexTri < highlightListTri.length; indexTri++) {
                if (highlightListTri[indexTri] == "true") {
                    //var temp = indivKeyTri[index][0] + 0.5;
                    indivKeyTri[indexTri].keyX += 0.005;
                }
            }
            for (var indexSphere = 0; indexSphere < highlightListSphere.length; indexSphere++) {
                if (highlightListSphere[indexSphere] == "true") {
                    //var temp = indivKeyTri[index][0] + 0.5;
                    indivKeySphere[indexSphere].keyX += 0.005;
                }
            }
            allMove();
        }

        // o
        if (currentlyPressedKeys[79]) {
            for (var indexTri = 0; indexTri < highlightListTri.length; indexTri++) {
                if (highlightListTri[indexTri] == "true") {
                    //var temp = indivKeyTri[index][0] + 0.5;
                    indivKeyTri[indexTri].keyY -= 0.005;
                }
            }
            for (var indexSphere = 0; indexSphere < highlightListSphere.length; indexSphere++) {
                if (highlightListSphere[indexSphere] == "true") {
                    //var temp = indivKeyTri[index][0] + 0.5;
                    indivKeySphere[indexSphere].keyY -= 0.005;
                }
            }
            allMove();
        }
        // l
        if (currentlyPressedKeys[76]) {
            for (var indexTri = 0; indexTri < highlightListTri.length; indexTri++) {
                if (highlightListTri[indexTri] == "true") {
                    //var temp = indivKeyTri[index][0] + 0.5;
                    indivKeyTri[indexTri].keyY += 0.005;
                }
            }
            for (var indexSphere = 0; indexSphere < highlightListSphere.length; indexSphere++) {
                if (highlightListSphere[indexSphere] == "true") {
                    //var temp = indivKeyTri[index][0] + 0.5;
                    indivKeySphere[indexSphere].keyY += 0.005;
                }
            }
            allMove();
        }

        // i
        if (currentlyPressedKeys[73]) {
            for (var indexTri = 0; indexTri < highlightListTri.length; indexTri++) {
                if (highlightListTri[indexTri] == "true") {
                    //var temp = indivKeyTri[index][0] + 0.5;
                    indivKeyTri[indexTri].keyZ -= 0.005;
                }
            }
            for (var indexSphere = 0; indexSphere < highlightListSphere.length; indexSphere++) {
                if (highlightListSphere[indexSphere] == "true") {
                    //var temp = indivKeyTri[index][0] + 0.5;
                    indivKeySphere[indexSphere].keyZ -= 0.005;
                }
            }
            allMove();
        }
        // p
        if (currentlyPressedKeys[80]) {
            for (var indexTri = 0; indexTri < highlightListTri.length; indexTri++) {
                if (highlightListTri[indexTri] == "true") {
                    //var temp = indivKeyTri[index][0] + 0.5;
                    indivKeyTri[indexTri].keyZ += 0.005;
                }
            }
            for (var indexSphere = 0; indexSphere < highlightListSphere.length; indexSphere++) {
                if (highlightListSphere[indexSphere] == "true") {
                    //var temp = indivKeyTri[index][0] + 0.5;
                    indivKeySphere[indexSphere].keyZ += 0.005;
                }
            }
            allMove();
        }

        if (currentlyPressedKeys[80]) {
            for (var indexTri = 0; indexTri < highlightListTri.length; indexTri++) {
                if (highlightListTri[indexTri] == "true") {
                    //var temp = indivKeyTri[index][0] + 0.5;
                    indivKeyTri[indexTri].keyZ += 0.005;
                }
            }
            for (var indexSphere = 0; indexSphere < highlightListSphere.length; indexSphere++) {
                if (highlightListSphere[indexSphere] == "true") {
                    //var temp = indivKeyTri[index][0] + 0.5;
                    indivKeySphere[indexSphere].keyZ += 0.005;
                }
            }
            allMove();
        }
    }
    else {
        if (currentlyPressedKeys[65]) {
            // a
            xRot += 1;
            allMove();
        }
        if (currentlyPressedKeys[68]) {
            // d
            xRot -= 1;
            allMove();
        }
        if (currentlyPressedKeys[81]) {
            // q
            yRot -= 1;
            allMove();
        }
        if (currentlyPressedKeys[69]) {
            // e
            yRot += 1;
            allMove();
        }
        if (currentlyPressedKeys[87]) {
            // w
            zRot += 1;
            allMove();
        }
        if (currentlyPressedKeys[83]) {
            // s
            zRot -= 1;
            allMove();
        }

        // individual rotation
        // K
        if (currentlyPressedKeys[75]) {
            for (var indexTri = 0; indexTri < highlightListTri.length; indexTri++) {
                if (highlightListTri[indexTri] == "true") {
                    //var temp = indivKeyTri[index][0] + 0.5;
                    indivKeyTri[indexTri].yRot += 1;
                }
            }
            for (var indexSphere = 0; indexSphere < highlightListSphere.length; indexSphere++) {
                if (highlightListSphere[indexSphere] == "true") {
                    //var temp = indivKeyTri[index][0] + 0.5;
                    indivKeySphere[indexSphere].yRot += 1;
                }
            }
            allMove();
        }
        // :
        if (currentlyPressedKeys[186]) {
            for (var indexTri = 0; indexTri < highlightListTri.length; indexTri++) {
                if (highlightListTri[indexTri] == "true") {
                    //var temp = indivKeyTri[index][0] + 0.5;
                    indivKeyTri[indexTri].yRot += -1;
                }
            }
            for (var indexSphere = 0; indexSphere < highlightListSphere.length; indexSphere++) {
                if (highlightListSphere[indexSphere] == "true") {
                    //var temp = indivKeyTri[index][0] + 0.5;
                    indivKeySphere[indexSphere].yRot += -1;
                }
            }
            allMove();
        }
        // O
        if (currentlyPressedKeys[79]) {
            for (var indexTri = 0; indexTri < highlightListTri.length; indexTri++) {
                if (highlightListTri[indexTri] == "true") {
                    //var temp = indivKeyTri[index][0] + 0.5;
                    indivKeyTri[indexTri].xRot += 1;
                }
            }
            for (var indexSphere = 0; indexSphere < highlightListSphere.length; indexSphere++) {
                if (highlightListSphere[indexSphere] == "true") {
                    //var temp = indivKeyTri[index][0] + 0.5;
                    indivKeySphere[indexSphere].xRot += 1;
                }
            }
            allMove();
        }
        // L
        if (currentlyPressedKeys[76]) {
            for (var indexTri = 0; indexTri < highlightListTri.length; indexTri++) {
                if (highlightListTri[indexTri] == "true") {
                    //var temp = indivKeyTri[index][0] + 0.5;
                    indivKeyTri[indexTri].xRot += -1;
                }
            }
            for (var indexSphere = 0; indexSphere < highlightListSphere.length; indexSphere++) {
                if (highlightListSphere[indexSphere] == "true") {
                    //var temp = indivKeyTri[index][0] + 0.5;
                    indivKeySphere[indexSphere].xRot += -1;
                }
            }
            allMove();
        }
        // I
        if (currentlyPressedKeys[73]) {
            for (var indexTri = 0; indexTri < highlightListTri.length; indexTri++) {
                if (highlightListTri[indexTri] == "true") {
                    //var temp = indivKeyTri[index][0] + 0.5;
                    indivKeyTri[indexTri].zRot += 1;
                }
            }
            for (var indexSphere = 0; indexSphere < highlightListSphere.length; indexSphere++) {
                if (highlightListSphere[indexSphere] == "true") {
                    //var temp = indivKeyTri[index][0] + 0.5;
                    indivKeySphere[indexSphere].zRot += 1;
                }
            }
            allMove();
        }
        // P
        if (currentlyPressedKeys[80]) {
            for (var indexTri = 0; indexTri < highlightListTri.length; indexTri++) {
                if (highlightListTri[indexTri] == "true") {
                    //var temp = indivKeyTri[index][0] + 0.5;
                    indivKeyTri[indexTri].zRot += -1;
                }
            }
            for (var indexSphere = 0; indexSphere < highlightListSphere.length; indexSphere++) {
                if (highlightListSphere[indexSphere] == "true") {
                    //var temp = indivKeyTri[index][0] + 0.5;
                    indivKeySphere[indexSphere].zRot += -1;
                }
            }
            allMove();
        }


    }
    if (currentlyPressedKeys[27]) {
        // e
        xRot = 0;
        //var xSpeed = 0;

        yRot = 0;
        //var ySpeed = 0;

        zRot = 0;
        //var xSpeed = 0;

        keyZ = Eye[2];
        keyX = -Eye[0];
        keyY = -Eye[1];
        allMove();
    }
    // backspace undo
    if (currentlyPressedKeys[8]) {
        for (var indexTri = 0; indexTri < highlightListTri.length; indexTri++) {
        indivKeyTri[indexTri].keyX = 0;
        indivKeyTri[indexTri].keyY = 0;
        indivKeyTri[indexTri].keyZ = 0;

        indivKeyTri[indexTri].xRot = 0;
        indivKeyTri[indexTri].yRot = 0;
        indivKeyTri[indexTri].zRot = 0;
        }
        for (var indexSphere = 0; indexSphere < highlightListSphere.length; indexSphere++) {
        indivKeySphere[indexSphere].keyX = 0;
        indivKeySphere[indexSphere].keyY = 0;
        indivKeySphere[indexSphere].keyZ = 0;

        indivKeySphere[indexSphere].xRot = 0;
        indivKeySphere[indexSphere].yRot = 0;
        indivKeySphere[indexSphere].zRot = 0;
        }
        allMove();
    }

 

    var timeNow = new Date().getTime();

    if ((timeNow - lastTime)> 300) {
        // var elapsed = timeNow - lastTime;
        // TRIANGLE
            if (currentlyPressedKeys[37]) {
                if (currentTri > -1) {
                    highlightListTri[currentTri % highlightListTri.length] = "false";
                }
                currentTri += 1;
                highlightListTri[currentTri % highlightListTri.length] = "true";
                lastTime = timeNow;
            }
            if (currentlyPressedKeys[39]) {
                if (currentTri > -1) {
                    highlightListTri[currentTri % highlightListTri.length] = "false";
                }
                currentTri += (highlightListTri.length-1);
                highlightListTri[currentTri % highlightListTri.length] = "true";
                lastTime = timeNow;
            }
            console.log("highlightListTri" + highlightListTri);
        //SPHERE
            if (currentlyPressedKeys[38]) {
                if (currentSphere > -1) {
                    highlightListSphere[currentSphere % highlightListSphere.length] = "false";
                }
                currentSphere += 1;
                highlightListSphere[currentSphere % highlightListSphere.length] = "true";
                lastTime = timeNow;
            }
            if (currentlyPressedKeys[40]) {
                if (currentSphere > -1) {
                    highlightListSphere[currentSphere % highlightListSphere.length] = "false";
                }
                currentSphere += (highlightListSphere.length - 1);
                highlightListSphere[currentSphere % highlightListSphere.length] = "true";
                lastTime = timeNow;
            }

            if (currentlyPressedKeys[32]) {
                if (currentTri > -1) {
                    highlightListTri[currentTri % highlightListTri.length] = "false";
                }
                currentTri =-1;
                if (currentSphere > -1) {
                    highlightListSphere[currentSphere % highlightListSphere.length] = "false";
                }
                currentSphere = -1;
                lastTime = timeNow;
            }
        
    }
    // transfer highlighted tri and shpere


}


function tick() {
    requestAnimationFrame(tick);
    handleKeys();
    console.log(mvMatrixListTri[0]);
    // console.log(indivKeyTri[0]);
    //gl.enable(gl.DEPTH_TEST);
    drawScene();
    // animate();
    // console.log(indivKeyTri[0]);
   // console.log(mvMatrixListTri[0]);
}

function degToRad(degrees) {
    return degrees * Math.PI / 180;
}


/* webgl globals */
function drawShapes(url, shape) {
    var inputShapes = getJSONFile(url, shape);

    if (inputShapes != String.null) {
        var tempMatrix = mat4.create();
        mat4.identity(tempMatrix);
        mat4.translate(tempMatrix, tempMatrix, [-Eye[0], -Eye[1], Eye[2]]);
        for (var whichSet = 0; whichSet < inputShapes.length; whichSet++) {

            shapeInfo = new Object();

            var vertexBuffer;
            var indexBuffer;
            var normalBuffer;

            // var diffuse = vec3.create();
            // var specular = vec3.create();
            // var n;

            if (shape == "tri") {
                // added
                if (typeof mvMatrixListTri[whichSet] == 'undefined') {
                    mvMatrixListTri[whichSet] = tempMatrix;
                    // keyX, keyY, keyZ, xRot, yRot, zRot
                }
                if (typeof indivKeyTri[whichSet] == 'undefined') {
                    indivKeyTri[whichSet] = new Object();
                    indivKeyTri[whichSet].keyX = 0.0;
                    indivKeyTri[whichSet].keyY = 0.0;
                    indivKeyTri[whichSet].keyZ = 0.0;

                    indivKeyTri[whichSet].xRot = 0.0;
                    indivKeyTri[whichSet].yRot = 0.0;
                    indivKeyTri[whichSet].zRot = 0.0;

                }
                // added ends
                if (typeof highlightListTri[whichSet] == 'undefined') {
                    highlightListTri[whichSet] = "false";
                }
                loadTriangle(inputShapes[whichSet], shapeInfo, whichSet);
                renderShape(shapeInfo, shape, whichSet);
            } else if (shape == "sphere") {
                // added
                if (typeof mvMatrixListSphere[whichSet] == 'undefined') {
                    mvMatrixListSphere[whichSet] = tempMatrix;
                    // keyX, keyY, keyZ, xRot, yRot, zRot
                    indivKeySphere[whichSet] = new Object();
                    indivKeySphere[whichSet].keyX = 0.0;
                    indivKeySphere[whichSet].keyY = 0.0;
                    indivKeySphere[whichSet].keyZ = 0.0;

                    indivKeySphere[whichSet].xRot = 0.0;
                    indivKeySphere[whichSet].yRot = 0.0;
                    indivKeySphere[whichSet].zRot = 0.0;
                }
                if (typeof highlightListSphere[whichSet] == 'undefined') {
                    highlightListSphere[whichSet] = "false";
                }
                // added ends
                loadSphere(inputShapes[whichSet], shapeInfo, whichSet);
                renderShape(shapeInfo, shape, whichSet);
            } else {
                console.log("undefined shape");
                return;
            }
           // console.log("ambient" + shapeInfo.ambient);
          //  console.log("diffuse" + shapeInfo.diffuse);
           // console.log("specular" + shapeInfo.specular);
           // console.log("n" + shapeInfo.n);
          //  console.log(shapeInfo.vertexBuffer);
            //         renderShape(shapeInfo);
          //  console.log("done" + whichSet);
        }
    }
}

function highlight(shape, whichSetHi) {
    if (shape == "tri") {
       // console.log(highlightListTri[whichSet]);
        return highlightListTri[whichSetHi];
    }
    else if (shape == "sphere") {
        return highlightListSphere[whichSetHi];
    }
    else {
        console.log("undefined shape");
        return null;
    }
}

function loadSphere(inputShape, shapeInfo, whichSetload) {

    var coordArray = []; // 1D array of vertex coords for WebGL
    var indexArray = []; // 1D array of vertex indices for WebGL
    var normalArray = [];

    var radius = inputShape.r;
    var xOrigin = inputShape.x;
    var yOrigin = inputShape.y;
    var zOrigin = inputShape.z;

    if (highlight("sphere", whichSetload) != null && highlight("sphere", whichSetload) == "true") {
       // console.log("color change~");
        shapeInfo.ambient = vec3.fromValues(0.5,0.5,0);
        shapeInfo.diffuse = vec3.fromValues(0.5, 0.5,0);
        shapeInfo.specular = vec3.fromValues(0.0, 0.0, 0.0);
    }
    else {
        shapeInfo.ambient = vec3.fromValues(inputShape.ambient[0], inputShape.ambient[1], inputShape.ambient[2]);
        shapeInfo.diffuse = vec3.fromValues(inputShape.diffuse[0], inputShape.diffuse[1], inputShape.diffuse[2]);
        shapeInfo.specular = vec3.fromValues(inputShape.specular[0], inputShape.specular[1], inputShape.specular[2]);
    }
    shapeInfo.n = inputShape.n;

    for (var latNumber = 0; latNumber < LatitudeBands; latNumber++) {
        for (var longNumber = 0; longNumber < LongitudeBands; longNumber++) {
            var first = (latNumber * (LongitudeBands + 1)) + longNumber;
            var second = first + LongitudeBands + 1;
            indexArray.push(first);
            indexArray.push(second);
            indexArray.push(first + 1);
            // sphereBufferSize += 1;
            indexArray.push(second);
            indexArray.push(second + 1);
            indexArray.push(first + 1);
            // sphereBufferSize += 1;
        }
    }

    for (var latNumber = 0; latNumber <= LatitudeBands; latNumber++) {
        var theta = latNumber * Math.PI / LatitudeBands;
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta);

        for (var longNumber = 0; longNumber <= LongitudeBands; longNumber++) {
            var phi = longNumber * 2 * Math.PI / LongitudeBands;
            var sinPhi = Math.sin(phi);
            var cosPhi = Math.cos(phi);

            var x = cosPhi * sinTheta;
            var y = cosTheta;
            var z = sinPhi * sinTheta;

            normalArray.push(x);
            normalArray.push(y);
            normalArray.push(z);
            coordArray.push(radius * x + xOrigin);
            coordArray.push(radius * y + yOrigin);

            // negtive
            coordArray.push(radius * z - zOrigin);
        }
    }

    // sphereBufferSize *= 3; // now total number of indices

    // console.log("coordinates: "+coordArray.toString());
    // console.log("numverts: "+vtxBufferSize);
    // console.log("indices: "+indexArray.toString());
    // console.log("numindices: "+triBufferSize);

    // send the vertex coords to webGL
    shapeInfo.vertexBuffer = gl.createBuffer(); // init empty vertex coord buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, shapeInfo.vertexBuffer); // activate that buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coordArray), gl.STATIC_DRAW); // coords to that buffer
    shapeInfo.vertexBuffer.itemSize = 3;
    shapeInfo.vertexBuffer.numItems = coordArray.length / 3;
    // console.log("coordArray");
    // console.log(coordArray);
    // console.log("indexArray");
    // console.log(indexArray);
    /*
    vertexBufferSphereColor = gl.createBuffer(); // init empty vertex coord buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferSphereColor); // activate that buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorArray), gl.STATIC_DRAW); // coords to that buffer
    */

    // send the triangle indices to webGL
    shapeInfo.indexBuffer = gl.createBuffer(); // init empty triangle index buffer
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, shapeInfo.indexBuffer); // activate that buffer
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexArray), gl.STATIC_DRAW); // indices to that buffer
    shapeInfo.indexBuffer.itemSize = 3;
    shapeInfo.indexBuffer.numItems = indexArray.length / 3;

    shapeInfo.normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, shapeInfo.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalArray), gl.STATIC_DRAW);
    shapeInfo.normalBuffer.itemSize = 3;
    shapeInfo.normalBuffer.numItems = normalArray.length / 3;


   // console.log(coordArray);
   // console.log(indexArray);
  //  console.log(normalArray);
} // end load triangles

// read triangles in, load them into webgl buffers
function loadTriangle(inputShape, shapeInfo, whichSetTri) {


    //var whichSetVert; // index of vertex in current triangle set
    //var whichSetTri; // index of triangle in current triangle set

    var coordArray = []; // 1D array of vertex coords for WebGL
    var indexArray = []; // 1D array of vertex indices for WebGL
    var normalArray = [];
    if (highlight("tri", whichSetTri) != null && highlight("tri", whichSetTri) == "true") {
      //  console.log("Tri color change~");
        shapeInfo.ambient = vec3.fromValues(0.5, 0.5, 0);
        shapeInfo.diffuse = vec3.fromValues(0.5, 0.5, 0);
        shapeInfo.specular = vec3.fromValues(0.0, 0.0, 0.0);
    }
    else {
        shapeInfo.ambient = vec3.fromValues(inputShape.material.ambient[0], inputShape.material.ambient[1], inputShape.material.ambient[2]);
        shapeInfo.diffuse = vec3.fromValues(inputShape.material.diffuse[0], inputShape.material.diffuse[1], inputShape.material.diffuse[2]);
        shapeInfo.specular = vec3.fromValues(inputShape.material.specular[0], inputShape.material.specular[1], inputShape.material.specular[2]);
    }
    shapeInfo.n = inputShape.material.n;

    // set up the vertex coord array
    for (var whichSetVert = 0; whichSetVert < inputShape.vertices.length; whichSetVert++) {
        // vtxToAdd = inputShape.vertices[whichSetVert];

        // negtive
        coordArray.push(inputShape.vertices[whichSetVert][0], inputShape.vertices[whichSetVert][1], -inputShape.vertices[whichSetVert][2]);

        //normalArray.push(0, 0, -1);
        //negtive
        normalArray.push(0, 0, 1);

        // added for diffuse color
        // colorArray.push(inputTriangles[whichSet].material.diffuse[0], inputTriangles[whichSet].material.diffuse[1], inputTriangles[whichSet].material.diffuse[2], 1);
    } // end for vertices in set

    // set up the triangle index array, adjusting indices across sets
    for (var whichSetTriIndex = 0; whichSetTriIndex < inputShape.triangles.length; whichSetTriIndex++) {
        // vec3.add(triToAdd, indexOffset, inputShape.triangles[whichSetTri]);
        //   console.log(inputShape.triangles[whichSetTri][0]);
        var tri = vec3.fromValues(inputShape.triangles[whichSetTriIndex][0], inputShape.triangles[whichSetTriIndex][1], inputShape.triangles[whichSetTriIndex][2]);
        //   console.log("Tri"+tri);
        indexArray.push(tri[0], tri[1], tri[2]);
        // var normal = triNormal(vtxToAdd[tri[0]], vtxToAdd[tri[1]], vtxToAdd[tri[2]]);

    } // end for triangles in set

    // vtxBufferSize += inputTriangles[whichSet].vertices.length; // total number of vertices
    // triBufferSize += inputTriangles[whichSet].triangles.length; // total number of tris
    // end for each triangle set 
    // triBufferSize *= 3; // now total number of indices

    // console.log("coordinates: "+coordArray.toString());
    // console.log("numverts: "+vtxBufferSize);
    // console.log("indices: "+indexArray.toString());
    // console.log("numindices: "+triBufferSize);


    // send the vertex coords to webGL
  //  console.log(coordArray);
   // console.log(indexArray);
  //  console.log(normalArray);
    shapeInfo.vertexBuffer = gl.createBuffer(); // init empty vertex coord buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, shapeInfo.vertexBuffer); // activate that buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coordArray), gl.STATIC_DRAW); // coords to that buffer
    shapeInfo.vertexBuffer.itemSize = 3;
    shapeInfo.vertexBuffer.numItems = coordArray.length / 3;

    /*
        // added color buffer
        triangleVertexColorBuffer = gl.createBuffer(); // init empty vertex coord buffer
        // console.log(colorArray);
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexColorBuffer); // activate that buffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorArray), gl.STATIC_DRAW); // coords to that buffer
    */

    // send the triangle indices to webGL
    shapeInfo.indexBuffer = gl.createBuffer(); // init empty triangle index buffer
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, shapeInfo.indexBuffer); // activate that buffer
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexArray), gl.STATIC_DRAW); // indices to that buffer
    shapeInfo.indexBuffer.itemSize = 3;
    shapeInfo.indexBuffer.numItems = inputShape.triangles.length;

    shapeInfo.normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, shapeInfo.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalArray), gl.STATIC_DRAW);
    shapeInfo.normalBuffer.itemSize = 3;
    shapeInfo.normalBuffer.numItems = coordArray.length / 3;
    // end if triangles found
} // end load triangles

// setup the webGL shaders
function setupShaders() {

    // fragment shader
    var fShaderCode = `
    precision mediump float;

    varying vec3 vTransformedNormal;
    varying vec4 vPosition;

    uniform vec3 uAmbient;
    uniform vec3 uDiffuse;
    uniform vec3 uSpecular;
    uniform float uN;

    uniform vec3 uEyeLocation;
    uniform vec3 uPointLightingLocation;
    uniform vec3 uPointLightingColor;


  void main(void) {
    vec3 v = uEyeLocation -vPosition.xyz;
    vec3 l = uPointLightingLocation -vPosition.xyz;
    vec3 h = normalize(v+l);
    vec3 lightDirection = normalize(l);
    float diffuseLightWeighting = max(dot(normalize(vTransformedNormal), lightDirection), 0.0);
    float specularLightWeighting = pow(max(dot(normalize(vTransformedNormal), h), 0.0),uN);
    vec3 diffuseLightWeightingThree = vec3 (diffuseLightWeighting, diffuseLightWeighting, diffuseLightWeighting);
    vec3 specularLightWeightingThree = vec3(specularLightWeighting, specularLightWeighting, specularLightWeighting);

    // vec3 ambientLight = vec3(uPointLightingColor.x*uAmbient.x, uPointLightingColor.y*uAmbient.y, uPointLightingColor.z*uAmbient.z);
    vec3 ambientLight = uPointLightingColor*uAmbient;
    // vec3 difuseLight = vec3(uDiffuse.x*uPointLightingColor.x*diffuseLightWeighting, uDiffuse.y*uPointLightingColor.y*diffuseLightWeighting, uDiffuse.z*uPointLightingColor.z*diffuseLightWeighting);
     vec3 difuseLight = (uDiffuse*uPointLightingColor) *diffuseLightWeightingThree;
   // vec3 difuseLight = (uDiffuse*uPointLightingColor);
    //vec3 specularLight = vec3(uSpecular.x*uPointLightingColor.x*specularLightWeighting, uSpecular.y*uPointLightingColor.y*specularLightWeighting, uSpecular.z*uPointLightingColor.z*specularLightWeighting);
   vec3 specularLight = (uSpecular*uPointLightingColor) *specularLightWeightingThree;
    vec3 lightWeighting = ambientLight +difuseLight+specularLight;
   //vec3 lightWeighting = ambientLight+difuseLight;
    //vec3 lightWeighting = ambientLight;
     gl_FragColor = vec4(lightWeighting, 1.0);
   // gl_FragColor = vec4(uPointLightingColor, 1.0);
    //gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
    `;

    // define vertex shader in essl using es6 template strings
    var vShaderCode = `

    attribute vec3 aVertexPosition;
    attribute vec3 aVertexNormal;

    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;
    uniform mat3 uNMatrix;

    varying vec3 vTransformedNormal;
    varying vec4 vPosition;

  //  varying vec4 vColor;
        // added

        void main(void) {
         vPosition = uMVMatrix * vec4(aVertexPosition, 1.0);
         gl_Position = uPMatrix * vPosition;

       //gl_Position = vPosition;
        // gl_Position = vec4(aVertexPosition, 1.0);
          //vColor = vertexColor;

         vTransformedNormal = uNMatrix * aVertexNormal;

        }
    `;

    try {
        // console.log("fragment shader: "+fShaderCode);
        var fShader = gl.createShader(gl.FRAGMENT_SHADER); // create frag shader
        gl.shaderSource(fShader, fShaderCode); // attach code to shader
        gl.compileShader(fShader); // compile the code for gpu execution

        //  console.log("fragment shader:" + fShaderCode);

        var vShader = gl.createShader(gl.VERTEX_SHADER); // create vertex shader
        gl.shaderSource(vShader, vShaderCode); // attach code to shader
        gl.compileShader(vShader); // compile the code for gpu execution

        // console.log("vShader shader:" + vShaderCode);

        if (!gl.getShaderParameter(fShader, gl.COMPILE_STATUS)) { // bad frag shader compile
            throw "error during fragment shader compile: " + gl.getShaderInfoLog(fShader);
            gl.deleteShader(fShader);
        } else if (!gl.getShaderParameter(vShader, gl.COMPILE_STATUS)) { // bad vertex shader compile
            throw "error during vertex shader compile: " + gl.getShaderInfoLog(vShader);
            gl.deleteShader(vShader);
        } else { // no compile errors
            shaderProgram = gl.createProgram(); // create the single shader program
            gl.attachShader(shaderProgram, fShader); // put frag shader in program
            gl.attachShader(shaderProgram, vShader); // put vertex shader in program
            gl.linkProgram(shaderProgram); // link program into gl context

            if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) { // bad program link
                throw "error during shader program linking: " + gl.getProgramInfoLog(shaderProgram);
            } else { // no shader program link errors

                shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
                gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute); // input to shader from array

                shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
                gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

                shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
                shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
                shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");

                shaderProgram.ambientUniform = gl.getUniformLocation(shaderProgram, "uAmbient");
                shaderProgram.diffuseUniform = gl.getUniformLocation(shaderProgram, "uDiffuse");
                shaderProgram.specularUniform = gl.getUniformLocation(shaderProgram, "uSpecular");
                shaderProgram.nUniform = gl.getUniformLocation(shaderProgram, "uN");

                shaderProgram.eyeLocationUniform = gl.getUniformLocation(shaderProgram, "uEyeLocation");
                shaderProgram.pointLightingLocationUniform = gl.getUniformLocation(shaderProgram, "uPointLightingLocation");
                shaderProgram.pointLightingColorUniform = gl.getUniformLocation(shaderProgram, "uPointLightingColor");

            } // end if no shader program link errors
        } // end if no compile errors
    } // end try 

    catch (e) {
        console.log(e);
    } // end catch
} // end setup shaders

// added

//var pMatrixUniform;
//var mvMatrixUniform;


/*
function setMatrixUniforms() {
    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform,false, pMatrix);

    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform,false, mvMatrix);


    var normalMatrix = mat3.create();
    toInverseMat3(mvMatrix, normalMatrix);
   // console.log(normalMatrix);
    mat3.transpose(normalMatrix, normalMatrix);
    gl.uniformMatrix3fv(shaderProgram.nMatrixUniform,false, normalMatrix);

}
// added
*/
function setMatrixUniforms(shape, whichSetMAX) {
    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);

    if (shape == "tri") {
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrixListTri[whichSetMAX]);
        // console.log(mvMatrixListTri[whichSet]);

      //  console.log(mvMatrixListTri[3]);
        var normalMatrix = mat3.create();
        toInverseMat3(mvMatrixListTri[whichSetMAX], normalMatrix);
        // console.log(normalMatrix);
        mat3.transpose(normalMatrix, normalMatrix);
        gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);
    } else if (shape == "sphere") {
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrixListSphere[whichSetMAX]);
        var normalMatrix = mat3.create();
        toInverseMat3(mvMatrixListSphere[whichSetMAX], normalMatrix);
        // console.log(normalMatrix);
        mat3.transpose(normalMatrix, normalMatrix);
        gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);
    } else {
        console.log("undefined shape");
        return;
    }

}

function toInverseMat3(a, b) { var c = a[0], d = a[1], e = a[2], g = a[4], f = a[5], h = a[6], i = a[8], j = a[9], k = a[10], l = k * f - h * j, o = -k * g + h * i, m = j * g - f * i, n = c * l + d * o + e * m; if (!n) return null; n = 1 / n; b || (b = mat3.create()); b[0] = l * n; b[1] = (-k * d + e * j) * n; b[2] = (h * d - e * f) * n; b[3] = o * n; b[4] = (k * c - e * i) * n; b[5] = (-h * c + e * g) * n; b[6] = m * n; b[7] = (-j * c + d * i) * n; b[8] = (f * c - d * g) * n; return b };

// render the loaded model
function renderShape(shapeInfo, shape, whichSetRD) {
    gl.uniform3f(shaderProgram.ambientUniform, shapeInfo.ambient[0], shapeInfo.ambient[1], shapeInfo.ambient[2]);
    gl.uniform3f(shaderProgram.diffuseUniform, shapeInfo.diffuse[0], shapeInfo.diffuse[1], shapeInfo.diffuse[2]);
    gl.uniform3f(shaderProgram.specularUniform, shapeInfo.specular[0], shapeInfo.specular[1], shapeInfo.specular[2]);
    gl.uniform1f(shaderProgram.nUniform, shapeInfo.n);

    gl.uniform3f(shaderProgram.eyeLocationUniform, Eye[0], Eye[1], Eye[2]);
    gl.uniform3f(shaderProgram.pointLightingLocationUniform, LightLocation[0], LightLocation[1], LightLocation[2]);
    gl.uniform3f(shaderProgram.pointLightingColorUniform, LightColor[0], LightColor[1], LightColor[2]);
    // console.log(LightColor);
    // vertex buffer: activate and feed into vertex shader
    gl.bindBuffer(gl.ARRAY_BUFFER, shapeInfo.vertexBuffer); // activate
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0); // feed
    // console.log("vertexBuffer" + shapeInfo.vertexBuffer.numItems);
    // console.log(shapeInfo.vertexBuffer);

    // vertex buffer: activate and feed into vertex shader
    gl.bindBuffer(gl.ARRAY_BUFFER, shapeInfo.normalBuffer); // activate
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0); // feed
  //  console.log("normal" + shapeInfo.normalBuffer.numItems);
    // console.log(shapeInfo.normalBuffer);

    // triangle buffer: activate and render
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, shapeInfo.indexBuffer); // activate

    setMatrixUniforms(shape, whichSetRD);
    // console.log("numItems" + shapeInfo.indexBuffer.numItems);
    // console.log(shapeInfo.indexBuffer);
    gl.drawElements(gl.TRIANGLES, shapeInfo.indexBuffer.numItems * 3, gl.UNSIGNED_SHORT, 0); // render

} // end render triangles


/* MAIN -- HERE is where execution begins after window load */

function perspective(out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        //nf = Math.abs(1 / (near - far));
        nf = 1 / (near - far);

    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};

function drawScene() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // clear frame/depth buffers

    perspective(pMatrix, Math.PI * 0.5, gl.viewportWidth / gl.viewportHeight, 0.1, 100);
   // console.log("pMatrix" + pMatrix);
    /*
    mat4.identity(mvMatrix);
    //mat4.translate(mvMatrix, mvMatrix, [-Eye[0], -Eye[1], Eye[2]]);
    mat4.translate(mvMatrix, mvMatrix, [keyX, keyY, keyZ]);
    mat4.rotate(mvMatrix, mvMatrix, degToRad(xRot), [0, 1, 0]);
    mat4.rotate(mvMatrix, mvMatrix, degToRad(yRot), [0, 0, 1]);
    mat4.rotate(mvMatrix, mvMatrix, degToRad(zRot), [1, 0, 0]);
    
    console.log("identity" + mvMatrix);
    // console.log("mvMatrixUniform" + mvMatrix);
    */
    gl.useProgram(shaderProgram);

    drawShapes(INPUT_TRIANGLES_URL, "tri");
    drawShapes(INPUT_SPHERES_URL, "sphere");
}

function main() {

    setupWebGL(); // set up the webGL environment
   // console.log("setupWebGL() done");

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // clear frame/depth buffers

    setupShaders();
    //added
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
    tick();
  //  console.log("highlightListTri" + highlightListTri);
  //  console.log("highlightListSphere" + highlightListSphere);
  //  console.log("indivKeyTri" + indivKeyTri);
  //  console.log(indivKeySphere);
} // end main
