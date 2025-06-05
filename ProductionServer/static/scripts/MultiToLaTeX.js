function texEllipse(tex) {
	if (!document.getElementById("ellBox").checked) return rmBetween(tex, "%ellStart", "%ellEnd");
	else {
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
}
function texTC(tex) {
	if (!document.getElementById("TCBox").checked) return rmBetween(tex, "%TCStart", "%TCEnd");
	else {
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
}
function texCrip(tex) {
	if (!document.getElementById("cripBox").checked) return rmBetween(tex, "%cripStart", "%cripEnd");
	else {
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
}
function texBCrip(tex) {
	if (!document.getElementById("bCripBox").checked) return rmBetween(tex, "%bCripStart", "%bCripEnd");
	else {
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
}
function texOFB(tex) {
	if (!document.getElementById("OFBBox").checked) return rmBetween(tex, "%OFBStart", "%OFBEnd");
	else {
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
}
function texFPB(tex) {
	if (!document.getElementById("FPBBox").checked) return rmBetween(tex, "%FPBStart", "%FPBEnd");
	
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
function rmBetween(str, startExp, endExp) {
	sInd = str.indexOf(startExp);
	eInd = str.indexOf(endExp) + endExp.length;
	if (sInd === -1 || eInd === -1) {
		throw new error("tex document error: regex not found.");
		return str;
	}
	return str.slice(0, sInd) + str.slice(eInd);
}

function downloadTexFile() {

  const filename = "analysis.tex"; // Specify the .tex extension
  let tex;
	fetch("http://localhost:5000/get_multi_latex")
	.then(response => response.text())
	.then(text => {
		tex = text;
		for (const func of [texEllipse, texTC, texCrip, texBCrip, texOFB, texFPB]) tex = func(tex);
		//console.log(tex); // Debugging
		const element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(tex));
		element.setAttribute('download', filename);
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	});
}
function downloadPDF() { // Requires a server to convert .tex to .pdf 
	let tex;
	const pdfButton = document.getElementById("pdfButton");
	pdfButton.disabled = true; // Disable button
	pdfButton.innerHTML = "Processing Request...";
		
	fetch("http://localhost:5000/get_multi_latex")
	.then(response => response.text())
	.then(text => {
		tex = text;
		for (const func of [texEllipse, texTC, texCrip, texBCrip, texOFB, texFPB]) tex = func(tex);
		//console.log(tex); // Debugging
  
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
		fetch('http://localhost:5000/get_multi_latex', { // Server address (localhost for development)
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
		});
}