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
function texEllipse(tex) {
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
		let Mater = document.getElementById("OFBForm").querySelector("#materialIn").value;
		Mater = Mater.replace("_", "\\_");
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
		.replace("{\\%Mater}", Mater)
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
	.replace("<SBRow2>", SBRow2[0] + " & " + SBRow2[1] + " & " + SBRow2[2] + " & " + SBRow2[3] + " & " + SBRow2[4] + " & " + SBRow2[5] + " & " + "cellcolor{" + ((SBRow2[6] == "HIGH" || SBRow2[6] > 0) ? "gudgreen" : "red") + "}{" + SBRow2[6] + "}");

	return tex;
}
// Undone:
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
	for (let step of DOL.toArray()) // Handle all contents in order
		switch (step.replace("Sort", "").replace(/\d/g, "")) {
			case "ell":
				tex += texEllipse(ellTemplate);
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
			case "para":
				if (!GEBID(step.replace("Sort", "Form"), "paraTop").checked) tex += texPara(step.replace("paraSort", ""));
				else tex = replaceFromEnd(tex, "%paratop%", texPara(step.replace("paraSort", "")) + "\n\n%paratop%");
				break;
			default:

				break;
		}

	// Handle conclusion
	tex += "\n\\end{document}"
	return tex;
}
function downloadTexFile() {
	const filename = "analysis.tex"; // Specify the .tex extension
	let tex = writeTeX();
	for (const func of [texEllipse, texTC, texCrip, texBCrip, texOFB, texFPB]) tex = func(tex);
	//console.log(tex); // Debugging
	const element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(tex));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}
function downloadPDF() { // Requires a server to convert .tex to .pdf
	const pdfButton = document.getElementById("pdfButton");
	pdfButton.disabled = true; // Disable button
	pdfButton.innerHTML = "Processing Request...";

	let tex = writeTeX();
	//console.log(tex); // Debug
	const formData = new FormData(); // Stores data to send in key-value pairs
	formData.append('latex_code', tex);
	if (document.getElementById("ellBox").checked) {
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
	fetch('/get_multi_latex', { // Server address (localhost for development)
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