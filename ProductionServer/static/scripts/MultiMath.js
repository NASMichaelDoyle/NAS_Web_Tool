// Global vars
const mu_p = 0.5;
let globalI = 0;
let US_C;
let BCT_C;
let CBS_C;
let boltgroupChart;
let CBS_C_set = false;
let hiddenChart1 = null;
let hiddenChart2 = null;
let hiddenChart3 = null;

startup();

function startup() {
	// Setup ellipse
	for (let i=0; i <= 360; i += 15) {
			document.getElementById("ellForm").querySelector("#eta" + i).children[0].innerHTML = i;
			document.getElementById("ellForm").querySelector("#eta" + i).children[1].innerHTML = (i*Math.PI/180).toFixed(3);
		}
		
	// Setup OFB
	document.getElementById("OFBForm").querySelector("#ASSIn").checked = false;
	document.getElementById("OFBForm").querySelector("#materialIn").value = "7475_T7351";
	document.getElementById("OFBForm").querySelector("#EcIn").value = 11.5;
	document.getElementById("OFBForm").querySelector("#FcyIn").value = 71;
	document.getElementById("OFBForm").querySelector("#muIn").value = 0.31;
	document.getElementById("OFBForm").querySelector("#ncIn").value = 19;
	document.getElementById("OFBForm").querySelector("#tIn").value = 0.06;
	document.getElementById("OFBForm").querySelector("#bIn").value = 1;
	document.getElementById("OFBForm").querySelector("#F0In").value = -1600;
	document.getElementById("OFBForm").querySelector("#FfIn").value = -40;
	document.getElementById("OFBForm").querySelector("#twebIn").value = 0.125;
	document.getElementById("OFBForm").querySelector("#HfrIn").value = 0.3;
	document.getElementById("OFBForm").querySelector("#LPRIn").value = 0.5;
	OFBcalcs();
	FPBSetCharts(document.getElementById("FPBForm").querySelector("#ETIn").value);
	//console.log("dbgSet() to set valid values for testing")
}
function degToRad(degs) {return Math.PI * degs / 180;}
function radToDeg(rads) {return 180 * rads / Math.PI;}
function sRound(num, sig) { // "Smart Round": Rounds a number if it is a number
	//console.log(num + ", type: " + typeof(num) + ", isNaN: " + isNaN(num) + ", is ES: " + (num === ""));
	if (!isNaN(Number(num))) num = Number(num);
	return (num === "" || isNaN(num)) ? num : +num.toFixed(sig);
}
function formMS(MS) {
	return MS > 2 ? "HIGH" : MS;
}

// Ellipse funcs 
let massPopChart;

function ellCalcs(){
	let xPoints = [];
    let yPoints = [];
    let storage = [];
	
	// Get inputs
	let fxp = +document.getElementById("ellForm").querySelector("#Fx").value;
    let fyp = +document.getElementById("ellForm").querySelector("#Fy").value;
    let fxyp = +document.getElementById("ellForm").querySelector("#Fxy").value;
    let Long_R = +document.getElementById("ellForm").querySelector("#LONG_DIA").value;
    let Short_R = +document.getElementById("ellForm").querySelector("#SHORT_DIA").value;
	// Check for NaN
	if (isNaN(fxp) || isNaN(fyp) || isNaN(fxyp) || isNaN(Long_R) || isNaN(Short_R)) {
		alert("Please enter numeric values");
		return;
	}
	
	// Iterate through relevant values
    for(var eta_deg=0; eta_deg <= 360; eta_deg += 15) {
    eta = eta_deg*Math.PI/180;
	// Unsure
    if (Short_R <= 1.0) { 
       Short_R = Long_R - 0.001;
    } else {
       //Short_R = Short_R;
    }
	// Unused?
//    var X = document.getElementById("X_LOC").value*1;
//    var Y = document.getElementById("Y_LOC").value*1;
    
	// Calculate values
	let x = 0.00;
    let y = 0.00;
    let c_o = Math.sqrt(Math.pow(Long_R,2)-Math.pow(Short_R,2));
    let epsilon_0 = Math.acosh(Long_R/Math.sqrt(Math.pow(Long_R,2)-Math.pow(Short_R,2)));
    epsilon = fn_epsilon(x,y,c_o,epsilon_0);
    let f1 = 0.5*(fxp+fyp)+Math.sqrt(Math.pow(0.5*(fxp-fyp),2)+Math.pow(fxyp,2));
    let f2 = 0.5*(fxp+fyp)-Math.sqrt(Math.pow(0.5*(fxp-fyp),2)+Math.pow(fxyp,2));
    lamda = f2/f1;
    //beta = tan12(fxp-fyp,2*fxyp)*0.5+Math.PI*0.5;
    //beta = tan12(2*fxyp/(fxp-fyp))*0.5;
    beta = tan12(fxp-fyp,2*fxyp)*0.5;
    cosh2e = Math.cosh(2 * epsilon);
    cosh2e0 = Math.cosh(2 * epsilon_0);
    cosh2n = Math.cosh(2 * eta);
    cosh2e_e0 = Math.cosh(2 * (epsilon - epsilon_0));
    sinh2e = Math.sinh(2 * epsilon);
    sinh2e0 = Math.sinh(2 * epsilon_0);
    sinh2e_e0 = Math.sinh(2 * (epsilon - epsilon_0));
    fe1 = 0.5 * (lamda - 1) * f1 * Math.exp(2 * epsilon_0) * Math.cos(2 * beta);
    fe2a = 0.5 * ((1 - lamda) * f1 * Math.exp(2 * epsilon_0)) / (cosh2e - Math.cos(2 * eta));
    fe2b = Math.sin(2 * beta) * Math.sin(2 * eta) + Math.cos(2 * beta) * (sinh2e + cosh2e0) - Math.cos(2 * (eta - beta)) * cosh2e_e0;
    fe3a = 0.5 * ((1 - lamda) * f1 * Math.exp(2 * epsilon_0)) / Math.pow((cosh2e - Math.cos(2 * eta)),2);
    fe3b = Math.sin(2 * beta) * Math.sin(2 * eta) * (cosh2e - cosh2e0) + Math.cos(2 * beta) * sinh2e * (Math.cos(2 * eta) - cosh2e0);
    fe4a = 0.5 * (1 + lamda) * f1 / Math.pow((cosh2e - Math.cos(2 * eta)),2);
    fe4b = sinh2e * (cosh2e - cosh2e0);
    fn1 = 0.5 * (lamda - 1) * f1 * Math.exp(2 * epsilon_0) * Math.cos(2 * beta);
    fn2a = 0.5 * ((1 - lamda) * f1 * Math.exp(2 * epsilon_0)) / (cosh2e - Math.cos(2 * eta));
    fn2b = Math.sin(2 * beta) * Math.sin(2 * eta) + Math.cos(2 * beta) * (sinh2e - cosh2e0) + cosh2e_e0 * Math.cos(2 * (eta - beta));
    fn3a = -0.5 * (1 - lamda) * f1 * Math.exp(2 * epsilon_0) / Math.pow((cosh2e - Math.cos(2 * eta)),2);
    fn3b = Math.sin(2 * beta) * Math.sin(2 * eta) * (cosh2e - cosh2e0) + Math.cos(2 * beta) * sinh2e * (Math.cos(2 * eta) - cosh2e0);
    fn4a = 0.5 * (1 + lamda) * f1 / Math.pow((cosh2e - Math.cos(2 * eta)),2);
    fn4b = sinh2e * (cosh2e + cosh2e0 - 2 * Math.cos(2 * eta));
    ten1a = 0.5 * (1 - lamda) * f1 * Math.exp(2 * epsilon_0) / Math.pow((cosh2e - Math.cos(2 * eta)),2);ten1b = (cosh2e - Math.cos(2 * eta));
    ten1c = (sinh2e_e0 * Math.sin(2 * (eta - beta)) - sinh2e0 * Math.sin(2 * beta));
    ten1d = -1.0*(Math.sin(2 * beta) * sinh2e * (Math.cos(2 * eta) - cosh2e0) + Math.cos(2 * beta) * Math.sin(2 * eta) * (cosh2e0 - cosh2e));
    ten2a = -0.5 * (1 + lamda) * f1 / Math.pow((cosh2e - Math.cos(2 * eta)),2);
    ten2b = Math.sin(2 * eta) * (cosh2e0 - cosh2e);   
    i = eta_deg / 360;
	// Consolidate into f's
    let f_e = fe1 + fe2a * fe2b + fe3a * fe3b + fe4a * fe4b;
    let f_n = fn1 + fn2a * fn2b + fn3a * fn3b + fn4a * fn4b;
    let f_ne = ten1a * ten1b * ten1c + ten1a * ten1d + ten2a * ten2b;
	// Create point arrays for chart
    yPoints[i] = eta_deg;
    xPoints[i] = f_n;
    x = xPoints[i];
    y = yPoints[i];
    let json = {x: y, y: x};
    storage.push(json); 
	
	// Update row
	document.getElementById("ellForm").querySelector("#eta" + eta_deg).children[2].innerHTML = f_e.toFixed(3);
	document.getElementById("ellForm").querySelector("#eta" + eta_deg).children[3].innerHTML = f_n.toFixed(3);
	document.getElementById("ellForm").querySelector("#eta" + eta_deg).children[4].innerHTML = f_ne.toFixed(3);
	
	// Update LaTeX table
	/* tRow = String(eta_deg) + " & " + eta.toFixed(3) + " & " + f_e.toFixed(3) + " & " + f_n.toFixed(3) + " & " + f_ne.toFixed(3) + "\\\\\\hline";
	if (eta_deg < 360) tRow += "\n{TLH!}";
	texElem.value = texElem.value.replace("{TLH!}", tRow);
    } */
	
	// Create chart
    Chart.defaults.elements.point.pointStyle = 'circle';
    Chart.defaults.elements.point.backgroundColor = 'red';
    Chart.defaults.elements.point.radius = 5;
    Chart.defaults.color = 'black'; 
	const myCanvas = document.getElementById('myChart');
	if (massPopChart) {
        massPopChart.destroy();
		massPopChart = null;
    }
    massPopChart = new Chart(myCanvas, {
        type: 'scatter',
        pointBackgroundColor: 'red',
        data: {
              datasets: [{label: 'Ellipse', data: storage}],
              },
        });
	massPopChart.update();
}
}
function fn_epsilon(x,y,c_o,eps0) {
     var epsa = eps0;
     do {
       epsa += 0.00001;
       c_e = Math.cosh(epsa);
       s_e = Math.sinh(epsa);
       err = (Math.pow(x,2)/Math.pow(c_o*c_e,2)+Math.pow(y,2)/Math.pow(c_o*s_e,2))-1;
     } 
     while (err>0.001) ;
     return epsa;
   }
function rounder_three(x) {
     return Number.parseFloat(x).toFixed(3);
}
function tan12(x, y) {
       var tan_12_degree = Math.atan2(y, x);
       return tan_12_degree;
}

// Tension Clip funcs
function TCCalcs() {
	// Get input
	let CType = document.getElementById("TCForm").querySelector("#CTIn").value;
	let t = +document.getElementById("TCForm").querySelector("#tIn").value;
	let c = +document.getElementById("TCForm").querySelector("#cIn").value;
	let Fcy = +document.getElementById("TCForm").querySelector("#FcyIn").value;
	let s = +document.getElementById("TCForm").querySelector("#PSIn").value; // Point space
	let w = +document.getElementById("TCForm").querySelector("#AWIn").value; // Angle width
	let n = +document.getElementById("TCForm").querySelector("#PCIn").value; // Point count
	
	const outBox = document.getElementById("OutputBox");
	
	// Check for NaN
	if (isNaN(t) || isNaN(c) || isNaN(Fcy) || isNaN(s) || isNaN(w) || isNaN(n)) {
		//console.log("NaN detected");
		return;
	}
	//console.log(t);
	let P;
	switch (CType) {
		case "SCSA":
			P = SheTen(t, c, Fcy, 1);
			break;
		case "SEA":
			P = ExtTen(t, c, Fcy, 1);
			break;
		case "DCSA":
			P = SheTen(t, c, Fcy, 2.5);
			break;
		case "DEA":
			P = ExtTen(t, c, Fcy, 2.5);
			break;
		case "Tee":
			P = ExtTen(t, c, Fcy, 3);
			break;
		default:
			P = "error"
			break;
	}
	if (isNaN(P)) outBox.innerHTML = P;
	else if (s <= 1) outBox.innerHTML = (P * w).toFixed(0);
	else outBox.innerHTML = (P * n).toFixed(0);
}
function Fig4_1Data(t, c, Fcy) {
	let a, b;
	switch (t) {
		case 0.02:
			a = 10.017;
			b = -1.048;
			break;
		case 0.032:
			a = 26.61;
			b = -1.052;
			break;
		case 0.04:
			a = 42.911;
			b = -1;
			break;
		case 0.05:
			a = 65.479;
			b = -1.035;
			break;
		case 0.063:
			a = 104.05;
			b = -1.023;
			break;
		case 0.071:
			a = 133.55;
			b = -1.015;
			break;
		case 0.08:
			a = 170.1;
			b = -1.005;
			break;
		case 0.09:
			a = 214.51;
			b = -1.006;
			break;
		case 0.1:
			a = 266.07
			b = -1.002;
			break;
		default:
			a=0;
			b=0;
			break;
	}
	return a * c ** b * Fcy / 40;
}
function Fig4_2Data(t, c, Fcy) {
	let a, b;
    switch (t) {
        case 0.06:
            a = 88.505;
            b = -0.964;
			break;
        case 0.09:
            a = 198.46;
            b = -0.992;
			break;
        case 0.125:
            a = 381.38;
            b = -0.999;
			break;
        case 0.16:
            a = 626.12;
            b = -1.018;
			break;
        case 0.2:
            a = 988.43;
            b = -1.013;
			break;
        case 0.25:
            a = 1555.7;
            b = -1.021;
			break;
        default:
            a = 0;
            b = 0;
			break;
    }
    return a * c ** b * Fcy / 42
}
function ExtTen(t, c, Fcy, fac) {
	let P1, P2, t1, t2;
    if (t < 0.06 || t > 0.25) return "Out of range";
	if (t <= 0.09) {
        t1 = 0.06;
        t2 = 0.09;
	} else if (t <= 0.125) {
        t1 = 0.09;
        t2 = 0.125;
    } else if (t <= 0.16) {
        t1 = 0.125;
        t2 = 0.16;
    } else if (t <= 0.2) {
        t1 = 0.16;
        t2 = 0.2;
	} else if (t <= 0.25) {
        t1 = 0.2;
        t2 = 0.25;
    }
    P1 = Fig4_2Data(t1, c, Fcy);
    P2 = Fig4_2Data(t2, c, Fcy);
    return ((t ** 2 - t1 ** 2) / (t2 ** 2 - t1 ** 2) * (P2 - P1) + P1) * fac;
}
function SheTen(t, c, Fcy, fac) {
	let P1, P2, t1, t2;
    
	if (t < 0.02 || t > 0.1) return "Out of range";
    if (t <= 0.032) {
        t1 = 0.02;
        t2 = 0.032;
    } else if (t <= 0.04) {
        t1 = 0.032;
        t2 = 0.04;
	} else if (t <= 0.05) {
        t1 = 0.04;
        t2 = 0.05;
    } else if (t <= 0.063) {
        t1 = 0.05;
        t2 = 0.063;
    } else if (t <= 0.071) {
        t1 = 0.063;
        t2 = 0.071;
    } else if (t <= 0.08) {
        t1 = 0.071;
        t2 = 0.08;
    } else if (t <= 0.09) {
        t1 = 0.08;
        t2 = 0.09;
    } else if (t <= 0.1) {
        t1 = 0.09;
        t2 = 0.1;
    }
	P1 = Fig4_1Data(t1, c, Fcy);
    P2 = Fig4_1Data(t2, c, Fcy);
    return ((t ** 2 - t1 ** 2) / (t2 ** 2 - t1 ** 2) * (P2 - P1) + P1) * fac;
}

// Crippling funcs
function cripCalcs(bending) {
	// Get input
	let parent;
	if (!bending) parent = document.getElementById("cripForm").querySelector("#crippling");
	else parent = document.getElementById("bCripForm").querySelector("#bendingCrippling");
	
	// Idea: iterate through table rows and store data in array
	let Fcy = +parent.querySelector("#FcyIn").value;
	let Ec = +parent.querySelector("#EcIn").value;
	let Type1;
	let Type2;
	let b1 = +parent.querySelector("#b1In").value;
	let b2 = +parent.querySelector("#b2In").value;
	let t1 = +parent.querySelector("#t1In").value;
	let t2 = +parent.querySelector("#t2In").value;
	let Edges1 = +parent.querySelector("#E1In").value;
	let Edges2 = +parent.querySelector("#E2In").value;
	let Ybar1;
	let Ybar2;
	if (bending) {
		Type1 = parent.querySelector("#TypeIn1").value;
		Type2 = parent.querySelector("#TypeIn2").value;
		Ybar1 = +parent.querySelector("#Ybar1In").value;
		Ybar2 = +parent.querySelector("#Ybar2In").value;
	}
	
	// Check for NaN
	for (const elem of [Fcy, Ec, b1, b2, t1, t2, Edges1, Edges2]) if (Number.isNaN(elem)) {
		console.log("NaN detected");
		return;
	}
		
	if (!bending) {
		let A1 = (b1 * t1);
		let A2 = (b2 * t2);
		let Fcc1 = Math.min(Fcy, Fcy * (Edges1 == 0 ? 1.3934 : 0.5693) * (t1 == 0 ? 0 : Math.pow(Math.sqrt(Fcy / Ec) * b1 / t1, (Edges1 == 0 ? -0.8184 : -0.8127))));
		let Fcc2 = Math.min(Fcy, Fcy * (Edges2 == 0 ? 1.3934 : 0.5693) * (t2 == 0 ? 0 : Math.pow(Math.sqrt(Fcy / Ec) * b2 / t2, (Edges2 == 0 ? -0.8184 : -0.8127))));
		let FccA1 = A1 * Fcc1;
		let FccA2 = A2 * Fcc2;
		let PccT = FccA1 + FccA2;
		let FccT = PccT / (A1 + A2);
		
		parent.querySelector("#Area1").innerHTML = A1.toFixed(4);
		parent.querySelector("#Area2").innerHTML = A2.toFixed(4);
		parent.querySelector("#Fcc1").innerHTML = Fcc1.toFixed(0)
		parent.querySelector("#Fcc2").innerHTML = Fcc2.toFixed(0)
		parent.querySelector("#FccA1").innerHTML = FccA1.toFixed(0);
		parent.querySelector("#FccA2").innerHTML = FccA2.toFixed(0);
		parent.querySelector("#FccOut").innerHTML = FccT.toFixed(0);
		parent.querySelector("#PccOut").innerHTML = PccT.toFixed(0);
	} else {
		for (const elem of [Type1, Type2, Ybar1, Ybar2]) if (Number.isNaN(elem)) {
			console.log("NaN detected");
			return;
		}
		
		let Fcc = [];
		let Yi = [];
		let Mo = [];
		let MAM = 0;
		
		//console.log(Type1 + " is 'Web': " + (Type1 == "Web"));
		Fcc[0] = Math.min(Fcy, Fcy * (Edges1 == 0 ? 1.3934 : 0.5693) * (t1 == 0 ? 0 : Math.pow(Math.sqrt(Fcy / Ec) * b1 / t1, (Edges1 == 0 ? -0.8184 : -0.8127))));
		Fcc[1] = Math.min(Fcy, Fcy * (Edges2 == 0 ? 1.3934 : 0.5693) * (t2 == 0 ? 0 : Math.pow(Math.sqrt(Fcy / Ec) * b2 / t2, (Edges2 == 0 ? -0.8184 : -0.8127))));
		Yi[0] = Type1 == "Web" ? 4 * Ybar1 / 3 : Ybar1;
		Yi[1] = Type2 == "Web" ? 4 * Ybar2 / 3 : Ybar2;
		Mo[0] = 2 * b1 * t1 * Fcc[0] * Yi[0];
		Mo[1] = 2 * b2 * t2 * Fcc[1] * Yi[1];
		for (let i = 0; Mo[i] != undefined; i++) MAM += Mo[i];
		
		parent.querySelector("#Fcc1").innerHTML = Fcc[0].toFixed(0);
		parent.querySelector("#Fcc2").innerHTML = Fcc[1].toFixed(0);
		parent.querySelector("#Yi1").innerHTML = Yi[0].toFixed(4)
		parent.querySelector("#Yi2").innerHTML = Yi[1].toFixed(4)
		parent.querySelector("#Mo1").innerHTML = Mo[0].toFixed(0);
		parent.querySelector("#Mo2").innerHTML = Mo[1].toFixed(0);
		parent.querySelector("#MAMOut").innerHTML = MAM.toFixed(0);
	}
}

// OFB funcs
function OFBcalcs() {
	// Get input
	let ASS = document.getElementById("OFBForm").querySelector("#ASSIn").checked;
	let mater = document.getElementById("OFBForm").querySelector("#materialIn").value;
	let Ec = +document.getElementById("OFBForm").querySelector("#EcIn").value;
	let Fcy = +document.getElementById("OFBForm").querySelector("#FcyIn").value;
	let mu = +document.getElementById("OFBForm").querySelector("#muIn").value;
	let nc = +document.getElementById("OFBForm").querySelector("#ncIn").value;
	let t = +document.getElementById("OFBForm").querySelector("#tIn").value;
	let b = +document.getElementById("OFBForm").querySelector("#bIn").value;
	let F0 = +document.getElementById("OFBForm").querySelector("#F0In").value;
	let Ff = +document.getElementById("OFBForm").querySelector("#FfIn").value;
	let tWeb = +document.getElementById("OFBForm").querySelector("#twebIn").value;
	let Hfr = +document.getElementById("OFBForm").querySelector("#HfrIn").value;
	let LPR = +document.getElementById("OFBForm").querySelector("#LPRIn").value;
	
	
	// Check for NaN
	for (const elem of [Ec, Fcy, mu, nc, t, b, F0, Ff, tWeb, Hfr, LPR]) if (Number.isNaN(elem)) {
		//console.log("NaN detected");
		return;
	}
	const F0_Ff = (F0/Ff<-1 && Ff<1) ? -1.00000000001 : F0/Ff;
	[K, Et, Es, eta, mu_c, Fofb] = fofb(b, t, Ec*1000000, nc, mu, Fcy*1000, F0, Ff, tWeb, Hfr, LPR, ASS);
	MS = Ff > 0 ? "Tension" : Fofb / -(F0_Ff > 3 ? F0/3 : Ff) - 1;
	
	document.getElementById("OFBForm").querySelector("#FoFfOut").innerHTML = !isNaN(F0_Ff) ? F0_Ff.toFixed(2) : F0_Ff;
	document.getElementById("OFBForm").querySelector("#KOut").innerHTML = !isNaN(K) ? K.toFixed(3) : K;
	document.getElementById("OFBForm").querySelector("#EtOut").innerHTML = !isNaN(Et) ? Et.toFixed(0) : Et;
	document.getElementById("OFBForm").querySelector("#EsOut").innerHTML = !isNaN(Es) ? Es.toFixed(0) : Es;
	document.getElementById("OFBForm").querySelector("#etaOut").innerHTML = !isNaN(eta) ? eta.toFixed(3) : eta;
	document.getElementById("OFBForm").querySelector("#mu_cOut").innerHTML = !isNaN(mu_c) ? mu_c.toFixed(3) : mu_c;
	document.getElementById("OFBForm").querySelector("#FofbOut").innerHTML = !isNaN(Fofb) ? Fofb.toFixed(0) : Fofb;
	document.getElementById("OFBForm").querySelector("#MSOut").innerHTML = !isNaN(MS) ? MS.toFixed(2) : MS;
}
function fofb(b, t, E, nc, mu_e, Fcy, fo, Ff, t_web, H_fr, L_ratio, check) {
//Outstanding Flange Buckling Allowable

if (Ff > 0) {
	alert("Tension");
	return;
}
if (fo / Ff < -1) fo = -Ff;
//x = fo / Ff
//K = 1.37229062136157E-03 * x ^ 6 - 4.09851223586251E-03 * x ^ 5 + 5.4998223836785E-03 * x ^ 4 - 2.09295671857866E-02 * x ^ 3 + 6.55961398957726E-02 * x ^ 2 - 0.169818446791513 * x + 0.506555508080401
if (check) mu_c = 0;
else {
    if (fo / Ff > 3) mu_c = 0;
    else mu_c = ((t_web ^ 3) / (t ^ 3)) * (1 - mu_e ^ 2) * (b / H_fr) * L_ratio;
}
K = kreduc(fo, Ff, mu_c);

diff = 1;
f = 0;
do {
  f = f + 10;
  Et = ETangent(f, Fcy, E, nc); // Assuming ETangent is defined
  Es = secant_modulus(E, nc, f, Fcy); // Assuming secant_modulus is defined
  mu = Es / E * mu_e + (1 - Es / E) * mu_p;
  n = Es / E * (1 - mu_e ** 2) / (1 - mu ** 2) * (0.5 + 0.25 * Math.sqrt(1 + 3 * Et / Es));
  f1 = n * K * E * 0.91 / (1 - mu_e ** 2) * (t / b) ** 2;
  diff = (f - f1) / f;
  if (f > 10 * Fcy) {
	  alert("Error No Convergence");
	  return;
  }
} while (Math.abs(diff) > 0.005);

if (f > Fcy) f = Fcy;
return [K, Et, Es, n, mu_c, f];
}
function secant_modulus(E, nc, f, F02) {
//Calculate the secant modulus for a given stress
return f / (f / E + 0.002 * (f / F02) ** nc);
}
function ETangent(f, Fcy, E, nc) {
//Tangent modulus based on MMPDS-01 page 1-37
return f / (f / E + 0.002 * nc * (f / Fcy) ** nc);
}
function INTER(X_1, X_2, X_3, Y_1, Y_3) {
if (isNaN(X_1) || isNaN(X_2) || isNaN(X_3) || isNaN(Y_1) || isNaN(Y_3)) return "Param";
return Y_1 + (X_2 - X_1) * (Y_3 - Y_1) / (X_3 - X_1);
}
function kreduc(F0, Ff, mu_c) {
	// ****Outer Flange Buckling****
	let klow, khigh;
	try {
		let F0overFF = F0 / Ff;
		if (F0overFF < -1) F0overFF = -1;
		if (F0overFF > 3) F0overFF = 3;
		if (mu_c < 0) return Math.exp(-0.683860897893 - 0.339191529252 * F0overFF + 0.07605391224 * F0overFF ** 2 - 0.016521289236 * F0overFF ** 3);
		else if (mu_c <= 0.02) {
			klow = Math.exp(-0.683860897893 - 0.339191529252 * F0overFF + 0.07605391224 * F0overFF ** 2 - 0.016521289236 * F0overFF ** 3);
			khigh = Math.exp(-0.63071341 - 0.33298203 * F0overFF + 0.07185505 * F0overFF ** 2 - 0.01527279 * F0overFF ** 3);
			return INTER(0, mu_c, 0.02, klow, khigh);
		} else if (mu_c <= 0.1) {
			klow = Math.exp(-0.63071341 - 0.33298203 * F0overFF + 0.07185505 * F0overFF ** 2 - 0.01527279 * F0overFF ** 3);
			khigh = Math.exp(-0.46458328 - 0.31096779 * F0overFF + 0.05659359 * F0overFF ** 2 - 0.0063054 * F0overFF ** 3);
			return INTER(0.02, mu_c, 0.1, klow, khigh);
		} else if (mu_c <= 0.5) {
			klow = Math.exp(-0.46458328 - 0.31096779 * F0overFF + 0.05659359 * F0overFF ** 2 - 0.0063054 * F0overFF ** 3);
			khigh = Math.exp(-0.2743567 - 0.28516328 * F0overFF + 0.0394972 * F0overFF ** 2 - 0.00317364 * F0overFF ** 3);
			return INTER(0.1, mu_c, 0.5, klow, khigh);
		} else if (mu_c <= 1) {
			klow = Math.exp(-0.2743567 - 0.28516328 * F0overFF + 0.0394972 * F0overFF ** 2 - 0.00317364 * F0overFF ** 3);
			khigh = Math.exp(-0.17252857 - 0.2822391 * F0overFF + 0.03473898 * F0overFF ** 2 + 0.0000735869257 * F0overFF ** 3);
			return INTER(0.5, mu_c, 1, klow, khigh);
		} else if (mu_c <= 2) {
			klow = Math.exp(-0.17252857 - 0.2822391 * F0overFF + 0.03473898 * F0overFF ** 2 + 0.0000735869257 * F0overFF ** 3);
			khigh = Math.exp(-0.04217877 - 0.25479548 * F0overFF + 0.03363142 * F0overFF ** 2 - 0.00408312 * F0overFF ** 3);
			return INTER(1, mu_c, 2, klow, khigh);
		} else if (mu_c <= 5) {
			klow = Math.exp(-0.04217877 - 0.25479548 * F0overFF + 0.03363142 * F0overFF ** 2 - 0.00408312 * F0overFF ** 3);
			khigh = Math.exp(0.09591991 - 0.24238885 * F0overFF + 0.02767021 * F0overFF ** 2 - 0.00109387 * F0overFF ** 3);
			return INTER(2, mu_c, 5, klow, khigh);
		} else if (mu_c <= 10) {
			klow = Math.exp(0.09591991 - 0.24238885 * F0overFF + 0.02767021 * F0overFF ** 2 - 0.00109387 * F0overFF ** 3);
			khigh = Math.exp(0.17969052 - 0.2314252 * F0overFF + 0.028536 * F0overFF ** 2 - 0.0033221 * F0overFF ** 3);
			return INTER(5, mu_c, 10, klow, khigh);
		} else if (mu_c <= 20) {
			klow = Math.exp(0.17969052 - 0.2314252 * F0overFF + 0.028536 * F0overFF ** 2 - 0.0033221 * F0overFF ** 3);
			khigh = Math.exp(0.23718303 - 0.22333131 * F0overFF + 0.02959469 * F0overFF ** 2 - 0.00532874 * F0overFF ** 3);
			return INTER(10, mu_c, 20, klow, khigh);
		} else if (mu_c <= 50) {
			klow = Math.exp(0.23718303 - 0.22333131 * F0overFF + 0.02959469 * F0overFF ** 2 - 0.00532874 * F0overFF ** 3);
			khigh = Math.exp(0.28648975 - 0.21774011 * F0overFF + 0.03091645 * F0overFF ** 2 - 0.00597304 * F0overFF ** 3);
			return INTER(20, mu_c, 50, klow, khigh);
		} else if (mu_c <= 100000000) {
			klow = Math.exp(0.28648975 - 0.21774011 * F0overFF + 0.03091645 * F0overFF ** 2 - 0.00597304 * F0overFF ** 3);
			khigh = Math.exp(0.32275356 - 0.21964679 * F0overFF + 0.0267197 * F0overFF ** 2 - 0.00415425 * F0overFF ** 3);
			return INTER(50, mu_c, 100000000, klow, khigh);
		} else if (mu_c > 100000000) return Math.exp(0.32275356 - 0.21964679 * F0overFF + 0.0267197 * F0overFF ** 2 - 0.00415425 * F0overFF ** 3);
		else return "There is a problem";
	} catch {
		console.log("kreduc Error!");
	} 
}

// FPB funcs
function FPBCalcs() {
	// Set charts
	FPBSetCharts(document.getElementById("FPBForm").querySelector("#ETIn").value);
	
	// Get input
	let ET = GEBID("FPBForm", "ETIn").value;
	let fs = GEBID("FPBForm", "fsIn").value;
	let a = GEBID("FPBForm", "aIn").value;
	let b = GEBID("FPBForm", "bIn").value;
	let t = GEBID("FPBForm", "tIn").value;
	let Ec = GEBID("FPBForm", "EcIn").value;
	let nu = GEBID("FPBForm", "nuIn").value;
	let f1 = GEBID("FPBForm", "f1In").value;
	let f2 = GEBID("FPBForm", "f2In").value;
	
	for (const elem of [fs, a, b, t, Ec, nu, f1, f2]) if (Number.isNaN(elem)) {
		//console.log("Nope");
		return;
	}
	
	let Ks = ESDU_71005(ET, a/b);
	let Fscr = (Ks * Math.PI ** 2 * Ec * (t / b) ** 2)/12/(1 - nu ** 2);
	let MS_SBA = Fscr/fs - 1;
	
	let Kc = ESDU_S020404(f2/f1, a/b);
	let Fcr = Math.PI ** 2 * Kc * Ec * (t / b) ** 2 / 12 / (1 - nu ** 2);
	let MS_CBA = Fcr / Math.max(Math.abs(f1), Math.abs(f2)) - 1;
	
	let fsFscr = Math.abs(fs)/Fscr;
	let f1Fcr = Math.abs(f1)/Fcr;
	let f2f1 = f2/f1 < -1.3 ? "Curves N/A" : (f2/f1 < -1 ? -1 : (f2/f1 > 1 ? 1 : f2/f1));
	let MS_MCL = ESDU_S020405(fsFscr, f1Fcr, f2f1)[6]; //Math.sqrt(1) / Math.sqrt(1) - 1; // Holy complicated (for no reason, much simpler method was found)
	
	GEBID("FPBForm", "abOut").innerHTML = (a/b).toFixed(3);
	GEBID("FPBForm", "KsOut").innerHTML = Ks.toFixed(3);
	GEBID("FPBForm", "FscrOut").innerHTML = Fscr.toFixed(3);
	GEBID("FPBForm", "MS_SBAOut").innerHTML = MS_SBA.toFixed(3);
	GEBID("FPBForm", "f2f1Out").innerHTML = !isNaN(f2f1) ? (f2/f1).toFixed(3) : f2f1;
	GEBID("FPBForm", "KcOut").innerHTML = Kc.toFixed(3);
	GEBID("FPBForm", "FcrOut").innerHTML = Fcr.toFixed(3);
	GEBID("FPBForm", "MS_CBBAOut").innerHTML = MS_CBA.toFixed(3);
	GEBID("FPBForm", "fsFscrOut").innerHTML = fsFscr.toFixed(3);
	GEBID("FPBForm", "f1FcrOut").innerHTML = f1Fcr.toFixed(3);
	GEBID("FPBForm", "f2f1_MCLOut").innerHTML = !isNaN(f2f1) ? f2f1.toFixed(3) : f2f1;
	GEBID("FPBForm", "MS_MCLOut").innerHTML = MS_MCL.toFixed(3);
	
	// Check MS's_
	if (MS_SBA > 0) GEBID("FPBForm", "MS_SBAOut").style.backgroundColor = "lightgreen"; 
	else GEBID("FPBForm", "MS_SBAOut").style.backgroundColor = "red";
	if (MS_CBA > 0) GEBID("FPBForm", "MS_CBBAOut").style.backgroundColor = "lightgreen"; 
	else GEBID("FPBForm", "MS_CBBAOut").style.backgroundColor = "red";
	if (MS_MCL > 0) GEBID("FPBForm", "MS_MCLOut").style.backgroundColor = "lightgreen"; 
	else GEBID("FPBForm", "MS_MCLOut").style.backgroundColor = "red";
}
function ESDU_S020404(ff, ab) {

let ab02, ab025, ab03, ab04, ab05, ab06, Kmin, K;

ab02 = -0.081135921006 * ff ** 6 + 0.734625743873 * ff ** 5 + 0.111854005721 * ff ** 4 - 1.849233273942 * ff ** 3 + 3.489779629893 * ff ** 2 - 13.822540334081 * ff + 36.094304186907;
ab025 = 0.679221760511 * ff ** 6 + 1.87506134627 * ff ** 5 - 1.203751502216 * ff ** 4 - 3.924904349168 * ff ** 3 + 4.77699296005 * ff ** 2 - 10.827315743055 * ff + 25.629049205287;
ab03 = 0.534333020652 * ff ** 6 + 1.545115132976 * ff ** 5 - 0.644112994985 * ff ** 4 - 3.647189435581 * ff ** 3 + 4.272898289738 * ff ** 2 - 8.909731793681 * ff + 19.011573269047;
ab04 = 0.452993843224 * ff ** 6 + 0.862992904412 * ff ** 5 - 0.988416217564 * ff ** 4 - 2.112705575592 * ff ** 3 + 4.835681890904 * ff ** 2 - 8.185171799469 * ff + 12.817971068675;
ab05 = 0.057264395458 * ff ** 6 + 0.689566484218 * ff ** 5 - 0.200050035935 * ff ** 4 - 2.282428142862 * ff ** 3 + 4.44648295422 * ff ** 2 - 7.198538790201 * ff + 10.133152823359;
ab06 = 0.01426162367 * ff ** 6 + 1.238599629979 * ff ** 5 + 0.042021404 * ff ** 4 - 3.631625222016 * ff ** 3 + 4.714630862267 * ff ** 2 - 6.295125044677 * ff + 8.571221203976;
Kmin = 0.218980510421 * ff ** 6 + 1.522644215641 * ff ** 5 - 0.308651049031 * ff ** 4 - 4.134283091351 * ff ** 3 + 5.615044483133 * ff ** 2 - 6.293000869531 * ff + 7.111147328791;

if (ab > 0.66666667) K = Kmin; 
else if (ab > 0.6) K = Kmin + (0.66666667 - ab) * (ab06 - Kmin) / 0.1;
else if (ab > 0.5) K = ab06 + (0.6 - ab) * (ab05 - ab06) / 0.1;
else if (ab > 0.4) K = ab05 + (0.5 - ab) * (ab04 - ab05) / 0.1;
else if (ab > 0.3) K = ab04 + (0.4 - ab) * (ab03 - ab04) / 0.1;
else if (ab > 0.25) K = ab03 + (0.3 - ab) * (ab025 - ab03) / 0.05;
else if (ab > 0.2) K = ab025 + (0.25 - ab) * (ab02 - ab025) / 0.05;
else if (ab >= 0) K = ab02 + (0.2 - ab) * ab02 / 0.2;

return K * 12 * (1 - 0.3 * 0.3) / Math.PI ** 2;
}
function ESDU_71005(edge, ab) {
	let y;
	switch (edge) {
	case "AECC":
		if (ab < 1.638) y = -35.645453423262 * ab ** 6 + 256.342229167318 * ab ** 5 - 741.548042497887 * ab ** 4 + 1079.99569485047 * ab ** 3 - 789.636292820656 * ab ** 2 + 222.858191800872 * ab + 22.490155935567;
		else if (ab < 2.8462) y = -2.719131772872 * ab ** 6 + 36.628420273467 * ab ** 5 - 203.957850702051 * ab ** 4 + 599.643273336419 * ab ** 3 - 978.348175185426 * ab ** 2 + 834.497999637745 * ab - 277.116481942694;
		else if (ab < 8) y = -0.000498013044 * ab ** 6 + 0.015403803859 * ab ** 5 - 0.189769530509 * ab ** 4 + 1.170141955234 * ab ** 3 - 3.658578930509 * ab ** 2 + 4.848605453549 * ab + 8.437479954039;
		else y = 9.1;
		break;
	case "LECC":
		if (ab < 1.2969) y = 14306.125717163 * ab ** 6 - 98236.225084967 * ab ** 5 + 280631.558216305 * ab ** 4 - 426912.0185058 * ab ** 3 + 364772.726864473 * ab ** 2 - 165998.530863959 * ab + 31448.9360318515;
		else if (ab < 3.2932) y = 0.37112834437 * ab ** 6 - 5.48578719091 * ab ** 5 + 33.516355471292 * ab ** 4 - 108.560629289367 * ab ** 3 + 197.412102052741 * ab ** 2 - 192.707253165836 * ab + 89.813937326063;
		else if (ab < 8) y = 0.000196460139 * ab ** 6 - 0.007465305997 * ab ** 5 + 0.117794263553 * ab ** 4 - 0.989489560672 * ab ** 3 + 4.683173138778 * ab ** 2 - 11.946880315943 * ab + 22.21130337764;
		else y = 9.1;
		break;
	case "SECC":
		if (ab < 2.8986) y = 0.597105508845 * ab ** 6 - 8.119938794501 * ab ** 5 + 46.272790566617 * ab ** 4 - 141.99617435652 * ab ** 3 + 248.897563875032 * ab ** 2 - 238.543956855952 * ab + 105.444838173528;
		else if (ab < 8) y = 0.000287877741 * ab ** 6 - 0.010423665931 * ab ** 5 + 0.155922320876 * ab ** 4 - 1.239269677365 * ab ** 3 + 5.570296914194 * ab ** 2 - 13.656001702399 * ab + 20.130853497325;
		else y = 5.43;
		break;
	case "1LECC":
		if (ab < 1.4231) y = 856.054656028747 * ab ** 6 - 6272.34629800912 * ab ** 5 + 19091.8544395622 * ab ** 4 - 30905.4816962005 * ab ** 3 + 28071.5966350875 * ab ** 2 - 13575.7780184761 * ab + 2745.08092171815;
		else if (ab < 3.0096) y = -1.805492586573 * ab ** 6 + 24.243665835461 * ab ** 5 - 133.783626801912 * ab ** 4 + 387.567857715438 * ab ** 3 - 619.67870152664 * ab ** 2 + 515.283340675603 * ab - 163.688536117506;
		else if (ab < 8) y = 0.00030647189 * ab ** 6 - 0.010823595689 * ab ** 5 + 0.158699429377 * ab ** 4 - 1.2440018355 * ab ** 3 + 5.550885714612 * ab ** 2 - 13.594677725308 * ab + 21.901702202067;
		else y = 7.18;
		break;
	case "1SECC":
		if (ab < 1.8446) y = 1.181697098538 * ab ** 6 - 16.423983161572 * ab ** 5 + 87.473786547812 * ab ** 4 - 240.020405022368 * ab ** 3 + 367.685851914834 * ab ** 2 - 304.660669808147 * ab + 115.735269668734;
		else if (ab < 8) y = 0.000174919585 * ab ** 6 - 0.005991327583 * ab ** 5 + 0.085556318435 * ab ** 4 - 0.658643539581 * ab ** 3 + 2.925525911886 * ab ** 2 - 7.26846168008 * ab + 13.603031237535;
		else y = 5.43;
		break;
	case "AESS":
		if (ab < 2.0489) y = 8.467371180654 * ab ** 6 - 79.652804934614 * ab ** 5 + 311.921298393282 * ab ** 4 - 653.460821060861 * ab ** 3 + 777.742828432706 * ab ** 2 - 504.808133553862 * ab + 149.106616497763;
		else if (ab < 8) y = 0.000803299566 * ab ** 6 - 0.026410517662 * ab ** 5 + 0.35307434772 * ab ** 4 - 2.457396782638 * ab ** 3 + 9.419759910748 * ab ** 2 - 19.053873093381 * ab + 21.814633315217;
		else y = 5.43;
		break;
	}
	return y;
}
function ESDU_S020405(x1, y1, ff) {

let dif = 2;
let diff = 2;
let difff = 2;
let x = 0;
let xx = 0;
let xxx = 0;
let m = y1 / x1;
let y, yy, yyy, y2, y3, y4, y5, x2, x3, x4, x5, ms;

do {
    y2 = (1 - x ** 2) ** 0.5;
    y = m * x;
    dif = y2 - y;
    x2 = x;
	x = x + 0.001 ;
} while (dif > 0);

do {
    y3 = -10.2393498249 * xx ** 6 + 26.937078338116 * xx ** 5 - 26.857184071094 * xx ** 4 + 12.318454642897 * xx ** 3 - 3.355071146041 * xx ** 2 + 0.211985511836 * xx + 0.994182740152;
    yy = m * xx;
    diff = y3 - yy;
    x3 = xx;
    xx = xx + 0.001;
} while (diff > 0);

do {
    y4 = 1.495039992209 * xxx ** 6 - 4.64513339824 * xxx ** 5 + 5.484889822779 * xxx ** 4 - 3.063388958224 * xxx ** 3 - 0.178929220652 * xxx ** 2 - 0.093384481992 * xxx + 1.000649450389
    yyy = m * xxx;
    difff = y4 - yyy;
    x4 = xxx;
    xxx = xxx + 0.001;
} while (difff > 0);

if (ff < -1) ff = -1;
else if (ff > 1) ff = 1;

if (ff < 0) {
	x5 = x2 - (x2 - x3) * (1 + ff);
	y5 = y2 - (y2 - y3) * (1 + ff);
} else if (ff >= 0) {
	x5 = x4 + (x3 - x4) * (1 - ff);
	y5 = y4 + (y3 - y4) * (1 - ff);
}

ms = (x5 ** 2 + y5 ** 2) ** 0.5 / (x1 ** 2 + y1 ** 2) ** 0.5 - 1;

return [x2, y2, x3, y3, x4, y4, ms, x5, y5];

}
function f1Fcr1(x) {
	return Math.sqrt(1 - x ** 2);
}
function f1Fcr2(x) {
	return -10.2393498249*x**6 + 26.937078338116*x**5 - 26.857184071094*x**4 + 12.318454642897*x**3 - 3.355071146041*x**2 + 0.211985511836*x + 0.994182740152;
}
function f1Fcr3(x) {
	return 1.495039992209*x**6 - 4.64513339824*x**5 + 5.484889822779*x**4 - 3.063388958224*x**3 - 0.178929220652*x**2 - 0.093384481992*x + 1.000649450389;
}
function FPBSetCharts(ET) {
	// Data
	let ab = [1.00, 1.05, 1.10, 1.15, 1.20, 1.25, 1.30, 1.35, 1.40, 1.45, 1.50, 1.55, 1.60, 1.65, 1.70, 1.75, 1.80, 1.85, 1.90, 1.95, 2.00, 2.05, 2.10, 2.15, 2.20, 2.25, 2.30, 2.35, 2.40, 2.45, 2.50, 2.55, 2.60, 2.65, 2.70, 2.75, 2.80, 2.85, 2.90, 2.95, 3.00, 3.05, 3.10, 3.15, 3.20, 3.25, 3.30, 3.35, 3.40, 3.45, 3.50, 3.55, 3.60, 3.65, 3.70, 3.75, 3.80, 3.85, 3.90, 3.95, 4.00, 4.05, 4.10, 4.15, 4.20, 4.25, 4.30, 4.35, 4.40, 4.45, 4.50, 4.55, 4.60, 4.65, 4.70, 4.75, 4.80, 4.85, 4.90, 4.95, 5.00];
	let f2f1 = [-1.30, -1.20, -1.10, -1.00, -0.90, -0.80, -0.70, -0.60, -0.50, -0.40, -0.30, -0.20, -0.10, 0.00, 0.10, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80, 0.90, 1.00];
	let a = GEBID("FPBForm", "aIn").value;
	let b = GEBID("FPBForm", "bIn").value;
	let data= [];
	let label;
	let options1 = {
			responsive: true,
			maintainAspectRatio: true,
			aspectRatio: 0.6,
			scales: {
				x: {
					type: 'linear', // Or 'category' depending on your data
					position: 'bottom',
					ticks: {
						autoSkipPadding: 0, // Prevent labels from being skipped due to overlap
						maxRotation: 90,    // Allow labels to rotate fully if needed
						minRotation: 0      // Prevent any default rotation
					},
					grid: {
						drawOnChartArea: true, // Ensure grid lines are drawn
						// You can add other grid line options here if needed
					},
					title: {
						display: true,
						text: 'a/b', // Your x-axis label
						font: {
							size: 14,
							weight: 'bold',
						lineHeight: 1.2
						}
					}	
				},
				y: {
					title: {
						display: true,
						text: 'Ks', // Your x-axis label
						font: {
							size: 14,
							weight: 'bold',
						lineHeight: 1.2
						}
					}	
				}
			}
		};
	let options2 = {
			responsive: true,
			maintainAspectRatio: true,
			aspectRatio: 0.6,
			scales: {
				x: {
					type: 'linear', // Or 'category' depending on your data
					position: 'bottom',
					ticks: {
						autoSkipPadding: 0, // Prevent labels from being skipped due to overlap
						maxRotation: 90,    // Allow labels to rotate fully if needed
						minRotation: 0      // Prevent any default rotation
					},
					grid: {
						drawOnChartArea: true, // Ensure grid lines are drawn
						// You can add other grid line options here if needed
					},
					title: {
						display: true,
						text: 'f2/f1', // Your x-axis label
						font: {
							size: 14,
							weight: 'bold',
						lineHeight: 1.2
						}
					}	
				},
				y: {
					title: {
						display: true,
						text: 'K', // Your x-axis label
						font: {
							size: 14,
							weight: 'bold',
						lineHeight: 1.2
						}
					}	
				}
			}
		};
	let options3 = {
			responsive: true,
			maintainAspectRatio: true,
			aspectRatio: 0.6,
			scales: {
				x: {
					type: 'linear', // Or 'category' depending on your data
					position: 'bottom',
					ticks: {
						autoSkipPadding: 0, // Prevent labels from being skipped due to overlap
						maxRotation: 90,    // Allow labels to rotate fully if needed
						minRotation: 0      // Prevent any default rotation
					},
					grid: {
						drawOnChartArea: true, // Ensure grid lines are drawn
						// You can add other grid line options here if needed
					},
					title: {
						display: true,
						text: 'fs/Fscr', // Your x-axis label
						font: {
							size: 14,
							weight: 'bold',
						lineHeight: 1.2
						}
					},
					min: 0,
					max: 1
				},
				y: {
					title: {
						display: true,
						text: 'f1/Fcr', // Your x-axis label
						font: {
							size: 14,
							weight: 'bold',
						lineHeight: 1.2
						}
					}	
				}
			}
		};	
	// Chart 1
	switch (ET) {
		case "AECC":
			data = [];
			let K1 = [14.86, 14.19, 13.64, 13.20, 12.83, 12.52, 12.26, 12.04, 11.86, 11.70, 11.57, 11.46, 11.36, 11.28, 11.11, 10.96, 10.82, 10.69, 10.58, 10.48, 10.39, 10.32, 10.25, 10.19, 10.14, 10.09, 10.05, 10.01, 9.98, 9.95, 9.92, 9.89, 9.87, 9.85, 9.82, 9.80, 9.77, 9.74, 9.71, 9.68, 9.66, 9.63, 9.61, 9.59, 9.57, 9.55, 9.53, 9.51, 9.49, 9.47, 9.46, 9.44, 9.43, 9.41, 9.40, 9.39, 9.38, 9.37, 9.36, 9.35, 9.34, 9.33, 9.32, 9.31, 9.31, 9.30, 9.29, 9.29, 9.28, 9.28, 9.27, 9.27, 9.26, 9.26, 9.25, 9.25, 9.25, 9.24, 9.24, 9.24, 9.23];
			for (let i = 0; i < ab.length; i++) {
				data.push({x: ab[i], y: K1[i]});
			}
			label = "All Edges Clamped";
			break;
		case "LECC":
			data = [];
			let K2 = [12.57, 12.29, 12.07, 11.89, 11.76, 11.63, 11.56, 11.32, 11.11, 10.93, 10.78, 10.66, 10.55, 10.46, 10.37, 10.30, 10.24, 10.18, 10.13, 10.08, 10.03, 9.99, 9.95, 9.91, 9.88, 9.85, 9.82, 9.80, 9.77, 9.75, 9.73, 9.71, 9.70, 9.68, 9.67, 9.66, 9.64, 9.63, 9.62, 9.61, 9.60, 9.58, 9.57, 9.56, 9.55, 9.55, 9.53, 9.51, 9.49, 9.47, 9.46, 9.44, 9.43, 9.42, 9.40, 9.39, 9.38, 9.37, 9.36, 9.35, 9.34, 9.33, 9.33, 9.32, 9.31, 9.31, 9.30, 9.29, 9.29, 9.28, 9.28, 9.27, 9.27, 9.26, 9.26, 9.25, 9.25, 9.24, 9.24, 9.24, 9.23];
			for (let i = 0; i < ab.length; i++) {
				data.push({x: ab[i], y: K2[i]});
			}
			label = "Long Edges Clamped";
			break;
		case "SECC":
			data = [];
			let K3 = [12.55, 11.69, 10.94, 10.31, 9.76, 9.30, 8.90, 8.56, 8.27, 8.02, 7.81, 7.62, 7.46, 7.32, 7.20, 7.10, 7.00, 6.92, 6.85, 6.78, 6.72, 6.67, 6.62, 6.57, 6.53, 6.50, 6.46, 6.43, 6.40, 6.38, 6.35, 6.33, 6.30, 6.28, 6.26, 6.25, 6.23, 6.22, 6.21, 6.18, 6.14, 6.11, 6.08, 6.05, 6.02, 6.00, 5.97, 5.95, 5.93, 5.91, 5.89, 5.87, 5.85, 5.84, 5.82, 5.81, 5.79, 5.78, 5.76, 5.75, 5.74, 5.73, 5.72, 5.71, 5.70, 5.69, 5.68, 5.67, 5.66, 5.65, 5.64, 5.63, 5.63, 5.62, 5.61, 5.61, 5.60, 5.59, 5.59, 5.58, 5.58];
			for (let i = 0; i < ab.length; i++) {
				data.push({x: ab[i], y: K3[i]});
			}
			label = "Short Edges Clamped";
			break;
		case "1LECC":
			data = [];
			let K4 = [10.98, 10.67, 10.42, 10.20, 10.00, 9.84, 9.70, 9.57, 9.46, 9.37, 9.26, 9.14, 9.02, 8.91, 8.81, 8.72, 8.64, 8.57, 8.51, 8.46, 8.41, 8.37, 8.34, 8.30, 8.27, 8.24, 8.21, 8.19, 8.16, 8.13, 8.10, 8.08, 8.06, 8.04, 8.02, 8.01, 8.00, 7.99, 7.97, 7.95, 7.92, 7.90, 7.87, 7.84, 7.81, 7.79, 7.76, 7.74, 7.72, 7.70, 7.68, 7.66, 7.64, 7.62, 7.60, 7.59, 7.57, 7.56, 7.55, 7.53, 7.52, 7.51, 7.50, 7.49, 7.48, 7.47, 7.46, 7.45, 7.44, 7.43, 7.42, 7.41, 7.40, 7.40, 7.39, 7.38, 7.38, 7.37, 7.36, 7.36, 7.35];
			for (let i = 0; i < ab.length; i++) {
				data.push({x: ab[i], y: K4[i]});
			}
			label = "1 Long Edge Clamped";
			break;
		case "1SECC":
			data = [];
			let K5 = [10.97, 10.31, 9.75, 9.29, 8.90, 8.57, 8.30, 8.06, 7.86, 7.69, 7.55, 7.42, 7.31, 7.21, 7.12, 7.04, 6.96, 6.88, 6.81, 6.75, 6.69, 6.63, 6.58, 6.52, 6.47, 6.43, 6.38, 6.34, 6.30, 6.26, 6.22, 6.19, 6.16, 6.13, 6.10, 6.07, 6.04, 6.02, 5.99, 5.97, 5.95, 5.92, 5.90, 5.89, 5.87, 5.85, 5.83, 5.82, 5.80, 5.79, 5.78, 5.76, 5.75, 5.74, 5.73, 5.72, 5.71, 5.70, 5.69, 5.68, 5.67, 5.66, 5.65, 5.64, 5.64, 5.63, 5.62, 5.62, 5.61, 5.60, 5.60, 5.59, 5.59, 5.58, 5.58, 5.57, 5.57, 5.56, 5.56, 5.56, 5.55];
			for (let i = 0; i < ab.length; i++) {
				data.push({x: ab[i], y: K5[i]});
			}
			label = "1 Short Edge Clamped";
			break;
		case "AESS":
			data = [];
			let K6 = [9.32, 8.89, 8.53, 8.24, 7.99, 7.77, 7.59, 7.43, 7.30, 7.18, 7.07, 6.98, 6.91, 6.84, 6.78, 6.73, 6.68, 6.64, 6.60, 6.56, 6.54, 6.51, 6.44, 6.38, 6.32, 6.27, 6.22, 6.18, 6.14, 6.10, 6.07, 6.03, 6.01, 5.98, 5.96, 5.93, 5.91, 5.90, 5.88, 5.86, 5.85, 5.83, 5.82, 5.81, 5.80, 5.79, 5.78, 5.77, 5.76, 5.75, 5.75, 5.74, 5.73, 5.72, 5.72, 5.71, 5.70, 5.70, 5.69, 5.68, 5.67, 5.67, 5.66, 5.65, 5.65, 5.64, 5.64, 5.63, 5.62, 5.62, 5.61, 5.60, 5.60, 5.59, 5.59, 5.58, 5.58, 5.57, 5.56, 5.56, 5.55];
			for (let i = 0; i < ab.length; i++) {
				data.push({x: ab[i], y: K6[i]});
			}
			label = "All Edges Simply Supported";
			break;
		default:
			break;
	}
	if (US_C) US_C.destroy();
	US_C = new Chart(document.getElementById("FPBForm").querySelector("#FPBChart1"), {
		type: "line",
		data: {
        labels: data.map(x => x.x),
        datasets: [
          {
            label: label,
            data: data,
			pointRadius: 1
          }
        ]
		},
		options: options1
	});
	data = [];
	// Chart 2
	for (let i = 0; i < f2f1.length; i++) {
		data.push({x: f2f1[i], y: ESDU_S020404(f2f1[i], a/b)});
	}
	label = "a/b: " + a/b;
	if (BCT_C) BCT_C.destroy();
	BCT_C = new Chart(document.getElementById("FPBForm").querySelector("#FPBChart2"), {
		type: "line",
		data: {
        labels: data.map(x => x.x),
        datasets: [
          {
            label: label,
            data: data,
			pointRadius: 1
          }
        ]
		},
		options: options2
	});
	data = [];
	// Chart 3
	if (!CBS_C_set) {
		let fsFscr = [0.00, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40, 0.45, 0.50, 0.55, 0.60, 0.65, 0.70, 0.75, 0.80, 0.85, 0.90, 0.91, 0.92, 0.93, 0.94, 0.95, 0.96, 0.96, 0.97, 0.97, 0.98, 0.98, 0.99, 0.99, 1.00];
		for (let i = 0; i < fsFscr.length; i++) {
			data.push({x: fsFscr[i], y1: f1Fcr1(fsFscr[i]), y2: f1Fcr2(fsFscr[i]), y3: f1Fcr3(fsFscr[i])});
		}
		CBS_C = new Chart(document.getElementById("FPBForm").querySelector("#FPBChart3"), {
		type: "line",
		data: {
        labels: data.map(x => x.x),
        datasets: [
            {
                label: 'f2/f1 = -1',
                data: data.map(x => x.y1), // Assuming your data has a 'y1' property for the first line
                borderColor: 'rgba(75, 192, 192, 1)', // Blue-green color
                fill: false, // Do not fill area under the line
                pointRadius: 1
            },
            {
                label: 'f2/f1 = 0',
                data: data.map(x => x.y2), // Assuming your data has a 'y2' property for the second line
                borderColor: 'rgba(255, 99, 132, 1)', // Red color
                fill: false, // Do not fill area under the line
                pointRadius: 1
            },
            // Add more datasets for additional lines
            {
                label: 'f2/f1 = 1',
                data: data.map(x => x.y3), // Assuming your data has a 'y3' property for the third line
                borderColor: 'rgba(255, 206, 86, 1)', // Yellow color
                fill: false, // Do not fill area under the line
                pointRadius: 1
            }
        ]
		},
		options: options3
	});
		data = [];
		CBS_C_set = true;
	}
	//document.getElementById("FPBForm").querySelector(".formIO").style.height = "100%";
	
}

// Lug funcs
function lugCalcs() {
	// Acquisition
	let dummy = [];
	let ids = ["LorCIn", "DholeIn", "DpinIn", "DIbushIn", "DObushIn", "WIn", "toIn", "gIn", "loadIDIn", "UFacIn", "FFacIn", "PaxialIn", "PtransIn", "tlugIn", "tiIn", "tcontactIn", "aIn", "cIn", "s1In", "s2In", "alloyIn", "lugMatIn", "FtuLIn", "FtuLTIn", "FtuSTIn", "FtyLIn", "FtyLTIn", "FtySTIn", "Fbry15In", "Fbry20In", "Fbru15In", "Fbru20In", "FcorroIn", "EIn", "muIn", "eIn", "tstockIn", "ALDirIn", "lugPlaneIn", "specPinIn", "matPinIn", "MallowIn", "E2In", "specBushIn", "matBushIn", "PradIn", "FbryIn", "FbruIn", "EBushIn", "muBushIn"];
	for (let i=0; i < ids.length; i++)
		dummy[i] = GEBID("lugForm", ids[i]).value;
	let [LorC, Dhole, Dpin, DIbush, DObush, W, to, g, loadID, UFac, FFac, Paxial, Ptrans, tlug, ti, tcontact, a, c, s1, s2, alloy, lugMat, FtuL, FtuLT, FtuST, FtyL, FtyLT, FtyST, Fbry15, Fbry20, Fbru15, Fbru20, Fcorro, Elug, mu, e, tstock, ALDir, lugPlane, specPin, matPin, Mallow, Epin, specBush, matBush, Prad, Fbry, Fbru, EBush, muBush] = dummy;
	to = +to;
	ti = +ti;
	
	// Calcululminationtion
	let PlugA = LorC == "lug" ? Paxial : Paxial/2;
	let PlugT = LorC == "lug" ? Ptrans : Ptrans/2;
	let K02 = sRound(k_02(a/W, Dhole/W), 3);
	let K100 = sRound(k_100(a/W, Dhole/W), 3);
	let clearance = Math.max(0.002, (DIbush-Dpin)/DIbush);
	let etae = sRound(ne(clearance*100), 3);
	//console.log(sRound(ne(clearance*100), 3) + ", " + typeof(sRound(ne(clearance*100), 3)));
	let Ke1 = sRound((K02 + etae*(K100-K02)), 3);
	let Ke2_Ke1 = sRound(kee_ke(tlug/Dhole, Epin/Elug), 3);
	let Ke2 = sRound((Ke2_Ke1 * Ke1), 3);
	let Ftux = ALDir == "L" ? FtuL : (ALDir == "LT" ? FtuLT : (ALDir == "ST" ? FtuST : "Error"));
	const a9108 = A9108();
	let Ktux = /* 0.904; */ sRound(a9108.ESDU_Ktux(Ke2, Elug*1000000, Ftux*1000, (ALDir=="L" ? FtyL : (ALDir=="LT" ? FtyLT : (ALDir=="ST" ? FtyST : "ERROR")))*1000, (e/100 + FtuL/Elug/1000), (Math.log((e/100 + FtuL/Elug/1000 - FtuL/Elug/1000)/0.002)/Math.log(FtuL/FtyL))), 3);
	// ^^^ Good lord this one sucks
	let Ptux = sRound((Ktux*Ftux*1000*(W-Dhole)*tlug), 0);
	let Kqux = sRound(isNaN(_Kqux(a/Dhole, Dhole/tlug, ALDir, lugPlane)) ? _Kqux(a/Dhole, Dhole/tlug, ALDir, lugPlane) : _Kqux(a/Dhole, Dhole/tlug, ALDir, lugPlane), 3);
	let Ftum = lugPlane == "L-LT" ? Math.min(FtuL, FtuLT) : (lugPlane == "L-ST" ? Math.min(FtuL, FtuST) : (lugPlane == "LT-ST" ? Math.min(FtuLT, FtuST) : "Error"));
	let Pqux = sRound((Kqux*Ftum*1000*Dhole*tlug), 0);
	let Ftpm = lugPlane == "L-LT" ? Math.min(FtyL, FtyLT) : (lugPlane == "L-ST" ? Math.min(FtyL, FtyT) : (lugPlane == "LT-ST" ? Math.min(FtyLT, FtyST) : "Error"));
	let Puxmin = sRound(Math.min(Ptux, Pqux), 0);
	let null1 = sRound((Puxmin/(Dhole*tlug*Ftum*1000)), 3);
	let Kpx = kpx(null1);
	let Ppx = sRound((Kpx*(Ftpm/Ftum)*Puxmin), 0);
	let A1 = sRound(((W/2-Dhole/2*Math.cos(Math.PI/4) + Dhole/2*Math.sin(Math.PI/4)*Math.tan(degToRad(Math.min(s1, s2))))*tlug), 3);
	let A2 = sRound(((W/2-Dhole/2)*tlug), 3);
	let A3 = sRound((c*tlug), 3);
	let AE = sRound((6/(3/A1+1/A2+1/A3+1/A1)), 3);
	let Kuy = sRound(kuy(AE/(Dhole*tlug), alloy), 3);
	let Puy = sRound(Kuy*Ftum*1000*Dhole*tlug, 0);
	let Kpy = sRound(kpy(AE/(Dhole*tlug)), 3);
	let Ppy = sRound(Kpy*Ftpm*1000*Dhole*tlug, 0);
	let FbruOut = sRound(a/Dhole<0.5?"ERROR":(a/Dhole<1.5?(a/Dhole-0.5)*Fbru15:(a/Dhole<2?Fbru15+2*(a/Dhole-1.5)*(Fbru20-Fbru15):Fbru20)), 1);
	let Pbru = sRound(FbruOut*1000*Dhole*tcontact, 0);
	let FbryOut = sRound(a/Dhole<0.5?"ERROR":(a/Dhole<1.5?(a/Dhole-0.5)*Fbry15:(a/Dhole<2?Fbry15+2*(a/Dhole-1.5)*(Fbry20-Fbry15):Fbry20)), 1);
	let Pbry = sRound(FbryOut*1000*Dhole*tcontact, 0);
	
	let Rx1 = sRound(Math.abs(PlugA)/Math.min(Ptux, Pqux), 3);
	let Ry1 = sRound(Math.abs(PlugT)/Puy, 3);
	let MS1 = formMS(1/(FFac*(Rx1**1.6+Ry1**1.6)**0.625)-1);
	let Rx2 = sRound(Math.abs(PlugA)/UFac/Ppx, 3);
	let Ry2 = sRound(Math.abs(PlugT)/UFac/Ppy, 3);
	let MS2 = formMS(1/(FFac*(Rx2**1.6+Ry2**1.6)**0.625)-1);
	let Papp3 = sRound(Math.sqrt(PlugA**2+PlugT**2), 0);
	let Pbru3 = Pbru;
	let MS3 = formMS(Pbru/(FFac*Papp3)-1);
	let Plapp4 = sRound(Math.sqrt(PlugA**2+PlugT**2)/UFac, 0);
	let Pbry4 = Pbry;
	let MS4 = formMS(Pbry/(FFac*Plapp4)-1);
	let Papp5 = Papp3;
	let Pbru5 = Fbry=="N/A"?Prad:sRound(Fbru*1000*DIbush*tcontact, 0);
	let MS5 = formMS(Pbru5/(FFac*Papp5)-1);
	let Plapp6 = Plapp4;
	let Pbry6 = Fbry=="N/A"?"N/A":sRound(Fbry*1000*DIbush*tcontact, 0);
	let MS6 = Fbry=="N/A"?"N/A":formMS(Pbry6/(FFac*Plapp6)-1);
	
	let interference = (DObush-Dhole)/2<0?Number(0):(DObush-Dhole)/2;
	let efit = sRound((DObush-Dhole)/Dhole<0?Number(0):(DObush-Dhole)/Dhole, 5);
	let null2 = sRound(Dhole/W, 3);
	let K = sRound(KDhole_W(null2), 3);
	let A = sRound((1+(K*null2)**2)/(1-(K*null2)**2) + (+mu), 3);
	let B = sRound(Elug/EBush*((1+(DIbush/Dhole)**2)/(1-(DIbush/Dhole)**2)-muBush), 3);
	let p = sRound(Elug*1000000*efit/(A+B), 0);
	let fmax = Math.max(1, sRound(0*(1+(Dhole/W)**2)/(1-(Dhole/W)**2), 0));
	let FcorroOut = Fcorro*1000;
	let MS7 = formMS(sRound(FcorroOut/fmax-1, 2));
	let Ppin = sRound(Math.sqrt(Paxial**2 + Ptrans**2), 0);
	let null3 = sRound(Ppin/(Dpin*ti*Ftum*1000), 2);
	let null4 = sRound(c/ti, 2);
	let gamma = sRound(gamma_fctn(null4, null3), 2);
	let b = (g==0)?sRound((to+ti)*0.5, 3):sRound(to*0.5+g+ti*0.25*gamma, 3);
	//console.log();
	let M = sRound(Ppin*b/2, 0);
	let MS8 = to==0?"N/A":formMS(Mallow/(FFac*M)-1);
	
	// Distribution
	GEBID("lugForm", "PlugAOut").innerHTML = sRound(PlugA, 0);
	GEBID("lugForm", "PlugTOut").innerHTML = sRound(PlugT, 0);
	dummy = [
		[Dhole/W, a/W, tlug/Dhole, K02, K100],
		[clearance*100, etae],
		[Ke1, Epin/Elug, Ke2_Ke1, Ke2, Ktux, Ftux, Ptux],
		[a/Dhole, Dhole/tlug, Kqux, Ftum, Pqux],
		[Ftpm, Ftum, Puxmin, null1, Kpx, Ppx],
		[A1, A2, A3, "skip", AE, AE/Dhole/tlug, Kuy, Ftum, Puy],
		[AE/Dhole/tlug, Kpy, Ftpm, Ppy],
		[a/Dhole, Fbru15, Fbru20, FbruOut, "skip", Pbru],
		[a/Dhole, Fbry15, Fbry20, FbryOut, "skip", Pbry],
		[Rx1, Ry1, "skip", MS1],
		[Rx2, Ry2, "skip", MS2],
		[Papp3, Pbru3, "skip", MS3],
		[Plapp4, Pbry4, "skip", MS4],
		[Papp5, Pbru5, "skip", MS5],
		[Plapp6, Pbry6, "skip", MS6],
		[interference, efit, null2, K, A, "skip", B],
		[p, fmax, FcorroOut, "skip", MS7],
		[Ppin, null3, null4, gamma, b, M, Mallow, "skip", MS8]
	];
	let sig = [
		[3, 3, 3, 3, 3],
		[3, 3],
		[3, 3, 3, 3, 3, 0, 0],
		[3, 3, 3, 0, 0],
		[0, 0, 0, 3, 3, 0],
		[3, 3, 3, "skip", 3, 3, 3, 0, 0],
		[3, 3, 0, 0],
		[3, 0, 0, 1, "skip", 0],
		[3, 0, 0, 1, "skip", 0],
		[3, 3, "skip", 2],
		[3, 3, "skip", 2],
		[0, 0, "skip", 2],
		[0, 0, "skip", 2],
		[0, 0, "skip", 2],
		[0, 0, "skip", 2],
		[4, 3, 3, 3, 3, "skip", 3],
		[0, 0, 0, "skip", 2],
		[0, 1, 2, 2, 3, 0, 0, "skip", 2]
	];
	for (let j=0; j<dummy.length; j++)
		for (let i=0; i<dummy[j].length; i++)
			try {if (dummy[j][i] != "skip") childSeq(GEBID("lugForm", "outTab" + (j+1)), [0, i, 1]).innerHTML = sRound(dummy[j][i], sig[j][i]);}
			catch(err) {console.log("Loop broke at: "+j + ", " + i);}
	for (let i=1; i<=8; i++)
		if (GEBID("lugForm", "MSOut" + i).innerHTML > 0 || GEBID("lugForm", "MSOut" + i).innerHTML == "HIGH") GEBID("lugForm", "MSOut" + i).style.backgroundColor = "lightgreen";
		else GEBID("lugForm", "MSOut" + i).style.backgroundColor = "red";
}
function k_02(a_over_W, Dhole_over_W) {
	// See ESDU 81006 Figure 2
	
	if (a_over_W < 0.4)
		return "Out of graph";
	else if (a_over_W < 0.5)
		if (Dhole_over_W < 0.3 || Dhole_over_W > 0.56)
			return "Out of graph";
	else if (a_over_W <= 0.6)
		if (Dhole_over_W < 0.21 || Dhole_over_W > 0.7)
			return "Out of graph";
	else
		return "Out of graph";
	let k02tmp1 = 238.698347031 * Dhole_over_W ** 4 + -465.064358664 * Dhole_over_W ** 3 + 339.779141641 * Dhole_over_W ** 2 + -112.726857863 * Dhole_over_W + 18.125825247;
	let k02tmp2 = 50.833970157 * Dhole_over_W ** 4 + -129.141827769 * Dhole_over_W ** 3 + 120.140095706 * Dhole_over_W ** 2 + -50.740446394 * Dhole_over_W + 11.370946764;
	let k02tmp3 = 18.10958033 * Dhole_over_W ** 4 + -63.115069249 * Dhole_over_W ** 3 + 73.991898279 * Dhole_over_W ** 2 + -37.932462978 * Dhole_over_W + 9.936163195;
	if (a_over_W < 0.5)
		return lerp(a_over_W, 0.4, 0.5, k02tmp1, k02tmp2);
	return lerp(a_over_W, 0.5, 0.6, k02tmp2, k02tmp3);
}
function k_100(a_over_W, Dhole_over_W) {
	// See ESDU 81006 Figure 2
	
	if (a_over_W < 0.4)
		return "Out of graph";
	else if (a_over_W < 0.5)
		if (Dhole_over_W < 0.37 || Dhole_over_W > 0.55)
			return "Out of graph";
	else if (a_over_W <= 0.6)
		if (Dhole_over_W < 0.3 || Dhole_over_W > 0.7)
			return "Out of graph";
	else
		return "See graph";
	let k100tmp1 = 312.906153417 * Dhole_over_W ** 4 + -618.304124135 * Dhole_over_W ** 3 + 449.22582084 * Dhole_over_W ** 2 + -144.883527774 * Dhole_over_W + 22.557430157;
	let k100tmp2 = 16.015803436 * Dhole_over_W ** 4 + -62.359557194 * Dhole_over_W ** 3 + 76.077413194 * Dhole_over_W ** 2 + -37.992925654 * Dhole_over_W + 10.858561299;
	let k100tmp3 = 7.929643181 * Dhole_over_W ** 4 + -49.843535947 * Dhole_over_W ** 3 + 67.796129693 * Dhole_over_W ** 2 + -35.326147894 * Dhole_over_W + 10.070588502;
	if (a_over_W < 0.5)
		return lerp(a_over_W, 0.4, 0.5, k100tmp1, k100tmp2);
	return lerp(a_over_W, 0.5, 0.6, k100tmp2, k100tmp3);
}
function lerp(x, x1, x2, y1, y2) { // Useful general-purpose LERP function
	let m = (y1-y2)/(x1-x2);
	return y1 + m * (x - x1);
}
function ne(clrnc) {
	// See ESDU 81006 Figure 3
	if (clrnc < 0.1 || clrnc > 20)
		return "Out of graph";
	if (clrnc == 0.2)
		return 0;
	return 0.223332234 * Math.log(clrnc) + 0.370080685;
}
function kee_ke(t_over_D, Epin_over_Elug) { // <------------------------ I Think this has a Typo, it's effectively "if(true)"
	// See ESDU 81006 Figure 4
	if (Epin_over_Elug < 1 || Epin_over_Elug > 3)
		return "Out of Graph";
	if (t_over_D > 0 || t_over_D < 0.45) // <------------------------ I Think this is a Typo, it's effectively "if(true)"
		return 1;
	else if (t_over_D < 0 || t_over_D > 2.25)
		return "Out of Graph";
	let tmp1 = -0.018499867 * t_over_D ** 3 + 0.024836661 * t_over_D ** 2 + 0.329203163 * t_over_D ** 1 + -0.176316307 * t_over_D + 1.002719252;
	let tmp2 = -0.021902641 * t_over_D ** 3 + 0.057598142 * t_over_D ** 2 + 0.152424668 * t_over_D ** 1 + -0.091466709 * t_over_D + 1.000599492;
	return lerp(Epin_over_Elug, 1, 3, tmp1, tmp2);
}
function A9108() {
	let RUN, FAIL = new Array(4).fill(false), FAILIN = new Array(3).fill(false), FAILO; // Params for A9108 funcs
	let AM, fn, E, FUX, EUX, AK,
	AKT, a, b, TOL, HMAX, RESULT, ILEVEL,
	f, KOUNT, NOTE1;
	function ESDU_Ktux(LUG_Ke, Lug_E, Lug_Ftu, Lug_Fty, Lug_EPu, Lug_m) { // <------------------------ Probably very broken due to lack of PBR
		
		let AKUX;
//      ReDim AK(20), AKUX(20)
      
		E = Lug_E;
		FUX = Lug_Ftu;
		AM = Lug_m;
		fn = MAT_RAMBERG_FN((Lug_Fty), (Lug_m));
//      EUX = Lug_EPu + (FUX / E)
		EUX = Lug_EPu;
//      	JM = 1
		AK = LUG_Ke;
      
//C     Initialise variables
		RUN = true;
		for (let i = 0; i<4; i++)
			FAIL[i] = false;
//10    	Next I
		for (let k = 0; k<3; k++)
			FAILIN[k] = false;
//15    	Next k
		FAILO = false;
		a = 0;
		b = 1;
		ILEVEL = 20;
		TOL = 0.1;
		HMAX = 0.05;

//C     Call subroutine to read in all the data.

//      For J = 0 To JM - 1 Step 1
        AKT = AK;
        if (RUN) 
//C            Call subroutine to perform the integration of stress.
            C9108A();

		
        if (RUN)
            AKUX = (1 / FUX) * RESULT;
//C
        if (AKUX > 1) {
			RUN = false;
			FAILO = true;
		}
//50    Next J
		//console.log((1 / FUX) * RESULT);
//C     ..................................................................
//C     Print results and warning messages.
//C
/*20*/  if (RUN)
			return AKUX;
//          For J = 0 To JM - 1 Step 1
//             WRITE(IOUT,3020) AK(J),AKUX(J)
//3005      Next J
        if (FAIL[2]) return "Stop : Too many iterations > 99";
        if (FAILO) return "Warning : Ktux > 1.0";
	}
	function C9108A() {


		let skipto60=false;
		let TOL1, pos, H,
		HS, VO = new Array(3), SO , VN = Array.from({ length: 2 }, () => new Array(3)),
		SN = new Array(2), STV = Array.from({ length: 21 }, () => new Array(3)), STTOL = new Array(21),
		STS = new Array(21), STH = new Array(21), STPOS = new Array(21);
      
		let SP, STLEV = new Array(21), ILEV1, IBLOCK, IARRAY, IARR2;

//C----------------------------------------------------------------------
//'C     Initialize flags.
		FAIL[0] = false;
		FAIL[1] = false;
		ILEV1 = 1;

//'C     Initialize quantities.
		TOL1 = 2 * TOL * 10;
		RESULT = 0;
		SP = 0;

//'C Simpson    's rule for complete interval.
		pos = a;
		H = (b - a) / 2;
		HS = H / 3;
		VO[0] = F1(a);
		if (!RUN) return;
		VO[1] = F1(a + H);
		if (!RUN) return;
		VO[2] = F1(b);
		if (!RUN) return;
		SO = HS * (VO[0] + 4 * VO[1] + VO[2]);

//'C     Double number of sub-divisions and halve step length & tolerance.
		while (true) {
/*10*/		H = H / 2;
			HS = H / 3;
			TOL1 = TOL1 / 2;

//'C     Check on number of sub-levels.
			ILEV1 = ILEV1 + 1;

			if (ILEV1 > ILEVEL) {
				RUN = false;
				FAIL[0] = true;
				RESULT = 0;
				return; //GoTo 80
			}

//'C     Put old function values in new array.
			for (IBLOCK = 0; IBLOCK<2; IBLOCK++)
				for (IARRAY = 0; IARRAY<2; IARRAY++){
					IARR2 = (IARRAY === 0) ? 0 : 2;
					VN[IBLOCK][IARR2] = VO[IARRAY + IBLOCK];
				}
/* 20 */

//C     Calculate mid-division new function values and new Simpson values.
			VN[0][1] = F1(pos + H);
			if (!RUN) return;
			VN[1][1] = F1(pos + 3 * H);
			if (!RUN) return;
			for (IBLOCK = 0; IBLOCK<2; IBLOCK++)
				SN[IBLOCK] = HS * (VN[IBLOCK][0] + 4 * VN[IBLOCK][1] + VN[IBLOCK][2]);
/* 30 */ 

//'C     Compare old and new Simpson integral values.
			if (Math.abs(SN[0] + SN[1] - SO) <= Math.abs(TOL1) && H < HMAX) skipto60=true; // GoTo 60

//'C     Approximation outside tolerance.
			if (!skipto60) {
//'C     Copy new into old.
				for (IARRAY = 0; IARRAY<3; IARRAY++)
					VO[IARRAY] = VN[0][IARRAY];
/* 40 */
				SO = SN[0];

//'C     Push other approximation onto stack.
				if (SP == 20) {
					RUN = false;
					FAIL[1] = true;
					RESULT = 0;
					return; // GoTo 80
				}
//'C
				SP++;
//'C
				for (IARRAY = 0; IARRAY<3; IARRAY++) {
					STV[SP][IARRAY] = VN[1][IARRAY];
				}
				
				
/* 50 */
//'C
				STS[SP] = SN[1];
				STLEV[SP] = ILEV1;
				STH[SP] = H;
				STPOS[SP] = pos + 2 * H;
				STTOL[SP] = TOL1;
//'C
				continue; //GoTo 10
			}
			skipto60=false;
//'C
//'C     Approximation within tolerance.
/* 60 */    RESULT = RESULT + SN[0] + SN[1]
//'C
//'C     Remove item from stack.
			if (SP == 0) return; //Then GoTo 80
				for (IARRAY = 0; IARRAY<3; IARRAY++)
					VO[IARRAY] = STV[SP][IARRAY];
/* 70 */
			SO = STS[SP];
			ILEV1 = STLEV[SP];
			H = STH[SP];
			pos = STPOS[SP];
			TOL1 = STTOL[SP];
			SP = SP - 1;
//'C
			continue; //GoTo 10
		}
/* 80 */
	}
	function F1(x) {

		let EPSIX;
//C
		RUN = true;
//C
		EPSIX = EUX / AKT ** 2 + EUX * (1 - 1 / AKT ** 2) * (1 - x) ** AKT;
//C
//C
//C     Call subroutine to calculate stress at a given strain.
		B7616A(EPSIX);
//C
//C     The function for integration takes the following form.
      //F1 = f;
//C
		if (KOUNT >= 100) {
			RUN = false;
			FAIL[2] = true;
			return f;
		}
//C
		if (NOTE1 == 1) {
			RUN = false;
			FAIL[3] = true;
			return f;
		}
//C
		return f;
}
	function B7616A(EPSI){

		let IFLAG1;
		let H, AN, BETA, a, x,
		FFNEST, Error, CORRF, XX;
//C
//C     Check that m is within range, that E is positive and real,that fn
//C     is not zero and that strain*E/fn is within range. F is set to a
//C     a default value.
		f = 9999.9;
		NOTE1 = 0;
		if (AM < 2.00001 || AM > 100000 || (Math.abs(fn)) < 0.0001 || E < 0.0001 || (Math.abs(EPSI * E / fn)) > 100) {
			NOTE1 = 1;
			return;
		}
//C
//C     If the strain is very small the elastic relationship is used.
		if ((Math.abs(EPSI * E / fn)) < 0.000001) {
			f = EPSI * E;
			return;
		}
//C
//C     Set starting values for iteration.
		H = 37;
		KOUNT = 0;
//C
//C     Calculation of estimated stress, FFNEST, using Equation (5.1).
//C     First set the flag used for recording exceedence of number limit.
//C     Exceedence is checked at every stage of the calculation.
		IFLAG1 = 1;
		x = Math.abs(EPSI * E / fn);
		AK = -0.86977 + 0.79044 * AM;
		AN = 1 + 1 / AM;
//C
		if (((AM - 1 - AK) * (Math.log10(AN))) > H) IFLAG1 = 2;
		if ((AK * Math.log10(AN)) > H) IFLAG1 = 2;
		if ((AK * Math.log10(x)) > H) IFLAG1 = 2;
		if (((AM - 1) * Math.log10(x)) > H) IFLAG1 = 2;
//C
		if (IFLAG1 == 1) {
			BETA = (AN ** (AM - 1 - AK)) - AN ** (-AK);
			a = 1 + (BETA * x ** AK) + (x ** (AM - 1)) / AM;
			if (((1 / AM) * Math.log10(a)) < -H) IFLAG1 = 2;
			if (IFLAG1 == 1) FFNEST = x * a ** (-1 / AM);
		}
//C
//C     If solution of Equation (5.1) fails owing to exceeding the
//C     number allowed (of exponent H) then a solution is obtained for
//C     the asymptote by using logarithms.
		if (IFLAG1 == 2) {
			FFNEST = Math.log10(x) - (1 / AM) * (Math.log10(1 / AM) + (AM - 1) * (Math.log10(x)));
			FFNEST = 10 ** FFNEST;
		}
//C
//C     Estimated value of stress, FFNEST, now computed.
//C
//C     Commence refinement of estimated stress using Newton-Raphson
//C     method using logarithms to avoid exceeding machine number limit.
//C     Set tolerance limit on the iteration.
		Error = FFNEST * 0.000001;
		do {
/*10*/	    KOUNT = KOUNT + 1;
			XX = FFNEST + 10 ** (Math.log10(1 / AM) + AM * (Math.log10(FFNEST)));
			CORRF = (XX - x) / (1 + (10 ** ((AM - 1) * Math.log10(FFNEST))));
			FFNEST = FFNEST - CORRF;
//C
//C     Limit number of iterations and set default value of stress.
			if (KOUNT > 99) {
				f = 9999.9;
				return;
			}
//C
		} while (Math.abs(CORRF) > Error) // GoTo 10
//C
//C     Stress ratio f/fn is calculated therefore the stress can now be
//C     calculated and the sign adjusted to that of the input strain.
		f = FFNEST * fn;
		let SIGN_epsi = EPSI >= 0 ? 1 : -1;
		f = SIGN_epsi * f;

	}
	function MAT_RAMBERG_FN(Fy, M) {

		let epsil1;
		let epsil2;
		let fac1;
	
		epsil1 = 0.001;
		epsil2 = 0.002;
	
		fac1 = -1 / (M - 1);

		//return (Fy * (M * epsil2 * E / Fy) ** (fac1)).toFixed(1);
		return parseFloat((Fy * (M * epsil2 * E / Fy) ** (fac1)).toFixed(1));
}
	return {ESDU_Ktux: ESDU_Ktux};
}
function _Kqux(a_over_Dhole, Dhole_over_t, direction_axial, lugs_plane) {
	// See ESDU 91008 Figure 2
	if (a_over_Dhole < 0.55 || a_over_Dhole > 4)
		return "Out of Graph";

	if (lugs_plane == "L-ST" || lugs_plane == "LT-ST")
		if (direction_axial == "L" || direction_axial == "LT")
			return -0.020686644 * a_over_Dhole ** 7 + 0.343924632 * a_over_Dhole ** 6 + -2.329038377 * a_over_Dhole ** 5 + 8.188767467 * a_over_Dhole ** 4 + -15.635152884 * a_over_Dhole ** 3 + 15.002455203 * a_over_Dhole ** 2 + -4.893741525 * a_over_Dhole + 0.10949317;

	if (Dhole_over_t < 1 || Dhole_over_t > 10)
		return "Out of Graph";

	tmp1 = -0.016651476 * a_over_Dhole ** 4 + 0.215673996 * a_over_Dhole ** 3 + -1.109922491 * a_over_Dhole ** 2 + 3.164652812 * a_over_Dhole + -1.459182226;
	tmp2 = -0.014618343 * a_over_Dhole ** 4 + 0.202562094 * a_over_Dhole ** 3 + -1.094277539 * a_over_Dhole ** 2 + 3.170083983 * a_over_Dhole + -1.468723642;
	tmp3 = -0.014703836 * a_over_Dhole ** 4 + 0.203159811 * a_over_Dhole ** 3 + -1.103786743 * a_over_Dhole ** 2 + 3.177713657 * a_over_Dhole + -1.468538376;
	tmp4 = -0.018233914 * a_over_Dhole ** 4 + 0.241507935 * a_over_Dhole ** 3 + -1.262210923 * a_over_Dhole ** 2 + 3.387653019 * a_over_Dhole + -1.546659624;
	tmp5 = -0.012157044 * a_over_Dhole ** 4 + 0.192977312 * a_over_Dhole ** 3 + -1.163193517 * a_over_Dhole ** 2 + 3.318040901 * a_over_Dhole + -1.533972705;
	tmp6 = -0.014751864 * a_over_Dhole ** 4 + 0.226961711 * a_over_Dhole ** 3 + -1.315246374 * a_over_Dhole ** 2 + 3.493128779 * a_over_Dhole + -1.592740804;
	tmp7 = -0.026641119 * a_over_Dhole ** 4 + 0.346189148 * a_over_Dhole ** 3 + -1.720629272 * a_over_Dhole ** 2 + 3.942742652 * a_over_Dhole + -1.743019468;
	tmp8 = -0.034966163 * a_over_Dhole ** 4 + 0.430961504 * a_over_Dhole ** 3 + -2.00484828 * a_over_Dhole ** 2 + 4.214879575 * a_over_Dhole + -1.816870693;
	tmp9 = -0.04184438 * a_over_Dhole ** 4 + 0.492862586 * a_over_Dhole ** 3 + -2.173903383 * a_over_Dhole ** 2 + 4.29602549 * a_over_Dhole + -1.804560213;
	tmp10 = -0.021030676 * a_over_Dhole ** 7 + 0.340663114 * a_over_Dhole ** 6 + -2.241478852 * a_over_Dhole ** 5 + 7.637726687 * a_over_Dhole ** 4 + -14.094064916 * a_over_Dhole ** 3 + 12.942297359 * a_over_Dhole ** 2 + -3.583335901 * a_over_Dhole + -0.207030603;

	if (Dhole_over_t >= 1 || Dhole_over_t < 2)
		return lerp(Dhole_over_t, 1, 2, tmp1, tmp2);
	if (Dhole_over_t >= 2 || Dhole_over_t < 3)
		return lerp(Dhole_over_t, 2, 3, tmp2, tmp3);
	if (Dhole_over_t >= 3 || Dhole_over_t < 4)
		return lerp(Dhole_over_t, 3, 4, tmp3, tmp4);
	if (Dhole_over_t >= 4 || Dhole_over_t < 5)
		return lerp(Dhole_over_t, 4, 5, tmp4, tmp5);
	if (Dhole_over_t >= 5 || Dhole_over_t < 6)
		return lerp(Dhole_over_t, 5, 6, tmp5, tmp6);
	if (Dhole_over_t >= 6 || Dhole_over_t < 7)
		return lerp(Dhole_over_t, 6, 7, tmp6, tmp7);
	if (Dhole_over_t >= 7 || Dhole_over_t < 8)
		return lerp(Dhole_over_t, 7, 8, tmp7, tmp8);
	if (Dhole_over_t >= 8 || Dhole_over_t < 9)
		return lerp(Dhole_over_t, 8, 9, tmp8, tmp9);
	if (Dhole_over_t >= 9 || Dhole_over_t <= 10)
		return lerp(Dhole_over_t, 9, 10, tmp9, tmp10);
}
function kpx(x) {
// See ESDU 91008 Figure 3
    if (x < 0 || x > 3)
        return "Out of graph";
    if (x <= 1.5)
        return 1.1;
	return 0.017524 * x ^ 7 + -0.198421 * x ^ 6 + 0.877876 * x ^ 5 + -1.889439 * x ^ 4 + 1.993416 * x ^ 3 + -0.96519 * x ^ 2 + 0.176297 * x + 1.095193;
}
function kuy(x, mat) {
// See ESDU 91008 Figure 4
    if (x < 0 || x > 1.4)
        return "Out of graph";
    if (mat == "steel")
        return -0.103339641 * x ** 4 + 0.019478908 * x ** 3 + 0.132119432 * x ** 2 + 1.260455811 * x + 0.005419517;
    if (mat == "aluminum" || mat == "titanium")
        return 0.003092467 * x ** 4 + -0.168642187 * x ** 3 + 0.13426057 * x ** 2 + 1.154580866 * x + 0.000257365;   
    return "Wrong Material";
}
function kpy(x) {
// See ESDU 91008 Figure 5
    if (x < 0 || x > 1.4)
        return "Out of graph";
	return 0.080888763 * x ** 4 + -0.305581748 * x ** 3 + 0.030373882 * x ** 2 + 1.270997983 * x + -0.003552377;
}
function KDhole_W(Dhole_over_W) {
// See ESDU 71011 Figure 4
    if (Dhole_over_W < 0 || Dhole_over_W > 0.8)
		return "Out of graph";
	return 0.053718732 * Dhole_over_W ** 2 + 0.901252783 * Dhole_over_W + 0.003894126;
}
function gamma_fctn(ct, bottom) {
	let x = bottom, y;
	if (ct >= 0.55)
		if (x > 2)
			y = 1;
		else
			y = 0.5014 * x;
	else if (ct >= 0.5)
		if (x >= 0.725792 && x <= 1.27595)
			y = 0.9878 * x ** 3 - 3.6078 * x ** 2 + 4.6888 * x - 1.5167;
		else
			y = 0.5014 * x - 0.0028;
	else if (ct >= 0.4)
		if (x > 0.51237 && x < 0.955197)
			y = -14.064 * x ** 4 + 45.639 * x ** 3 - 55.865 * x ** 2 + 31.104 * x - 6.1851;
		else if (x >= 0.955197 && x < 1.50957)
			y = -0.2567 * x ** 2 + 0.8724 * x + 0.0223;
		else
			y = 0.5014 * x - 0.0028;
	else if (ct >= 0.3)
		if (x > 0.334314 && x < 0.887426)
			y = 2.8538 * x ** 3 - 6.9149 * x ** 2 + 5.9885 * x - 1.1716;
		else if (x >= 0.887426 && x < 1.69436)
			y = 0.1846 * x ** 3 - 0.8266 * x ** 2 + 1.3767 * x - 0.0098;
		else
			y = 0.5014 * x - 0.0028;
	else if (ct >= 0.2)
		if (x > 0.209295 && x < 0.855435)
			y = -11.908 * x ** 4 + 30.416 * x ** 3 - 29.073 * x ** 2 + 12.808 * x - 1.5579;
		else if (x >= 0.855435 && x < 1.79034)
			y = -0.0893 * x ** 2 + 0.3494 * x + 0.5583;
		else
			y = 0.5014 * x - 0.0028;
	else if (ct >= 0.1)
		if (x > 0.109533 && x < 0.83102)
			y = 29.869 * x ** 5 - 81.717 * x ** 4 + 87.847 * x ** 3 - 47.076 * x ** 2 + 13.132 * x - 0.7866;
		else if (x >= 0.83102 && x < 1.87663)
			y = -0.035 * x ** 2 + 0.144 * x + 0.8024;
		else
			y = 0.5014 * x - 0.0028;
	else
		y = 0.5014 * x - 0.0028;
return y;
}

// boltgroup funcs
function boltgroupCalcs() {
	// Get
	let locY = +GEBID("boltgroupForm", "locyIn").value;
	let locZ = +GEBID("boltgroupForm", "loczIn").value;
	let Fy = +GEBID("boltgroupForm", "FyIn").value;
	let Fz = +GEBID("boltgroupForm", "FzIn").value;
	let Mx = +GEBID("boltgroupForm", "MxIn").value;
	let loadCase = +GEBID("boltgroupForm", "loadCaseIn").value;
	let fastProps = [];
	for (let i=0; childSeq(GEBID("boltgroupForm", "inTab"), [0, i+1]) !== undefined; i++) {
		fastProps[i] = [];
		for (let j=0; j<4; j++) fastProps[i][j] = +childSeq(GEBID("boltgroupForm", "inTab"), [0, i+1, j+1, 0]).value;
	}
	// Let
	let temp = array2Transpose(fastProps);
	let Ycg = SUMPRODUCT([temp[0], temp[3]])/SUM(temp[3]);
	let Zcg = SUMPRODUCT([temp[1], temp[2]])/SUM(temp[2]);
	let Mxcg = Mx+Fy*(Zcg-locZ)-Fz*(Ycg-locY);
	let Ix = SUMPRODUCT([temp[2], temp[1], temp[1]]) + SUMPRODUCT([temp[3], temp[0], temp[0]]) - Ycg**2*SUM(temp[3]) - Zcg**2*SUM(temp[2]);
	//console.log(Mxcg + ", " + Mx);
	outs = [];
	for (let i=0; i<fastProps.length; i++) {
		outs[i] = [];
		outs[i][0] = fastProps[i][0]==""?"":fastProps[i][0]-Ycg;
		outs[i][1] = fastProps[i][0]==""?"":fastProps[i][1]-Zcg;
		outs[i][2] = fastProps[i][0]==""?"":Fy*fastProps[i][2]/SUM(temp[2]);
		outs[i][3] = fastProps[i][1]==""?"":Fz*fastProps[i][3]/SUM(temp[3]);
		outs[i][4] = fastProps[i][0]==""?"":-fastProps[i][2]*(fastProps[i][1]-Zcg)*Mxcg/Ix;
		outs[i][5] = fastProps[i][0]==""?"":fastProps[i][3]*(fastProps[i][0]-Ycg)*Mxcg/Ix;
		outs[i][6] = fastProps[i][0]==""?"":outs[i][2]+outs[i][4];
		outs[i][7] = fastProps[i][0]==""?"":outs[i][3]+outs[i][5];
		outs[i][8] = fastProps[i][0]==""?"":Math.sqrt(outs[i][6]**2 + outs[i][7]**2);
	}
	//console.log(outs);
	let PyTot = SUM(array2Transpose(outs)[6]);
	let PzTot = SUM(array2Transpose(outs)[7]);
	let MxTot = mxtotal(array2Transpose(outs)[6],array2Transpose(outs)[7],temp[0],temp[1],Ycg,Zcg);
	//console.log(MxTot);
	// Set
	GEBID("boltgroupForm", "YcgOut").innerHTML = sRound(Ycg, 3);
	GEBID("boltgroupForm", "ZcgOut").innerHTML = sRound(Zcg, 3);
	GEBID("boltgroupForm", "MxcgOut").innerHTML = sRound(Mxcg, 0);
	GEBID("boltgroupForm", "IxOut").innerHTML = sRound(Ix, 4);
	GEBID("boltgroupForm", "PyTotOut").innerHTML = sRound(PyTot, 0);
	GEBID("boltgroupForm", "PzTotOut").innerHTML = sRound(PzTot, 0);
	GEBID("boltgroupForm", "MxTotOut").innerHTML = sRound(MxTot, 0);
	let sig = [3,3,0,0,0,0,0,0,0];
	for (let i=0; i<outs.length; i++) 
		for (let j=0; j<outs[i].length; j++) 
			childSeq(GEBID("boltgroupForm", "outTab"), [0, i+1, j+1]).innerHTML = sRound(outs[i][j], sig[j]);
	// Met (sur le graphique)
	let chartData = [];
	for (let i=0; i<temp[0].length; i++) chartData[i] = {x: temp[0][i], y: temp[1][i]};
	if (boltgroupChart) boltgroupChart.destroy();
	boltgroupChart = new Chart(GEBID("boltgroupForm", "bgChart"), {
		type: "scatter",
		data: {
			datasets: [{
				label: "Fasteners",
				data: chartData,
				backgroundColor: 'rgba(00, 00, 80, 0.8)', // Color of the points
                borderColor: 'rgba(00, 00, 80, 1)', // Border color of the points
                borderWidth: 1,
                pointRadius: 3, // Size of the points
                pointHoverRadius: 5 // Size of the points on hover
			},
			{
				label: "CG",
				data: [{x: Ycg, y: Zcg}],
				backgroundColor: 'rgba(255, 00, 255, 0.8)', // Color of the points
                borderColor: 'rgba(255, 00, 255, 1)', // Border color of the points
                borderWidth: 1,
                pointRadius: 3, // Size of the points
                pointHoverRadius: 5 // Size of the points on hover
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: true,
			aspectRatio: 1.5,
            scales: {
                x: {
                    type: 'linear', // Scatter plots usually use linear scales for both axes
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Y-Axis'
                    }
                },
                y: {
                    type: 'linear',
                    title: {
                        display: true,
                        text: 'Z-Axis'
                    }
                }
            }
		}
	});
}
function SUMPRODUCT(ARR) { // Excel array sumproduct
	let result = 0;
	for (i=0; i<ARR[0].length; i++) {
		let dummy = 1;
		for (j=0; j<ARR.length; j++) dummy*=ARR[j][i];
		result += dummy;
	}
	return +result;
}
function SUM(ARR) { // Excel array sum
	let result = 0;
	for (let i=0; i<ARR.length; i++) result += ARR[i];
	return +result;
}
function array2Transpose(ARR) { // Matrix shtuff lol
	let result = [];
	for (let i=0; i< ARR[0].length; i++) {
		result[i] = [];
		for (let j=0; j<ARR.length; j++) result[i][j] = ARR[j][i];
	}
	return result;
}
function mxtotal(Py,Pz,y,z,Ycg,Zcg) {
	let result = 0, Pyy, Pzz;
	for (let i = 0; i<30; i++) {
		if (Py[i] == "") Pyy = 0;
		else Pyy = Py[i];
		if (Pz[i] == "") Pzz = 0;
		else Pzz = Pz[i];
		result += -Pyy * (z[i] - Zcg) + Pzz * (y[i] - Ycg);
	}
	return result;
}

// Frame funcs
// STA
function frameSTACalcs() {
	// inputs
	let Fcy = +GEBID("frameSTAForm", "FcyIn").value;
	let tf = +GEBID("frameSTAForm", "tfIn").value;
	let Hf = +GEBID("frameSTAForm", "hfIn").value;
	let Yf = +GEBID("frameSTAForm", "YfIn").value;
	let Ef = +GEBID("frameSTAForm", "EfIn").value;
	let Af = +GEBID("frameSTAForm", "AfIn").value;
	let If = +GEBID("frameSTAForm", "IfIn").value;
	let r = +GEBID("frameSTAForm", "rIn").value;
	let L = +GEBID("frameSTAForm", "LIn").value;
	let Esk = +GEBID("frameSTAForm", "EskIn").value;
	let tsk = +GEBID("frameSTAForm", "tskIn").value;
	let Astr = +GEBID("frameSTAForm", "AstrIn").value;
	let Istr = +GEBID("frameSTAForm", "IstrIn").value;
	let bstr = +GEBID("frameSTAForm", "bstrIn").value;
	let a = +GEBID("frameSTAForm", "aIn").value;
	let b = +GEBID("frameSTAForm", "bIn").value;
	let P = [];
	let S = [];
	let M = [];
	let Phi = [];
	let loadTab = GEBID("frameSTAForm", "locLoadTable"); // Loc(k n' )Load(Table)
	for (let LLTRow of [loadTab.querySelector("#PRow"), loadTab.querySelector("#SRow"), loadTab.querySelector("#MRow"), loadTab.querySelector("#PhiRow")])
		for (let i=0; i<9; i++) switch (LLTRow.id){
			case "PRow":
				P[i] = +LLTRow.children[i+1].children[0].value;
				break;
			case "SRow":
				S[i] = +LLTRow.children[i+1].children[0].value;
				break;
			case "MRow":
				M[i] = +LLTRow.children[i+1].children[0].value;
				break;
			case "PhiRow":
				Phi[i] = +LLTRow.children[i+1].children[0].value;
				break;
		};
	let thetas = [];
	for (let i=0; i<21; i++) thetas[i] = GEBID("frameSTAForm", "frameStresses").querySelector("#theta" + i).children[0].children[0].value;
	
	// calcs
	let thetastr = radToDeg(bstr/r).toFixed(1);
	let te = ((If*12/L)**(1/3)).toFixed(3);
	let tprime = ((L*tsk+Af)/L).toFixed(3);
	let iOut = (If/L).toFixed(3);
	let A = (r/Math.sqrt(6)).toFixed(2);
	let B = ((Esk*te*r*r/(Ef*iOut))**0.25).toFixed(2);
	let Lc = (A*B).toFixed(1);
	let Lr = ((r/2)*Math.sqrt(Esk*tprime/(Esk*0.33*tsk))).toFixed(1);
	let gamma = Ef*If/(2*Ef*iOut*Lc);
	
	// table calcs
	getLoad = Get_Load(L, r, [P, S, M, Phi], If, Lc, Lr, thetas, gamma);
	//console.log(getLoad); // Debug
	let fa = [];
	let MYI = [];
	let MHYI = [];
	let f2 = [];
	let f1 = [];
	let fs = [];
	for (let i=0; i<getLoad.length; i++) {
		fa[i] = getLoad[i][0]/Af;
		MYI[i] = getLoad[i][2] * Yf / If;
		MHYI[i] = getLoad[i][2] * (Hf - Yf) / If;
		f2[i] = Math.max(fa[i]-MYI[i], fa[i]-MHYI[i], fa[i]+MYI[i], fa[i]+MHYI[i]);
		f1[i] = Math.min(fa[i]-MYI[i], fa[i]-MHYI[i], fa[i]+MYI[i], fa[i]+MHYI[i]);
		fs[i] = getLoad[i][1] / (Hf * tf);
	}
	
	let fc_cr = getfc_cr(r, Hf, tf, Ef*1000000, 19, 0.33, Fcy, Math.min(...f2) / Math.max(...f2));
	let Kb = fc_cr != "Error No Convergence" ? fc_cr[0].toFixed(2) : "Error";
	let kb = Kb != "Error" ? (Kb / (12 * (1-0.3*0.3) / Math.PI ** 2)).toFixed(2) : "Error";
	let Et = fc_cr != "Error No Convergence" ? fc_cr[1].toExponential(2) : "Error";
	let Es = fc_cr != "Error No Convergence" ? fc_cr[2].toExponential(2) : "Error"; //
	let nu = fc_cr != "Error No Convergence" ? fc_cr[3].toFixed(2) : "Error";
	let eta = fc_cr != "Error No Convergence" ? fc_cr[4].toFixed(2) : "Error";
	let Fbcrel = fc_cr != "Error No Convergence" ? fc_cr[5].toFixed(0) : "Error";
	let Fbcrpl = fc_cr != "Error No Convergence" ? fc_cr[6].toFixed(0) : "Error";
	
	let J = ((Math.PI ** 2) / (12*(1-0.33**2))).toFixed(3);
	let Ks = ESDU_71005("AESS", a/b).toFixed(2);
	let ks = (J*Ks).toFixed(2);
	let Fscr = (J*Ks*Ef*1000000*(tf/b)**2).toFixed(0);
	let fs2 = Math.max(...fs, Math.abs(Math.min(...fs)));
	let Fscr2 = 34000; // From "Shear Buckling Check" worksheet
	//let fb = f1;
	//let Fbcrpl2 = Fbcrpl;
	let Rs = (fs2/Fscr2).toFixed(4);
	let Rb = (Math.abs(Math.min(...f2).toFixed(0))/Fbcrpl).toFixed(4);
	let msCond = (1/Math.sqrt(Rs**2 + Rb**2)-1).toFixed(2);
	let MS = msCond > 2 ? "HIGH" : msCond;
	
	// Output
	GEBID("frameSTAForm", "thetastrOut").innerHTML = thetastr;
	GEBID("frameSTAForm", "teOut").innerHTML = te;
	GEBID("frameSTAForm", "tprimeOut").innerHTML = tprime;
	GEBID("frameSTAForm", "iOut").innerHTML = iOut;
	GEBID("frameSTAForm", "AOut").innerHTML = A;
	GEBID("frameSTAForm", "BOut").innerHTML = B;
	GEBID("frameSTAForm", "LcOut").innerHTML = Lc;
	GEBID("frameSTAForm", "LrOut").innerHTML = Lr;
	GEBID("frameSTAForm", "gammaOut").innerHTML = gamma.toFixed(3);
	GEBID("frameSTAForm", "LrLcOut").innerHTML = (Lr/Lc).toFixed(3);
	
	for (let i=0; i<getLoad.length; i++) {
		let currRow = GEBID("frameSTAForm", "theta" + i);
		currRow.children[1].innerHTML = getLoad[i][0].toFixed(0);
		currRow.children[2].innerHTML = getLoad[i][1].toFixed(0);
		currRow.children[3].innerHTML = getLoad[i][2].toFixed(0);
		currRow.children[4].innerHTML = fa[i].toFixed(0);
		currRow.children[5].innerHTML = MYI[i].toFixed(0);
		currRow.children[6].innerHTML = MHYI[i].toFixed(0);
		currRow.children[7].innerHTML = f2[i].toFixed(0);
		currRow.children[8].innerHTML = f1[i].toFixed(0);
		currRow.children[9].innerHTML = fs[i].toFixed(0);
	}
	
	GEBID("frameSTAForm", "f1Out").innerHTML = Math.min(...f2).toFixed(0);
	GEBID("frameSTAForm", "f2Out").innerHTML = Math.max(...f2).toFixed(0);
	GEBID("frameSTAForm", "f1f2Out").innerHTML = (Math.min(...f2) / Math.max(...f2)).toFixed(3);
	GEBID("frameSTAForm", "aOut").innerHTML = r;
	GEBID("frameSTAForm", "bOut").innerHTML = Hf;
	GEBID("frameSTAForm", "kbOut").innerHTML = kb;
	GEBID("frameSTAForm", "KbOut").innerHTML = Kb;
	GEBID("frameSTAForm", "EtOut").innerHTML = Et;
	GEBID("frameSTAForm", "EsOut").innerHTML = Es;
	GEBID("frameSTAForm", "nuOut").innerHTML = nu;
	GEBID("frameSTAForm", "etaOut").innerHTML = eta;
	GEBID("frameSTAForm", "FbcrelOut").innerHTML = Fbcrel;
	GEBID("frameSTAForm", "FbcrplOut").innerHTML = Fbcrpl;
	
	GEBID("frameSTAForm", "ksOut").innerHTML = ks;
	GEBID("frameSTAForm", "JOut").innerHTML = J;
	GEBID("frameSTAForm", "KsOut").innerHTML = Ks;
	GEBID("frameSTAForm", "Fscr1Out").innerHTML = Fscr;
	
	GEBID("frameSTAForm", "fsOut").innerHTML = fs2.toFixed(0);
	GEBID("frameDiagTensForm", "fsIn").value = fs2.toFixed(0);
	GEBID("frameSTAForm", "Fscr2Out").innerHTML = Fscr2;
	GEBID("frameSTAForm", "fbOut").innerHTML = Math.min(...f2).toFixed(0);
	GEBID("frameSTAForm", "Fbcrpl2Out").innerHTML = Fbcrpl;
	GEBID("frameSTAForm", "RsOut").innerHTML = Rs;
	GEBID("frameSTAForm", "RbOut").innerHTML = Rb;
	GEBID("frameSTAForm", "MSOut").innerHTML = MS;
	if (msCond > 0) GEBID("frameSTAForm", "MSOut").style.backgroundColor = "lightgreen";
	else GEBID("frameSTAForm", "MSOut").style.backgroundColor = "red";
	
	let shearArr = [];
	for (let i=0; i<getLoad.length; i++) shearArr[i] = getLoad[i][1];
	GEBID('frameDiagTensForm', 'PshearIn').value = Math.max(...shearArr, Math.abs(Math.min(...shearArr))).toFixed(0);
}
function Get_Load(l_o, R, LOAD_ARRAY, Io, Lc, Lr, ANGLE_ARRAY, gamma) {

let N = [], t = [], M = [], theta = [];
let theta2 = [], output_array = [];

for (let i = 0; i < 9; i++) {
    N[i] = LOAD_ARRAY[0][i];
    t[i] = LOAD_ARRAY[1][i];
    M[i] = LOAD_ARRAY[2][i];
    theta[i] = LOAD_ARRAY[3][i];
}
for (let J = 0; J < 21; J++) {
	output_array[J] = [];
    output_array[J][0] = 0; // Axial Force
    output_array[J][1] = 0; // Shear Force
    output_array[J][2] = 0; // Bending Moment
    theta2[J] = ANGLE_ARRAY[J];
}

for (let I = 0; I < 9; I++)
    for (let J = 0; J < 21; J++) {
        let alpha = Math.abs(theta[I] - theta2[J]);
        output_array[J][0] = output_array[J][2] + Axial_Curve(l_o, R, N[I], t[I], M[I], Io, Lc, Lr, alpha, gamma);
        output_array[J][1] = output_array[J][1] + Shear_Curve(l_o, R, N[I], t[I], M[I], Io, Lc, Lr, alpha, gamma);
        output_array[J][2] = output_array[J][2] + Bending_Curve(l_o, R, N[I], t[I], M[I], Io, Lc, Lr, alpha, gamma);
	}

return output_array;
}
function Axial_Curve(l_o, R, P_o, T_o, M_o, Io, Lc, Lr, theta, gamma) {
	let Dynamic = 0;
	let Pie = 3.1415624;
	let LrLc = Lr / Lc;
	let small_a_n;
	let K_n;
	let bar_q_n;
	let double_bar_q_n;
	let gamma_Primer;
	let k2;
	
	for (let NN = 2; NN <= 100; NN++) {
		small_a_n = ((NN ** 2 - 1) * (LrLc) ** 2) / 3;
		K_n = NN * ((NN ** 2 - 1) ** 0.5) * (1 + 2 * small_a_n) / ((2 * (3 ** 0.5) * (1 + small_a_n) ** 0.5));
		if (NN == 2) {
			k2 = K_n;
			gamma_Primer = gamma * ((1 + (l_o / (2 * Lc)) * ((1 + LrLc ** 2) ** 0.5) / (1 + 2 * LrLc ** 2) * (1 + 1 / (2 * gamma * k2)) * (4 * LrLc ** 2 + 1 / (1 + LrLc ** 2))));
		}
		bar_q_n = ((NN * P_o) / (2 * Pie * R)) / (1 + gamma_Primer * K_n);
		double_bar_q_n = -1 * (1 / (2 * Pie * R)) * (((1 - NN ** 2) / R) * M_o + T_o) / (1 + gamma_Primer * K_n);
		Dynamic = Dynamic + (bar_q_n * Math.cos(degToRad(NN * theta)) + double_bar_q_n * Math.sin(degToRad(NN * theta))) * (2 * R * NN) / (1 - NN ** 2);
	}

	let Static_Normal_Load = (-1 * P_o / (2 * Pie)) * (3 * Math.cos(degToRad(theta)) / 2 + (Pie - degToRad(theta)) * Math.sin(degToRad(theta)));
	let Static_Tangent_Load = (T_o / (2 * Pie)) * (Math.sin(degToRad(theta)) / 2 - (Pie - degToRad(theta)) * Math.cos(degToRad(theta)));
	let Static_Moment = (-1 * M_o * Math.sin(degToRad(theta))) / (Pie * R);

	return Dynamic + Static_Normal_Load + Static_Tangent_Load + Static_Moment;

}
function Shear_Curve(l_o, R, P_o, T_o, M_o, Io, Lc, Lr, theta, gamma) {
	let Dynamic = 0;
	let Pie = 3.1415624;
	let LrLc = Lr / Lc;
	let small_a_n;
	let K_n;
	let bar_q_n;
	let double_bar_q_n;
	let gamma_Primer;
	let k2;
	
	for (let NN = 2; NN <= 100; NN++) {
		small_a_n = ((NN ** 2 - 1) * (LrLc) ** 2) / 3;
		K_n = NN * ((NN ** 2 - 1) ** 0.5) * (1 + 2 * small_a_n) / ((2 * (3 ** 0.5) * (1 + small_a_n) ** 0.5));
		if (NN == 2) {
			k2 = K_n;
			gamma_Primer = gamma * ((1 + (l_o / (2 * Lc)) * ((1 + LrLc ** 2) ** 0.5) / (1 + 2 * LrLc ** 2) * (1 + 1 / (2 * gamma * k2)) * (4 * LrLc ** 2 + 1 / (1 + LrLc ** 2))));
		}
		bar_q_n = ((NN * P_o) / (2 * Pie * R)) / (1 + gamma_Primer * K_n);
		double_bar_q_n = -1 * (1 / (2 * Pie)) * (((1 - NN ** 2) / R ** 2) * M_o + (T_o / R)) / (1 + gamma_Primer * K_n);
		Dynamic = Dynamic + (-1 * bar_q_n * Math.sin(degToRad(NN * theta)) + double_bar_q_n * Math.cos(degToRad(NN * theta))) * (2 * R) / (1 - NN ** 2);
	}
	
	let Static_Normal_Load = (P_o / (2 * Pie)) * (Math.sin(degToRad(theta)) / 2 - (Pie - degToRad(theta)) * Math.cos(degToRad(theta)));
	let Static_Tangent_Load = (T_o / (2 * Pie)) * ((Pie - degToRad(theta)) * Math.sin(degToRad(theta)) - Math.cos(degToRad(theta)) / 2 - 1);
	let Static_Moment = (-1 * M_o / (2 * Pie * R)) * (1 + 2 * Math.cos(degToRad(theta)));
	
	return Dynamic + Static_Normal_Load + Static_Tangent_Load + Static_Moment;
}
function Bending_Curve(l_o, R, P_o, T_o, M_o, Io, Lc, Lr, theta, gamma) {
	let Dynamic = 0;
	let Pie = 3.1415624;
	let LrLc = Lr / Lc;
	let small_a_n;
	let K_n;
	let bar_q_n;
	let double_bar_q_n;
	let gamma_Primer;
	let k2;
	
	for (let NN = 2; NN <= 1000; NN++) {
		small_a_n = ((NN ** 2 - 1) * (LrLc) ** 2) / 3;
		K_n = NN * ((NN ** 2 - 1) ** 0.5) * (1 + 2 * small_a_n) / ((2 * (3 ** 0.5) * (1 + small_a_n) ** 0.5));
		if (NN == 2) {
			k2 = K_n;
			gamma_Primer = gamma * ((1 + (l_o / (2 * Lc)) * ((1 + LrLc ** 2) ** 0.5) / (1 + 2 * LrLc ** 2) * (1 + 1 / (2 * gamma * k2)) * (4 * LrLc ** 2 + 1 / (1 + LrLc ** 2))));
		}
		bar_q_n = ((NN * P_o) / (2 * Pie * R)) / (1 + gamma_Primer * K_n);
		double_bar_q_n = -1 * (1 / (2 * Pie)) * (((1 - NN ** 2) / R ** 2) * M_o + (T_o / R)) / (1 + gamma_Primer * K_n);
		Dynamic = Dynamic + (bar_q_n * Math.cos(degToRad(NN * theta)) + double_bar_q_n * Math.sin(degToRad(NN * theta))) * (2 * R ** 2) / (NN * (1 - NN * NN));
	}
	
	let Static_Normal_Load = (P_o * R / (2 * Pie)) * (1 + (Math.cos(degToRad(theta)) / 2 - (Pie - degToRad(theta)) * Math.sin(degToRad(theta))));
	let Static_Tangent_Load = (T_o * R / (2 * Pie)) * ((Pie - degToRad(theta)) * (1 - Math.cos(degToRad(theta))) - (3 / 2) * (Math.sin(degToRad(theta))));
	let Static_Moment = (M_o / (2 * Pie)) * ((Pie - degToRad(theta)) - 2 * Math.sin(degToRad(theta)));
	
	return Dynamic + Static_Normal_Load + Static_Tangent_Load + Static_Moment;
}
function getfc_cr(a, b, t, E, nc, mu_e, Fcy, ff) {
	let ab = a / b;
	let k = ESDU_S020404(ff, ab);
	let fc_cre = ((3.14 * 3.14 * k * E) / (12 * (1 - 0.33 ** 2))) * (t / b) ** 2;
	let Diff = 1;
	let f = 0;
	let Et;
	let Es;
	let mu;
	let N;
	let F1;
	
	while (Math.abs(Diff) > 0.005) {
		f = f + 10;
		Et = ETangent(f, Fcy, E, nc);
		Es = secant_modulus(E, nc, f, Fcy);
		mu = Es / E * mu_e + (1 - Es / E) * mu_p;
		N = Es / E * (1 - mu_e ** 2) / (1 - mu ** 2) * (0.5 + 0.25 * (1 + 3 * Et / Es) ** 0.5);
		F1 = (N * k * E * 3.14 * 3.14) / (12 * (1 - mu_e ** 2)) * (t / b) ** 2;
		Diff = (f - F1) / f;
		if (f > 10 * Fcy) return "Error No Convergence";
	}
	if (f > Fcy) f = Fcy;
	return [k, Et, Es, mu, N, fc_cre, f];
}

// WDT
function frameWDTCalcs() {
	let [dum, IchInit, AchInit] = WDTSPCalcs(GEBID("frameDiagTensForm", "SPICTab"), GEBID("frameDiagTensForm", "SPICOut"));
	let [estiffInit, IstiffInit, AstiffInit] = WDTSPCalcs(GEBID("frameDiagTensForm", "SPSCTab"), GEBID("frameDiagTensForm", "SPSCOut"));
	GEBID("frameDiagTensForm", "IchIn").value = IchInit.toFixed(5);
	GEBID("frameDiagTensForm", "AchIn").value = AchInit.toFixed(4);
	GEBID("frameDiagTensForm", "estiffIn").value = estiffInit.toFixed(3);
	GEBID("frameDiagTensForm", "IstiffIn").value = IstiffInit.toFixed(6);
	GEBID("frameDiagTensForm", "AstiffIn").value = AstiffInit.toFixed(4);
	
	let inProps = [];
	for (let i=0; i<7; i++) inProps[i] = +GEBID("frameDiagTensForm", "inPropTab").children[0].children[i].children[1].children[0].value;
	for (let i=0; i<3; i++) inProps[i+7] = +GEBID("frameDiagTensForm", "inPropTab").children[0].children[7].children[1].children[0].children[0].children[1].children[i].children[0].value;
	for (let i=8; i<15; i++) inProps[i+2] = +GEBID("frameDiagTensForm", "inPropTab").children[0].children[i].children[1].children[0].value;
	let [E, Ec, Ftu, Fcy, Fsu, b, h, tstiff, tweb, tch, v, Pshear, Ich, Ach, estiff, Astiff, Istiff] = inProps;
	// MUCH cleaner, this file shows my JS competency progression lol
	inProps = [];
	for (let i=0; i<8; i++) inProps[i] = +childSeq(GEBID("frameDiagTensForm", "inBuckleTab"), [0, i, 1, 0]).value;
	let [Kss, Rh, Rd, Fscr, fs, k, alpha, Fsall] = inProps 
	
	// NaN check
	for (let num of [E, Ec, Ftu, Fcy, Fsu, b, h, tstiff, tweb, tch, v, Pshear, Ich, Ach, estiff, Astiff, Istiff, Kss, Rh, Rd, Fscr, fs, k, alpha, Fsall])
		if (isNaN(num)) return;
	
	// Calculations
	let mindcb = Math.min(b, h);
	let maxdcb = Math.max(b, h);
	let bottom = mindcb/maxdcb;
	let equation = h > b ? "17.a" : "17.b";
	let tut = tstiff/tweb;
	let tft = tch/tweb;
	let Fscrn = b<h ? Kss*Math.PI**2*E*((tweb/b)**2)*(1/(12*(1-v**2))*(Rh+0.5*(Rd-Rh)*((b/h)**3))) : Kss*Math.PI**2*E*((tweb/h)**2)*(1/(12*(1-v**2))*(Rh+0.5*(Rd-Rh)*((h/b)**3)));
	let Auebt = (Astiff/(1+((estiff/(Math.sqrt(Istiff/Astiff)))**2)))/(mindcb*tweb);
	let _2AfHt = Ach*2/(h*tweb);
	let wb = 0.7*mindcb*Math.sqrt(tweb/(maxdcb*(Istiff+Ich)));
	let Fs_All = (Fsall/72)*Ftu;
	let ids = ["mindcbOut", "maxdcbOut", "bottomOut", "KssOut", "equationOut", "tutOut", "tftOut", "RhOut", "RdOut", "Kss2Out", "EOut", "vOut", "bOut", "dcOut", "tOut", "Rh2Out", "Rd2Out", "FscrnOut", "FscrOut", "fsFscrOut", "fsOut", "kOut", "AuebtOut", "_2AfHtOut", "alphaOut", "tanalphaOut", "wbOut", "FsallOut", "Fs_AllOut"];
	let values = [mindcb.toFixed(2), maxdcb.toFixed(2), bottom.toFixed(2), Kss.toFixed(2), equation, tut.toFixed(2), tft.toFixed(2), Rh.toFixed(2), Rd.toFixed(2), Kss.toFixed(2), E.toFixed(0), v.toFixed(2), b.toFixed(2), h.toFixed(2), tweb.toFixed(3), Rh.toFixed(2), Rd.toFixed(2), Fscrn.toFixed(0), Fscr.toFixed(0), (fs/Fscr).toFixed(2), fs.toFixed(2), k.toFixed(2), Auebt.toFixed(2), _2AfHt.toFixed(2), alpha.toFixed(1), (Math.tan(degToRad(alpha))).toFixed(2), wb.toFixed(2), Fsall.toFixed(0), Fs_All.toFixed(0)];
	for (let i=0; i<ids.length; i++) GEBID("frameDiagTensForm", ids[i]).innerHTML = values[i];
}
function WDTSPCalcs(table, table2) {
	let A = [], Az = [], Az2 = [], Iyo = [];
	for (let i=0; i<3; i++) {
		let [b, t, z] = [childSeq(table, [0, i+1, 1, 0]).value, childSeq(table, [0, i+1, 2, 0]).value, childSeq(table, [0, i+1, 4, 0]).value];
		A[i] = b*t;
		Az[i] = b*t*z;
		Az2[i] = b*t*z**2;
		Iyo[i] = b*t**3/12;
		childSeq(table, [0, i+1, 3]).innerHTML = A[i].toFixed(3);
		childSeq(table, [0, i+1, 5]).innerHTML = Az[i].toFixed(4);
		childSeq(table, [0, i+1, 6]).innerHTML = Az2[i].toFixed(3);
		childSeq(table, [0, i+1, 7]).innerHTML = Iyo[i].toExponential(2);
	}
	let At, Azt, Az2t, Iyot;
	for (let j=0; j<4; j++) {
		let dummy = 0;
		for (let i=0; i<3; i++) dummy += [A[i], Az[i], Az2[i], Iyo[i]][j];
		childSeq(table, [0, 4, [3, 5, 6, 7][j]]).innerHTML = dummy.toFixed(3);
		if (j==0) At = dummy;
		if (j==1) Azt = dummy;
		if (j==2) Az2t = dummy;
		if (j==3) Iyot = dummy;
	}
	childSeq(table2, [0, 0, 1]).innerHTML = (Azt/At).toFixed(3);
	childSeq(table2, [0, 1, 1]).innerHTML = (Iyot+Az2t-((Azt/At)**2*At)).toFixed(6);
	childSeq(table2, [0, 2, 1]).innerHTML = (At).toFixed(4);
	
	return [Azt/At, Iyot+Az2t-Math.pow(Azt/At, 2)*At, At];
}
function dbgSetAll() {

	let dummy = [];
	// Set Ellipse
	document.getElementById("ellForm").querySelector("#Fx").value = 1000;
	document.getElementById("ellForm").querySelector("#Fy").value = 0;
	document.getElementById("ellForm").querySelector("#Fxy").value = 0.1;
	document.getElementById("ellForm").querySelector("#LONG_DIA").value = 7;
	document.getElementById("ellForm").querySelector("#SHORT_DIA").value = 7;
	ellCalcs();
	
	// Set Tension Clip
	document.getElementById("TCForm").querySelector("#tIn").value = 0.25;
	document.getElementById("TCForm").querySelector("#cIn").value = 0.881;
	document.getElementById("TCForm").querySelector("#FcyIn").value = 62;
	document.getElementById("TCForm").querySelector("#PSIn").value = 1.56;
	document.getElementById("TCForm").querySelector("#AWIn").value = 1.56;
	document.getElementById("TCForm").querySelector("#PCIn").value = 1;
	TCCalcs();
	
	// Set Crippling
	let parent = document.getElementById("cripForm");
	parent.querySelector("#FcyIn").value = 70000;
	parent.querySelector("#EcIn").value = 10700000;
	parent.querySelector("#b1In").value = 1;
	parent.querySelector("#b2In").value = 1;
	parent.querySelector("#t1In").value = 0.062;
	parent.querySelector("#t2In").value = 0.062;
	parent.querySelector("#E1In").value = 1;
	parent.querySelector("#E2In").value = 1;
	cripCalcs(false);
	
	// Set Bending Crippling
	parent = document.getElementById("bCripForm");
	parent.querySelector("#FcyIn").value = 70000;
	parent.querySelector("#EcIn").value = 10700000;
	parent.querySelector("#b1In").value = 0.960;
	parent.querySelector("#b2In").value = 3.45;
	parent.querySelector("#t1In").value = 0.115;
	parent.querySelector("#t2In").value = 0.115;
	parent.querySelector("#E1In").value = 1;
	parent.querySelector("#E2In").value = 0;
	parent.querySelector("#TypeIn1").value = "Chord";
	parent.querySelector("#TypeIn2").value = "Web";
	parent.querySelector("#Ybar1In").value = 3.5225;
	parent.querySelector("#Ybar2In").value = 1.725;
	cripCalcs(true);
	
	// Set OFB
	document.getElementById("OFBForm").querySelector("#ASSIn").checked = false;
	document.getElementById("OFBForm").querySelector("#materialIn").value = "7475_T7351";
	document.getElementById("OFBForm").querySelector("#EcIn").value = 11.5;
	document.getElementById("OFBForm").querySelector("#FcyIn").value = 71;
	document.getElementById("OFBForm").querySelector("#muIn").value = 0.31;
	document.getElementById("OFBForm").querySelector("#ncIn").value = 19;
	document.getElementById("OFBForm").querySelector("#tIn").value = 0.06;
	document.getElementById("OFBForm").querySelector("#bIn").value = 1;
	document.getElementById("OFBForm").querySelector("#F0In").value = -1600;
	document.getElementById("OFBForm").querySelector("#FfIn").value = -40;
	document.getElementById("OFBForm").querySelector("#twebIn").value = 0.125;
	document.getElementById("OFBForm").querySelector("#HfrIn").value = 0.3;
	document.getElementById("OFBForm").querySelector("#LPRIn").value = 0.5;
	OFBcalcs();
	
	// Set FPB
	GEBID("FPBForm", "ETIn").value = "AECC";
	GEBID("FPBForm", "fsIn").value = 2;
	GEBID("FPBForm", "aIn").value = 30;
	GEBID("FPBForm", "bIn").value = 20;
	GEBID("FPBForm", "tIn").value = 0.175;
	GEBID("FPBForm", "EcIn").value = 10500;
	GEBID("FPBForm", "nuIn").value = 0.34;
	GEBID("FPBForm", "f1In").value = -1.5;
	GEBID("FPBForm", "f2In").value = -1.2;
	FPBCalcs();
	
	// Set lug
	dummy = ["lug", 0.5015, 0.374, 0.375, 0.501, 1.25, 0.375, 0, "skip", 0, 1.5, 1.15, 2295, 1541, "skip", 0.375, 0.375, 0.375, 0.63, 0.37, 45, 45];
	for (let i=0; i<dummy.length; i++)
		if (dummy[i] != "skip") childSeq(GEBID("lugForm", "inTab1"), [0, i, 1, 0]).value = dummy[i];
	dummy = ["aluminum", "7076-T7651", "skip", 71, 72, 66, 63, 61, 56, "skip", 94, 109, 108, 134, 22.05, "skip", 10.6, 0.33, 10.6, 3, "ST", "LT-ST"];
	for (let i=0; i<dummy.length; i++)
		if (dummy[i] != "skip") childSeq(GEBID("lugForm", "inTab2"), [0, i, 1, 0]).value = dummy[i];
	dummy = ["skip", "skip", 1261, 29];
	for (let i=0; i<dummy.length; i++)
		if (dummy[i] != "skip") childSeq(GEBID("lugForm", "inTab3"), [0, i, 1, 0]).value = dummy[i];
	dummy = ["skip", "skip", "skip", "N/A", 104, 198, 29, 0.33];
	for (let i=0; i<dummy.length; i++)
		if (dummy[i] != "skip") childSeq(GEBID("lugForm", "inTab4"), [0, i, 1, 0]).value = dummy[i];
	lugCalcs();
	
	// Set bg
	dummy = [-52.95, 147.1, 1143.7, 710.51, -7790.8255, 40];
	let ids = ["locyIn", "loczIn", "FyIn", "FzIn", "MxIn", "loadCaseIn"];
	for (let i=0; i<dummy.length; i++) GEBID("boltgroupForm", ids[i]).value = dummy[i];
	while (BGNumFast < 30) BGAddFast();
	dummy = [
		[-53.5, 148.29, 1, 1],
		[-54.55, 148.29, 1, 1],
		[-55.6, 148.29, 1, 1],
		[-53.5, 147.1, 1, 1],
		[-54.55, 147.1, 1, 1],
		[-55.6, 147.1, 1, 1],
		[-53.5, 146.06, 1, 1],
		[-54.55, 146.06, 1, 1],
		[-55.6, 146.06, 1, 1],
		[-53.95, 145.39, 1, 1],
		[-55, 145.39, 1, 1],
		[-56.05, 145.39, 1, 1],
		[-56.5, 146.48, 1, 1],
		[-56.5, 147.72, 1, 1],
		[-57.4, 147.1, 1, 1],
		[-73.5, 148.29, 1, 1],
		[-74.55, 148.29, 1, 1],
		[-75.6, 148.29, 1, 1],
		[-73.5, 147.1, 1, 1],
		[-74.55, 147.1, 1, 1],
		[-75.6, 147.1, 1, 1],
		[-73.5, 146.06, 1, 1],
		[-74.55, 146.06, 1, 1],
		[-75.6, 146.06, 1, 1],
		[-73.95, 145.39, 1, 1],
		[-75, 145.39, 1, 1],
		[-76.05, 145.39, 1, 1],
		[-76.5, 146.48, 1, 1],
		[-76.5, 147.72, 1, 1],
		[-77.4, 147.1, 1, 1]
	];
	for (let i=0; i<dummy.length; i++) 
		for (let j=0; j<dummy[i].length; j++) 
			childSeq(GEBID("boltgroupForm", "inTab"), [0, i+1, j+1, 0]).value = dummy[i][j];
	dummy = [0,0,0,0];
	for (let i=30; childSeq(GEBID("boltgroupForm", "inTab"), [0, i+1]) !== undefined; i++)
		for (let j=0; j<dummy.length; j++) 
			childSeq(GEBID("boltgroupForm", "inTab"), [0, i+1, j+1, 0]).value = dummy[j];
	boltgroupCalcs();
	
	
	// Set frame STA
	GEBID("frameSTAForm", "FcyIn").value = 65000;
	GEBID("frameSTAForm", "tfIn").value = 0.043;
	GEBID("frameSTAForm", "hfIn").value = 4.84;
	GEBID("frameSTAForm", "YfIn").value = 2.39;
	GEBID("frameSTAForm", "EfIn").value = 10.3;
	GEBID("frameSTAForm", "AfIn").value = 0.7660;
	GEBID("frameSTAForm", "IfIn").value = 3.231;
	GEBID("frameSTAForm", "rIn").value = 127.75;
	GEBID("frameSTAForm", "LIn").value = 20;
	GEBID("frameSTAForm", "EskIn").value = 10;
	GEBID("frameSTAForm", "tskIn").value = 0.063;
	GEBID("frameSTAForm", "AstrIn").value = 0.3286;
	GEBID("frameSTAForm", "IstrIn").value = 0.0684;
	GEBID("frameSTAForm", "bstrIn").value = 9.59;
	GEBID("frameSTAForm", "aIn").value = 9.59;
	GEBID("frameSTAForm", "bIn").value = 4.75;
	
	parent = GEBID("frameSTAForm", "locLoadTable").querySelector("#PRow");
	parent.children[3].children[0].value = -1798;
	parent.children[5].children[0].value = -1891;
	parent.children[7].children[0].value = -1784;
	parent = GEBID("frameSTAForm", "locLoadTable").querySelector("#SRow");
	parent.children[3].children[0].value = -202;
	parent.children[7].children[0].value = 200;
	parent = GEBID("frameSTAForm", "locLoadTable").querySelector("#MRow");
	parent.children[3].children[0].value = 0;
	parent.children[5].children[0].value = 123;
	parent.children[7].children[0].value = 1726;
	parent = GEBID("frameSTAForm", "locLoadTable").querySelector("#PhiRow");
	parent.children[1].children[0].value = 347.16;
	parent.children[2].children[0].value = 351.44;
	parent.children[3].children[0].value = 353.58;
	parent.children[4].children[0].value = 357.86;
	parent.children[5].children[0].value = 0.00;
	parent.children[6].children[0].value = 2.14;
	parent.children[7].children[0].value = 6.42;
	parent.children[8].children[0].value = 8.56;
	parent.children[9].children[0].value = 12.84;
	frameSTACalcs();
	
	// Set frame WDT
	dummy = [[0.063, 0.297, 0.212], [1.126, 0.063, 0.032], [0.063, 0.729, 0.427]]
	let table = GEBID("frameDiagTensForm", "SPICTab");
	for (let i=0; i<3; i++) [childSeq(table, [0, i+1, 1, 0]).value, childSeq(table, [0, i+1, 2, 0]).value, childSeq(table, [0, i+1, 4, 0]).value] = dummy[i];
	dummy = [[1, 0.04, 0.02], [0.04, 0.38, 0.23], [0.04, 0.38, 0.23]]
	table = GEBID("frameDiagTensForm", "SPSCTab");
	for (let i=0; i<3; i++) [childSeq(table, [0, i+1, 1, 0]).value, childSeq(table, [0, i+1, 2, 0]).value, childSeq(table, [0, i+1, 4, 0]).value] = dummy[i];
	GEBID("frameDiagTensForm", "EIn").value = 10300000;
	GEBID("frameDiagTensForm", "EcIn").value = 10500000;
	GEBID("frameDiagTensForm", "FtuIn").value = 72000;
	GEBID("frameDiagTensForm", "FcyIn").value = 65000;
	GEBID("frameDiagTensForm", "FsuIn").value = 47000;
	GEBID("frameDiagTensForm", "bIn").value = 9.59;
	GEBID("frameDiagTensForm", "hIn").value = 4.75;
	GEBID("frameDiagTensForm", "tstiffIn").value = 0.04;
	GEBID("frameDiagTensForm", "twebIn").value = 0.043;
	GEBID("frameDiagTensForm", "tchordIn").value = 0.063;
	GEBID("frameDiagTensForm", "vIn").value = 0.33;
	GEBID("frameDiagTensForm", "KssIn").value = 6.55;
	GEBID("frameDiagTensForm", "RhIn").value = 0.93;
	GEBID("frameDiagTensForm", "RdIn").value = 1.31;
	GEBID("frameDiagTensForm", "FscrIn").value = 4865;
	GEBID("frameDiagTensForm", "kIn").value = 0.02;
	GEBID("frameDiagTensForm", "alphaIn").value = 36.1;
	GEBID("frameDiagTensForm", "FsallIn").value = 34;
	frameWDTCalcs();
	
	console.log("values set");
	return;
}