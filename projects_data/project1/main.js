// Sibei Xia
// CSC 561
// 09/23/16

// read the sphere in .json
function getInputSpheres() {
    const INPUT_SPHERES_URL =
        "https://ncsucgclass.github.io/prog1/spheres.json";

    // load the spheres file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET", INPUT_SPHERES_URL, false); // init the request
    httpReq.send(null); // send the request
    var startTime = Date.now();
    while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
        if ((Date.now() - startTime) > 3000)
            break;
    } // until its loaded or we time out after three seconds
    if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
        console.log * ("Unable to open input spheres file!");
        return String.null;
    } else
        return JSON.parse(httpReq.response);
} // end get input spheres

// read light in .json
function getInputLights() {
    const INPUT_SPHERES_URL =
       "https://ncsucgclass.github.io/prog1/lights.json";

    // load the spheres file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET", INPUT_SPHERES_URL, false); // init the request
    httpReq.send(null); // send the request
    var startTime = Date.now();
    while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
        if ((Date.now() - startTime) > 3000)
            break;
    } // until its loaded or we time out after three seconds
    if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
        console.log * ("Unable to open input light file!");
        return String.null;
    } else
        return JSON.parse(httpReq.response);
}

// added function 

// to calculate the distance between a pixel and a center
function distanceSquare(pointX, pointY, sphere) {
    var temp = ((pointX - (sphere.center).x) * (pointX - (sphere.center).x)) + ((pointY - (sphere.center).y) * (pointY - (sphere.center).y));
    return (temp < (sphere.r * sphere.r));

}

// to add two colors
function addRGB(r1, r2) {
    try {
        if ((r1 + r2) < 0) {
            throw "color component negtive";
        } else if ((r1 + r2) > 255) {
            return 255;
        } else {
            return r1 + r2;
        }
    } catch (e) {
        console.log(e);
    }
}

// to draw pixel on canvas
function drawPixel(imagedata, x, y, colorInput) {
    try {
        if ((typeof (x) !== "number") || (typeof (y) !== "number"))
            throw "drawpixel location not a number";
        else if ((x < 0) || (y < 0) || (x >= imagedata.width) || (y >= imagedata.height))
            throw "drawpixel location outside of image";
        else if (colorInput instanceof color) {
            var pixelindex = ((imagedata.height - y) * imagedata.width + x) * 4;
            imagedata.data[pixelindex] = colorInput.r;
            imagedata.data[pixelindex + 1] = colorInput.g;
            imagedata.data[pixelindex + 2] = colorInput.b;
            imagedata.data[pixelindex + 3] = colorInput.a;

            //    console.log(colorInput);
        } else
            throw "drawpixel color is not a Color";
    } // end try

    catch (e) {
        console.log(e);
        console.log(colorInput);
    }
} // end drawPixel


// color class
class color {
    constructor(r, g, b, a) {
        try {
            if ((typeof (r) !== "number") || (typeof (g) !== "number") || (typeof (b) !== "number") || (typeof (a) !== "number"))
                throw "color component not a number";
            else if ((r < 0) || (g < 0) || (b < 0) || (a < 0))
                throw "color component less than 0";
            else if ((r > 255) || (g > 255) || (b > 255) || (a > 255))
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a;
            }
        } // end try

        catch (e) {
            console.log(e);
        }
    } // end Color constructor

    // Color change method
    change(r, g, b, a) {
        try {
            if ((typeof (r) !== "number") || (typeof (g) !== "number") || (typeof (b) !== "number") || (typeof (a) !== "number"))
                throw "color component not a number";
            else if ((r < 0) || (g < 0) || (b < 0) || (a < 0))
                throw "color component less than 0";
            else if ((r > 255) || (g > 255) || (b > 255) || (a > 255))
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a;
            }
        } // end throw

        catch (e) {
            console.log(e);
        }
    } // end Color change method
    add(colorB) {
        return new color(addRGB(this.r, colorB.r), addRGB(this.g, colorB.g), addRGB(this.b, colorB.b), 255);

    }

} // end color class

// vector class
class vector {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    unit_vector() {
        var length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        return new vector(this.x / length, this.y / length, this.z / length);
    }
    times(k) {
        return new vector(k * this.x, k * this.y, k * this.z);
    }


}

// vector calculations
// substract
function substract(v1, v2) {
    return new vector((v1.x - v2.x), (v1.y - v2.y), (v1.z - v2.z));
}
// cross
function cross(v1, v2) {
    return new vector((v1.y * v2.z - v1.z * v2.y), (v1.z * v2.x - v1.x * v2.z), (v1.x * v2.y - v1.y * v2.x));
}
// dot
function dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}
// add
function add(v1, v2) {
    return new vector((v1.x + v2.x), (v1.y + v2.y), (v1.z + v2.z));
}

// class ray
class ray {
    constructor(origin, pointTo) {
        this.origin = origin;
        this.direction = substract(pointTo, origin);
    }
    point_at_parameter(t) {
        return add(this.origin, this.direction.times(t));
    }
}


// camera
class eye {
    constructor(lookfrom, lookat, lookup, windowDistance, windowWidth, windowHeight) {
        this.origin = lookfrom;
        // this.w = (substract(lookfrom, lookat)).unit_vector();
        this.w = lookat.unit_vector();
        // this.u = cross(lookup, this.w).unit_vector();
        // this.v = cross(this.w, this.u);
        this.v = lookup.unit_vector();
        this.u = cross(this.v, this.w).unit_vector();
        this.horizontal = windowWidth;
        this.vertical = windowHeight;
        // this.lower_left = new vector();
        //this.lower_left = new vector(((this.origin).x - 0.5 * windowWidth), ((this.origin).y - 0.5 * windowHeight), ((this.origin).z + windowDistance));
        this.lower_left = add(substract(substract(this.origin, this.u.times(0.5 * windowWidth)), this.v.times(0.5 * windowHeight)), this.w.times(windowDistance));
    }
    get_ray(h, w) {
        // var output = new ray(this.origin, new vector(this.lower_left.x + w * this.horizontal, this.lower_left.y + this.vertical * h, this.lower_left.z));
        var output = new ray(this.origin, add(add(this.lower_left, this.u.times(w)), this.v.times(h)));
        return output;
    }
}


// class light
class light {
    //lightList.push(new light(new vector(1, 1, 1), new vector(1, 1, 1), new vector(1, 1, 1), new vector(2, 4, -0.5), new color(255, 255, 255, 255)));
    constructor(line2,color) {
        //{"x": 2, "y": 4, "z": -0.5, "ambient": [1,1,1], "diffuse": [1,1,1], "specular": [1,1,1]}
        console.log(line2);
        this.diffuse = line2.diffuse;
        this.ambient = line2.ambient;

        this.specular = line2.specular;
        this.origin = new vector(line2.x,line2.y,line2.z);
        this.color = color; // white (255,255,255,255)
    }
    changeColor(ambient, diffuse, specular, origin, color) {
        this.ambient = ambient;
        this.diffuse = diffuse;
        this.specular = specular;
        this.origin = origin;
        this.color = color; // white (255,255,255,255)
    }
}

// class sphere
class sphere {
    constructor(line) {
        console.log(line);
        this.center = new vector(line.x, line.y, line.z);
        this.r = line.r; // 0.1
        this.ambient = line.ambient; // [0.1,0.1,0.1]
        this.diffuse = line.diffuse; // [0.6,0.0,0.0]
        //this.colorRGB = new color(this.diffuse[0] * 255, this.diffuse[1] * 255, this.diffuse[2] * 255, 255);
        this.specular = line.specular; // [0.3,0.3,0.3]
        this.n = line.n; // 5


    }
    hitRay(ray, max, min, hitRecord) {
        var a = dot(ray.direction, ray.direction);
        // console.log("a"+ a);
        var oc = substract(ray.origin, this.center);
        var b = dot(oc, ray.direction);
        // console.log("b"+ b);
        var c = dot(oc, oc) - this.r * this.r;
        // console.log("c"+c);
        var discriminant = b * b - a * c;
        //   console.log("dis"+discriminant);
        if (discriminant > 0) {
            var temp = (-b - Math.sqrt(discriminant)) / a;
            if (temp < max && temp > min) {
                var p = ray.point_at_parameter(temp);
                hitRecord.change(temp, p, substract(p, this.center).unit_vector(), this);
                return true;
            }
            temp = (-b + Math.sqrt(discriminant)) / a;
            if (temp < max && temp > min) {
                var p = ray.point_at_parameter(temp);
                hitRecord.change(temp, p, substract(p, this.center).unit_vector(), this);
                return true;
            }
        }
        return false;
    }
}

// class hitableList: all models in the coordinates
class hitableList {
    constructor(list, size) {
        this.list = list;
        this.size = size;
    }

    hitRay(ray, max, min, hitRecord) {
        var hit_anything = false;
        var closet_so_far = max;
        for (var i = 0; i < this.size; i++) {
            if (this.list[i].hitRay(ray, closet_so_far, min, hitRecord)) {
                hit_anything = true;
                //console.log(hitRecord);
                closet_so_far = hitRecord.t;
            }
        }
        return hit_anything;
    }
}


// class hit_record: to track the intersection point
class hit_record {
    constructor(t, p, normal, sphere) {
        this.t = t;
        this.p = p;
        this.normal = normal;
        this.sphere = sphere;
    }
    change(t, p, normal, sphere) {
        this.t = t;
        this.p = p;
        this.normal = normal;
        this.sphere = sphere;
    }
}

// blinnPhong model to calculate the color
function blinnPhong(rec, world, lightList, eyeLocation) {
    // I = ambient + diffuse + specular
    var newColor = new color(0, 0, 0, 255);
    var recTemp = new hit_record();

    for (var i = 0; i < lightList.length; i++) {
        // console.log(lightList[i].origin);
        //console.log(rec.p);
        var raylight = new ray((lightList[i].origin), rec.p);
        //console.log(raylight);
        //var nagtiveRay = new vector();
        var nagtiveRay = substract(lightList[i].origin, rec.p).unit_vector();
        //var nagtiveRay = substract(rec.p, lightList[i].origin).unit_vector();
        // console.log(nagtiveRay);
        // var reflect = substract(rec.normal.times(2 * dot(rec.normal, nagtiveRay)), nagtiveRay);
        //console.log("reflect");
        //console.log(reflect);
        if (world.hitRay(raylight, 0.999, 0, recTemp)) {
            // newColor = newColor.add(new color(0, 0, 0, 255));
            newColor = newColor.add(new color(ambientColor(lightList[i].color.r, lightList[i].ambient[0], rec.sphere.ambient[0]), ambientColor(lightList[i].color.g, lightList[i].ambient[1], rec.sphere.ambient[1]), ambientColor(lightList[i].color.b, lightList[i].ambient[2], rec.sphere.ambient[2]), 255));
        }
        else {
            // console.log(lightList[i]);
            //  console.log(rec);
            //console.log(rec.sphere.specular[0]);
            // console.log(reflect);
            //console.log(substract(eyeLocation, rec.p).unit_vector());
            //console.log(rec.sphere.n);

            // var r = blinnPhongAlgorithm(lightList[i].color.r, lightList[i].ambient.x, rec.sphere.ambient[0], lightList[i].diffuse.x, rec.sphere.diffuse[0], rec.normal, nagtiveRay, lightList[i].specular.x, rec.sphere.specular[0], reflect, substract(eyeLocation, rec.p).unit_vector(), rec.sphere.n);
            // var g = blinnPhongAlgorithm(lightList[i].color.g, lightList[i].ambient.y, rec.sphere.ambient[1], lightList[i].diffuse.y, rec.sphere.diffuse[1], rec.normal, nagtiveRay, lightList[i].specular.y, rec.sphere.specular[1], reflect, substract(eyeLocation, rec.p).unit_vector(), rec.sphere.n);
            //  var b = blinnPhongAlgorithm(lightList[i].color.b, lightList[i].ambient.z, rec.sphere.ambient[2], lightList[i].diffuse.z, rec.sphere.diffuse[2], rec.normal, nagtiveRay, lightList[i].specular.z, rec.sphere.specular[2], reflect, substract(eyeLocation, rec.p).unit_vector(), rec.sphere.n);
            var r = blinnPhongAlgorithm(lightList[i].color.r, lightList[i].ambient[0], rec.sphere.ambient[0], lightList[i].diffuse[0], rec.sphere.diffuse[0], rec.normal, nagtiveRay, lightList[i].specular[0], rec.sphere.specular[0], substract(eyeLocation, rec.p).unit_vector(), rec.sphere.n);
            var g = blinnPhongAlgorithm(lightList[i].color.g, lightList[i].ambient[1], rec.sphere.ambient[1], lightList[i].diffuse[1], rec.sphere.diffuse[1], rec.normal, nagtiveRay, lightList[i].specular[1], rec.sphere.specular[1], substract(eyeLocation, rec.p).unit_vector(), rec.sphere.n);
            var b = blinnPhongAlgorithm(lightList[i].color.b, lightList[i].ambient[2], rec.sphere.ambient[2], lightList[i].diffuse[2], rec.sphere.diffuse[2], rec.normal, nagtiveRay, lightList[i].specular[2], rec.sphere.specular[2], substract(eyeLocation, rec.p).unit_vector(), rec.sphere.n);
            //  console.log("r" + r);
            //  console.log("g" + g);
            //  console.log("b" + b);
            newColor = newColor.add(new color(r, g, b, 255));
        }
    }
    return newColor;
}
// to calculate color of places in shadows
function ambientColor(r, la, ka) {
    return r * la * ka;
}
// blinnPhone calculation
function blinnPhongAlgorithm(r, la, ka, ld, kd, nVector, lVector, ls, ks, vVector, n) {
    // console.log(n);
    var ambient = la * ka;
    var diffuse = ld * kd * dot(nVector, lVector);
    var temp = add(lVector, vVector).unit_vector();
    var half = dot(nVector, temp);
    var specular = ls * ks * Math.pow(half, n);
    // var specular = ls * ks * Math.pow(half, 15);
    //  console.log(ambient);
    // console.log(diffuse);
    //  console.log(specular);
    //return (r * (la * ka + ld * kd * dot(nVector, lVector) + ls * ks * Math.pow(dot(rVector, vVector), n)));
    return r * (ambient + diffuse + specular);
}

// determine which part can be seen
function colorObject(ray, world, lightList, eyeLocation) {
    var rec = new hit_record();
    if (world.hitRay(ray, Infinity, 0, rec)) {
        // console.log(rec);
        // return (rec.sphere).colorRGB;
        return blinnPhong(rec, world, lightList, eyeLocation);
        //  return rec.
    }
    else {
        return new color(0, 0, 0, 255);
    }
}

// blur edges
function averageColor(colorList) {
    var r = 0;
    var g = 0;
    var b = 0;
    for (var i = 0; i < colorList.length; i++) {
        r = r + colorList[i].r;
        g = g + colorList[i].g;
        b = b + colorList[i].b;
    }
    return new color(r / colorList.length, g / colorList.length, b / colorList.length, 255);
}

// define camera, spheres, and light. calculate their intersects
function drawPixelsInInputSpheres(context, lookfrom, lookup, lookat) {
    var inputSpheres = getInputSpheres();
    var inputLights = getInputLights();
    var sphereList = new Array();
    var lightList = new Array();
    for (var s = 0; s < inputSpheres.length; s++) {
        sphereList.push(new sphere(inputSpheres[s]));
    }
    for (var s = 0; s < inputLights.length; s++) {
        lightList.push(new light(inputLights[s], new color(255, 0, 0, 255))); // assume input color to be red
    }
    var newLight = new light({ "x": -2, "y": 4, "z": -0.5, "ambient": [1, 1, 1], "diffuse": [1, 1, 1], "specular": [1, 1, 1] }, new color(255, 255, 255, 255));
    lightList.push(newLight);

    var w = context.canvas.width;
    var h = context.canvas.height;
    var ns = 10;

    var imagedata = context.createImageData(w, h);
    // var lookup = new vector(0, 1, 0);
    // var lookat = new vector(0, 0, 1);
    var distance = 0.5;

    //console.log(lightList);

    var eyeLocation = new eye(lookfrom, lookat, lookup, distance, 1.0, 1.0);
    // console.log(eyeLocation);


    //console.log(sphereList);
    var world = new hitableList(sphereList, sphereList.length);
    for (var i = 0; i < w; i++) {// need to change to w
        for (var j = 0; j < h; j++) {//need to change to h
            var colorList = new Array();
            for (var s = 0; s < ns; s++) {
                var hRatio = 1.0 * (j + Math.random()) / h;
                // console.log(hRatio);
                var wRatio = 1.0 * (i + Math.random()) / w;
                //  console.log(wRatio);
                var ray = eyeLocation.get_ray(hRatio, wRatio);
                //  console.log(ray);
                var pixcelColor = colorObject(ray, world, lightList, eyeLocation.origin);
                //console.log(pixcelColor);
                colorList.push(pixcelColor);
            }
            var pixcelColorAverage = averageColor(colorList);
            drawPixel(imagedata, i, j, pixcelColorAverage);
            /*
            var hRatio = 1.0 * j / h;
            // console.log(hRatio);
            var wRatio = 1.0 * i / w;
            //  console.log(wRatio);
            var ray = eyeLocation.get_ray(hRatio, wRatio);
            //  console.log(ray);
            var pixcelColor = colorObject(ray, world, lightList, eyeLocation.origin);
            //console.log(pixcelColor);
            drawPixel(imagedata, i, j, pixcelColor);
            */
        }
    }
    context.putImageData(imagedata, 0, 0);
    /*
    for (var s = 0; s < inputSpheres.length; s++) {
        var cx = w * (sphereList[s].center).x; // sphere center x
        var cy = h * (sphereList[s].center).y; // sphere center y
        var sphereRadius = Math.round(w * (sphereList[s].center).r); // radius

        console.log(s);
        for (var i = 0; i < w; i++) {
            for (var j = 0; j < h; j++) {
                var wRatio = i / w;
                var hRatio = j / h;
                if (distanceSquare(wRatio, hRatio, sphereList[s])) {
                    drawPixel(imagedata, wRatio * w, hRatio * h, sphereList[s].color);
                }
            }
        }
    } // end for spheres
    */

} // end draw rand pixels in input spheres

// get infor from UI
function main() {
    // Get the canvas and context
    var canvas = document.getElementById("viewport");
    var context = canvas.getContext("2d");
    // look from
    var eyeLocationX = document.getElementById("eyeLocationX").value;
    var eyeLocationY = document.getElementById("eyeLocationY").value;
    var eyeLocationZ = document.getElementById("eyeLocationZ").value;
    var lookfrom = new vector(Number(eyeLocationX), Number(eyeLocationY), Number(eyeLocationZ));
    console.log(lookfrom);
    // lookup
    var lookUpX = document.getElementById("lookUpX").value;
    var lookUpY = document.getElementById("lookUpY").value;
    var lookUpZ = document.getElementById("lookUpZ").value;
    var lookup = new vector(Number(lookUpX), Number(lookUpY), Number(lookUpZ));
    console.log(lookup);
    //look at
    var lookAtX = document.getElementById("lookAtX").value;
    var lookAtY = document.getElementById("lookAtY").value;
    var lookAtZ = document.getElementById("lookAtZ").value;
    var lookat = new vector(Number(lookAtX), Number(lookAtY), Number(lookAtZ));
    console.log(lookat);
    // Create the image
    //drawRandPixels(context);
    // shows how to draw pixels

    drawPixelsInInputSpheres(context, lookfrom, lookup, lookat);
    // shows how to draw pixels and read input file

    //drawInputSpheresUsingArcs(context);
    // shows how to read input file, but not how to draw pixels
}
