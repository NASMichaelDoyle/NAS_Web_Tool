
let dbgCSV = `Ellipse
1000,0,0.1,7,6
TC
0.25,0.881,62,1.56,1.56,1
crippling
70000,10700000,1,1,0.062,0.062,1,1
bending crippling
70000,10700000,0.960,3.45,0.115,0.115,1,0,Chord,Web,3.5225,1.725
OFB
false,7475_T7351,11.5,71,0.31,19,0.06,1,-1600,-40,0.125,0.3,0.5
FPB
AECC,2,30,20,0.175,10500,0.34,-1.5,-1.2
Lug
lug,0.5015,0.374,0.375,0.501,1.25,0.375,0,skip,0,1.5,1.15,2295,1541,skip,0.375,0.375,0.375,0.63,0.37,45,45,aluminum,7076-T7651,skip,71,72,66,63,61,56,skip,94,109,108,134,22.05,skip,10.6,0.33,10.6,3,ST,LT-ST,skip,skip,1261,29,skip,skip,skip,N/A,104,198,29,0.33
boltgroup
-52.95,147.1,1143.7,710.51,-7790.8255,40,-53.5, 148.29, 1, 1,-54.55, 148.29, 1, 1,-55.6, 148.29, 1, 1,-53.5, 147.1, 1, 1,-54.55, 147.1, 1, 1,-55.6, 147.1, 1, 1,-53.5, 146.06, 1, 1,-54.55, 146.06, 1, 1,-55.6, 146.06, 1, 1,-53.95, 145.39, 1, 1,-55, 145.39, 1, 1,-56.05, 145.39, 1, 1,-56.5, 146.48, 1, 1,-56.5, 147.72, 1, 1,-57.4, 147.1, 1, 1,-73.5, 148.29, 1, 1,-74.55, 148.29, 1, 1,-75.6, 148.29, 1, 1,-73.5, 147.1, 1, 1,-74.55, 147.1, 1, 1,-75.6, 147.1, 1, 1,-73.5, 146.06, 1, 1,-74.55, 146.06, 1, 1,-75.6, 146.06, 1, 1,-73.95, 145.39, 1, 1,-75, 145.39, 1, 1,-76.05, 145.39, 1, 1,-76.5, 146.48, 1, 1,-76.5, 147.72, 1, 1,-77.4, 147.1, 1, 1
frame STA
65000,0.043,4.84,2.39,10.3,0.7660,3.231,127.75,20,10,0.063,0.3286,0.0684,9.59,9.59,4.75,0,0,-1798,0,-1891,0,-1784,0,0,0,0,-202,0,0,0,200,0,0,0,0,0,0,123,0,1726,0,0,347.16,351.44,353.58,357.86,0.00,2.14,6.42,8.56,12.84
frame WDT
0.063,0.297,0.212,1.126,0.063,0.032,0.063,0.729,0.427,1,0.04,0.02,0.04,0.38,0.23,0.04,0.38,0.23,10300000,10500000,72000,65000,47000,9.59,4.75,0.04,0.043,0.063,0.33,6.55,0.93,1.31,4865,0.02,36.1,34
`;

function downloadInput() {
	let ellData = [];
	let TCData = [];
	let cripData = [];
	let bCripData = [];
	let OFBData = [];
	let FPBData = [];
	let lugData = [];
	let boltgroupData = [];
	let fSTAData = [];
	let fWDTData = [];
	let LJDData = [];
	let IRBData = [];
	let SPData = [];
	// Ellipse
	let ids = ["Fx", "Fy", "Fxy", "LONG_DIA", "SHORT_DIA"];
	for (let i=0; i<ids.length; i++) ellData[i] = GEBID("ellForm", ids[i]).value;
	// Tension Clip
	ids = ["tIn", "cIn", "FcyIn", "PSIn", "AWIn", "PCIn"];
	for (let i=0; i<ids.length; i++) TCData[i] = GEBID("TCForm", ids[i]).value;
	// Crippling
	ids = ["FcyIn", "EcIn", "b1In", "b2In", "t1In", "t2In", "E1In", "E2In"];
	for (let i=0; i<ids.length; i++) cripData[i] = GEBID("cripForm", ids[i]).value;
	// Bending Crippling
	ids = ["FcyIn", "EcIn", "b1In", "b2In", "t1In", "t2In", "E1In", "E2In", "TypeIn1", "TypeIn2", "Ybar1In", "Ybar2In"];
	for (let i=0; i<ids.length; i++) bCripData[i] = GEBID("bCripForm", ids[i]).value;
	// OFB
	OFBData[0] = GEBID("OFBForm", "ASSIn").checked;
	ids = ["materialIn", "EcIn", "FcyIn", "muIn", "ncIn", "tIn", "bIn", "F0In", "FfIn", "twebIn", "HfrIn", "LPRIn"];
	for (let i=1; i<ids.length+1; i++) OFBData[i] = GEBID("OFBForm", ids[i-1]).value;
	// FPB
	ids = ["ETIn", "fsIn", "aIn", "bIn", "tIn", "EcIn", "nuIn", "f1In", "f2In"];
	for (let i=0; i<ids.length; i++) FPBData[i] = GEBID("FPBForm", ids[i]).value;
	// Lug
	for (let i=0; i<22; i++)
		if (childSeq(GEBID("lugForm", "inTab1"), [0, i, 1,]) !== undefined) lugData[i] = childSeq(GEBID("lugForm", "inTab1"), [0, i, 1, 0]).value;// console.log(lugData);}
		else lugData[i] = "skip";
	for (let i=22; i<44; i++)
		if (childSeq(GEBID("lugForm", "inTab2"), [0, i-22, 1,]) !== undefined) lugData[i] = childSeq(GEBID("lugForm", "inTab2"), [0, i-22, 1, 0]).value;
		else lugData[i] = "skip";
	for (let i=44; i<48; i++)
		if (childSeq(GEBID("lugForm", "inTab3"), [0, i-44, 1,]) !== undefined) lugData[i] = childSeq(GEBID("lugForm", "inTab3"), [0, i-44, 1, 0]).value;
		else lugData[i] = "skip";
	for (let i=48; i<56; i++)
		if (childSeq(GEBID("lugForm", "inTab4"), [0, i-48, 1,]) !== undefined) lugData[i] = childSeq(GEBID("lugForm", "inTab4"), [0, i-48, 1, 0]).value;
		else lugData[i] = "skip";
	// Boltgroup
	ids = ["locyIn", "loczIn", "FyIn", "FzIn", "MxIn", "loadCaseIn"];
	for (let i=0; i<6; i++) boltgroupData[i] = GEBID("boltgroupForm", ids[i]).value;
	for (let i=6; childSeq(GEBID("boltgroupForm", "inTab"), [0, parseInt((i-6)/4+1)]) !== undefined; i++) boltgroupData[i] = childSeq(GEBID("boltgroupForm", "inTab"), [0, parseInt((i-6)/4+1), (i-6)%4+1, 0]).value;
	// frame STA
	ids = ["FcyIn", "tfIn", "hfIn", "YfIn", "EfIn", "AfIn", "IfIn", "rIn", "LIn", "EskIn", "tskIn", "AstrIn", "IstrIn", "bstrIn", "aIn", "bIn"];
	for (let i=0; i<16; i++) fSTAData[i] = GEBID("frameSTAForm", ids[i]).value;
	for (let i=16; i<52; i++) fSTAData[i] = childSeq(GEBID("frameSTAForm", "locLoadTable"), [0, parseInt((i-16)/9+1), (i-16)%9+1, 0]).value;
	// frame WDT
	for (let i=0; i<9; i++) fWDTData[i] = childSeq(GEBID("frameDiagTensForm", "SPICTab"), [0, parseInt(i/3+1), i%3+(i%3==2?2:1), 0]).value;
	for (let i=9; i<18; i++) fWDTData[i] = childSeq(GEBID("frameDiagTensForm", "SPSCTab"), [0, parseInt((i-9)/3+1), (i-9)%3+((i-9)%3==2?2:1), 0]).value;
	ids = ["EIn", "EcIn", "FtuIn", "FcyIn", "FsuIn", "bIn", "hIn", "tstiffIn", "twebIn", "tchordIn", "vIn", "KssIn", "RhIn", "RdIn", "FscrIn", "kIn", "alphaIn", "FsallIn"];
	for (let i=18; i<ids.length+18; i++) fWDTData[i] = GEBID("frameDiagTensForm", ids[i-18]).value;
	// LJD
	ids = ["platesHighIn", "platesLongIn", "TAppLoadIn"];
	for (let i=0; i<3; i++) LJDData[i] = GEBID("LJDForm", ids[i]).value;
	try { // if table cells don't exist for whatever reason
		let plat = +LJDData[0], sect = +LJDData[1];
		let tab1 = GEBID("LJDForm", "inTab1");
		//let tab2 = GEBID("LJDForm", "inTab2");
		for (let i=0; i<sect+1; i++) LJDData[i+3] = childSeq(tab1, [1, i+1, 0]).value; // x-coord
		for (let i=0; i<plat*(sect+1); i++) LJDData[i+sect+4] = childSeq(tab1, [4+parseInt(i/(sect+1)), 1+i%(sect+1), 0]).value; // thickness
		for (let i=0; i<plat*(sect+1); i++) LJDData[i+sect+4+plat*(sect+1)] = childSeq(tab1, [6+plat+parseInt(i/(sect+1)), 1+i%(sect+1), 0]).value; // width
		for (let i=0; i<plat*(sect+1); i++) LJDData[i+sect+4+2*plat*(sect+1)] = childSeq(tab1, [8+2*plat+parseInt(i/(sect+1)), 1+i%(sect+1), 0]).value; // Young's modulus
		for (let i=0; i<3*(sect-1); i++) LJDData[i+sect+4+3*plat*(sect+1)] = childSeq(tab1, [9+3*plat+parseInt(i/(sect-1)), 2+i%(sect-1), 0]).value; // fast shizzle
	} catch (err) {
		console.log("LJD not prepared");
		console.error(err);
	}
	// IRB
	for (let i=0; i<IRBNumSect; i++)
		for (let j=0; j<7; j++)
			IRBData[7*i+j] = childSeq(GEBID("IRBForm", "IOTab"), [i+2, j+1, 0]).value;
	// Sect prop
	SPData[0] = SPNumPt;
	for (let i=0; i<3*SPNumPt; i++) SPData[i+1] = childSeq(GEBID("SPForm", "IOTab"), [parseInt(i/3+2), parseInt(i%3+1), 0]).value;
	SPData[3*SPNumPt+1] = GEBID("SPForm", "fAlphaIn").value;
	// Download it
	let csv = "";
	ids = ["Ellipse", "TC", "crippling", "bending crippling", "OFB", "FPB", "Lug", "boltgroup", "frame STA", "frame WDT", "LJD", "IRB", "Section Properties"];
	let allData = [ellData, TCData, cripData, bCripData, OFBData, FPBData, lugData, boltgroupData, fSTAData, fWDTData, LJDData, IRBData, SPData];
	for (let i=0; i<ids.length; i++) csv += ids[i] + "\n" + allData[i] + "\n";
	const element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
	element.setAttribute('download', "nas_inputs.csv");
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}
function uploadInput(ins) {
	let ellData = ins.split("\n")[1].split(",");
	let TCData = ins.split("\n")[3].split(",");
	let cripData = ins.split("\n")[5].split(",");
	let bCripData = ins.split("\n")[7].split(",");
	let OFBData = ins.split("\n")[9].split(",");
	let FPBData = ins.split("\n")[11].split(",");
	let lugData = ins.split("\n")[13].split(",");
	let boltgroupData = ins.split("\n")[15].split(",");
	let fSTAData = ins.split("\n")[17].split(",");
	let fWDTData = ins.split("\n")[19].split(",");
	let LJDData = ins.split("\n")[21].split(",");
	let IRBData = ins.split("\n")[23].split(",");
	let SPData = ins.split("\n")[25].split(",");
	// Ellipse
	let ids = ["Fx", "Fy", "Fxy", "LONG_DIA", "SHORT_DIA"];
	for (let i=0; i<ellData.length; i++) GEBID("ellForm", ids[i]).value = ellData[i];
	ellCalcs();
	// Tension Clip
	ids = ["tIn", "cIn", "FcyIn", "PSIn", "AWIn", "PCIn"];
	for (let i=0; i<TCData.length; i++) GEBID("TCForm", ids[i]).value = TCData[i];
	TCCalcs();
	// Crippling
	ids = ["FcyIn", "EcIn", "b1In", "b2In", "t1In", "t2In", "E1In", "E2In"];
	for (let i=0; i<cripData.length; i++) GEBID("cripForm", ids[i]).value = cripData[i];
	cripCalcs(false);
	// Bending Crippling
	ids = ["FcyIn", "EcIn", "b1In", "b2In", "t1In", "t2In", "E1In", "E2In", "TypeIn1", "TypeIn2", "Ybar1In", "Ybar2In"];
	for (let i=0; i<bCripData.length; i++) GEBID("bCripForm", ids[i]).value = bCripData[i];
	cripCalcs(true);
	// OFB
	GEBID("OFBForm", "ASSIn").checked = OFBData[0];
	ids = ["materialIn", "EcIn", "FcyIn", "muIn", "ncIn", "tIn", "bIn", "F0In", "FfIn", "twebIn", "HfrIn", "LPRIn"];
	for (let i=1; i<OFBData.length-1; i++) GEBID("OFBForm", ids[i-1]).value = OFBData[i];
	OFBcalcs();
	// FPB
	ids = ["ETIn", "fsIn", "aIn", "bIn", "tIn", "EcIn", "nuIn", "f1In", "f2In"];
	for (let i=0; i<FPBData.length; i++) GEBID("FPBForm", ids[i]).value = FPBData[i];
	FPBCalcs();
	// Lug
	for (let i=0; i<22; i++)
		if (lugData[i] != "skip") childSeq(GEBID("lugForm", "inTab1"), [0, i, 1, 0]).value = lugData[i];
	for (let i=22; i<44; i++)
		if (lugData[i] != "skip") childSeq(GEBID("lugForm", "inTab2"), [0, i-22, 1, 0]).value = lugData[i];
	for (let i=44; i<48; i++)
		if (lugData[i] != "skip") childSeq(GEBID("lugForm", "inTab3"), [0, i-44, 1, 0]).value = lugData[i];
	for (let i=48; i<56; i++)
		if (lugData[i] != "skip") childSeq(GEBID("lugForm", "inTab4"), [0, i-48, 1, 0]).value = lugData[i];
	lugCalcs();
	// Boltgroup
	ids = ["locyIn", "loczIn", "FyIn", "FzIn", "MxIn", "loadCaseIn"];
	for (let i=0; i<6; i++) GEBID("boltgroupForm", ids[i]).value = boltgroupData[i];
	let dummy = [];
	for (let i=6; i<boltgroupData.length; i+=4) {
		dummy[(i-6)/4] = [];
		for (let j=i; j<i+4; j++) dummy[(i-6)/4][j-i] = boltgroupData[j];
	}
	//console.log(dummy);
	while (BGNumFast<dummy.length) BGAddFast();
	while (BGNumFast>dummy.length) BGRmFast();
	for (let i=0; i<dummy.length; i++) 
		for (let j=0; j<dummy[i].length; j++) 
			childSeq(GEBID("boltgroupForm", "inTab"), [0, i+1, j+1, 0]).value = +dummy[i][j];
	for (let i=dummy.length; childSeq(GEBID("boltgroupForm", "inTab"), [0, i+1]) !== undefined; i++)
		for (let j=0; j<4; j++) 
			childSeq(GEBID("boltgroupForm", "inTab"), [0, i+1, j+1, 0]).value = 0;
	boltgroupCalcs();
	// frame STA
	ids = ["FcyIn", "tfIn", "hfIn", "YfIn", "EfIn", "AfIn", "IfIn", "rIn", "LIn", "EskIn", "tskIn", "AstrIn", "IstrIn", "bstrIn", "aIn", "bIn"];
	for (let i=0; i<16; i++) GEBID("frameSTAForm", ids[i]).value = fSTAData[i];
	for (let i=16; i<fSTAData.length; i++) childSeq(GEBID("frameSTAForm", "locLoadTable"), [0, parseInt((i-16)/9+1), (i-16)%9+1, 0]).value = fSTAData[i];
	frameSTACalcs();
	// frame WDT
	for (let i=0; i<9; i++) childSeq(GEBID("frameDiagTensForm", "SPICTab"), [0, parseInt(i/3+1), i%3+(i%3==2?2:1), 0]).value = fWDTData[i];
	for (let i=9; i<18; i++) childSeq(GEBID("frameDiagTensForm", "SPSCTab"), [0, parseInt((i-9)/3+1), (i-9)%3+((i-9)%3==2?2:1), 0]).value = fWDTData[i];
	ids = ["EIn", "EcIn", "FtuIn", "FcyIn", "FsuIn", "bIn", "hIn", "tstiffIn", "twebIn", "tchordIn", "vIn", "KssIn", "RhIn", "RdIn", "FscrIn", "kIn", "alphaIn", "FsallIn"];
	for (let i=18; i<fWDTData.length; i++) GEBID("frameDiagTensForm", ids[i-18]).value = fWDTData[i];
	frameWDTCalcs();
	// LJD
	{
		let plat = +LJDData[0], sect = +LJDData[1];
		let tab1 = GEBID("LJDForm", "inTab1");
		//let tab2 = GEBID("LJDForm", "inTab2");
		ids = ["platesHighIn", "platesLongIn", "TAppLoadIn"];
		for (let i=0; i<3; i++) GEBID("LJDForm", ids[i]).value = LJDData[i];
		LJDPrepIns();
		try {
		for (let i=0; i<sect+1; i++) childSeq(tab1, [1, i+1, 0]).value = LJDData[i+3]; // x-coord
		for (let i=0; i<plat*(sect+1); i++) childSeq(tab1, [4+parseInt(i/(sect+1)), 1+i%(sect+1), 0]).value = LJDData[i+sect+4]; // thickness
		for (let i=0; i<plat*(sect+1); i++) childSeq(tab1, [6+plat+parseInt(i/(sect+1)), 1+i%(sect+1), 0]).value = LJDData[i+sect+4+plat*(sect+1)]; // width
		for (let i=0; i<plat*(sect+1); i++) childSeq(tab1, [8+2*plat+parseInt(i/(sect+1)), 1+i%(sect+1), 0]).value = LJDData[i+sect+4+2*plat*(sect+1)]; // Young's modulus
		for (let i=0; i<3*(sect-1); i++) childSeq(tab1, [9+3*plat+parseInt(i/(sect-1)), 2+i%(sect-1), 0]).value = LJDData[i+sect+4+3*plat*(sect+1)]; // fast shizzle
		LJDFEM();
		} catch {
			console.log("LJD input was invalid");
		}
	}
	// IRB
	{
		let newNSect = IRBData.length/7;
		if (newNSect<IRBNumSect) for (let i=IRBNumSect; i>newNSect; i--) IRBRmSect();
		else for (let i=IRBNumSect; i<newNSect; i++) IRBAddSect();
		for (let i=0; i<IRBNumSect; i++)
			for (let j=0; j<7; j++)
				childSeq(GEBID("IRBForm", "IOTab"), [i+2, j+1, 0]).value = IRBData[7*i+j];
	}
	// Sect prop
	{
		let newNPt = SPData[0];
		if (newNPt<SPNumPt) for (let i=SPNumPt; i>newNPt; i--) SPRmPt();
		else for (let i=SPNumPt; i<newNPt; i++) SPAddPt();
		for (let i=0; i<3*SPNumPt; i++) childSeq(GEBID("SPForm", "IOTab"), [parseInt(i/3+2), parseInt(i%3+1), 0]).value = SPData[i+1];
		GEBID("SPForm", "fAlphaIn").value = SPData[3*SPNumPt+1];
		SPCalcs();
	}
}