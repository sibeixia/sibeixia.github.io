// import * as armstrong from './armstrong.js';

// document.getElementById("Armstrong").addEventListener("click", upload, false);
// document.getElementById("download").addEventListener("click", download, false);
var out = "";
var data = "";
var filename = "";
var method = "";
var DXF = [];
var SVG = [];
function filename_inital(pattern_mentod) {
    if (pattern_mentod == 'Armstrong') {
        filename = 'https://sxia2.github.io/projects_data/AutoPatternmaker/Armstrong.csv'
        method = 'armstrong'
    } else if (pattern_mentod == 'Others') {
        filename = 'https://sxia2.github.io/projects_data/AutoPatternmaker/test.csv'
        method = 'Others'
    } else {
        console.log('error in method...')
    }
    upload();
}
function upload() {
    document.getElementById('csvForm').innerHTML = "";
    d3.csv(filename, function (data) {
        for (var i = 0; i < data.length; i++) {
            // console.log(data[i].Name);
            // console.log(data[i].Age);
            out = document.getElementById('csvForm').innerHTML
            out += '<label for="fname">' + data[i].id + ': </label>';
            if (data[i].mandate == 0){
                out += '<input size="4" type="hidden" value="' + data[i].value + '">';
            }else{
                out += '<input size="4" value="' + data[i].value + '">';
            }
            
            out += '<br>';
            document.getElementById('csvForm').innerHTML = out;
        }
    });
}

function display() {
    data = [["id", "value"]];
    var f_value = d3.selectAll("#csvForm > input")[0];
    var f_id = d3.selectAll("#csvForm > label")[0];
    for (var i = 0; i < f_value.length; i++) {
        data.push([f_id[i].textContent, f_value[i].value]);
    }
    // console.log(data);
    if (method == 'armstrong') {
        console.log('identified as armstrong')
        var values = draw_armstrong(data);
        SVG = values.svgs
        DXF = values.dxfs
        // var target_svg = draw_armstrong();
        var t = document.querySelectorAll('div[id^="pattern"]');
        // console.log(t.length)
        for (var i = 0; i < t.length; i++) {
            // console.log(SVG[i])
            t[i].innerHTML = SVG[i];

        }
        var svg_all = document.querySelectorAll("svg");
        for (var i = 0; i < svg_all.length; i++) {
            svg_all[i].setAttribute("width", "50%");
            svg_all[i].setAttribute("height", "50%");
        }

        // document.getElementById('pattern').innerHTML = draw_armstrong();
    } else if (pattern_mentod == 'Others') {
        console.log('identified as others')
    } else {
        console.log('error in method...')
    }

    let element = document.getElementById("download");
    // let hidden = element.getAttribute("hidden");

    // if (hidden) {
    //     element.removeAttribute("hidden");
    //  } else {
    //     element.setAttribute("hidden", "hidden");
    //  }
    element.removeAttribute("hidden");
}

function download() {

    data = DXF
    console.log(data)
    // data = SVG

    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
    // http://et.engr.iupui.edu/~dskim/tutorials/misc/
    // var csvContent = "data:image/svg+xml,";
    var csvContent = "data:	image/vnd.dxf,";
    for (var i = 0; i < data.length; i++) {
        data[i] = data[i].replace('HEADER\n9', 'HEADER\n9\n$ACADVER\n1\nAC1009\n9') + '\n';
    }
    // console.log(data.replace('HEADER\n9', 'HEADER\n9\n$ACADVER\n1\nAC1009\n9'));

    var zip = new JSZip();
    var link_zip = document.createElement("a");
    var filenames = ['back_bodice', 'back_skirt', 'sleeve', 'front_bodice', 'front_skirt']

    for (var i = 0; i < 5; i++) {
        var txt = data[i];
        zip.file(filenames[i] + ".dxf", txt);
    }
    zip.generateAsync({
        type: "base64"
    }).then(function (content) {
        link_zip.setAttribute("href", "data:application/zip;base64," + content);
        link_zip.setAttribute("download", "patterns.zip");
        link_zip.click()
    });

}
