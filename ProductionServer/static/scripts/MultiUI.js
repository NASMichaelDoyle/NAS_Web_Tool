/* const ellBox = document.getElementById('ellBox');
const ellForm = document.getElementById('ellForm');

ellBox.addEventListener('change', function() {
  if (this.checked) ellForm.style.display = 'block'; 
  else ellForm.style.display = 'none';
});
 */
 
// Sidebar collapse
let sbActive = true;
function sbToggle() {
	if (sbActive) {
		GEBID("sidebarContent").style.display = "none";
		GEBID("mainContainer").style.display = "flex";
		GEBID("FormParent").style.width = "100%";
	} else {
		GEBID("sidebarContent").style.display = "block";
		GEBID("mainContainer").style.display = "grid";
	}
	sbActive = !sbActive;
}
 
// Sortable
let DOL = new Sortable(document.getElementById('docOrderList'), { // Document Order List
    animation: 150, // Animation period in ms
	dataIdAttr: 'id'
    // Other options
});

function analDic(boxOrForm) { // Analysis Dictionary FTLOG
	if (boxOrForm.id) exp = boxOrForm.id.replace("Box", "").replace("Form", "");
	else exp = boxOrForm;
	switch (exp) {
		case "ell":
			return "Ellipse";
		case "TC":
			return "Tension Clip";
		case "crip":
			return "Crippling";
		case "bCrip":
			return "Bending Crippling";
		case "OFB":
			return "Outstanding Flange Buckling";
		case "FPB":
			return "Flat Plate Buckling";
		case "frameSTA":
			return "Frame STA Loads";
		case "frameDiagTens":
			return "Web Diagonal Tension";
		case "frameCapComp":
			return "Cap Compression";
		case "frameCapTens":
			return "Cap Tension";
		case "lug":
			return "Lug Analysis";
		case "boltgroup":
			return "Boltgroup";
		case "LJD":
			return "Lap Joint Doubler";
		case "IRB":
			return "Inter Rivet Buckling";
		case "SP":
			return "Section Properties";
		case "NACA_TN":
			return "NACA TN";
		case "rPack":
			return "Radius Packer";
		case "MatLib":
			return "Material Library";
		default:
			return "Unknown";
	}
}

// Form toggle handler
function toggleForm(box, form) {
	//console.log(box);
	if (!form) form = GEBID(box.id.replace("Box", "Form"));
	ifelse1: if (box.checked) {
		form.style.display = 'block';
		form.scrollIntoView();
		if (box.classList.contains("ParaBox") || box.id =="MatLibBox") break ifelse1;
		const element = document.createElement('div');
		element.setAttribute('class', "sortable-item");
		element.setAttribute("id", box.id.replace("Box", "") + "Sort");
		element.innerHTML = analDic(box);
		GEBID("docOrderList").appendChild(element);
	} else {
		form.style.display = 'none';
		if (box.classList.contains("ParaBox") || box.id =="MatLibBox") break ifelse1;
		GEBID("docOrderList").removeChild(GEBID(box.id.replace("Box", "") + "Sort"));
	}
	break1:
	for (const omnibox of [...document.getElementsByClassName("analBox")]) 
		if (omnibox.checked) {
			GEBID("nullForm").style.display = 'none';
			return;
		}
	//GEBID("nullForm").style.display = 'block'
}
// Cover page collapse
let CPcollapse = true;
function toggleCP() {
	let CPForm = GEBID("reportCover");
	if (CPcollapse) CPForm.style.display = "block";
	else CPForm.style.display = "none";
	CPcollapse = !CPcollapse;
}

// Paragraph handlers
let numPara = 0; // # of paragraphs
function addPara() {
	numPara++;
	// Sortable item
	const paraSort = GEBID("paraTemplate").content.cloneNode(true).firstElementChild;
	paraSort.id += numPara;
	paraSort.children[1].innerHTML += " " + numPara;
	paraSort.children[0].id += numPara;
	GEBID("docOrderList").appendChild(paraSort);
	
	// Form
	const paraForm = GEBID("paraFormTemplate").content.cloneNode(true).firstElementChild;
	paraForm.id += numPara;
	paraForm.children[0].children[0].innerHTML += " " + numPara;
	GEBID("FormParent").appendChild(paraForm);
}
function rmPara(paraSort) {
	GEBID("docOrderList").removeChild(paraSort);
	GEBID("FormParent").removeChild(GEBID(paraSort.id.replace("Sort", "Form")));
	
	for (const omnibox of [...document.getElementsByClassName("analBox")]) 
		if (omnibox.checked) {
			GEBID("nullForm").style.display = 'none';
			return;
		}
	GEBID("nullForm").style.display = 'block'
}

// Forms controller
let numForms = {
	"TC": 0,
	"rPack": 0,
	"frameSTA": 0,
	"NACA_TN": 0,
	"ell": 0,
	"OFB": 0,
	"FPB": 0,
	"IRB": 0,
	"frameDiagTens": 0,
	"crip": 0,
	"bCrip": 0,
	"boltgroup": 0,
	"LJD": 0,
	"lug": 0,
	"SP": 0
};

function addForm(button) {
	let type = button.id.split("Add")[0];
	let form = GEBID(type + "FormTemp").content.cloneNode(true).firstElementChild;
	form.setAttribute("index", ++numForms[type]);
	form.style.display = "block";
	form.querySelector("h2").innerHTML += " " + numForms[type];
	GEBID("FormParent").appendChild(form);
	form.scrollIntoView();
	GEBID("nullForm").style.display = 'none';
	// Sortable
	const element = document.createElement('div');
	element.setAttribute('class', "sortable-item");
	element.setAttribute("id", type + "Sort" + numForms[type]);
	element.setAttribute("index", numForms[type]);
	element.innerHTML = analDic(type) + " " + numForms[type];
	GEBID("docOrderList").appendChild(element);
	// Focus
	focusForm(form);
}

function rmForm(button) {
	let type = button.id.split("Rm")[0];
	let index = numForms[type];
	if (index < 1) return;
	if (GEBID(type + "Form")) {
	if (GEBID(type + "Form").getAttribute("index") == index) {
		GEBID(type + "Form").remove();
	}}
	for (let form of document.querySelectorAll("#" + type + "FormUnfocused"))
		if (form.getAttribute("index") == index)
			form.remove();
	numForms[type]--;
	// Sortable
	let sort = GEBID(type + "Sort" + (numForms[type]+1));
	GEBID("docOrderList").removeChild(sort);
}

function focusForm(form) {
	let type = form.id.split("Form")[0];
	for (let other of document.querySelectorAll("#" + type + "Form")) other.id = type + "FormUnfocused";
	form.id = type + "Form";
	updateMatLib();
}