// Michael Doyle 2025/05/26

let csvTemplate = `STA Loads
Inputs
Fcy,tframe,hframe,Yframe,Eframe,Aframe,Iframe,r,L,Eskin,tskin,Astr,Istr,bstr,a,b
<Fcy>,<tframe>,<hframe>,<Yframe>,<Eframe>,<Aframe>,<Iframe>,<r>,<L>,<Eskin>,<tskin>,<Astr>,<Istr>,<bstr>,<a>,<b>

Load Application
Location,1,2,3,4,5,6,7,8,9
P,<P1>,<P2>,<P3>,<P4>,<P5>,<P6>,<P7>,<P8>,<P9>
S,<S1>,<S2>,<S3>,<S4>,<S5>,<S6>,<S7>,<S8>,<S9>
M,<M1>,<M2>,<M3>,<M4>,<M5>,<M6>,<M7>,<M8>,<M9>
Phi,<Phi1>,<Phi2>,<Phi3>,<Phi4>,<Phi5>,<Phi6>,<Phi7>,<Phi8>,<Phi9>
`

function frameDownIns() {
	
	csv = csvTemplate
	.replace("<Fcy>", GEBID("frameSTAForm", "FcyIn").value)
	.replace("<tframe>", GEBID("frameSTAForm", "tfIn").value)
	.replace("<hframe>", GEBID("frameSTAForm", "hfIn").value)
	.replace("<Yframe>", GEBID("frameSTAForm", "YfIn").value)
	.replace("<Eframe>", GEBID("frameSTAForm", "EfIn").value)
	.replace("<Aframe>", GEBID("frameSTAForm", "AfIn").value)
	.replace("<Iframe>", GEBID("frameSTAForm", "IfIn").value)
	.replace("<r>", GEBID("frameSTAForm", "rIn").value)
	.replace("<L>", GEBID("frameSTAForm", "LIn").value)
	.replace("<Eskin>", GEBID("frameSTAForm", "EskIn").value)
	.replace("<tskin>", GEBID("frameSTAForm", "tskIn").value)
	.replace("<Astr>", GEBID("frameSTAForm", "AstrIn").value)
	.replace("<Istr>", GEBID("frameSTAForm", "IstrIn").value)
	.replace("<bstr>", GEBID("frameSTAForm", "bstrIn").value)
	.replace("<a>", GEBID("frameSTAForm", "aIn").value)
	.replace("<b>", GEBID("frameSTAForm", "bIn").value);
	
	for (let i=1; i<=9; i++) {
		csv = csv
		.replace("<P"+i+">", GEBID("frameSTAForm", "locLoadTable").querySelector("#PRow").children[i].children[0].value)
		.replace("<S"+i+">", GEBID("frameSTAForm", "locLoadTable").querySelector("#SRow").children[i].children[0].value)
		.replace("<M"+i+">", GEBID("frameSTAForm", "locLoadTable").querySelector("#MRow").children[i].children[0].value)
		.replace("<Phi"+i+">", GEBID("frameSTAForm", "locLoadTable").querySelector("#PhiRow").children[i].children[0].value);
	}
	
	console.log(csv); // Debug
	
	const element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
	element.setAttribute('download', "frame_inputs.csv");
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}
function frameUpIns(input) {
	const reader = new FileReader();
	
	reader.onload = function(event) {
        const csv = event.target.result;
        //console.log(csv); //Debug
		const properties = csv.split("\n")[3].split(",");
		GEBID("frameSTAForm", "FcyIn").value = properties[0];
		GEBID("frameSTAForm", "tfIn").value = properties[1];
		GEBID("frameSTAForm", "hfIn").value = properties[2];
		GEBID("frameSTAForm", "YfIn").value = properties[3];
		GEBID("frameSTAForm", "EfIn").value = properties[4];
		GEBID("frameSTAForm", "AfIn").value = properties[5];
		GEBID("frameSTAForm", "IfIn").value = properties[6];
		GEBID("frameSTAForm", "rIn").value = properties[7];
		GEBID("frameSTAForm", "LIn").value = properties[8];
		GEBID("frameSTAForm", "EskIn").value = properties[9];
		GEBID("frameSTAForm", "tskIn").value = properties[10];
		GEBID("frameSTAForm", "AstrIn").value = properties[11];
		GEBID("frameSTAForm", "IstrIn").value = properties[12];
		GEBID("frameSTAForm", "bstrIn").value = properties[13];
		GEBID("frameSTAForm", "aIn").value = properties[14];
		GEBID("frameSTAForm", "bIn").value = properties[15];
		
		for (let j=1; j<10; j++) {
			GEBID("frameSTAForm", "locLoadTable").querySelector("#PRow").children[j].children[0].value = csv.split("\n")[7].split(",")[j];
			GEBID("frameSTAForm", "locLoadTable").querySelector("#SRow").children[j].children[0].value = csv.split("\n")[8].split(",")[j];
			GEBID("frameSTAForm", "locLoadTable").querySelector("#MRow").children[j].children[0].value = csv.split("\n")[9].split(",")[j];
			GEBID("frameSTAForm", "locLoadTable").querySelector("#PhiRow").children[j].children[0].value = csv.split("\n")[10].split(",")[j];
		}
		
		frameSTACalcs();
	};
	reader.readAsText(input.files[0]);
}
