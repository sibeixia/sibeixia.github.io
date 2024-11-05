/* GLOBAL CONSTANTS AND VARIABLES */

/* assignment specific globals */
const INPUT_TRIANGLES_URL = "https://ncsucgclass.github.io/prog3/triangles.json"; // triangles file loc
const INPUT_SPHERES_URL = "https://ncsucgclass.github.io/prog3/spheres.json"; // spheres file loc
var defaultEye = vec3.fromValues(0.5, 0.5, -0.5); // default eye position in world space
var defaultCenter = vec3.fromValues(0.5, 0.5, 0.5); // default view direction in world space
var defaultUp = vec3.fromValues(0, 1, 0); // default view up vector
var lightAmbient = vec3.fromValues(1, 1, 1); // default light ambient emission
var lightDiffuse = vec3.fromValues(1, 1, 1); // default light diffuse emission
var lightSpecular = vec3.fromValues(1, 1, 1); // default light specular emission
var lightPosition = vec3.fromValues(2, 4, -0.5); // default light position
var rotateTheta = Math.PI / 50; // how much to rotate models by with each key press

/* webgl and geometry data */
var gl = null; // the all powerful gl object. It's all here folks!
var inputTriangles = []; // the triangle data as loaded from input files
/*
var inputTriangles = [
{
    "material": { "ambient": [0.1, 0.1, 0.1], "diffuse": [0.6, 0.6, 0.6], "specular": [0.3, 0.3, 0.3], "n": 11, "alpha": 0.9, "texture": "abe.png" },
    "vertices": [[0.15, 0.4, 0.75], [0.25, 0.6, 0.75], [0.35, 0.4, 0.75]],
    "normals": [[0, 0, -1], [0, 0, -1], [0, 0, -1]],
    "uvs": [[0, 0], [0.5, 1], [1, 0]],
    "triangles": [[0, 1, 2]]
},
{
    "material": { "ambient": [0.1, 0.1, 0.1], "diffuse": [0.6, 0.6, 0.6], "specular": [0.3, 0.3, 0.3], "n": 13, "alpha": 0.7, "texture": "billie.jpg" },
    "vertices": [[0.4, 0.65, 0.75], [0.4, 0.85, 0.75], [0.6, 0.85, 0.75], [0.6, 0.65, 0.75]],
    "normals": [[0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1]],
    "uvs": [[0, 0], [0, 1], [1, 1], [1, 0]],
    "triangles": [[0, 1, 2], [2, 3, 0]]
},
{
    "material": { "ambient": [0.1, 0.1, 0.1], "diffuse": [0.0, 0.6, 0.0], "specular": [0.3, 0.3, 0.3], "n": 15, "alpha": 0.5, "texture": false },
    "vertices": [[0.65, 0.4, 0.75], [0.75, 0.6, 0.75], [0.85, 0.4, 0.75]],
    "normals": [[0, 0, -1], [0, 0, -1], [0, 0, -1]],
    "uvs": [[0, 0], [0.5, 1], [1, 0]],
    "triangles": [[0, 1, 2]]
},
{
    "material": { "ambient": [0.1, 0.1, 0.1], "diffuse": [0.6, 0.6, 0.6], "specular": [0.3, 0.3, 0.3], "n": 17, "alpha": 0.3, "texture": "tree.png" },
    "vertices": [[0.4, 0.15, 0.75], [0.4, 0.35, 0.75], [0.6, 0.35, 0.75], [0.6, 0.15, 0.75]],
    "normals": [[0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1]],
    "uvs": [[0, 0], [0, 1], [1, 1], [1, 0]],
    "triangles": [[0, 1, 2], [2, 3, 0]]
}
];
*/

var numTriangleSets = 0; // how many triangle sets in input scene
var inputSpheres = []; // the sphere data as loaded from input files
/*
var inputSpheres = [
{ "x": 0.25, "y": 0.25, "z": 0.5, "r": 0.1, "ambient": [0.1, 0.1, 0.1], "diffuse": [0.6, 0.6, 0.6], "specular": [0.3, 0.3, 0.3], "n": 1, "alpha": 1, "texture": "earth.png" },
{ "x": 0.25, "y": 0.75, "z": 0.5, "r": 0.1, "ambient": [0.1, 0.1, 0.1], "diffuse": [0.6, 0.6, 0.6], "specular": [0.3, 0.3, 0.3], "n": 3, "alpha": 0.8, "texture": "sky.jpg" },
{ "x": 0.75, "y": 0.75, "z": 0.5, "r": 0.1, "ambient": [0.1, 0.1, 0.1], "diffuse": [0.6, 0.6, 0.6], "specular": [0.3, 0.3, 0.3], "n": 5, "alpha": 0.6, "texture": "glass.gif" },
{ "x": 0.75, "y": 0.25, "z": 0.5, "r": 0.1, "ambient": [0.1, 0.1, 0.1], "diffuse": [0.6, 0.0, 0.0], "specular": [0.3, 0.3, 0.3], "n": 7, "alpha": 0.4, "texture": false },
{ "x": 0.5, "y": 0.5, "z": 0.5, "r": 0.15, "ambient": [0.1, 0.1, 0.1], "diffuse": [0.6, 0.6, 0.6], "specular": [0.3, 0.3, 0.3], "n": 9, "alpha": 0.2, "texture": "rocktile.jpg" }
];
*/
var numSpheres = 0; // how many spheres in the input scene
var vertexBuffers = []; // this contains vertex coordinate lists by set, in triples
var normalBuffers = []; // this contains normal component lists by set, in triples
var triSetSizes = []; // this contains the size of each triangle set
var triangleBuffers = []; // lists of indices into vertexBuffers by set, in triples
var viewDelta = 0; // how much to displace view with each key press
// added for texture
var uvBufferes = [];
var imageList = [];
var flagList = [];
var imageTexture = [];

/* shader parameter locations */
var vPosAttribLoc; // where to put position for vertex shader
var ambientULoc; // where to put ambient reflecivity for fragment shader
var diffuseULoc; // where to put diffuse reflecivity for fragment shader
var specularULoc; // where to put specular reflecivity for fragment shader
var shininessULoc; // where to put specular exponent for fragment shader
var mMatrixULoc; // where to put model matrix for vertex shader
var pvmMatrixULoc; // where to put project model view matrix for vertex shader
// added for texture
var vNormAttribLoc;
var vtextureAttribLoc;
var imageULoc;
var samplerUniformLoc;
var vflagListLoc;
var uAlphaLoc;
var transparencyAbilityLoc;

/* interaction variables */
var Eye = vec3.clone(defaultEye); // eye position in world space
var Center = vec3.clone(defaultCenter); // view direction in world space
var Up = vec3.clone(defaultUp); // view up vector in world space

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

// does stuff when keys are pressed
function handleKeyDown(event) {

    const modelEnum = { TRIANGLES: "triangles", SPHERE: "sphere" }; // enumerated model type
    const dirEnum = { NEGATIVE: -1, POSITIVE: 1 }; // enumerated rotation direction

    function highlightModel(modelType, whichModel) {
        if (handleKeyDown.modelOn != null)
            handleKeyDown.modelOn.on = false;
        handleKeyDown.whichOn = whichModel;
        if (modelType == modelEnum.TRIANGLES)
            handleKeyDown.modelOn = inputTriangles[whichModel];
        else
            handleKeyDown.modelOn = inputSpheres[whichModel];
        handleKeyDown.modelOn.on = true;
    } // end highlight model

    function translateModel(offset) {
        if (handleKeyDown.modelOn != null)
            vec3.add(handleKeyDown.modelOn.translation, handleKeyDown.modelOn.translation, offset);
    } // end translate model

    function rotateModel(axis, direction) {
        if (handleKeyDown.modelOn != null) {
            var newRotation = mat4.create();

            mat4.fromRotation(newRotation, direction * rotateTheta, axis); // get a rotation matrix around passed axis
            vec3.transformMat4(handleKeyDown.modelOn.xAxis, handleKeyDown.modelOn.xAxis, newRotation); // rotate model x axis tip
            vec3.transformMat4(handleKeyDown.modelOn.yAxis, handleKeyDown.modelOn.yAxis, newRotation); // rotate model y axis tip
        } // end if there is a highlighted model
    } // end rotate model

    // set up needed view params
    var lookAt = vec3.create(), viewRight = vec3.create(), temp = vec3.create(); // lookat, right & temp vectors
    lookAt = vec3.normalize(lookAt, vec3.subtract(temp, Center, Eye)); // get lookat vector
    viewRight = vec3.normalize(viewRight, vec3.cross(temp, lookAt, Up)); // get view right vector

    // highlight static variables
    handleKeyDown.whichOn = handleKeyDown.whichOn == undefined ? -1 : handleKeyDown.whichOn; // nothing selected initially
    handleKeyDown.modelOn = handleKeyDown.modelOn == undefined ? null : handleKeyDown.modelOn; // nothing selected initially

    switch (event.code) {

        // model selection
        case "Space":
            if (handleKeyDown.modelOn != null)
                handleKeyDown.modelOn.on = false; // turn off highlighted model
            handleKeyDown.modelOn = null; // no highlighted model
            handleKeyDown.whichOn = -1; // nothing highlighted
            break;
        case "ArrowRight": // select next triangle set
            highlightModel(modelEnum.TRIANGLES, (handleKeyDown.whichOn + 1) % numTriangleSets);
            break;
        case "ArrowLeft": // select previous triangle set
            highlightModel(modelEnum.TRIANGLES, (handleKeyDown.whichOn > 0) ? handleKeyDown.whichOn - 1 : numTriangleSets - 1);
            break;
        case "ArrowUp": // select next sphere
            highlightModel(modelEnum.SPHERE, (handleKeyDown.whichOn + 1) % numSpheres);
            break;
        case "ArrowDown": // select previous sphere
            highlightModel(modelEnum.SPHERE, (handleKeyDown.whichOn > 0) ? handleKeyDown.whichOn - 1 : numSpheres - 1);
            break;

            // view change
        case "KeyA": // translate view left, rotate left with shift
            Center = vec3.add(Center, Center, vec3.scale(temp, viewRight, viewDelta));
            if (!event.getModifierState("Shift"))
                Eye = vec3.add(Eye, Eye, vec3.scale(temp, viewRight, viewDelta));
            break;
        case "KeyD": // translate view right, rotate right with shift
            Center = vec3.add(Center, Center, vec3.scale(temp, viewRight, -viewDelta));
            if (!event.getModifierState("Shift"))
                Eye = vec3.add(Eye, Eye, vec3.scale(temp, viewRight, -viewDelta));
            break;
        case "KeyS": // translate view backward, rotate up with shift
            if (event.getModifierState("Shift")) {
                Center = vec3.add(Center, Center, vec3.scale(temp, Up, viewDelta));
                Up = vec.cross(Up, viewRight, vec3.subtract(lookAt, Center, Eye)); /* global side effect */
            } else {
                Eye = vec3.add(Eye, Eye, vec3.scale(temp, lookAt, -viewDelta));
                Center = vec3.add(Center, Center, vec3.scale(temp, lookAt, -viewDelta));
            } // end if shift not pressed
            break;
        case "KeyW": // translate view forward, rotate down with shift
            if (event.getModifierState("Shift")) {
                Center = vec3.add(Center, Center, vec3.scale(temp, Up, -viewDelta));
                Up = vec.cross(Up, viewRight, vec3.subtract(lookAt, Center, Eye)); /* global side effect */
            } else {
                Eye = vec3.add(Eye, Eye, vec3.scale(temp, lookAt, viewDelta));
                Center = vec3.add(Center, Center, vec3.scale(temp, lookAt, viewDelta));
            } // end if shift not pressed
            break;
        case "KeyQ": // translate view up, rotate counterclockwise with shift
            if (event.getModifierState("Shift"))
                Up = vec3.normalize(Up, vec3.add(Up, Up, vec3.scale(temp, viewRight, -viewDelta)));
            else {
                Eye = vec3.add(Eye, Eye, vec3.scale(temp, Up, viewDelta));
                Center = vec3.add(Center, Center, vec3.scale(temp, Up, viewDelta));
            } // end if shift not pressed
            break;
        case "KeyE": // translate view down, rotate clockwise with shift
            if (event.getModifierState("Shift"))
                Up = vec3.normalize(Up, vec3.add(Up, Up, vec3.scale(temp, viewRight, viewDelta)));
            else {
                Eye = vec3.add(Eye, Eye, vec3.scale(temp, Up, -viewDelta));
                Center = vec3.add(Center, Center, vec3.scale(temp, Up, -viewDelta));
            } // end if shift not pressed
            break;
        case "Escape": // reset view to default
            Eye = vec3.copy(Eye, defaultEye);
            Center = vec3.copy(Center, defaultCenter);
            Up = vec3.copy(Up, defaultUp);
            break;

            // model transformation
        case "KeyK": // translate left, rotate left with shift
            if (event.getModifierState("Shift"))
                rotateModel(Up, dirEnum.NEGATIVE);
            else
                translateModel(vec3.scale(temp, viewRight, viewDelta));
            break;
        case "Semicolon": // translate right, rotate right with shift
            if (event.getModifierState("Shift"))
                rotateModel(Up, dirEnum.POSITIVE);
            else
                translateModel(vec3.scale(temp, viewRight, -viewDelta));
            break;
        case "KeyL": // translate backward, rotate up with shift
            if (event.getModifierState("Shift"))
                rotateModel(viewRight, dirEnum.POSITIVE);
            else
                translateModel(vec3.scale(temp, lookAt, -viewDelta));
            break;
        case "KeyO": // translate forward, rotate down with shift
            if (event.getModifierState("Shift"))
                rotateModel(viewRight, dirEnum.NEGATIVE);
            else
                translateModel(vec3.scale(temp, lookAt, viewDelta));
            break;
        case "KeyI": // translate up, rotate counterclockwise with shift 
            if (event.getModifierState("Shift"))
                rotateModel(lookAt, dirEnum.POSITIVE);
            else
                translateModel(vec3.scale(temp, Up, viewDelta));
            break;
        case "KeyP": // translate down, rotate clockwise with shift
            if (event.getModifierState("Shift"))
                rotateModel(lookAt, dirEnum.NEGATIVE);
            else
                translateModel(vec3.scale(temp, Up, -viewDelta));
            break;
        case "Backspace": // reset model transforms to default
            for (var whichTriSet = 0; whichTriSet < numTriangleSets; whichTriSet++) {
                vec3.set(inputTriangles[whichTriSet].translation, 0, 0, 0);
                vec3.set(inputTriangles[whichTriSet].xAxis, 1, 0, 0);
                vec3.set(inputTriangles[whichTriSet].yAxis, 0, 1, 0);
            } // end for all triangle sets
            for (var whichSphere = 0; whichSphere < numSpheres; whichSphere++) {
                vec3.set(inputSpheres[whichSphere].translation, 0, 0, 0);
                vec3.set(inputSpheres[whichTriSet].xAxis, 1, 0, 0);
                vec3.set(inputSpheres[whichTriSet].yAxis, 0, 1, 0);
            } // end for all spheres
            break;
    } // end switch
} // end handleKeyDown

// set up the webGL environment
function setupWebGL() {

    // Set up keys
    document.onkeydown = handleKeyDown; // call this when key pressed

    // Get the image canvas, render an image in it
    var imageCanvas = document.getElementById("myImageCanvas"); // create a 2d canvas
    var cw = imageCanvas.width, ch = imageCanvas.height;
    imageContext = imageCanvas.getContext("2d");
    var bkgdImage = new Image();
    bkgdImage.src = "https://ncsucgclass.github.io/prog3/stars.jpg";
    bkgdImage.onload = function () {
        var iw = bkgdImage.width, ih = bkgdImage.height;
        imageContext.drawImage(bkgdImage, 0, 0, iw, ih, 0, 0, cw, ch);
    } // end onload callback

    // create a webgl canvas and set it up
    var webGLCanvas = document.getElementById("myWebGLCanvas"); // create a webgl canvas
    gl = webGLCanvas.getContext("webgl"); // get a webgl object from it
    try {
        if (gl == null) {
            throw "unable to create gl context -- is your browser gl ready?";
        } else {
            gl.clearColor(0.0, 0.0, 0.0, 1.0); // use black when we clear the frame buffer
            gl.clearDepth(1.0); // use max when we clear the depth buffer
           // gl.enable(gl.DEPTH_TEST); // use hidden surface removal (with zbuffering)
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
            gl.enable(gl.BLEND);
            gl.disable(gl.DEPTH_TEST);
        }
    } // end try

    catch (e) {
        console.log(e);
    } // end catch

} // end setupWebGL

// read models in, load them into webgl buffers
function loadModels() {

    // make a sphere with radius 1 at the origin, with numLongSteps longitudes. 
    // Returns verts, tris and normals.
    function makeSphere(numLongSteps) {

        try {
            if (numLongSteps % 2 != 0)
                throw "in makeSphere: uneven number of longitude steps!";
            else if (numLongSteps < 4)
                throw "in makeSphere: number of longitude steps too small!";
            else { // good number longitude steps

                // make vertices and normals
                var sphereVertices = [0, -1, 0]; // vertices to return, init to south pole
                // var textureCoordData = [0.5, 0];
                var textureCoordData = [0.5, 1];
                var angleIncr = (Math.PI + Math.PI) / numLongSteps; // angular increment 
                var latLimitAngle = angleIncr * (Math.floor(numLongSteps / 4) - 1); // start/end lat angle
                var latRadius, latY; // radius and Y at current latitude
                for (var latAngle = -latLimitAngle; latAngle <= latLimitAngle; latAngle += angleIncr) {
                    latRadius = Math.cos(latAngle); // radius of current latitude
                    latY = Math.sin(latAngle); // height at current latitude
                    for (var longAngle = 0; longAngle < 2 * Math.PI; longAngle += angleIncr) {// for each long
                        sphereVertices.push(latRadius * Math.sin(longAngle), latY, latRadius * Math.cos(longAngle));
                        textureCoordData.push(1 - (longAngle / (2 * Math.PI))); //u
                        // textureCoordData.push(1 - ((latAngle + angleIncr * Math.floor(numLongSteps / 4)) / (2 * (angleIncr * Math.floor(numLongSteps / 4))))); //v
                        // textureCoordData.push( (longAngle / (2 * Math.PI))); //u
                        textureCoordData.push(((latAngle + angleIncr * Math.floor(numLongSteps / 4)) / (2 * (angleIncr * Math.floor(numLongSteps / 4))))); //v
                    }
                } // end for each latitude
                sphereVertices.push(0, 1, 0); // add north pole
                //textureCoordData.push(0.5, 1);
                textureCoordData.push(0.5, 0);

                var sphereNormals = sphereVertices.slice(); // for this sphere, vertices = normals; return these

                // make triangles, from south pole to middle latitudes to north pole
                var sphereTriangles = []; // triangles to return
                for (var whichLong = 1; whichLong < numLongSteps; whichLong++) // south pole
                    sphereTriangles.push(0, whichLong, whichLong + 1);
                sphereTriangles.push(0, numLongSteps, 1); // longitude wrap tri
                var llVertex; // lower left vertex in the current quad
                for (var whichLat = 0; whichLat < (numLongSteps / 2 - 2) ; whichLat++) { // middle lats
                    for (var whichLong = 0; whichLong < numLongSteps - 1; whichLong++) {
                        llVertex = whichLat * numLongSteps + whichLong + 1;
                        sphereTriangles.push(llVertex, llVertex + numLongSteps, llVertex + numLongSteps + 1);
                        sphereTriangles.push(llVertex, llVertex + numLongSteps + 1, llVertex + 1);
                    } // end for each longitude
                    sphereTriangles.push(llVertex + 1, llVertex + numLongSteps + 1, llVertex + 2);
                    sphereTriangles.push(llVertex + 1, llVertex + 2, llVertex - numLongSteps + 2);
                } // end for each latitude
                for (var whichLong = llVertex + 2; whichLong < llVertex + numLongSteps + 1; whichLong++) // north pole
                    sphereTriangles.push(whichLong, sphereVertices.length / 3 - 1, whichLong + 1);
                sphereTriangles.push(sphereVertices.length / 3 - 2, sphereVertices.length / 3 - 1, sphereVertices.length / 3 - numLongSteps - 1); // longitude wrap
            } // end if good number longitude steps
            return ({ vertices: sphereVertices, normals: sphereNormals, triangles: sphereTriangles, uvMaps: textureCoordData });
        } // end try

        catch (e) {
            console.log(e);
        } // end catch
    } // end make sphere



    inputTriangles = getJSONFile(INPUT_TRIANGLES_URL, "triangles"); // read in the triangle data

    try {
        if (inputTriangles == String.null)
            throw "Unable to load triangles file!";
        else {
            var whichSetVert; // index of vertex in current triangle set
            var whichSetTri; // index of triangle in current triangle set
            var vtxToAdd; // vtx coords to add to the coord array
            var normToAdd; // vtx normal to add to the coord array
            var triToAdd; // tri indices to add to the index array
            var maxCorner = vec3.fromValues(Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE); // bbox corner
            var minCorner = vec3.fromValues(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE); // other corner

            // process each triangle set to load webgl vertex and triangle buffers
            numTriangleSets = inputTriangles.length; // remember how many tri sets
            for (var whichSet = 0; whichSet < numTriangleSets; whichSet++) { // for each tri set

                // set up hilighting, modeling translation and rotation
                inputTriangles[whichSet].center = vec3.fromValues(0, 0, 0);  // center point of tri set
                inputTriangles[whichSet].on = false; // not highlighted
                inputTriangles[whichSet].translation = vec3.fromValues(0, 0, 0); // no translation
                inputTriangles[whichSet].xAxis = vec3.fromValues(1, 0, 0); // model X axis
                inputTriangles[whichSet].yAxis = vec3.fromValues(0, 1, 0); // model Y axis 

                // set up the vertex and normal arrays, define model center and axes
                inputTriangles[whichSet].glVertices = []; // flat coord list for webgl
                inputTriangles[whichSet].glNormals = []; // flat normal list for webgl
                var numVerts = inputTriangles[whichSet].vertices.length; // num vertices in tri set
                for (whichSetVert = 0; whichSetVert < numVerts; whichSetVert++) { // verts in set
                    vtxToAdd = inputTriangles[whichSet].vertices[whichSetVert]; // get vertex to add
                    normToAdd = inputTriangles[whichSet].normals[whichSetVert]; // get normal to add
                    inputTriangles[whichSet].glVertices.push(vtxToAdd[0], vtxToAdd[1], vtxToAdd[2]); // put coords in set coord list
                    inputTriangles[whichSet].glNormals.push(normToAdd[0], normToAdd[1], normToAdd[2]); // put normal in set coord list
                    vec3.max(maxCorner, maxCorner, vtxToAdd); // update world bounding box corner maxima
                    vec3.min(minCorner, minCorner, vtxToAdd); // update world bounding box corner minima
                    vec3.add(inputTriangles[whichSet].center, inputTriangles[whichSet].center, vtxToAdd); // add to ctr sum
                } // end for vertices in set
                vec3.scale(inputTriangles[whichSet].center, inputTriangles[whichSet].center, 1 / numVerts); // avg ctr sum

                // send the vertex coords and normals to webGL
                vertexBuffers[whichSet] = gl.createBuffer(); // init empty webgl set vertex coord buffer
                gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffers[whichSet]); // activate that buffer
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(inputTriangles[whichSet].glVertices), gl.STATIC_DRAW); // data in
                normalBuffers[whichSet] = gl.createBuffer(); // init empty webgl set normal component buffer
                gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffers[whichSet]); // activate that buffer
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(inputTriangles[whichSet].glNormals), gl.STATIC_DRAW); // data in

                // set up the triangle index array, adjusting indices across sets
                inputTriangles[whichSet].glTriangles = []; // flat index list for webgl
                triSetSizes[whichSet] = inputTriangles[whichSet].triangles.length; // number of tris in this set
                for (whichSetTri = 0; whichSetTri < triSetSizes[whichSet]; whichSetTri++) {
                    triToAdd = inputTriangles[whichSet].triangles[whichSetTri]; // get tri to add
                    inputTriangles[whichSet].glTriangles.push(triToAdd[0], triToAdd[1], triToAdd[2]); // put indices in set list
                } // end for triangles in set

                // send the triangle indices to webGL
                triangleBuffers.push(gl.createBuffer()); // init empty triangle index buffer
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleBuffers[whichSet]); // activate that buffer
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(inputTriangles[whichSet].glTriangles), gl.STATIC_DRAW); // data in
                inputTriangles[whichSet].glUVs = [];
                for (whichUVs = 0; whichUVs < inputTriangles[whichSet].uvs.length; whichUVs++) {

                    inputTriangles[whichSet].glUVs.push(inputTriangles[whichSet].uvs[whichUVs][0], inputTriangles[whichSet].uvs[whichUVs][1]);
                }
                uvBufferes[whichSet] = gl.createBuffer(); // init empty webgl set vertex coord buffer
                gl.bindBuffer(gl.ARRAY_BUFFER, uvBufferes[whichSet]); // activate that buffer
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(inputTriangles[whichSet].glUVs), gl.STATIC_DRAW); // data in
                // console.log("inputTriangles[whichSet].material.texture");

                // console.log(inputTriangles[whichSet].material.texture);
                imageList[whichSet] = inputTriangles[whichSet].material.texture;
               // imageList[whichSet] = "https://ncsucgclass.github.io/prog3/" + inputTriangles[whichSet].material.texture;
                if (imageList[whichSet] == false) {
                    flagList[whichSet] = 0;
                } else {
                    flagList[whichSet] = 1;
                }
                imageTexture[whichSet] = gl.createTexture();
                imageTexture[whichSet].image = new Image();
                //  imageTexture[whichSet].image.src = "https://ncsucgclass.github.io/prog3/"+imageList[whichSet];
                imageTexture[whichSet].image.src = "abe.png";
                // imageTexture[whichSet].image.src = inputTriangles[whichSet].material.texture;
                // console.log(imageTexture[whichSet].image.src);
                //  console.log("inputTriangles[whichSet].glVertices");
                //   console.log(inputTriangles[whichSet].glVertices);

                // console.log("inputTriangles[whichSet].glTriangles");
                //  console.log(inputTriangles[whichSet].glTriangles);
                //   console.log("inputTriangles[whichSet].glUVs");
                //  console.log(inputTriangles[whichSet].glUVs);


            } // end for each triangle set 

            inputSpheres = getJSONFile(INPUT_SPHERES_URL, "spheres"); // read in the sphere data

            if (inputSpheres == String.null)
                throw "Unable to load spheres file!";
            else {

                // init sphere highlighting, translation and rotation; update bbox
                var sphere; // current sphere
                var temp = vec3.create(); // an intermediate vec3
                var minXYZ = vec3.create(), maxXYZ = vec3.create();  // min/max xyz from sphere
                numSpheres = inputSpheres.length; // remember how many spheres
                for (var whichSphere = 0; whichSphere < numSpheres; whichSphere++) {
                    sphere = inputSpheres[whichSphere];
                    sphere.on = false; // spheres begin without highlight
                    sphere.translation = vec3.fromValues(0, 0, 0); // spheres begin without translation
                    sphere.xAxis = vec3.fromValues(1, 0, 0); // sphere X axis
                    sphere.yAxis = vec3.fromValues(0, 1, 0); // sphere Y axis 
                    sphere.center = vec3.fromValues(0, 0, 0); // sphere instance is at origin
                    vec3.set(minXYZ, sphere.x - sphere.r, sphere.y - sphere.r, sphere.z - sphere.r);
                    vec3.set(maxXYZ, sphere.x + sphere.r, sphere.y + sphere.r, sphere.z + sphere.r);
                    vec3.min(minCorner, minCorner, minXYZ); // update world bbox min corner
                    vec3.max(maxCorner, maxCorner, maxXYZ); // update world bbox max corner

                    imageList.push(inputSpheres[whichSphere].texture);
                   // imageList.push("https://ncsucgclass.github.io/prog3/" + inputSpheres[whichSphere].texture);
                    if (imageList[imageList.length - 1] == false) {
                        flagList.push(0);
                    } else {
                        flagList.push(1);
                    }
                    imageTexture.push(gl.createTexture());
                    imageTexture[imageTexture.length - 1].image = new Image();
                    imageTexture[imageTexture.length - 1].image.src = "rocktile.jpg";

                } // end for each sphere
                viewDelta = vec3.length(vec3.subtract(temp, maxCorner, minCorner)) / 100; // set global

                // make one sphere instance that will be reused
                var oneSphere = makeSphere(32);
                console.log("oneSphere");
                console.log(oneSphere);

                // send the sphere vertex coords and normals to webGL
                vertexBuffers.push(gl.createBuffer()); // init empty webgl sphere vertex coord buffer
                gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffers[vertexBuffers.length - 1]); // activate that buffer
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(oneSphere.vertices), gl.STATIC_DRAW); // data in
                normalBuffers.push(gl.createBuffer()); // init empty webgl sphere vertex normal buffer
                gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffers[normalBuffers.length - 1]); // activate that buffer
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(oneSphere.normals), gl.STATIC_DRAW); // data in

                uvBufferes.push(gl.createBuffer()); // init empty webgl sphere vertex coord buffer
                gl.bindBuffer(gl.ARRAY_BUFFER, uvBufferes[uvBufferes.length - 1]); // activate that buffer
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(oneSphere.uvMaps), gl.STATIC_DRAW); // data in

                triSetSizes.push(oneSphere.triangles.length);

                // send the triangle indices to webGL
                triangleBuffers.push(gl.createBuffer()); // init empty triangle index buffer
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleBuffers[triangleBuffers.length - 1]); // activate that buffer
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(oneSphere.triangles), gl.STATIC_DRAW); // data in

                //  imageTexture[whichSet].image.src = "https://ncsucgclass.github.io/prog3/"+imageList[whichSet];

            } // end if sphere file loaded
        } // end if triangle file loaded
    } // end try 

    catch (e) {
        console.log(e);
    } // end catch
} // end load models

// setup the webGL shaders
function setupShaders() {

    // define vertex shader in essl using es6 template strings
    var vShaderCode = `
        attribute vec3 aVertexPosition; // vertex position
        attribute vec3 aVertexNormal; // vertex normal

        attribute vec2 aTextureCoord;

        uniform mat4 umMatrix; // the model matrix
        uniform mat4 upvmMatrix; // the project view model matrix

        varying vec3 vWorldPos; // interpolated world position of vertex
        varying vec3 vVertexNormal; // interpolated normal for frag shader

        varying vec2 vTextureCoord;

        void main(void) {

            // vertex position
            vec4 vWorldPos4 = umMatrix * vec4(aVertexPosition, 1.0);
            vWorldPos = vec3(vWorldPos4.x,vWorldPos4.y,vWorldPos4.z);
            gl_Position = upvmMatrix * vec4(aVertexPosition, 1.0);

            // vertex normal (assume no non-uniform scale)
            vec4 vWorldNormal4 = umMatrix * vec4(aVertexNormal, 0.0);
            vVertexNormal = normalize(vec3(vWorldNormal4.x, vWorldNormal4.y, vWorldNormal4.z));
            vTextureCoord = aTextureCoord;
        }
    `;

    // define fragment shader in essl using es6 template strings
    var fShaderCode = `
        precision mediump float; // set float to medium precision

        // eye location
        uniform vec3 uEyePosition; // the eye's position in world

        // light properties
        uniform vec3 uLightAmbient; // the light's ambient color
        uniform vec3 uLightDiffuse; // the light's diffuse color
        uniform vec3 uLightSpecular; // the light's specular color
        uniform vec3 uLightPosition; // the light's position


        uniform float uAlpha;
        uniform sampler2D uSampler;

        // material properties
        uniform vec3 uAmbient; // the ambient reflectivity
        uniform vec3 uDiffuse; // the diffuse reflectivity
        uniform vec3 uSpecular; // the specular reflectivity
        uniform float uShininess; // the specular exponent
        uniform int vflag;
        uniform bool transparencyAbility;
        // geometry properties
        varying vec3 vWorldPos; // world xyz of fragment
        varying vec3 vVertexNormal; // normal of fragment

        varying vec2 vTextureCoord;


        void main(void) {

            // ambient term
            vec3 ambient = uAmbient*uLightAmbient;

            // diffuse term
            vec3 normal = normalize(vVertexNormal);
            vec3 light = normalize(uLightPosition - vWorldPos);
            float lambert = max(0.0,dot(normal,light));
            vec3 diffuse = uDiffuse*uLightDiffuse*lambert; // diffuse term

            // specular term
            vec3 eye = normalize(uEyePosition - vWorldPos);
            vec3 halfVec = normalize(light+eye);
            float highlight = pow(max(0.0,dot(normal,halfVec)),uShininess);
            vec3 specular = uSpecular*uLightSpecular*highlight; // specular term

            // combine to output color
            vec3 colorOut = ambient + diffuse + specular; // no specular yet

          //  gl_FragColor = vec4(colorOut, 1.0);
          // gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));
          if(!transparencyAbility) {
                    if(vflag==0) {
          gl_FragColor=vec4(colorOut, uAlpha);
    } else {
              vec4 textureColor= texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));
         // gl_FragColor = vec4(textureColor.rgb * colorOut, textureColor.a* uAlpha);
        // gl_FragColor = vec4(textureColor.rgb * colorOut, textureColor.a*uAlpha);
         gl_FragColor = vec4(textureColor.rgb * colorOut, uAlpha);
    }
    } else {
              if(vflag==0) {
          gl_FragColor=vec4(colorOut, uAlpha);
    } else {
              vec4 textureColor= texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));
         // gl_FragColor = vec4(textureColor.rgb * colorOut, textureColor.a* uAlpha);
         gl_FragColor = vec4(textureColor.rgb * colorOut, textureColor.a*uAlpha);
         //gl_FragColor = vec4(textureColor.rgb * colorOut, textureColor.a);
    }
}

        }
    `;

    try {
        var fShader = gl.createShader(gl.FRAGMENT_SHADER); // create frag shader
        gl.shaderSource(fShader, fShaderCode); // attach code to shader
        gl.compileShader(fShader); // compile the code for gpu execution

        var vShader = gl.createShader(gl.VERTEX_SHADER); // create vertex shader
        gl.shaderSource(vShader, vShaderCode); // attach code to shader
        gl.compileShader(vShader); // compile the code for gpu execution

        if (!gl.getShaderParameter(fShader, gl.COMPILE_STATUS)) { // bad frag shader compile
            throw "error during fragment shader compile: " + gl.getShaderInfoLog(fShader);
            gl.deleteShader(fShader);
        } else if (!gl.getShaderParameter(vShader, gl.COMPILE_STATUS)) { // bad vertex shader compile
            throw "error during vertex shader compile: " + gl.getShaderInfoLog(vShader);
            gl.deleteShader(vShader);
        } else { // no compile errors
            var shaderProgram = gl.createProgram(); // create the single shader program
            gl.attachShader(shaderProgram, fShader); // put frag shader in program
            gl.attachShader(shaderProgram, vShader); // put vertex shader in program
            gl.linkProgram(shaderProgram); // link program into gl context

            if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) { // bad program link
                throw "error during shader program linking: " + gl.getProgramInfoLog(shaderProgram);
            } else { // no shader program link errors
                gl.useProgram(shaderProgram); // activate shader program (frag and vert)

                // locate and enable vertex attributes
                vPosAttribLoc = gl.getAttribLocation(shaderProgram, "aVertexPosition"); // ptr to vertex pos attrib
                gl.enableVertexAttribArray(vPosAttribLoc); // connect attrib to array
                vNormAttribLoc = gl.getAttribLocation(shaderProgram, "aVertexNormal"); // ptr to vertex normal attrib
                gl.enableVertexAttribArray(vNormAttribLoc); // connect attrib to array

                vtextureAttribLoc = gl.getAttribLocation(shaderProgram, "aTextureCoord")
                gl.enableVertexAttribArray(vtextureAttribLoc);
                // locate vertex uniforms
                mMatrixULoc = gl.getUniformLocation(shaderProgram, "umMatrix"); // ptr to mmat
                pvmMatrixULoc = gl.getUniformLocation(shaderProgram, "upvmMatrix"); // ptr to pvmmat

                // locate fragment uniforms
                var eyePositionULoc = gl.getUniformLocation(shaderProgram, "uEyePosition"); // ptr to eye position
                var lightAmbientULoc = gl.getUniformLocation(shaderProgram, "uLightAmbient"); // ptr to light ambient
                var lightDiffuseULoc = gl.getUniformLocation(shaderProgram, "uLightDiffuse"); // ptr to light diffuse
                var lightSpecularULoc = gl.getUniformLocation(shaderProgram, "uLightSpecular"); // ptr to light specular
                var lightPositionULoc = gl.getUniformLocation(shaderProgram, "uLightPosition"); // ptr to light position
                ambientULoc = gl.getUniformLocation(shaderProgram, "uAmbient"); // ptr to ambient
                diffuseULoc = gl.getUniformLocation(shaderProgram, "uDiffuse"); // ptr to diffuse
                specularULoc = gl.getUniformLocation(shaderProgram, "uSpecular"); // ptr to specular
                shininessULoc = gl.getUniformLocation(shaderProgram, "uShininess"); // ptr to shininess
                samplerUniformLoc = gl.getUniformLocation(shaderProgram, "uSampler");
                uAlphaLoc = gl.getUniformLocation(shaderProgram, "uAlpha");
                vflagListLoc = gl.getUniformLocation(shaderProgram, "vflag");
                transparencyAbilityLoc = gl.getUniformLocation(shaderProgram, "transparencyAbility");

                // pass global constants into fragment uniforms
                gl.uniform3fv(eyePositionULoc, Eye); // pass in the eye's position
                gl.uniform3fv(lightAmbientULoc, lightAmbient); // pass in the light's ambient emission
                gl.uniform3fv(lightDiffuseULoc, lightDiffuse); // pass in the light's diffuse emission
                gl.uniform3fv(lightSpecularULoc, lightSpecular); // pass in the light's specular emission
                gl.uniform3fv(lightPositionULoc, lightPosition); // pass in the light's position
            } // end if no shader program link errors
        } // end if no compile errors
    } // end try 

    catch (e) {
        console.log(e);
    } // end catch
} // end setup shaders

// render the loaded model
function renderModels() {
    var transparency = document.getElementById("textureTransparency").checked;
    // construct the model transform matrix, based on model state
    function makeModelTransform(currModel) {
        var zAxis = vec3.create(), sumRotation = mat4.create(), temp = mat4.create(), negCenter = vec3.create();

        vec3.normalize(zAxis, vec3.cross(zAxis, currModel.xAxis, currModel.yAxis)); // get the new model z axis
        mat4.set(sumRotation, // get the composite rotation
            currModel.xAxis[0], currModel.yAxis[0], zAxis[0], 0,
            currModel.xAxis[1], currModel.yAxis[1], zAxis[1], 0,
            currModel.xAxis[2], currModel.yAxis[2], zAxis[2], 0,
            0, 0, 0, 1);
        vec3.negate(negCenter, currModel.center);
        mat4.multiply(sumRotation, sumRotation, mat4.fromTranslation(temp, negCenter)); // rotate * -translate
        mat4.multiply(sumRotation, mat4.fromTranslation(temp, currModel.center), sumRotation); // translate * rotate * -translate
        mat4.fromTranslation(mMatrix, currModel.translation); // translate in model matrix
        mat4.multiply(mMatrix, mMatrix, sumRotation); // rotate in model matrix
    } // end make model transform

    var hMatrix = mat4.create(); // handedness matrix
    var pMatrix = mat4.create(); // projection matrix
    var vMatrix = mat4.create(); // view matrix
    var mMatrix = mat4.create(); // model matrix
    var hpvMatrix = mat4.create(); // hand * proj * view matrices
    var hpvmMatrix = mat4.create(); // hand * proj * view * model matrices
    const highlightMaterial = { ambient: [0.5, 0.5, 0], diffuse: [0.5, 0.5, 0], specular: [0, 0, 0], n: 1 ,alpha:1}; // hlht mat

    window.requestAnimationFrame(renderModels); // set up frame render callbacks

    gl.clear(/*gl.COLOR_BUFFER_BIT |*/ gl.DEPTH_BUFFER_BIT); // clear frame/depth buffers


    // set up handedness, projection and view
    mat4.fromScaling(hMatrix, vec3.fromValues(-1, 1, 1)); // create handedness matrix
    mat4.perspective(pMatrix, 0.5 * Math.PI, 1, 0.1, 10); // create projection matrix
    mat4.lookAt(vMatrix, Eye, Center, Up); // create view matrix
    mat4.multiply(hpvMatrix, hMatrix, pMatrix); // handedness * projection
    mat4.multiply(hpvMatrix, hpvMatrix, vMatrix); // handedness * projection * view

    gl.uniform1i(transparencyAbilityLoc, transparency); // pass in the specular exponent

    // render each triangle set
    var currSet, setMaterial; // the tri set and its material properties
    var i = 0;
    for (var whichTriSet = 0; whichTriSet < numTriangleSets; whichTriSet++) {
        if (inputTriangles[whichTriSet].material.alpha)
        // console.log(whichTriSet);
        imageTexture[whichTriSet].index = whichTriSet;
        currSet = inputTriangles[whichTriSet];
        //  console.log(inputTriangles[whichTriSet]);
        // make model transform, add to view project
        makeModelTransform(currSet);
        mat4.multiply(hpvmMatrix, hpvMatrix, mMatrix); // handedness * project * view * model
        gl.uniformMatrix4fv(mMatrixULoc, false, mMatrix); // pass in the m matrix
        gl.uniformMatrix4fv(pvmMatrixULoc, false, hpvmMatrix); // pass in the hpvm matrix

        // reflectivity: feed to the fragment shader
        if (inputTriangles[whichTriSet].on)
            setMaterial = highlightMaterial; // highlight material
        else
            setMaterial = currSet.material; // normal material
        gl.uniform3fv(ambientULoc, setMaterial.ambient); // pass in the ambient reflectivity
        gl.uniform3fv(diffuseULoc, setMaterial.diffuse); // pass in the diffuse reflectivity
        gl.uniform3fv(specularULoc, setMaterial.specular); // pass in the specular reflectivity
        gl.uniform1f(shininessULoc, setMaterial.n); // pass in the specular exponent
        gl.uniform1i(vflagListLoc, flagList[whichTriSet]); // pass in the specular exponent

        gl.uniform1f(uAlphaLoc, setMaterial.alpha);
        /*
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        gl.enable(gl.BLEND);
        gl.disable(gl.DEPTH_TEST);
*/


        // vertex buffer: activate and feed into vertex shader
        // console.log(whichTriSet);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffers[whichTriSet]); // activate
        gl.vertexAttribPointer(vPosAttribLoc, 3, gl.FLOAT, false, 0, 0); // feed
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffers[whichTriSet]); // activate
        gl.vertexAttribPointer(vNormAttribLoc, 3, gl.FLOAT, false, 0, 0); // feed

        gl.bindBuffer(gl.ARRAY_BUFFER, uvBufferes[whichTriSet]); // activate


        gl.vertexAttribPointer(vtextureAttribLoc, 2, gl.FLOAT, false, 0, 0); // feed


        // added for texture

        // var imageTexture;
        // imageTexture = gl.createTexture();
        // imageTexture.image = new Image();

        // imageTexture.image.src = setMaterial.texture;
        // console.log(setMaterial.texture);
        //  imageTexture.image.src = "https://ncsucgclass.github.io/prog3/" + setMaterial.texture;
        // console.log(whichTriSet);
        var whichTriSetCons = whichTriSet

        imageTexture[whichTriSetCons].image.onload = function () {
            // console.log(whichTriSetCons);
            try {
                // console.log("whichTriSet " + whichTriSet);
                gl.bindTexture(gl.TEXTURE_2D, imageTexture[i]);
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imageTexture[i].image);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.bindTexture(gl.TEXTURE_2D, null);
                //  i = i + 1;
                // console.log("i " + i)
            }
            catch (e) {
                console.log("error reading image");

            }
            finally {
                i = i + 1;
                console.log("i " + i)
            }

            //  console.log("i " + i)
            // imageTexture.image.src = "tree.png";


            //  console.log(triSetSizes[whichTriSetCons]);
            //  console.log(i);

            //   console.log("done");
            // imageTexture.image.src = setMaterial.texture;
            //  console.log(setMaterial.texture);


            // triangle buffer: activate and render

        }
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, imageTexture[whichTriSet]);
        gl.uniform1i(samplerUniformLoc, 0);
        console.log("imageTexture[whichTriSet]" + imageTexture[whichTriSet]);
        // imageTexture[whichTriSet].image.src = "tree.png";
        imageTexture[whichTriSet].image.src = imageList[whichTriSet];
        console.log(whichTriSet);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleBuffers[whichTriSetCons]); // activate
        gl.drawElements(gl.TRIANGLES, 3 * triSetSizes[whichTriSetCons], gl.UNSIGNED_SHORT, 0); // render
        /*
        function loadImage(src,callback) {
            //var loadImage = new Image();
            imageTexture.image.onload = callback;
          //  imageTexture.image.src = src;
            console.log("image loaded");
        }

        loadImage(setMaterial.texture, function () {
            gl.bindTexture(gl.TEXTURE_2D, imageTexture);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imageTexture.image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.bindTexture(gl.TEXTURE_2D, null);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, imageTexture);
            gl.uniform1i(samplerUniformLoc, 0);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleBuffers[whichTriSetCons]); // activate
            gl.drawElements(gl.TRIANGLES, 3 * triSetSizes[whichTriSetCons], gl.UNSIGNED_SHORT, 0); // render
            console.log("done");
        });
        */

        // imageTexture.image.src = "https://ncsucgclass.github.io/prog3/" + setMaterial.texture;

        //  imageTexture.image.src = "abe.png";
        // console.log(imageList);
        // imageTexture.image.src = "https://ncsucgclass.github.io/prog3/"+imageList[whichTriSet];
        // imageTexture.image.src = imageList[whichTriSetCons];
        // imageTexture[whichTriSet].image.src = "tree.png";
        //  console.log("image loaded" + imageList[whichTriSetCons]);
    } // end for each triangle set

    // render each sphere
    var sphere, currentMaterial, instanceTransform = mat4.create(); // the current sphere and material
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffers[vertexBuffers.length - 1]); // activate vertex buffer
    gl.vertexAttribPointer(vPosAttribLoc, 3, gl.FLOAT, false, 0, 0); // feed vertex buffer to shader
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffers[normalBuffers.length - 1]); // activate normal buffer
    gl.vertexAttribPointer(vNormAttribLoc, 3, gl.FLOAT, false, 0, 0); // feed normal buffer to shader

    gl.bindBuffer(gl.ARRAY_BUFFER, uvBufferes[uvBufferes.length - 1]); // activate

    gl.vertexAttribPointer(vtextureAttribLoc, 2, gl.FLOAT, false, 0, 0); // feed
    //  console.log("vertexBuffers");
    //  console.log(vertexBuffers);
    // console.log("uvBufferes");
    // console.log(uvBufferes);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleBuffers[triangleBuffers.length - 1]); // activate tri buffer
    var j = inputTriangles.length;
    // console.log("j initial: " + j);
    console.log("flagList");
    console.log(flagList);
    for (var whichSphere = 0; whichSphere < numSpheres; whichSphere++) {
        sphere = inputSpheres[whichSphere];

        // define model transform, premult with pvmMatrix, feed to shader
        makeModelTransform(sphere);
        mat4.fromTranslation(instanceTransform, vec3.fromValues(sphere.x, sphere.y, sphere.z)); // recenter sphere
        mat4.scale(mMatrix, mMatrix, vec3.fromValues(sphere.r, sphere.r, sphere.r)); // change size
        mat4.multiply(mMatrix, instanceTransform, mMatrix); // apply recenter sphere
        hpvmMatrix = mat4.multiply(hpvmMatrix, hpvMatrix, mMatrix); // premultiply with hpv matrix
        gl.uniformMatrix4fv(mMatrixULoc, false, mMatrix); // pass in model matrix
        gl.uniformMatrix4fv(pvmMatrixULoc, false, hpvmMatrix); // pass in handed project view model matrix
        gl.uniform1i(vflagListLoc, flagList[inputTriangles.length + whichSphere]);
        // reflectivity: feed to the fragment shader
        if (sphere.on)
            currentMaterial = highlightMaterial;
        else
            currentMaterial = sphere;
        gl.uniform3fv(ambientULoc, currentMaterial.ambient); // pass in the ambient reflectivity
        gl.uniform3fv(diffuseULoc, currentMaterial.diffuse); // pass in the diffuse reflectivity
        gl.uniform3fv(specularULoc, currentMaterial.specular); // pass in the specular reflectivity
        gl.uniform1f(shininessULoc, currentMaterial.n); // pass in the specular exponent
        /*
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        gl.enable(gl.BLEND);
        gl.disable(gl.DEPTH_TEST);
        */
        gl.uniform1f(uAlphaLoc, currentMaterial.alpha);

        imageTexture[inputTriangles.length + whichSphere].image.onload = function () {
            // console.log(whichTriSetCons);
            console.log("inputTriangles.length + whichSphere ");
            console.log(inputTriangles.length + whichSphere);
            gl.bindTexture(gl.TEXTURE_2D, imageTexture[j]);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imageTexture[j].image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.bindTexture(gl.TEXTURE_2D, null);
            j = j + 1;
            console.log("j " + j);

        }
        // console.log();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, imageTexture[inputTriangles.length + whichSphere]);
        gl.uniform1i(samplerUniformLoc, 0);
        console.log("inputTriangles.length+whichSphere" + (inputTriangles.length + whichSphere));
        // imageTexture[whichTriSet].image.src = "tree.png";
        imageTexture[inputTriangles.length + whichSphere].image.src = imageList[inputTriangles.length + whichSphere];
        //console.log("imageTexture[inputTriangles.length + whichSphere].image.src");
        // console.log(imageTexture[inputTriangles.length + whichSphere].image.src);
        // draw a transformed instance of the sphere
        gl.drawElements(gl.TRIANGLES, triSetSizes[triSetSizes.length - 1], gl.UNSIGNED_SHORT, 0); // render
    } // end for each sphere
    console.log(imageList);
} // end render model


/* MAIN -- HERE is where execution begins after window load */

function main() {

    setupWebGL(); // set up the webGL environment
    loadModels(); // load in the models from tri file
    setupShaders(); // setup the webGL shaders
    renderModels(); // draw the triangles using webGL


} // end main
