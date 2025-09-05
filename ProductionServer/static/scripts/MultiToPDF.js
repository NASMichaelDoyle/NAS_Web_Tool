function texTitle() {
	let title = GEBID("reportCover", "titleIn").value.toUpperCase();
	let docid = GEBID("reportCover", "docidIn").value.toUpperCase();
	let rev = GEBID("reportCover", "revIn").value.toUpperCase();
	let date = GEBID("reportCover", "dateIn").value;
	let prep = GEBID("reportCover", "prepIn").value;
	let check = GEBID("reportCover", "checkIn").value;
	let approve = GEBID("reportCover", "approveIn").value;

	return coverTemplate
	.replace("<TITLE>", title == "" ? "ANALYSIS" : title)
	.replace("<DOCID>", docid == "" ? "NAS-12345" : docid)
	.replace("<REV>", rev == "" ? "IR" : rev)
	.replace("<DATE>", date)
	.replace("<PREP>", prep == "" ? "M. Doyle" : prep)
	.replace("<CHECK>", check)
	.replace("<APPROVE>", approve);
}
function texPara(n) {
	//console.log("paraForm" + n)
	let heading = GEBID("paraForm" + n, "paraHead").value;
	let paragraph = GEBID("paraForm" + n, "paraText").value;
	return (heading.toLowerCase() == "conclusion" ? "\\clearpage\n\\section{" : heading == "" ? "%" : "\\subsection{") + heading + "}\n\n" + paragraph + "\n\n";
}
function texEllipse(tex, index) {
		for (let eta_deg = 0; eta_deg <=360; eta_deg += 15) {
			let htmlRow = document.getElementById("ellForm").querySelector("#eta" + eta_deg);
			let eta = +htmlRow.children[1].innerHTML;
			let f_e = +htmlRow.children[2].innerHTML;
			let f_n = +htmlRow.children[3].innerHTML;
			let f_ne = +htmlRow.children[4].innerHTML;

			// Update LaTeX table
			tRow = String(eta_deg) + " & " + eta.toFixed(3) + " & " + f_e.toFixed(3) + " & " + f_n.toFixed(3) + " & " + f_ne.toFixed(3) + "\\\\\\hline";
			if (eta_deg < 360) tRow += "\n{\\%ellTLH}";
			tex = tex.replace("{\\%ellTLH}", tRow);
		}
		tex = tex.replace("ellipse_chart_b64png", "ellipse_chart" + index +"_b64png");
		return tex;
}
function texTC(tex) {
		let CType = document.getElementById("TCForm").querySelector("#CTIn").value;
		let t = +document.getElementById("TCForm").querySelector("#tIn").value;
		let c = +document.getElementById("TCForm").querySelector("#cIn").value;
		let Fcy = +document.getElementById("TCForm").querySelector("#FcyIn").value;
		let s = +document.getElementById("TCForm").querySelector("#PSIn").value; // Point space
		let w = +document.getElementById("TCForm").querySelector("#AWIn").value; // Angle width
		let n = +document.getElementById("TCForm").querySelector("#PCIn").value; // Point count
		let outLbs = document.getElementById("TCForm").querySelector("#OutputBox").innerHTML;

		return tex
		.replace("{\\%CTIn}", CType)
		.replace("{\\%tIn}", t)
		.replace("{\\%cIn}", c)
		.replace("{\\%FcyIn}", Fcy)
		.replace("{\\%PSIn}", s)
		.replace("{\\%AWIn}", w)
		.replace("{\\%PCIn}", n)
		.replace("{\\%POut}", outLbs);

}
function texCrip(tex) {
		let Fcy = +document.getElementById("cripForm").querySelector("#FcyIn").value;
		let Ec = +document.getElementById("cripForm").querySelector("#EcIn").value;
		let b1 = +document.getElementById("cripForm").querySelector("#b1In").value;
		let b2 = +document.getElementById("cripForm").querySelector("#b2In").value;
		let t1 = +document.getElementById("cripForm").querySelector("#t1In").value;
		let t2 = +document.getElementById("cripForm").querySelector("#t2In").value;
		let E1 = +document.getElementById("cripForm").querySelector("#E1In").value;
		let E2 = +document.getElementById("cripForm").querySelector("#E2In").value;
		let A1 = +document.getElementById("cripForm").querySelector("#Area1").innerHTML;
		let A2 = +document.getElementById("cripForm").querySelector("#Area2").innerHTML;
		let Fcc1 = +document.getElementById("cripForm").querySelector("#Fcc1").innerHTML;
		let Fcc2 = +document.getElementById("cripForm").querySelector("#Fcc2").innerHTML;
		let FccA1 = +document.getElementById("cripForm").querySelector("#FccA1").innerHTML;
		let FccA2 = +document.getElementById("cripForm").querySelector("#FccA2").innerHTML;
		let FccT = +document.getElementById("cripForm").querySelector("#FccOut").innerHTML;
		let PccT = +document.getElementById("cripForm").querySelector("#PccOut").innerHTML;

		return tex
		.replace("{\\%Fcy}", Fcy)
		.replace("{\\%Ec}", Ec)
		.replace("{\\%b1}", b1)
		.replace("{\\%b2}", b2)
		.replace("{\\%t1}", t1)
		.replace("{\\%t2}", t2)
		.replace("{\\%Edges1}", E1)
		.replace("{\\%Edges2}", E2)
		.replace("{\\%A1}", A1)
		.replace("{\\%A2}", A2)
		.replace("{\\%Fcc1}", Fcc1)
		.replace("{\\%Fcc2}", Fcc2)
		.replace("{\\%FccA1}", FccA1)
		.replace("{\\%FccA2}", FccA2)
		.replace("{\\%Fcc}", FccT)
		.replace("{\\%Pcc}", PccT);
}
function texBCrip(tex) {
		let Fcy = +document.getElementById("bCripForm").querySelector("#FcyIn").value;
		let Ec = +document.getElementById("bCripForm").querySelector("#EcIn").value;
		let b1 = +document.getElementById("bCripForm").querySelector("#b1In").value;
		let b2 = +document.getElementById("bCripForm").querySelector("#b2In").value;
		let t1 = +document.getElementById("bCripForm").querySelector("#t1In").value;
		let t2 = +document.getElementById("bCripForm").querySelector("#t2In").value;
		let E1 = +document.getElementById("bCripForm").querySelector("#E1In").value;
		let E2 = +document.getElementById("bCripForm").querySelector("#E2In").value;
		let Ybar1 = +document.getElementById("bCripForm").querySelector("#Ybar1In").value;
		let Ybar2 = +document.getElementById("bCripForm").querySelector("#Ybar2In").value;
		let Type1 = document.getElementById("bCripForm").querySelector("#TypeIn1").value;
		let Type2 = document.getElementById("bCripForm").querySelector("#TypeIn2").value;
		let Fcc1 = +document.getElementById("bCripForm").querySelector("#Fcc1").innerHTML;
		let Fcc2 = +document.getElementById("bCripForm").querySelector("#Fcc2").innerHTML;
		let Yi1 = +document.getElementById("bCripForm").querySelector("#Yi1").innerHTML;
		let Yi2 = +document.getElementById("bCripForm").querySelector("#Yi2").innerHTML;
		let Mo1 = +document.getElementById("bCripForm").querySelector("#Mo1").innerHTML;
		let Mo2 = +document.getElementById("bCripForm").querySelector("#Mo2").innerHTML;
		let MAM = +document.getElementById("bCripForm").querySelector("#MAMOut").innerHTML;

		return tex
		.replace("{\\%Fcy}", Fcy)
		.replace("{\\%Ec}", Ec)
		.replace("{\\%b1}", b1)
		.replace("{\\%b2}", b2)
		.replace("{\\%t1}", t1)
		.replace("{\\%t2}", t2)
		.replace("{\\%Edges1}", E1)
		.replace("{\\%Edges2}", E2)
		.replace("{\\%Ybar1}", Ybar1)
		.replace("{\\%Ybar2}", Ybar2)
		.replace("{\\%Type1}", Type1)
		.replace("{\\%Type2}", Type2)
		.replace("{\\%Fcc1}", Fcc1)
		.replace("{\\%Fcc2}", Fcc2)
		.replace("{\\%Yi1}", Yi1)
		.replace("{\\%Yi2}", Yi2)
		.replace("{\\%Mo1}", Mo1)
		.replace("{\\%Mo2}", Mo2)
		.replace("{\\%MAM}", MAM);
}
function texOFB(tex) {
		let ASS = document.getElementById("OFBForm").querySelector("#ASSIn").checked;
		let Mater = document.getElementById("OFBForm").querySelector("#MatIn").value;
		let Ec = +document.getElementById("OFBForm").querySelector("#EcIn").value;
		let Fcy = +document.getElementById("OFBForm").querySelector("#FcyIn").value;
		let mu = +document.getElementById("OFBForm").querySelector("#muIn").value;
		let nc = +document.getElementById("OFBForm").querySelector("#ncIn").value;
		let t = +document.getElementById("OFBForm").querySelector("#tIn").value;
		let b = +document.getElementById("OFBForm").querySelector("#bIn").value;
		let F0 = +document.getElementById("OFBForm").querySelector("#F0In").value;
		let Ff = +document.getElementById("OFBForm").querySelector("#FfIn").value;
		let tweb = +document.getElementById("OFBForm").querySelector("#twebIn").value;
		let Hfr = +document.getElementById("OFBForm").querySelector("#HfrIn").value;
		let LPR = +document.getElementById("OFBForm").querySelector("#LPRIn").value;
		let F0Ff = +document.getElementById("OFBForm").querySelector("#FoFfOut").innerHTML;
		let K = +document.getElementById("OFBForm").querySelector("#KOut").innerHTML;
		let Et = +document.getElementById("OFBForm").querySelector("#EtOut").innerHTML;
		let Es = +document.getElementById("OFBForm").querySelector("#EsOut").innerHTML;
		let eta = +document.getElementById("OFBForm").querySelector("#etaOut").innerHTML;
		let mu_c = +document.getElementById("OFBForm").querySelector("#mu_cOut").innerHTML;
		let Fofb = +document.getElementById("OFBForm").querySelector("#FofbOut").innerHTML;
		let MS = +document.getElementById("OFBForm").querySelector("#MSOut").innerHTML;

		return tex
		.replace("{\\%ASS}", ASS ? "Note that the structure was assumed to be simply supported (rotational stiffness and web rigidity were neglected)." : "")
		.replace("{\\%Mater}", MatLib[Mater].name)
		.replace("{\\%Ec}", Ec)
		.replace("{\\%Fcy}", Fcy)
		.replace("{\\%mu}", mu)
		.replace("{\\%nc}", nc)
		.replace("{\\%t}", t)
		.replace("{\\%b}", b)
		.replace("{\\%F0}", F0)
		.replace("{\\%Ff}", Ff)
		.replace("{\\%tweb}", tweb)
		.replace("{\\%Hfr}", Hfr)
		.replace("{\\%LPR}", LPR)
		.replace("{\\%F0/Ff}", F0Ff)
		.replace("{\\%K}", K)
		.replace("{\\%Et}", Et)
		.replace("{\\%Es}", Es)
		.replace("{\\%eta}", eta)
		.replace("{\\%mu\\_c}", mu_c)
		.replace("{\\%Fofb}", Fofb)
		.replace("{\\%MS}", MS);
}
function texFPB(tex) {
	let ET;
	switch (GEBID("FPBForm", "ETIn").value) {
		case "AECC":
			ET = "All Edges Clamped";
			break;
		case "LECC":
			ET = " Long Edges Clamped";
			break;
		case "SECC":
			ET = "Short Edges Clamped";
			break;
		case "1LECC":
			ET = "1 Long Edge Clamped";
			break;
		case "1SECC":
			ET = "1 Short Edge Clamped";
			break;
		case "AESS":
			ET = "All Edges Simply Supported";
			break;
	}
	let fs = GEBID("FPBForm", "fsIn").value;
	let a = GEBID("FPBForm", "aIn").value;
	let b = GEBID("FPBForm", "bIn").value;
	let t = GEBID("FPBForm", "tIn").value;
	let Ec = GEBID("FPBForm", "EcIn").value;
	let nu = GEBID("FPBForm", "nuIn").value;
	let f1 = GEBID("FPBForm", "f1In").value;
	let f2 = GEBID("FPBForm", "f2In").value;
	let Ks = GEBID("FPBForm", "KsOut").innerHTML;
	let Fscr = GEBID("FPBForm", "FscrOut").innerHTML;
	let MS_SBA = GEBID("FPBForm", "MS_SBAOut").innerHTML;
	let f2f1 = GEBID("FPBForm", "f2f1Out").innerHTML;
	let Kc = GEBID("FPBForm", "KcOut").innerHTML;
	let Fcr = GEBID("FPBForm", "FcrOut").innerHTML;
	let MS_CBA = GEBID("FPBForm", "MS_CBBAOut").innerHTML;
	let fsFscr = GEBID("FPBForm", "fsFscrOut").innerHTML;
	let f1Fcr = GEBID("FPBForm", "f1FcrOut").innerHTML;
	let MS_MCL = GEBID("FPBForm", "MS_SBAOut").innerHTML;

	return tex
	.replace("{\\%ET}", ET)
	.replace("{\\%fs}", fs)
	.replace("{\\%a}", a)
	.replace("{\\%b}", b)
	.replace("{\\%t}", t)
	.replace("{\\%Ec}", Ec)
	.replace("{\\%nu}", nu)
	.replace("{\\%f1}", f1)
	.replace("{\\%f2}", f2)
	.replace("{\\%ab}", a/b)
	.replace("{\\%Ks}", Ks)
	.replace("{\\%Fscr}", Fscr)
	.replace("{\\%MS\\_SBA}", MS_SBA)
	.replace("{\\%f2f1}", f2f1)
	.replace("{\\%Kc}", Kc)
	.replace("{\\%Fcr}", Fcr)
	.replace("{\\%MS\\_CBA}", MS_CBA)
	.replace("{\\%fsFscr}", fsFscr)
	.replace("{\\%f1Fcr}", f1Fcr)
	.replace("{\\%f2f1}", f2f1)
	.replace("{\\%MS\\_MCL}", MS_MCL)
	.replace("<MS1>", MS_SBA > 0 ? "gudgreen" : "red") // colors
	.replace("<MS2>", MS_CBA > 0 ? "gudgreen" : "red")
	.replace("<MS3>", MS_MCL > 0 ? "gudgreen" : "red");
}
function chartsFPB() {
	let options1 = {
			animation: { duration: 0 },
			responsive: false,
			maintainAspectRatio: false,
			aspectRatio: 1.7,
			// GLOBAL FONT SETTINGS (affects all text unless overridden)
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
			animation: { duration: 0 },
			responsive: false,
			maintainAspectRatio: false,
			aspectRatio: 1.7,
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
			animation: { duration: 0 },
			responsive: false,
			maintainAspectRatio: false,
			aspectRatio: 1.7,
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

	let data1 = Chart.getChart(GEBID("FPBForm", "FPBChart1")).data;
	let data2 = Chart.getChart(GEBID("FPBForm", "FPBChart2")).data;
	let data3 = Chart.getChart(GEBID("FPBForm", "FPBChart3")).data;


	if (hiddenChart1) hiddenChart1.destroy();
	if (hiddenChart2) hiddenChart2.destroy();
	if (hiddenChart3) hiddenChart3.destroy();

	hiddenChart1 = new Chart(GEBID("hiddenChart1"), {
		type: "line",
		data: data1,
		options: options1
	});
	hiddenChart2 = new Chart(GEBID("hiddenChart2"), {
		type: "line",
		data: data2,
		options: options2
	});
	hiddenChart3 = new Chart(GEBID("hiddenChart3"), {
		type: "line",
		data: data3,
		options: options3
	});
}
function texLug() {
	let tex = lugTemplate;
	let dumRow = [];
	// Inputs
	let dummy = [];
	let ids = ["LorCIn", "DholeIn", "DpinIn", "DIbushIn", "DObushIn", "WIn", "toIn", "gIn", "loadIDIn", "UFacIn", "FFacIn", "PaxialIn", "PtransIn", "tlugIn", "tiIn", "tcontactIn", "aIn", "cIn", "s1In", "s2In", "alloyIn", "matLugIn", "FtuLIn", "FtuLTIn", "FtuSTIn", "FtyLIn", "FtyLTIn", "FtySTIn", "Fbry15In", "Fbry20In", "Fbru15In", "Fbru20In", "FcorroIn", "EIn", "muIn", "eIn", "tstockIn", "ALDirIn", "lugPlaneIn", "matPinIn", "MallowIn", "E2In", "matBushIn", "PradIn", "FbryIn", "FbruIn", "EBushIn", "muBushIn"];
	for (let i=0; i < ids.length; i++)
		dummy[i] = GEBID("lugForm", ids[i]).value;
	let [LorC, Dhole, Dpin, DIbush, DObush, W, to, g, loadID, UFac, FFac, Paxial, Ptrans, tlug, ti, tcontact, a, c, s1, s2, alloy, matlug, FtuL, FtuLT, FtuST, FtyL, FtyLT, FtyST, Fbry15, Fbry20, Fbru15, Fbru20, Fcorro, Elug, mu, e, tstock, ALDir, lugPlane, matPin, Mallow, Epin, matBush, Prad, Fbry, Fbru, EBush, muBush] = dummy;
	let PlugA = GEBID("lugForm", "PlugAOut").innerHTML, PlugT = GEBID("lugForm", "PlugTOut").innerHTML;
	tex = tex.replace("<LorC>", LorC);
	// Build row
	dumRow[0] = Dhole+"&"+Dpin+"&"+DIbush+"&"+DObush+"&"+W+"&"+to+"&"+g;
	dumRow[1] = tlug+"&"+ti+"&"+tcontact+"&"+a+"&"+c+"&"+s1+"&"+s2;
	dumRow[2] = loadID+"&"+UFac+"&"+FFac+"&"+Paxial+"&"+Ptrans+"&"+PlugA+"&"+PlugT;
	dumRow[3] = alloy+"&"+MatLib[matlug].name;
	dumRow[4] = FtuL+"&"+FtuLT+"&"+FtuST+"&"+FtyL+"&"+FtyLT+"&"+FtyST;
	dumRow[5] = Fbry15+"&"+Fbry20+"&"+Fbru15+"&"+Fbru20+"&"+Fcorro;
	dumRow[6] = Elug+"&"+mu+"&"+e+"&"+tstock+"&"+ALDir+"&"+lugPlane;
	dumRow[7] = MatLib[matPin].name+"&"+Mallow+"&"+Epin;
	dumRow[8] = MatLib[matBush].name+"&"+Prad+"&"+Fbry+"&"+Fbru+"&"+EBush+"&"+muBush;
	
	for (let i=0; i< dumRow.length; i++) tex = tex.replace("<inRow"+(i+1)+">", dumRow[i]);
	dumRow = [];
	for (let i=0; i<18; i++) {
		dumRow[i] = childSeq(GEBID("lugForm", "outTab"+(i+1)), [0, 0, 1]).innerHTML;
		for (let j=1; j<GEBID("lugForm", "outTab"+(i+1)).children[0].children.length; j++) {
			if (childSeq(GEBID("lugForm", "outTab"+(i+1)), [0, j]).children.length < 2) continue;
			if (childSeq(GEBID("lugForm", "outTab"+(i+1)), [0, j, 0]).innerHTML.search("MS") != -1) 
				dumRow[i] += "&" + "\\cellcolor{" + (+childSeq(GEBID("lugForm", "outTab"+(i+1)), [0, j, 1]).innerHTML <= 0 ? "red":"gudgreen") + "}{" + childSeq(GEBID("lugForm", "outTab"+(i+1)), [0, j, 1]).innerHTML + "}";
			else dumRow[i] += "&" + childSeq(GEBID("lugForm", "outTab"+(i+1)), [0, j, 1]).innerHTML;
		}
	}
	for (let i=0; i<5; i++) tex = tex.replace("<outRow"+(i+1)+">", dumRow[i]);
	let specialRow = dumRow[5].split("&");
	tex = tex
	.replace("<outRow6>", specialRow[0]+"&"+specialRow[1]+"&"+specialRow[2])
	.replace("<outRow7>", specialRow[3]+"&"+specialRow[4]+"&"+specialRow[5]+"&"+specialRow[6]+"&"+specialRow[7]);
	for (let i=6; i<9; i++) tex = tex.replace("<outRow"+(i+2)+">", dumRow[i]);
	for (let i=9; i<15; i+=2) tex = tex.replace("<outRow"+(11+(i-9)/2)+">", dumRow[i]+"&"+dumRow[i+1]);
	for (let i=15; i<18; i++) tex = tex.replace("<outRow"+(i-1)+">", dumRow[i]);
	return tex;
}
function texBoltgroup() {
	let tex = boltgroupTemplate;
	let locY = +GEBID("boltgroupForm", "locyIn").value;
	let locZ = +GEBID("boltgroupForm", "loczIn").value;
	let Fy = +GEBID("boltgroupForm", "FyIn").value;
	let Fz = +GEBID("boltgroupForm", "FzIn").value;
	let Mx = +GEBID("boltgroupForm", "MxIn").value;
	let loadCase = +GEBID("boltgroupForm", "loadCaseIn").value;
	let Ycg = GEBID("boltgroupForm", "YcgOut").innerHTML;
	let Zcg = GEBID("boltgroupForm", "ZcgOut").innerHTML;
	let Mxcg = GEBID("boltgroupForm", "MxcgOut").innerHTML;
	let Ix = GEBID("boltgroupForm", "IxOut").innerHTML;
	let PyTot = GEBID("boltgroupForm", "PyTotOut").innerHTML;
	let PzTot = GEBID("boltgroupForm", "PzTotOut").innerHTML;
	let MxTot = GEBID("boltgroupForm", "MxTotOut").innerHTML;
	tex = tex
	.replace("<locy>", locY)
	.replace("<locz>", locZ)
	.replace("<Fy>", Fy)
	.replace("<Fz>", Fz)
	.replace("<Mx>", Mx)
	.replace("<loadCase>", loadCase)
	.replace("<Ycg>", Ycg)
	.replace("<Zcg>", Zcg)
	.replace("<Mxcg>", Mxcg)
	.replace("<Ix>", Ix)
	.replace("<PyTot>", PyTot)
	.replace("<PzTot>", PzTot)
	.replace("<MxTot>", MxTot);
	
	let inTab = GEBID("boltgroupForm", "inTab");
	let dumRow = "";
	for (let i=0; childSeq(inTab, [0, i+1]) !== undefined; i++) 
		for (let j=0; j<5; j++)
			dumRow += (j==0 ? childSeq(inTab, [0,i+1,j]).innerHTML : childSeq(inTab, [0,i+1,j,0]).value) + (j<4?"&":"\\\\\\hline\n");
	tex = tex.replace("<inRow>", dumRow);
	let outTab = GEBID("boltgroupForm", "outTab");
	dumRow = "";
	for (let i=0; childSeq(outTab, [0, i+1]) !== undefined; i++) 
		for (let j=0; j<10; j++)
			dumRow += childSeq(outTab, [0,i+1,j]).innerHTML + (j<9?"&":"\\\\\\hline\n");
	tex = tex.replace("<outRow>", dumRow);

	tex = tex.replace("boltgroup_chart_b64png", "boltgroup_chart" + index +"_b64png");
	return tex;
}
function texLJD() {
	// Get em'
	let tex = LJDTemplate;
	let plat = +GEBID("LJDForm", "platesHighIn").value;
	let sect = +GEBID("LJDForm", "platesLongIn").value;
	let TAppLoad = +GEBID("LJDForm", "TAppLoadIn").value;
	let inTab = GEBID("LJDForm", "inTab1");
	let outTab = GEBID("LJDForm", "outTab");
	let XCoord = [];
	let tp = matrixGen(plat, sect+1);
	let wp = matrixGen(plat, sect+1);
	let Ep = matrixGen(plat, sect+1);
	let diaf = [];
	let Ef = [];
	let BorR = [];
	let loads = matrixGen(plat*2-1, sect*2);
	for (let i=0; i<sect+1; i++) XCoord[i] = childSeq(inTab, [1, i+1, 0]).value;
	let iter = 0;
	for (let arr of [tp, wp, Ep]) {
		for (let i=0; i<plat; i++)
			for (let j=0; j<sect+1; j++)
				arr[i][j] = childSeq(inTab, [(plat+2)*iter+i+4, j+1, 0]).value;
		iter++;
	}
	iter = 0;
	for (let arr of [diaf, Ef, BorR]) {
		for (let i=0; i<sect-1; i++) {
			arr[i] = childSeq(inTab, [plat*3+9+iter, i+2, 0]).value;
			if (iter==2) arr[i] = arr[i]=="B"?"Bolt":"Rivet";
		}
		iter++;
	}
	for (let i=0; i<plat*2-1; i++)
		for (let j=0; j<sect*2; j++)
			loads[i][j] = childSeq(outTab, [i+2, j]).innerHTML;
	
	//for (let thing of [XCoord, tp, wp, Ep, diaf, Ef, BorR, loads]) console.log(thing);

	tex = tex
	.replace("<plates>", plat)
	.replace("<TAppLoad>", TAppLoad);
	iter = 0;
	for (let colsize of [sect+2, sect+2, sect, sect*2+1, sect*2]) {
		let cols = "|";
		for (let j=0; j<colsize; j++) cols += "c|";
		tex = tex.replace("<cols" + iter + ">", cols);
		iter++;
	}
	let dummy = "\\textbf{Property} & \\textbf{P\\textsubscript{Applied}} & ";
	for (let i=1; i<sect; i++) dummy += "\\textbf{Fast "+i+"} & ";
	dummy += "\\textbf{Fixed} \\\\\\hline";
	// Common table header
	tex = tex.replace("<pos>", dummy + "\n<pos>");
	tex = tex.replace("<pProps>", dummy + "\n<pProps>");
	// Position table
	dummy = "\\textbf{X-Coord (in)}";
	for (let i=0; i<sect+1; i++) dummy += " & " + XCoord[i];
	tex = tex.replace("<pos>", dummy);
	// Plate property table
	for (let prop of ["Thickness (in)", "Width (in)", "Young's Modulus (Msi)"]) {
		tex = tex.replace("<pProps>", "\\multicolumn{"+(sect+2)+"}{|c|}{\\textbf{"+prop+"}}\\\\\\hline\n<pProps>");
		let prp = prop==="Thickness (in)"?"t":(prop==="Width (in)"?"w":"E");
		for (let i=0; i<plat; i++) {
			dummy = "\\textbf{"+prp+(i+1)+"}";
			for (let j=0; j<sect+1; j++) dummy += " & " + (prop==="Thickness (in)"?tp[i][j]:(prop==="Width (in)"?wp[i][j]:Ep[i][j]));
			dummy += (prop!=="Young's Modulus (Msi)" || i<plat-1)?"\\\\\\hline\n<pProps>":"";
			tex = tex.replace("<pProps>", dummy);
		}
	}
	// Fastener property table
	dummy = "\\textbf{Property}";
	for (let i=1; i<sect; i++) dummy += "& \\textbf{Fast "+i+"}";
	dummy += "\\\\\\hline\n<fProps>";
	tex = tex.replace("<fProps>", dummy);
	for (let prop of ["Diameter (in)", "Young's Modulus (Msi)", "Bolt or Rivet"]) {
		dummy = "\\textbf{"+prop+"}";
		for (let i=0; i<sect-1; i++) dummy += " & " + (prop==="Diameter (in)"?diaf[i]:(prop==="Young's Modulus (Msi)"?Ef[i]:BorR[i]));
		if (prop!=="Bolt or Rivet") dummy += "\\\\\\hline\n<fProps>";
		tex = tex.replace("<fProps>", dummy);
	}
	// FEM model
	dummy = "\\textbf{P\\textsubscript{Applied}} & ";
	for (let i=1; i<sect; i++) dummy += "\\textbf{Plate "+i+"} & \\textbf{Fast "+i+"} & ";
	dummy += "\\textbf{Plate "+sect+"} & \\textbf{Fixed} \\\\\\hline";
	tex = tex.replace("<FEM>", dummy + "\n<FEM>");
	for (let i=0; i<plat; i++) {
		dummy="\\textbf{Node 1}";
		if (+tp[i][0]) dummy += "\\cellcolor{LJD"+i+"}";
		for (let j=1; j<sect+1; j++) {
			dummy += "&";
			if (+tp[i][j-1] && +tp[i][j]) dummy += "\\cellcolor{LJD"+i+"}";
			dummy +="& \\textbf{Node "+(2+i+plat*(j-1))+"}";
			if (+tp[i][j]) dummy += "\\cellcolor{LJD"+i+"}";
		}
		if (i<plat-1) {
			dummy += "\\\\\\hline\n&&"
			for (let j=0; j<sect-1; j++) dummy += "Fastener&&"; // Add "fastener" rows
			dummy += "\\\\\\hline\n<FEM>"
		}
		tex = tex.replace("<FEM>", dummy);
	}
	// Load output table
	dummy = "";
	for (let i=1; i<sect; i++) dummy += "\\textbf{Plate "+i+"} & \\textbf{Fast "+i+"} & ";
	dummy += "\\textbf{Plate "+sect+"} & \\textbf{Fixed} \\\\\\hline";
	tex = tex.replace("<loads>", dummy + "\n<loads>");
	for (let i=0; i<plat*2-1; i++) {
		dummy = loads[i][0];
		for (let j=1; j<sect*2; j++) {
			dummy += " & "+loads[i][j];
			if (!(i%2) && j%2) dummy += "\\cellcolor{LJD8}";
		}
		tex = tex.replace("<loads>", dummy + (i<plat*2-2?"\\\\\\hline\n<loads>":""));
	}
	// Resize tables if needed
	let sTSize = sect<10?1:(10/sect).toFixed(3);
	let mTSize = sect<=6?1:(6/sect).toFixed(3);
	let bTSize = sect<=5?1:(5/sect).toFixed(3);
	for (let size of [sTSize, sTSize, sTSize, bTSize, mTSize]) tex = tex.replace("<tScale>", size);
	return tex;
}
function texIRB() {
	let tex = IRBTemplate;
	tex = tex.replace("<sornot>", IRBNumSect>1?"s are ":" is ");
	for (let i=0; i<IRBNumSect; i++) {
		let dumRow = ""+(i+1);
		for (let j=0; j<9; j++) {
			let cell = childSeq(GEBID("IRBForm", "IOTab"), [i+2, j+1]);
			if (j!=0) dumRow += "&"+(j<7?cell.children[0].value:cell.innerHTML);
			else dumRow += "&" + MatLib[cell.children[0].value].name;
		}
		tex = tex.replace("<trow>", dumRow+(i==IRBNumSect-1?"":"\\\\\\hline\n<trow>"));
	}
	return tex;
}
function texSP() {
	let tex = SPTemplate;
	let pts = [];
	let inTab = GEBID("SPForm", "IOTab");
	for (let i=0; inTab.children[i+2] !== undefined; i++) {
		pts[i] = [];
		pts[i][0] = childSeq(inTab, [i + 2, 1, 0]).value;
		pts[i][1] = childSeq(inTab, [i + 2, 2, 0]).value;
		pts[i][2] = childSeq(inTab, [i + 2, 3, 0]).value;
	}
	let ids = ["AOut", "XcgOut", "YcgOut", "IxxOut", "IyyOut", "IxyOut", "alphaOut", "rhoxOut", "rhoyOut"];
	let props = [];
	for (let i=0; i<ids.length; i++) props[i] = GEBID("SPForm", ids[i]).innerHTML;
	let fAlpha = GEBID("SPForm", "fAlphaIn").value;
	let sProps = [];
	for (let i=0; i<4; i++) {
		sProps[i] = [];
		for (let j=0; j<5; j++) sProps[i][j] = childSeq(GEBID("SPForm", "SPOutGrid"), [i, 2, 0, j, 1]).innerHTML;
	}
	//console.log(pts, props, fAlpha, sProps);
	
	for (let i=0; i<pts.length; i++) tex = tex.replace("<ptRow>", "" + (i+1) + "&" + +pts[i][0] + "&" + +pts[i][1] + "&" + pts[i][2] + (i<pts.length-1?"\\\\\\hline\n<ptRow>":""));
	let propRow = "" + props[0];
	for (let i=1; i<props.length; i++) propRow += "&" + props[i];
	tex = tex.replace("<propRow>", propRow);
	tex = tex.replace("<fAlpha>", (fAlpha===""?"":"Note that for the sake of calculation, alpha is forced to " + fAlpha + " degrees."));
	ids = ["<upSectRow>", "<dowSectRow>", "<leSectRow>", "<riSectRow>"];
	for (let i=0; i<4; i++) {
		propRow = "" + sProps[i][0];
		for (let j=1; j<5; j++) propRow += "&" + sProps[i][j];
		tex = tex.replace(ids[i], propRow);
	}

	tex = tex.replace("sectpropdia_b64png", "sectpropdia" + index +"_b64png");
	return tex;
}
function texRPack() {
	let tex = rPackTemplate;
	let tabIQ = GEBID("rPackForm", "geoInTab"); // tab(le )I(n )Q(uestion)
	let dummy = [];
	for (let i=0; childSeq(tabIQ, [1, i]) != undefined; i++) dummy[i] = +childSeq(tabIQ, [1, i, 1, 0]).value;
	tabIQ = GEBID("rPackForm", "geoOutTab");
	for (let i=0; i<4; i++) dummy[i+8] = +childSeq(tabIQ, [1, i, 1]).innerHTML;
	let dumRow = "" + dummy[0];
	for (let i=1; i<dummy.length; i++) dumRow += "&" + dummy[i];
	tex = tex.replace("<geoRow>", dumRow);
	dummy = [];
	for (let i=0; i<10; i++) dummy[i] = childSeq(GEBID("rPackForm", ["f", "p", "b"][parseInt(i/4)] + "PropTab"), [1 - parseInt(i/8), i%4, 1, 0]).value;
	for (let i=0; i<3; i++) {
		dumRow = "" + dummy[i*4];
		for (let j=1; j<4 && (i<2 || j<2); /* Le Epic DeMorgan's*/ j++) dumRow += "&" + dummy[i*4 + j];
		tex = tex.replace("<propRow" + (i+1) + ">", dumRow);
	}
	tex = tex.replace("<Papp>", GEBID("rPackForm", "PappIn").value);
	dummy = [];
	for (let i=0; i<19; i++) {
		let dumCell = childSeq(GEBID("rPackForm", ["FBendingTab", "PSBendingTab", "BMarginTab"][+(i>=4) + +(i>=13)]), [0, i - (i>=13?13:i>=4?4:0), 1]);
		dummy[i] = dumCell.children[0]!==undefined?dumCell.children[0].value:dumCell.innerHTML;
	}
	for (let i=0; i<3; i++) {
		dumRow = "" + dummy[2.5*i**2 + 1.5*i];
		for (let j=1; j<5*i+4 && (i<2 || j<6); j++) dumRow += "&" + ((j==8 || (i==0 && j==3) || (i==2 && j==5))?"\\cellcolor{"+ ((dummy[2.5*i**2 + 1.5*i + j] > 0)?"gudgreen":"red") +"}{":"") + dummy[2.5*i**2 + 1.5*i + j] + ((j==8 || (i==0 && j==3) || (i==2 && j==5))?"}":"");
		tex = tex.replace("<msRow" + (i+1) + ">", dumRow);
	}
	return tex;
}
function texTN() {
	let tex = NACA_TNTemplate;
	let tabIQ = GEBID("NACA_TNForm", "LPETab");
	let dumRow = "" + childSeq(tabIQ, [0, 1, 1, 0]).value;
	for (let i=1; i<4; i++) dumRow += "&" + childSeq(tabIQ, [0, 1, i+1, 0]).value;
	dumRow += "&" + (+childSeq(tabIQ, [0, 1, 5, 0]).value * 100) + "\\%";
	tex = tex.replace("<UniProps>", dumRow)
	.replace("<numStr>", TNNumStr + (TNNumStr==1?" stringer was":" stringers were"))
	.replace("<TNWarning>", TNNumStr>1?"Please note that most properties are calculated with respect to the last stringer added.":"");
	tabIQ = GEBID("NACA_TNForm", "dataTab");
	for (let Nstr = 1; Nstr <= TNNumStr; Nstr++) {
		dumRow = "" + Nstr;
		for (let i=1; i<12; i++) {
			let dummy = childSeq(tabIQ, [Nstr, i]);
			if (!dummy.children[0]) dummy = dummy.innerHTML;
			else dummy = dummy.children[0].value;
			dumRow += "&" + dummy;
		}
		tex = tex.replace("<strRow>", dumRow + (Nstr<TNNumStr?"\\\\\\hline\n<strRow>":""));
	}
	for (let i=1; i<=4; i++) {
		tabIQ = GEBID("NACA_TNForm", "outTab" + i);
		dumRow = "" + childSeq(tabIQ, [0, 0, 1]).innerHTML;
		for (let j=1; childSeq(tabIQ, [0, j, 1]); j++) if (i!=4 || j!=3) dumRow += "&" + ((i==2&&j==7)||(i==4&&(j==2||j==5))?sRound(+childSeq(tabIQ, [0, j, 1]).innerHTML * 100, 0) + "\\%":childSeq(tabIQ, [0, j, 1]).innerHTML);
		tex = tex.replace("<outRow" + i + ">", dumRow);
	}

	return tex;
}
function texFrameSTA() {
	let Fcy = GEBID("frameSTAForm", "FcyIn").value;
	let tf = GEBID("frameSTAForm", "tfIn").value;
	let Hf = GEBID("frameSTAForm", "hfIn").value;
	let Yf = GEBID("frameSTAForm", "YfIn").value;
	let Ef = GEBID("frameSTAForm", "EfIn").value;
	let Af = GEBID("frameSTAForm", "AfIn").value;
	let If = GEBID("frameSTAForm", "IfIn").value;
	let r = GEBID("frameSTAForm", "rIn").value;
	let L = GEBID("frameSTAForm", "LIn").value;
	let Esk = GEBID("frameSTAForm", "EskIn").value;
	let tsk = GEBID("frameSTAForm", "tskIn").value;
	let Astr = GEBID("frameSTAForm", "AstrIn").value;
	let Istr = GEBID("frameSTAForm", "IstrIn").value;
	let bstr = GEBID("frameSTAForm", "bstrIn").value;
	let a = GEBID("frameSTAForm", "aIn").value;
	let b = GEBID("frameSTAForm", "bIn").value;
	let thetastr = GEBID("frameSTAForm", "thetastrOut").innerHTML;
	let te = GEBID("frameSTAForm", "teOut").innerHTML;
	let tprime = GEBID("frameSTAForm", "tprimeOut").innerHTML;
	let iOut = GEBID("frameSTAForm", "iOut").innerHTML;
	let A = GEBID("frameSTAForm", "AOut").innerHTML;
	let B = GEBID("frameSTAForm", "BOut").innerHTML;
	let Lc = GEBID("frameSTAForm", "LcOut").innerHTML;
	let Lr = GEBID("frameSTAForm", "LrOut").innerHTML;
	let gamma = GEBID("frameSTAForm", "gammaOut").innerHTML;
	let LrLc = GEBID("frameSTAForm", "LrLcOut").innerHTML;
	// Clean up with a loop + array of IDs?
	let LLTRow = [];
	for (let i=0; i<4; i++) {
		let row = [i == 0 ? "P (lb) =" : i == 1 ? "S (lb) =" : i == 2 ? "M (in*lb) =" : "Phi (deg) ="];
		for (j=1; j<10; j++) row[j] = GEBID("locLoadTable").children[0].children[i+1].children[j].children[0].value;
		LLTRow[i] = row;
	}
	let STRow = [];
	for (let i=0; i<21; i++) {
		let row = [GEBID("frameStresses").children[0].children[i+1].children[0].children[0].value];
		for (j=1; j<10; j++) row[j] = GEBID("frameStresses").children[0].children[i+1].children[j].innerHTML;
		STRow[i] = row;
	}
	//console.log(STRow);
	let CBRow1 = [GEBID("frameSTAForm", "f1Out").innerHTML, GEBID("frameSTAForm", "f2Out").innerHTML, GEBID("frameSTAForm", "f1f2Out").innerHTML];
	let CBRow2 = [];
	let ids = ["aOut", "bOut", "kbOut", "KbOut", "EtOut", "EsOut", "nuOut", "etaOut", "FbcrelOut", "FbcrplOut"];
	for (let i=0; i<ids.length; i++) CBRow2[i] = GEBID("frameSTAForm", ids[i]).innerHTML;
	let SBRow1 = [a, b];
	ids = ["ksOut", "JOut", "KsOut", "Fscr1Out"];
	for (let i=0; i<ids.length; i++) SBRow1[i+2] = GEBID("frameSTAForm", ids[i]).innerHTML;
	let SBRow2 = [];
	ids = ["fsOut", "Fscr2Out", "fbOut", "Fbcrpl2Out", "RsOut", "RbOut", "MSOut"];
	for (let i=0; i<ids.length; i++) SBRow2[i] = GEBID("frameSTAForm", ids[i]).innerHTML;

	// Set values
	let tex = frameSTATemplate;
	ids = ["<Fcy>", "<tf>", "<Hf>", "<Yf>", "<Ef>", "<Af>", "<If>", "<r>", "<L>", "<Esk>", "<tsk>", "<Astr>", "<Istr>", "<bstr>", "<thetastr>", "<te>", "<tprime>", "<iOut>", "<A>", "<B>", "<Lc>", "<Lr>", "<gamma>", "<LrLc>"];
	let dummy = [Fcy, tf, Hf, Yf, Ef, Af, If, r, L, Esk, tsk, Astr, Istr, bstr, thetastr, te, tprime, iOut, A, B, Lc, Lr, gamma, LrLc];
	for (let i=0; i<ids.length; i++) tex = tex.replace(ids[i], dummy[i]);
	for (let i=0; i<4; i++) tex = tex.replace("<LLTRow>", LLTRow[i][0] + " & " + LLTRow[i][1] + " & " + LLTRow[i][2] + " & " + LLTRow[i][3] + " & " + LLTRow[i][4] + " & " + LLTRow[i][5] + " & " + LLTRow[i][6] + " & " + LLTRow[i][7] + " & " + LLTRow[i][8] + " & " + LLTRow[i][9] + "\\\\\\hline" + (i<3 ? "\n<LLTRow>" : ""));
	for (let i=0; i<21; i++) tex = tex.replace("<STRow>", STRow[i][0] + " & " + STRow[i][1] + " & " + STRow[i][2] + " & " + STRow[i][3] + " & " + STRow[i][4] + " & " + STRow[i][5] + " & " + STRow[i][6] + " & " + STRow[i][7] + " & " + STRow[i][8] + " & " + STRow[i][9] + "\\\\\\hline" + (i<20 ? "\n<STRow>" : ""));
	tex = tex
	.replace("<CBRow1>", CBRow1[0] + " & " + CBRow1[1] + " & " + CBRow1[2])
	.replace("<CBRow2>", CBRow2[0] + " & " + CBRow2[1] + " & " + CBRow2[2] + " & " + CBRow2[3] + " & " + CBRow2[4] + " & " + CBRow2[5] + " & " + CBRow2[6] + " & " + CBRow2[7] + " & " + CBRow2[8] + " & " + CBRow2[9])
	.replace("<SBRow1>", SBRow1[0] + " & " + SBRow1[1] + " & " + SBRow1[2] + " & " + SBRow1[3] + " & " + SBRow1[4] + " & " + SBRow1[5])
	.replace("<SBRow2>", SBRow2[0] + " & " + SBRow2[1] + " & " + SBRow2[2] + " & " + SBRow2[3] + " & " + SBRow2[4] + " & " + SBRow2[5] + " & " + "\\cellcolor{" + ((SBRow2[6] == "HIGH" || SBRow2[6] > 0) ? "gudgreen" : "red") + "}{" + SBRow2[6] + "}");

	return tex;
}
function texFrameWDT() {
	let tex = frameWDTTemplate;
	let dummy = [];
	// Properties
	let placeholder = ["<E>", "<Ec>", "<Ftu>", "<Fcy>", "<Fsu>", "<b>", "<h>"];
	for (let i=0; i<7; i++) dummy[i] = +GEBID("frameDiagTensForm", "inPropTab").children[0].children[i].children[1].children[0].value;
	for (let i=0; i<dummy.length; i++) tex = tex.replace(placeholder[i], dummy[i]);
	placeholder = ["<tstiff>", "<tweb>", "<tch>"];
	for (let i=0; i<3; i++) dummy[i] = +GEBID("frameDiagTensForm", "inPropTab").children[0].children[7].children[1].children[0].children[0].children[1].children[i].children[0].value;
	for (let i=0; i<dummy.length; i++) tex = tex.replace(placeholder[i], dummy[i]);
	placeholder = ["<v>", "<Pshear>", "<Ich>", "<Ach>", "<estiff>", "<Astiff>", "<Istiff>"];
	for (let i=8; i<15; i++) dummy[i-8] = +GEBID("frameDiagTensForm", "inPropTab").children[0].children[i].children[1].children[0].value;
	for (let i=0; i<dummy.length; i++) tex = tex.replace(placeholder[i], dummy[i]);
	// Section properties - inner chord
	dummy = [];
	for (let i=0; i<3; i++) {
		dummy[i] = [];
		for (let j=0; j<8; j++) dummy[i][j] = childSeq(GEBID("frameDiagTensForm", "SPICTab"), [0, i+1, j, 0]) != undefined ? childSeq(GEBID("frameDiagTensForm", "SPICTab"), [0, i+1, j, 0]).value : childSeq(GEBID("frameDiagTensForm", "SPICTab"), [0, i+1, j]).innerHTML;
	}
	dummy[3] = ["Totals", "", "", childSeq(GEBID("frameDiagTensForm", "SPICTab"), [0, 4, 3]).innerHTML, "", childSeq(GEBID("frameDiagTensForm", "SPICTab"), [0, 4, 5]).innerHTML,  childSeq(GEBID("frameDiagTensForm", "SPICTab"), [0, 4, 6]).innerHTML,  childSeq(GEBID("frameDiagTensForm", "SPICTab"), [0, 4, 7]).innerHTML];
	for (let i=0; i<3; i++) tex = tex.replace("<SPICRow>", dummy[i][0] + " & " + dummy[i][1] + " & " + dummy[i][2] + " & " + dummy[i][3] + " & " + dummy[i][4] + " & " + dummy[i][5] + " & " + dummy[i][6] + " & " + dummy[i][7] + "\\\\\\hline\n<SPICRow>");
	tex = tex.replace("<SPICRow>", dummy[3][0] + " & " + dummy[3][1] + " & " + dummy[3][2] + " & " + dummy[3][3] + " & " + dummy[3][4] + " & " + dummy[3][5] + " & " + dummy[3][6] + " & " + dummy[3][7]);
	tex = tex
	.replace("<SPICzbar>", childSeq(GEBID("frameDiagTensForm", "SPICOut"), [0, 0, 1]).innerHTML)
	.replace("<SPICIyy>", childSeq(GEBID("frameDiagTensForm", "SPICOut"), [0, 1, 1]).innerHTML)
	.replace("<SPICA>", childSeq(GEBID("frameDiagTensForm", "SPICOut"), [0, 2, 1]).innerHTML);
	// Section properties - stringer clip
	dummy = [];
	for (let i=0; i<3; i++) {
		dummy[i] = [];
		for (let j=0; j<8; j++) dummy[i][j] = childSeq(GEBID("frameDiagTensForm", "SPSCTab"), [0, i+1, j, 0]) != undefined ? childSeq(GEBID("frameDiagTensForm", "SPSCTab"), [0, i+1, j, 0]).value : childSeq(GEBID("frameDiagTensForm", "SPSCTab"), [0, i+1, j]).innerHTML;
	}
	dummy[3] = ["Totals", "", "", childSeq(GEBID("frameDiagTensForm", "SPSCTab"), [0, 4, 3]).innerHTML, "", childSeq(GEBID("frameDiagTensForm", "SPSCTab"), [0, 4, 5]).innerHTML,  childSeq(GEBID("frameDiagTensForm", "SPSCTab"), [0, 4, 6]).innerHTML,  childSeq(GEBID("frameDiagTensForm", "SPSCTab"), [0, 4, 7]).innerHTML];
	for (let i=0; i<3; i++) tex = tex.replace("<SPSCRow>", dummy[i][0] + " & " + dummy[i][1] + " & " + dummy[i][2] + " & " + dummy[i][3] + " & " + dummy[i][4] + " & " + dummy[i][5] + " & " + dummy[i][6] + " & " + dummy[i][7] + "\\\\\\hline\n<SPSCRow>");
	tex = tex.replace("<SPSCRow>", dummy[3][0] + " & " + dummy[3][1] + " & " + dummy[3][2] + " & " + dummy[3][3] + " & " + dummy[3][4] + " & " + dummy[3][5] + " & " + dummy[3][6] + " & " + dummy[3][7]);
	tex = tex
	.replace("<SPSCzbar>", childSeq(GEBID("frameDiagTensForm", "SPSCOut"), [0, 0, 1]).innerHTML)
	.replace("<SPSCIyy>", childSeq(GEBID("frameDiagTensForm", "SPSCOut"), [0, 1, 1]).innerHTML)
	.replace("<SPSCA>", childSeq(GEBID("frameDiagTensForm", "SPSCOut"), [0, 2, 1]).innerHTML);
	// Everything else
	placeholder = ["<mindcb>", "<maxdcb>", "<bottom>", "<Kss>", "<equation>", "<tut>", "<tft>", "<Rh>", "<Rd>", "<Kss>", "<E>", "<v>", "<b>", "<dc>", "<t>", "<Rh>", "<Rd>", "<Fscrn>", "<Fscr>", "<fsFscr>", "<fs>", "<k>", "<Auebt>", "<\\_2AfHt>", "<alpha>", "<tanalpha>", "<wb>", "<Fsall>", "<Fs\\_All>"];
	// TODO:
	for (let i=0; i<placeholder.length; i++) tex = tex.replace(placeholder[i], GEBID("frameDiagTensForm", placeholder[i].replace("<", "").replace(">", "Out")).innerHTML);

	return tex;
}
// Undone:
function texFrameCC() {

}
function texFrameCT() {

}

function rmBetween(str, startExp, endExp) {
	sInd = str.indexOf(startExp);
	eInd = str.indexOf(endExp) + endExp.length;
	if (sInd === -1 || eInd === -1) {
		throw new error("tex document error: regex not found.");
		return str;
	}
	return str.slice(0, sInd) + str.slice(eInd);
}
function replaceFromEnd(str, exp, repl) {
	return ((str.split('').reverse().join('')).replace(exp.split('').reverse().join(''), repl.split('').reverse().join(''))).split('').reverse().join('');
}

function writeTeX() { // Build TeX document in order from inputs
	let tex = texTitle(); // Handle cover page
	for (let step of DOL.toArray()) {// Handle all contents in order
		let index = step.split("Sort")[1];
		let type = step.split("Sort")[0];
		for (let form of document.querySelectorAll("." + type + "Form"))
			if (form.getAttribute("index") == index) focusForm(form);
		switch (type) {
			case "ell":
				tex += texEllipse(ellTemplate, index);
				break;
			case "TC":
				tex += texTC(tcTemplate);
				break;;
			case "crip":
				tex += texCrip(cripTemplate);
				break;
			case "bCrip":
				tex += texBCrip(bCripTemplate);
				break;
			case "OFB":
				tex += texOFB(OFBTemplate);
				break;
			case "FPB":
				tex += texFPB(FPBTemplate);
				break;
			case "lug":
				tex += texLug();
				break;
			case "frameSTA":
				tex += texFrameSTA();
				break;
			case "frameDiagTens":
				tex += texFrameWDT();
				break;
			case "frameCapComp":
				tex += texFrameCC();
				break;
			case "frameCapTens":
				tex += texFrameCT();
				break;
			case "boltgroup":
				tex += texBoltgroup(index);
				break;
			case "LJD":
				try {tex += texLJD();}
				catch {alert("Lap Joint Doubler was not computed. Omitting");}
				break;
			case "IRB":
				tex += texIRB();
				break;
			case "SP":
				tex += texSP(index);
				break;
			case "rPack":
				tex += texRPack();
				break;
			case "NACA_TN":
				tex += texTN();
				break;
			case "para":
				if (!GEBID(step.replace("Sort", "Form"), "paraTop").checked) tex += texPara(step.replace("paraSort", ""));
				else tex = replaceFromEnd(tex, "%paratop%", texPara(step.replace("paraSort", "")) + "\n\n%paratop%");
				break;
			default:

				break;
		}
	}
	// Handle conclusion
	tex += "\n\\end{document}"
	return tex;
}
function downloadTexFile() {
	const filename = "analysis.tex"; // Specify the .tex extension
	let tex = writeTeX();
	//console.log(tex); // Debugging
	const element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(tex));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}
function downloadPDF(debugMode = false) { // Requires a server to convert .tex to .pdf
	const pdfButton = document.getElementById("pdfButton");
	pdfButton.disabled = true; // Disable button
	pdfButton.innerHTML = "Processing Request...";

	let tex = writeTeX();
	//console.log(tex); // Debug
	const formData = new FormData(); // Stores data to send in key-value pairs
	formData.append('latex_code', tex);
	/* if (document.getElementById("ellBox").checked) {
		const ellChartCont = document.getElementById("ellForm").querySelector("#myChart").toDataURL("image/png");
		formData.append('ellipse_chart_b64png', ellChartCont);
	}
	if (GEBID("FPBBox").checked) {
		chartsFPB();
		const FPBC1 = GEBID("hiddenChart1").toDataURL("image/png");
		const FPBC2 = GEBID("hiddenChart2").toDataURL("image/png");
		const FPBC3 = GEBID("hiddenChart3").toDataURL("image/png");
		formData.append("FPB_chart1_b64png", FPBC1);
		formData.append("FPB_chart2_b64png", FPBC2);
		formData.append("FPB_chart3_b64png", FPBC3);
	}
	if (GEBID("boltgroupBox").checked) {
		formData.append("boltgroup_chart_b64png", GEBID("boltgroupForm", "bgChart").toDataURL("image/png"));
	}
	if (GEBID("SPBox").checked) {
		formData.append("sectpropdia_b64png", GEBID("SPForm", "diaCanv").toDataURL("image/png"));
	} */
	for (let form of document.querySelectorAll(".ellForm")) {
		focusForm(form);
		const ellChartCont = document.getElementById("ellForm").querySelector("#myChart").toDataURL("image/png");
		formData.append('ellipse_chart' + form.getAttribute("index") + '_b64png', ellChartCont);
	}
	for (let form of document.querySelectorAll(".FPBForm")) {
		focusForm(form);
		const FPBC1 = GEBID("hiddenChart1").toDataURL("image/png");
		const FPBC2 = GEBID("hiddenChart2").toDataURL("image/png");
		const FPBC3 = GEBID("hiddenChart3").toDataURL("image/png");
		formData.append("FPB_chart1_b64png", FPBC1);
		formData.append("FPB_chart2_b64png", FPBC2);
		formData.append("FPB_chart3_b64png", FPBC3);
	}
	for (let form of document.querySelectorAll(".boltgroupForm")) {
		focusForm(form);
		formData.append("boltgroup_chart" + form.getAttribute("index") + "_b64png", GEBID("boltgroupForm", "bgChart").toDataURL("image/png"));
	}
	for (let form of document.querySelectorAll(".SPForm")) {
		focusForm(form);
		formData.append("sectpropdia" + form.getAttribute("index") + "_b64png", GEBID("SPForm", "diaCanv").toDataURL("image/png"));
	}
	fetch((debugMode ? 'http://localhost:5000': '') + '/get_multi_latex', { // Server address (localhost for development)
		method: 'POST',
		body: formData
	})
	.then(response => { // Check for error
		if (!response.ok) {
		return response.text().then(text => {
			throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
		});
		}
		return response.blob();
	})
	.then(blob => { // Handle download
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'analysis.pdf';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
	})
	.catch(error => {
		console.error('Error compiling LaTeX:', error);
		alert('Failed to compile LaTeX document. See console for details.');
	})
	.finally(() => { // This ensures the button is re-enabled even if there's an error
		pdfButton.innerHTML = "Download PDF";
		pdfButton.disabled = false;
	});
}