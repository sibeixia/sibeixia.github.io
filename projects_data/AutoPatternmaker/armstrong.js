function draw_armstrong(data) {
    // unit: inchF
    // temp read directly from the file
    // console.log(data)
    // darts preset intake
    // hip_girth-waist_girth: [front_1, front_2, back_1, back_2]

    var measurements = {};
    data.forEach(function (item) {
        // console.log(item)
        var name = item[0]
        measurements[name.substring(0, name.length - 2)] = parseFloat(item[1]);
    });
    console.log(measurements)
    var SVG = []
    var DXF = []
    console.log('drawing...')
    // https://maker.js.org/docs/basic-drawing/#It%27s%20Just%20JSON
    // var basics = require('basic.js');

    var armhole_front = 0;
    var armhole_back = 0;
    var svg_front_bodice, svg_back_bodice, svg_front_skirt, svg_back_skirt, svg_sleeve;
    var dxf_front_bodice, dxf_back_bodice, dxf_front_skirt, dxf_back_skirt, dxf_sleeve;

    var makerjs = require('makerjs');
    skirt_dart_amounts = { 'less_four': [0, 0, 0, 0], 'four': [0.5, 0, 0.75, 0], 'five': [0.5, 0, 1, 0], 'six': [0.5, 0, 0.625, 0.625], 'seven': [0.5, 0, 0.75, 0.75], 'eight': [0.375, 0.375, 0.875, 0.875], 'nine': [0.375, 0.375, 0.875, 0.875], 'ten': [0.5, 0.5, 1, 1], 'eleven': [0.625, 0.625, 1.125, 1.125], 'tweleve': [0.625, 0.625, 1.25, 1.25], 'thirteen': [0.625, 0.625, 1.375, 1.375], 'fourteen': [0.625, 0.625, 1.375, 1.375] }
    var hip_waist_difference = measurements.Hip - measurements.Waist
    // skirt darts amount
    // [front_firt, front_second, back_first, back_second]
    var darts = [0, 0, 0, 0]
    if (hip_waist_difference >= 3.5 && hip_waist_difference <= 4.5) {
        darts = skirt_dart_amounts.four
    } else if (hip_waist_difference >= 4.5 && hip_waist_difference <= 5.5) {
        darts = skirt_dart_amounts.five
    } else if (hip_waist_difference >= 5.5 && hip_waist_difference <= 6.5) {
        darts = skirt_dart_amounts.six
    } else if (hip_waist_difference >= 6.5 && hip_waist_difference <= 7.5) {
        darts = skirt_dart_amounts.seven
    } else if (hip_waist_difference >= 7.5 && hip_waist_difference <= 8.5) {
        darts = skirt_dart_amounts.eight
    } else if (hip_waist_difference >= 8.5 && hip_waist_difference <= 9.5) {
        darts = skirt_dart_amounts.nine
    } else if (hip_waist_difference >= 9.5 && hip_waist_difference <= 10.5) {
        darts = skirt_dart_amounts.ten
    } else if (hip_waist_difference >= 10.5 && hip_waist_difference <= 11.5) {
        darts = skirt_dart_amounts.eleven
    } else if (hip_waist_difference >= 11.5 && hip_waist_difference <= 12.5) {
        darts = skirt_dart_amounts.tweleve
    } else if (hip_waist_difference >= 12.5 && hip_waist_difference <= 13.5) {
        darts = skirt_dart_amounts.thirteen
    } else if (hip_waist_difference >= 13.5 && hip_waist_difference <= 14.5) {
        darts = skirt_dart_amounts.fourteen
    } else {
        darts = skirt_dart_amounts.fourteen
    }
    // #1
    // front bodice
    function draw_front_bodice(measurements) {
        console.log('front bodice...')

        var model_temp_shoulder = {
            paths: {
                line1: new makerjs.paths.Line([-measurements.Across_Shoulder_Front + 0.125, measurements.Full_Length_Front + 0.125 + 1], [-measurements.Across_Shoulder_Front + 0.125, measurements.Full_Length_Front + 0.125 - 5]),
                arc1: new makerjs.paths.Arc([0, 0], measurements.Shoulder_Slope_Front + 0.125, 90, 180)
            }
        };

        var shoulder_point = makerjs.path.intersection(model_temp_shoulder.paths.line1, model_temp_shoulder.paths.arc1).intersectionPoints[0];
        // console.log(shoulder_point)

        var model_temp_neck = {
            paths: {
                line1: new makerjs.paths.Line([-measurements.Across_Shoulder_Front + 0.125, measurements.Full_Length_Front + 0.125], [0, measurements.Full_Length_Front + 0.125]),
                arc1: new makerjs.paths.Arc(shoulder_point, measurements.Shoulder_Length, 0, 90)
            }
        };

        var neck_point = makerjs.path.intersection(model_temp_neck.paths.line1, model_temp_neck.paths.arc1).intersectionPoints[0];
        // console.log(neck_point)

        var model_temp_n_point = {
            paths: {
                line1: new makerjs.paths.Line([-0.25 - measurements.Bust_Arc, 0], [-0.25 - measurements.Bust_Arc, 10]),
                arc1: new makerjs.paths.Arc(neck_point, measurements.New_Strap + 0.125, 180, 270)
            }
        };

        var n_point = makerjs.path.intersection(model_temp_n_point.paths.line1, model_temp_n_point.paths.arc1).intersectionPoints[0];
        // console.log(n_point)
        var p_point = [n_point[0] - 1.25, n_point[1]]
        var o_point = [n_point[0], n_point[1] + measurements.Side_Length]
        var model_temp_p_prime_point = {
            paths: {
                line1: new makerjs.paths.Line(o_point, p_point),
                arc1: new makerjs.paths.Arc(o_point, measurements.Side_Length, 180, 270)
            }
        };

        var p_prime_point = makerjs.path.intersection(model_temp_p_prime_point.paths.line1, model_temp_p_prime_point.paths.arc1).intersectionPoints[0];
        // console.log(p_prime_point)

        var f_point = [-measurements.Dart_Placement_Front, -0.1875]
        var model_h_point = {
            paths: {
                line1: new makerjs.paths.Line(shoulder_point, [0, 0]),
                arc1: new makerjs.paths.Arc(shoulder_point, measurements.Bust_Depth, -90, 0)
            }
        };

        var h_point = makerjs.path.intersection(model_h_point.paths.line1, model_h_point.paths.arc1).intersectionPoints[0];
        // console.log(h_point)

        var bust_point = [-measurements.Bust_Span - 0.25, h_point[1]]

        var dart_length = makerjs.measure.pathLength(new makerjs.paths.Line(bust_point, f_point))
        var model_temp_r_point = {
            paths: {
                arc1: new makerjs.paths.Arc(p_point, measurements.Waist_Arc_Front + 0.25 - measurements.Dart_Placement_Front, -45, 15),
                arc2: new makerjs.paths.Arc(bust_point, dart_length, 180, 270)
            }
        };

        var r_point = makerjs.path.intersection(model_temp_r_point.paths.arc2, model_temp_r_point.paths.arc1).intersectionPoints[0];
        // console.log(r_point)

        var line1 = new makerjs.paths.Line(bust_point, f_point);
        var model_temp_f_prime_point = {
            paths: {
                line1_1: new makerjs.path.rotate(line1, -90, f_point),
                arc1: new makerjs.paths.Arc(f_point, 0.5, 0, 90)
            }
        };

        var f_prime_point = makerjs.path.intersection(model_temp_f_prime_point.paths.arc1, model_temp_f_prime_point.paths.line1_1).intersectionPoints[0];
        // console.log(f_prime_point)

        var waist_curve_1 = new makerjs.models.BezierCurve([[0, 0], [-0.5, 0], f_prime_point, f_point]);

        var line1 = new makerjs.paths.Line(p_prime_point, o_point);
        var model_temp_p_p_prime_point = {
            paths: {
                line1_1: new makerjs.path.rotate(line1, -90, p_prime_point),
                arc1: new makerjs.paths.Arc(p_prime_point, 0.5, -45, 45)
            }
        };

        var p_p_prime_point = makerjs.path.intersection(model_temp_p_p_prime_point.paths.arc1, model_temp_p_p_prime_point.paths.line1_1).intersectionPoints[0];
        // console.log(p_p_prime_point)


        var line1 = new makerjs.paths.Line(bust_point, r_point);
        var model_temp_r_prime_point = {
            paths: {
                line1_1: new makerjs.path.rotate(line1, 90, r_point),
                arc1: new makerjs.paths.Arc(r_point, 0.5, 90, 180)
            }
        };

        var r_prime_point = makerjs.path.intersection(model_temp_r_prime_point.paths.arc1, model_temp_r_prime_point.paths.line1_1).intersectionPoints[0];
        // console.log(r_prime_point)

        var waist_curve_2 = new makerjs.models.BezierCurve([p_prime_point, p_p_prime_point, r_prime_point, r_point]);


        var m_point_x = -measurements.Across_Chest - 0.25

        var line1 = new makerjs.paths.Line(neck_point, shoulder_point);
        var model_temp_shoulder_prime_point = {
            paths: {
                line1_1: new makerjs.path.rotate(line1, -90, shoulder_point),
                arc1: new makerjs.paths.Arc(shoulder_point, 1, -100, 0)
            }
        };

        var shoulder_prime_point = makerjs.path.intersection(model_temp_shoulder_prime_point.paths.arc1, model_temp_shoulder_prime_point.paths.line1_1).intersectionPoints[0];
        // console.log('shoulder_prime_point', shoulder_prime_point)

        var line1 = new makerjs.paths.Line(o_point, p_point);
        var model_temp_o_prime_point = {
            paths: {
                line1_1: new makerjs.path.rotate(line1, 90, o_point),
                arc1: new makerjs.paths.Arc(o_point, 1.5, -45, 45)
            }
        };

        var o_prime_point = makerjs.path.intersection(model_temp_o_prime_point.paths.arc1, model_temp_o_prime_point.paths.line1_1).intersectionPoints[0];
        // console.log(o_prime_point)

        m_prime_point = [m_point_x, o_point[1] + (shoulder_point[1] - o_point[1]) * 0.25]

        // console.log('m_prime', m_prime_point)

        var armhole = new makerjs.models.BezierCurve([o_point, o_prime_point, m_prime_point, shoulder_point]);
        armhole_front = makerjs.measure.modelPathLength(armhole);

        var line1 = new makerjs.paths.Line(shoulder_point, neck_point);
        var model_temp_neck_prime_point = {
            paths: {
                line1_1: new makerjs.path.rotate(line1, 90, neck_point),
                line2: new makerjs.paths.Line([0, measurements.Center_Length_Front], [neck_point[0], measurements.Center_Length_Front]),
            }
        };

        var neck_prime_point = makerjs.path.intersection(model_temp_neck_prime_point.paths.line2, model_temp_neck_prime_point.paths.line1_1).intersectionPoints[0];
        // console.log(neck_prime_point)


        var neck_mid_point = [(neck_point[0] + neck_prime_point[0]) / 2, (neck_point[1] + neck_prime_point[1]) / 2];
        // console.log('mid neck', neck_mid_point)

        var line1 = new makerjs.paths.Line(neck_mid_point, neck_point);
        var model_temp_neck_star_point = {
            paths: {
                line1_1: new makerjs.path.rotate(line1, 90, neck_mid_point),
                arc1: new makerjs.paths.Arc(neck_mid_point, 0.125, 180, 270)
            }
        };

        var neck_star_point = makerjs.path.intersection(model_temp_neck_star_point.paths.arc1, model_temp_neck_star_point.paths.line1_1).intersectionPoints[0];
        // console.log('neck star', neck_star_point)

        var neckline = new makerjs.models.BezierCurve([[0, measurements.Center_Length_Front], [(neck_point[0]) / 2 - 0.25, measurements.Center_Length_Front], neck_star_point, neck_point]);


        // TBC

        var model = {
            paths: {
                center: new makerjs.paths.Line([0, 0], [0, measurements.Center_Length_Front]),
                shoulder: new makerjs.paths.Line(shoulder_point, neck_point),
                side: new makerjs.paths.Line(o_point, p_prime_point),
                dart_1: new makerjs.paths.Line(bust_point, f_point),
                dart_2: new makerjs.paths.Line(bust_point, r_point),


            },
            models: {
                c1: waist_curve_1,
                c2: waist_curve_2,
                arm: armhole,
                neck: neckline
            }
        };
        var svg = makerjs.exporter.toSVG(model);
        var dxf = makerjs.exporter.toDXF(model, { usePOLYLINE: true, units: 'inch' })
        svg_front_bodice = svg
        dxf_front_bodice = dxf
    }

    // #2
    // back bodice
    function draw_back_bodice(measurements) {
        console.log('back bodice...')
        var f_point = [measurements.Back_Neck + 0.125, measurements.Full_Length_Back]
        var model_temp_shoulder_point = {
            paths: {
                line1: new makerjs.paths.Line([measurements.Across_Shoulder_Back, measurements.Full_Length_Back + 3], [measurements.Across_Shoulder_Back, measurements.Full_Length_Back - 5]),
                arc1: new makerjs.paths.Arc([0, 0], measurements.Shoulder_Slope_Back + 0.125, 0, 90)
            }
        };

        var shoulder_temp_point = makerjs.path.intersection(model_temp_shoulder_point.paths.arc1, model_temp_shoulder_point.paths.line1).intersectionPoints[0];
        // console.log(shoulder_temp_point)

        var line1 = new makerjs.paths.Line(shoulder_temp_point, f_point);
        var model_temp_shoulder_star_point = {
            paths: {
                line1_1: new makerjs.path.rotate(line1, 180, shoulder_temp_point),
                arc1: new makerjs.paths.Arc(shoulder_temp_point, 5, -90, 0)
            }
        };

        var shoulder_star_point = makerjs.path.intersection(model_temp_shoulder_star_point.paths.arc1, model_temp_shoulder_star_point.paths.line1_1).intersectionPoints[0];
        // console.log(shoulder_star_point)

        var model_temp_h_point = {
            paths: {
                line1: new makerjs.paths.Line(f_point, shoulder_star_point),
                arc1: new makerjs.paths.Arc(f_point, measurements.Shoulder_Length + 1.75, -90, 0)
            }
        };

        var h_point = makerjs.path.intersection(model_temp_h_point.paths.arc1, model_temp_h_point.paths.line1).intersectionPoints[0];
        // console.log(h_point)
        var i_point = [measurements.Dart_Placement_Back, -0.125]
        var k_point = [measurements.Dart_Placement_Back + 1.5, -0.125]
        var m_point = [measurements.Waist_Arc_Back + 1.75, -0.1875]

        var model_temp_n_point = {
            paths: {
                line1: new makerjs.paths.Line([measurements.Back_Arc + 0.75, 0], [measurements.Back_Arc + 0.75, 20]),
                arc1: new makerjs.paths.Arc(m_point, measurements.Side_Length, 0, 90)
            }
        };

        var n_point = makerjs.path.intersection(model_temp_n_point.paths.arc1, model_temp_n_point.paths.line1).intersectionPoints[0];
        // console.log('n_point', n_point)
        var mn_distance = makerjs.measure.pathLength(new makerjs.paths.Line(m_point, n_point))
        var o_point = [(i_point[0] + k_point[0]) / 2, mn_distance - 1]

        var line1 = new makerjs.paths.Line(o_point, i_point);
        var model_temp_i_prime_point = {
            paths: {
                line1_1: new makerjs.path.rotate(line1, 90, i_point),
                arc1: new makerjs.paths.Arc(i_point, 0.5, 120, 220)
            }
        };

        var i_prime_point = makerjs.path.intersection(model_temp_i_prime_point.paths.arc1, model_temp_i_prime_point.paths.line1_1).intersectionPoints[0];
        // console.log(i_prime_point)

        var waist_curve_1 = new makerjs.models.BezierCurve([[0, 0], [0.5, 0], i_prime_point, i_point]);
        var line1 = new makerjs.paths.Line(o_point, k_point);
        var model_temp_k_prime_point = {
            paths: {
                line1_1: new makerjs.path.rotate(line1, -90, k_point),
                arc1: new makerjs.paths.Arc(k_point, 0.5, -45, 45)
            }
        };

        var k_prime_point = makerjs.path.intersection(model_temp_k_prime_point.paths.arc1, model_temp_k_prime_point.paths.line1_1).intersectionPoints[0];
        // console.log(k_prime_point)
        var line1 = new makerjs.paths.Line(n_point, m_point);
        var model_temp_m_prime_point = {
            paths: {
                line1_1: new makerjs.path.rotate(line1, 90, m_point),
                arc1: new makerjs.paths.Arc(m_point, 0.5, 120, 220)
            }
        };

        var m_prime_point = makerjs.path.intersection(model_temp_m_prime_point.paths.arc1, model_temp_m_prime_point.paths.line1_1).intersectionPoints[0];
        // console.log(m_prime_point)
        var waist_curve_2 = new makerjs.models.BezierCurve([k_point, k_prime_point, m_prime_point, m_point]);


        var line1 = new makerjs.paths.Line([f_point, h_point]);
        var model_temp_neck_prime_point = {
            paths: {
                line1_1: new makerjs.path.rotate(line1, -90, f_point),
                line2: new makerjs.paths.Line([0, measurements.Center_Length_Back], [10, measurements.Center_Length_Back]),
            }
        };

        var neck_prime_point = makerjs.path.intersection(model_temp_neck_prime_point.paths.line2, model_temp_neck_prime_point.paths.line1_1).intersectionPoints[0];
        // console.log(neck_prime_point)
        // assume angle is 45 degrees
        // var neck_star_point = [neck_prime_point[0] - 0.375, neck_prime_point[1] + 0.375]
        // using the intersecting point as reference point directly
        var neckline = new makerjs.models.BezierCurve([[0, measurements.Center_Length_Back], [f_point[0] / 2, measurements.Center_Length_Back], neck_prime_point, f_point]);

        var line1 = new makerjs.paths.Line([m_point, n_point]);
        var model_temp_n_prime_point = {
            paths: {
                line1_1: new makerjs.path.rotate(line1, -90, n_point),
                arc1: new makerjs.paths.Arc(n_point, 0.5, 120, 220)
            }
        };

        var n_prime_point = makerjs.path.intersection(model_temp_n_prime_point.paths.arc1, model_temp_n_prime_point.paths.line1_1).intersectionPoints[0];
        // console.log(n_prime_point)

        var t_point_x = measurements.Across_Back + 0.25
        // console.log('t_point_x', t_point_x)
        var armhole = new makerjs.models.BezierCurve([n_point, n_prime_point, [t_point_x, n_prime_point[0] + 0.5 * (h_point[0] - n_prime_point[0])], h_point]);
        armhole_back = makerjs.measure.modelPathLength(armhole);

        var p_point = [(f_point[0] + h_point[0]) / 2, (f_point[1] + h_point[1]) / 2]

        var model_temp_q_point = {
            paths: {
                line1_1: new makerjs.paths.Line(p_point, o_point),
                arc1: new makerjs.paths.Arc(p_point, 3, 180, 310)
            }
        };
        var q_point = makerjs.path.intersection(model_temp_q_point.paths.arc1, model_temp_q_point.paths.line1_1).intersectionPoints[0];

        var model_temp_r_point = {
            paths: {
                line1_1: new makerjs.paths.Line(p_point, f_point),
                arc1: new makerjs.paths.Arc(p_point, 0.25, 90, 180)
            }
        };
        var r_point = makerjs.path.intersection(model_temp_r_point.paths.arc1, model_temp_r_point.paths.line1_1).intersectionPoints[0];

        var model_temp_r_opposit_point = {
            paths: {
                line1_1: new makerjs.paths.Line(p_point, h_point),
                arc1: new makerjs.paths.Arc(p_point, 0.25, -90, 90)
            }
        };
        var r_opposit_point = makerjs.path.intersection(model_temp_r_opposit_point.paths.arc1, model_temp_r_opposit_point.paths.line1_1).intersectionPoints[0];

        var line1 = new makerjs.paths.Line([q_point, r_point]);
        var model_temp_r_prime_point = {
            paths: {
                line1_1: new makerjs.path.rotate(line1, 180, r_point),
                arc1: new makerjs.paths.Arc(r_point, 0.125, 0, 180)
            }
        };

        var r_prime_point = makerjs.path.intersection(model_temp_r_prime_point.paths.arc1, model_temp_r_prime_point.paths.line1_1).intersectionPoints[0];
        // console.log(r_prime_point)

        var line1 = new makerjs.paths.Line([q_point, r_opposit_point]);
        var model_temp_r_opposit_prime_point = {
            paths: {
                line1_1: new makerjs.path.rotate(line1, 180, r_opposit_point),
                arc1: new makerjs.paths.Arc(r_opposit_point, 0.125, 0, 180)
            }
        };

        var r_opposit_prime_point = makerjs.path.intersection(model_temp_r_opposit_prime_point.paths.arc1, model_temp_r_opposit_prime_point.paths.line1_1).intersectionPoints[0];
        // console.log(r_opposit_prime_point)

        // TBC

        var model = {
            paths: {
                center: new makerjs.paths.Line([0, 0], [0, measurements.Center_Length_Back]),
                // shoulder: new makerjs.paths.Line(f_point, h_point),
                shoulder_1: new makerjs.paths.Line(f_point, r_prime_point),
                shoulder_2: new makerjs.paths.Line(r_opposit_prime_point, h_point),
                shoulder_dart_1: new makerjs.paths.Line(q_point, r_prime_point),
                shoulder_dart_2: new makerjs.paths.Line(r_opposit_prime_point, q_point),
                side: new makerjs.paths.Line(m_point, n_point),
                dart_1: new makerjs.paths.Line(o_point, i_point),
                dart_2: new makerjs.paths.Line(o_point, k_point),


            },
            models: {
                c1: waist_curve_1,
                c2: waist_curve_2,
                arm: armhole,
                neck: neckline
            }
        };
        var svg = makerjs.exporter.toSVG(model);
        var dxf = makerjs.exporter.toDXF(model, { usePOLYLINE: true, units: 'inch' })
        svg_back_bodice = svg
        dxf_back_bodice = dxf
    }

    // #3
    // front skirt
    // https://maker.js.org/docs/advanced-drawing/#content

    function draw_front_skirt(measurements) {
        console.log('front skirt ...')
        // console.log(measurements.Waist_To_Knee)
        var model_temp_side_waist = {
            paths: {
                line1: new makerjs.paths.Line([-measurements.Waist_Arc_Front - 0.25 - darts[0] - darts[1], 5], [-measurements.Waist_Arc_Front - 0.25 - darts[0] - darts[1], -5]),
                arc1: new makerjs.paths.Arc([-measurements.Hip_Arc_Front - 0.5, -measurements.Hip_Depth_Front], parseFloat(measurements.Side_Hip_Depth), 0, 135)
            }
        };

        var side_wasit_point = makerjs.path.intersection(model_temp_side_waist.paths.line1, model_temp_side_waist.paths.arc1).intersectionPoints[0];
        var side_curve = new makerjs.models.BezierCurve([[-measurements.Hip_Arc_Front - 0.5, -measurements.Hip_Depth_Front], [-measurements.Hip_Arc_Front - 0.5, -measurements.Hip_Depth_Front + 2], side_wasit_point]);

        var waist_curve_1 = new makerjs.models.BezierCurve([[0, 0], [-1, 0], [-measurements.Dart_Placement_Front, side_wasit_point[1] / 3]]);
        var waist_curve_2 = new makerjs.models.BezierCurve([[-measurements.Dart_Placement_Front - darts[0], side_wasit_point[1] / 3], [-measurements.Dart_Placement_Front - darts[0] - 0.5, side_wasit_point[1] / 3], [-measurements.Dart_Placement_Front - darts[0] - 1, 2 * side_wasit_point[1] / 3], [-measurements.Dart_Placement_Front - darts[0] - 1.5, 2 * side_wasit_point[1] / 3]]);
        var waist_curve_3 = new makerjs.models.BezierCurve([[-measurements.Dart_Placement_Front - darts[0] - 1.5 - darts[1], 2 * side_wasit_point[1] / 3], [-measurements.Dart_Placement_Front - darts[0] - 1.5 - darts[1] - 0.5, 2 * side_wasit_point[1] / 3], side_wasit_point]);

        var model = {
            paths: {
                center: new makerjs.paths.Line([0, 0], [0, -measurements.Waist_To_Knee]),
                hem: new makerjs.paths.Line([0, -measurements.Waist_To_Knee], [-measurements.Hip_Arc_Front - 0.5, -measurements.Waist_To_Knee]),
                side_line: new makerjs.paths.Line([-measurements.Hip_Arc_Front - 0.5, -measurements.Waist_To_Knee], [-measurements.Hip_Arc_Front - 0.5, -measurements.Hip_Depth_Front]),
                dart_leg_1_1: new makerjs.paths.Line([[-measurements.Dart_Placement_Front, side_wasit_point[1] / 3], [-measurements.Dart_Placement_Front - darts[0] / 2, side_wasit_point[1] / 3 - 3.5]]),
                dart_leg_1_2: new makerjs.paths.Line([[-measurements.Dart_Placement_Front - darts[0], side_wasit_point[1] / 3], [-measurements.Dart_Placement_Front - darts[0] / 2, side_wasit_point[1] / 3 - 3.5]]),
                dart_leg_2_1: new makerjs.paths.Line([[-measurements.Dart_Placement_Front - darts[0] - 1.5, 2 * side_wasit_point[1] / 3], [-measurements.Dart_Placement_Front - darts[0] - 1.5 - darts[1] / 2, 2 * side_wasit_point[1] / 3 - 3.5]]),
                dart_leg_2_2: new makerjs.paths.Line([[-measurements.Dart_Placement_Front - darts[0] - 1.5 - darts[1], 2 * side_wasit_point[1] / 3], [-measurements.Dart_Placement_Front - darts[0] - 1.5 - darts[1] / 2, 2 * side_wasit_point[1] / 3 - 3.5]])
            },
            models: {
                c0: side_curve,
                c1: waist_curve_1,
                c2: waist_curve_2,
                c3: waist_curve_3
            }
        };
        var svg = makerjs.exporter.toSVG(model);
        var dxf = makerjs.exporter.toDXF(model, { usePOLYLINE: true, units: 'inch' })
        svg_front_skirt = svg
        dxf_front_skirt = dxf
    }
    // #4
    // back skirt
    function draw_back_skirt(measurements) {
        console.log('back skirt ...')
        var model_temp_side_waist = {
            paths: {
                line1: new makerjs.paths.Line([measurements.Waist_Arc_Back + 0.25 + darts[2] + darts[3], 5], [measurements.Waist_Arc_Back + 0.25 + darts[2] + darts[3], -5]),
                arc1: new makerjs.paths.Arc([measurements.Hip_Arc_Back + 0.5, -measurements.Hip_Depth_Front], parseFloat(measurements.Side_Hip_Depth), 45, 180)
            }
        };

        var side_wasit_point = makerjs.path.intersection(model_temp_side_waist.paths.line1, model_temp_side_waist.paths.arc1).intersectionPoints[0];
        var side_curve = new makerjs.models.BezierCurve([[measurements.Hip_Arc_Back + 0.5, -measurements.Hip_Depth_Front], [measurements.Hip_Arc_Back + 0.5, -measurements.Hip_Depth_Front + 2], side_wasit_point]);

        var waist_curve_1 = new makerjs.models.BezierCurve([[0, -measurements.Hip_Depth_Front + measurements.Hip_Depth_Back], [1, -measurements.Hip_Depth_Front + measurements.Hip_Depth_Back], [measurements.Dart_Placement_Back, side_wasit_point[1] / 3]]);
        var waist_curve_2 = new makerjs.models.BezierCurve([[measurements.Dart_Placement_Front + darts[2], side_wasit_point[1] / 3], [measurements.Dart_Placement_Front + darts[2] + 0.5, side_wasit_point[1] / 3], [measurements.Dart_Placement_Front + darts[2] + 1, 2 * side_wasit_point[1] / 3], [measurements.Dart_Placement_Front + darts[2] + 1.5, 2 * side_wasit_point[1] / 3]]);
        var waist_curve_3 = new makerjs.models.BezierCurve([[measurements.Dart_Placement_Front + darts[2] + 1.5 + darts[3], 2 * side_wasit_point[1] / 3], [measurements.Dart_Placement_Front + darts[2] + 1.5 + darts[3] + 0.5, 2 * side_wasit_point[1] / 3], side_wasit_point]);
        // console.log('compute model length ...')
        // console.log(makerjs.measure.modelPathLength(waist_curve_3))
        // console.log('compute path length ...')
        // console.log(makerjs.measure.pathLength(new makerjs.paths.Line([0, 0], [1, 0])))
        var model = {
            paths: {
                center: new makerjs.paths.Line([0, -measurements.Hip_Depth_Front + measurements.Hip_Depth_Back], [0, -measurements.Waist_To_Knee]),
                hem: new makerjs.paths.Line([0, -measurements.Waist_To_Knee], [measurements.Hip_Arc_Back + 0.5, -measurements.Waist_To_Knee]),
                side_line: new makerjs.paths.Line([measurements.Hip_Arc_Back + 0.5, -measurements.Waist_To_Knee], [measurements.Hip_Arc_Back + 0.5, -measurements.Hip_Depth_Front]),
                dart_leg_1_1: new makerjs.paths.Line([[measurements.Dart_Placement_Back, side_wasit_point[1] / 3], [measurements.Dart_Placement_Front + darts[2] / 2, side_wasit_point[1] / 3 - 5.5]]),
                dart_leg_1_2: new makerjs.paths.Line([[measurements.Dart_Placement_Front + darts[2], side_wasit_point[1] / 3], [measurements.Dart_Placement_Front + darts[2] / 2, side_wasit_point[1] / 3 - 5.5]]),
                dart_leg_2_1: new makerjs.paths.Line([[measurements.Dart_Placement_Front + darts[2] + 1.5, 2 * side_wasit_point[1] / 3], [measurements.Dart_Placement_Front + darts[2] + 1.5 + darts[3] / 2, 2 * side_wasit_point[1] / 3 - 5.5]]),
                dart_leg_2_2: new makerjs.paths.Line([[measurements.Dart_Placement_Front + darts[2] + 1.5 + darts[3], 2 * side_wasit_point[1] / 3], [measurements.Dart_Placement_Front + darts[2] + 1.5 + darts[3] / 2, 2 * side_wasit_point[1] / 3 - 5.5]])
            },
            models: {
                c0: side_curve,
                c1: waist_curve_1,
                c2: waist_curve_2,
                c3: waist_curve_3
            }
        };
        var svg = makerjs.exporter.toSVG(model);
        var dxf = makerjs.exporter.toDXF(model, { usePOLYLINE: true, units: 'inch' })
        svg_back_skirt = svg
        dxf_back_skirt = dxf
    }


    // #5
    // sleeve
    function draw_sleeve(measurements) {
        console.log('sleeve...')
        var b_point = [0, 0];
        var a_point = [0, measurements.Sleeve_Length];
        var c_point = [0, measurements.Sleeve_Length - measurements.Cap_Height];
        var d_prime_point = [0, c_point[1] / 2 + 1];
        // console.log(armhole_front, armhole_back)
        var armhole_average = (armhole_back + armhole_front) / 2;
        // console.log('armhole averaged: ', armhole_average);
        var e_1 = [-measurements.Biceps / 2, c_point[1]]

        var model_temp_e_2_point = {
            paths: {
                line1_1: new makerjs.paths.Line(c_point, [-20, c_point[1]]),
                arc1: new makerjs.paths.Arc(a_point, armhole_average, 180, 270)
            }
        };
        var e_2 = makerjs.path.intersection(model_temp_e_2_point.paths.arc1, model_temp_e_2_point.paths.line1_1).intersectionPoints[0];
        var e_point = [(e_1[0] + e_2[0]) / 2, (e_1[1] + e_2[1]) / 2]
        // console.log(e_point);
        var f_point = [-e_point[0], e_point[1]];
        // var ob_distance = makerjs.measure.pathLength(new makerjs.paths.Line(c_point,e_point))-2
        var o_point = [e_point[0] + 2, 0];
        var p_point = [-e_point[0] - 2, 0];

        var g_point = [0.75 * e_point[0], e_point[1] + 0.25 * (a_point[1] - e_point[1])];
        var n_point = [-g_point[0], g_point[1]];
        var h_point = [0.5 * e_point[0], e_point[1] + 0.5 * (a_point[1] - e_point[1])];
        var m_point = [-h_point[0], h_point[1]];
        var k_point = [0.25 * e_point[0], e_point[1] + 0.75 * (a_point[1] - e_point[1])];
        var l_point = [-k_point[0], k_point[1]];

        function extend(rotate_point, reference_point, rotate_angle, angle_min, angle_max, distance) {
            var line1 = new makerjs.paths.Line([rotate_point, reference_point]);
            var model_temp = {
                paths: {
                    line1_1: new makerjs.path.rotate(line1, rotate_angle, rotate_point),
                    arc1: new makerjs.paths.Arc(rotate_point, distance, angle_min, angle_max)
                }
            };

            var return_point = makerjs.path.intersection(model_temp.paths.arc1, model_temp.paths.line1_1).intersectionPoints[0];
            return return_point;
        }
        var g_point_extend = extend(g_point, a_point, -90, -90, 0, 0.375);
        // console.log(g_point_extend)
        var h_point_extend = extend(h_point, a_point, 90, 90, 180, 0.25);
        var k_point_extend = extend(k_point, a_point, 90, 90, 180, 0.625);
        // console.log(k_point_extend)
        var n_point_extend = extend(n_point, a_point, 90, 180, 270, 0.5);
        var m_point_extend = extend(m_point, a_point, -90, 0, 90, 0.1875);
        var l_point_extend = extend(l_point, a_point, -90, 0, 90, 0.75);
        var e_point_extend = [e_point[0] + 1, e_point[1]]
        var f_point_extend = [f_point[0] - 1, f_point[1]]
        var a_point_extend_left = [a_point[0] - 1.5, a_point[1]]
        var a_point_extend_right = [a_point[0] + 1.5, a_point[1]]

        // console.log(l_point_extend)
        var armhole_1 = new makerjs.models.BezierCurve([e_point, e_point_extend, g_point_extend, h_point_extend]);
        var armhole_2 = new makerjs.models.BezierCurve([h_point_extend, k_point_extend, a_point_extend_left, a_point]);
        var armhole_3 = new makerjs.models.BezierCurve([a_point, a_point_extend_right, l_point_extend, m_point_extend]);
        var armhole_4 = new makerjs.models.BezierCurve([m_point_extend, n_point_extend, f_point_extend, f_point]);
        // var armhole_5 = new makerjs.models.BezierCurve([k_point_extend, a_point, l_point_extend]);

        var model_r_temp = {
            paths: {
                line1: new makerjs.paths.Line([d_prime_point, [e_point[0], d_prime_point[1]]]),
                line2: new makerjs.paths.Line([e_point, o_point])
            }
        };

        var r_point = makerjs.path.intersection(model_r_temp.paths.line1, model_r_temp.paths.line2).intersectionPoints[0];
        var s_point = [-r_point[0], r_point[1]]
        r_point = [r_point[0] - 0.25, r_point[1]]
        var t_point = [(r_point[0] + d_prime_point[0]) / 2, (r_point[1] + d_prime_point[1]) / 2]
        var model_u_temp = {
            paths: {
                arc1: new makerjs.paths.Arc(r_point, 1, 180, 360),
                arc2: new makerjs.paths.Arc(t_point, makerjs.measure.pathLength(new makerjs.paths.Line(t_point, r_point)), 180, 270)
            }
        };

        var u_point = makerjs.path.intersection(model_u_temp.paths.arc1, model_u_temp.paths.arc2).intersectionPoints[0];
        var v_point = [o_point[0] + 0.75, o_point[1]];
        var sp_distance = makerjs.measure.pathLength(new makerjs.paths.Line(s_point, p_point));
        var uv_distance = makerjs.measure.pathLength(new makerjs.paths.Line(u_point, v_point));
        var w_point;
        if (sp_distance > uv_distance) {
            var line1 = new makerjs.paths.Line([u_point, v_point]);
            var model_temp = {
                paths: {
                    line1_1: new makerjs.path.rotate(line1, 180, v_point),
                    arc1: new makerjs.paths.Arc(v_point, sp_distance - uv_distance, -180, 0)
                }
            };
            w_point = makerjs.path.intersection(model_temp.paths.arc1, model_temp.paths.line1_1).intersectionPoints[0];
        }
        else {
            var model_temp = {
                paths: {
                    line1: new makerjs.paths.Line([u_point, v_point]),
                    arc1: new makerjs.paths.Arc(u_point, sp_distance, -180, 0)
                }
            };
            w_point = makerjs.path.intersection(model_temp.paths.arc1, model_temp.paths.line1).intersectionPoints[0];
        }
        var op_distance = makerjs.measure.pathLength(new makerjs.paths.Line(o_point, p_point));
        var model_temp = {
            paths: {
                line1: new makerjs.paths.Line([[0, 0], [20, 0]]),
                arc1: new makerjs.paths.Arc(w_point, op_distance, -90, 90)
            }
        };
        var x_point = makerjs.path.intersection(model_temp.paths.arc1, model_temp.paths.line1).intersectionPoints[0];
        var underarm = new makerjs.models.BezierCurve([x_point, [s_point[0], s_point[1] - 1], s_point]);

        // TBC

        var model = {
            paths: {
                // center: new makerjs.paths.Line(b_point, a_point),
                // line1_1: new makerjs.paths.Line(c_point, e_point),
                underarm1_1: new makerjs.paths.Line(e_point, r_point),
                underarm1_2: new makerjs.paths.Line(r_point, t_point),
                underarm1_3: new makerjs.paths.Line(u_point, t_point),
                underarm1_4: new makerjs.paths.Line(u_point, w_point),
                opening: new makerjs.paths.Line(w_point, x_point),
                underarm2_1: new makerjs.paths.Line(f_point, s_point),
            },
            models: {
                arm_1: armhole_1,
                arm_2: armhole_2,
                arm_3: armhole_3,
                arm_4: armhole_4,
                underarm2_2: underarm,

            }
        };
        var svg = makerjs.exporter.toSVG(model);
        var dxf = makerjs.exporter.toDXF(model, { usePOLYLINE: true, units: 'inch' })
        svg_sleeve = svg
        dxf_sleeve = dxf
    }
    draw_front_bodice(measurements)
    draw_back_bodice(measurements)
    draw_front_skirt(measurements)
    draw_back_skirt(measurements)
    draw_sleeve(measurements)

    SVG.push(svg_back_bodice)
    SVG.push(svg_back_skirt)
    SVG.push(svg_sleeve)
    SVG.push(svg_front_bodice)
    SVG.push(svg_front_skirt)

    DXF.push(dxf_back_bodice)
    DXF.push(dxf_back_skirt)
    DXF.push(dxf_sleeve)
    DXF.push(dxf_front_bodice)
    DXF.push(dxf_front_skirt)
    // DXF.push(dxf_front_skirt)
    // console.log(SVG)
    // console.log(DXF)


    // for (var i = 0; i < 5; i++) {
    //     // console.log(i)
    //     SVG.push(svg);
    //     DXF.push(dxf);
    // }
    // // console.log(SVG)
    // // console.log(DXF)
    return {
        svgs: SVG,
        dxfs: DXF
    };


}
