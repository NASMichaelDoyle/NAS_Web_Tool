// Global functions used by everything
function GEBID(id, qs) {
	 if (arguments.length === 1) {
		return document.getElementById(id);
	} else {
		return document.getElementById(id).querySelector("#"+qs);
	}
}
function childSeq(elem, seq) { // Returns an element based on a parent and a sequence of children
	for (i=0; i<seq.length; i++) {
		if (elem === undefined) return undefined;
		elem = elem.children[seq[i]];
	}
	return elem;
}