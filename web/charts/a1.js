//console.log("test", data.length / 5);
var guide = document.body.querySelector('.guide');
var guide_text = document.body.querySelector('.guide_date');
var guide_rect = document.body.querySelector('.guide_rect');
var guide_v = document.body.querySelector('.guide_v');
var guide_v1 = document.body.querySelector('.guide_v1');
var guide_v2 = document.body.querySelector('.guide_v2');
var guide_v3 = document.body.querySelector('.guide_v3');

var data_point = {};
var gap;

function render() {
	var path_str = "M ";
	var startX = 0;
	var stepX = 1;

	var path_str1 = "";
	var path_str2 = "";
	var path_str3 = "";

	var height = 360;
	var x, y, y1, y2, y3;

	for (var i = 0; i < data.length; i += 5) {
		if (i == 0) {
			path_str = "M ";
			path_str1 = "M ";
			path_str2 = "M ";
			path_str3 = "M ";
		} else {
			if (path_str) path_str += "L ";
			if (path_str1) path_str1 += "L ";
			if (path_str2) path_str2 += "L ";
			if (path_str3) path_str3 += "L ";
		}

		path_str1 = path_str1 || "M ";
		path_str2 = path_str2 || "M ";
		path_str3 = path_str3 || "M ";

		var v = data[i + 1];
		var v1 = data[i + 2];
		var v2 = data[i + 3];
		var v3 = data[i + 4];

		startX += stepX;
		gap = 900 / (data.length / 5);

		x = 30 + (startX - 1) * 900 / (data.length / 5);
		y = height - Math.round((v * height / 13 / 10000 / 10000), 2);
		y1 = height - Math.round((v1 * height / 13 / 10000 / 10000), 2);
		y2 = height - Math.round((v2 * height / 13 / 10000 / 10000), 2);
		y3 = height - Math.round((v3 * height / 13 / 10000 / 10000), 2);

		data_point[data[i]] = {
			y: y,
			y1: y1,
			y2: y2,
			y3: y3,
			v: v,
			v1: v1,
			v2: v2,
			v3: v3
		};

		if (v == 0 && path_str == "M ") {
			path_str = "";
		} else {
			path_str += "" + x + "," + y + " ";
		}

		if (v1 == 0) {
			console.log("v1=0", path_str1);
		}
		if (v1 == 0 && path_str1 == "M ") {

			path_str1 = "";
		} else {
			path_str1 += "" + x + "," + y1 + " ";

		}
		if (v2 == 0 && path_str2 == "M ") {
			path_str2 = "";
		} else {
			path_str2 += "" + x + "," + y2 + " ";
		}

		if (v3 == 0 && path_str3 == "M ") {
			path_str3 = "";
		} else {
			path_str3 += "" + x + "," + y3 + " ";
		}


		if (/01$/.test(data[i])) {
			//月初第一天
			addVLine(x, data[i]);
		}
	}
	//var path_str = `M 463.92,300 A120,120 0 0,0 437.13,268.07 L 514.27,176.15 A240,240 0 0,1 567.85,240 Z`

	//var path_str = `M ${A1.x},${A1.y} A120,120 0 0,0 ${A2.x},${A2.y} L ${B2.x},${B2.y} A240,240 0 0,1 ${B1.x},${B1.y} Z`
	//console.log("path_str", path_str.length);
	document.body.querySelector('.line').setAttribute('d', path_str);
	document.body.querySelector('.line1').setAttribute('d', path_str1);
	document.body.querySelector('.line2').setAttribute('d', path_str2);
	document.body.querySelector('.line3').setAttribute('d', path_str3);

	addHLine(30, 360, 12);

}

function addHLine(min, max, start) {
	// <line class="grid_1" x1="30" y1="30" x2="930" y2="30"></line>
	// <line class="grid_2" x1="30" y1="60" x2="930" y2="60"></line>
	var nums = start + 1;
	var step = (max - min) / start;
	for (var i = 0; i < nums; i++) {
		var y = min + i * step;
		var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		line.setAttribute("x1", 30);
		line.setAttribute("x2", 930);
		if (i == nums - 1) {
			line.setAttribute("class", "solid");
			y = max;
		}
		line.setAttribute("y1", y);
		line.setAttribute("y2", y);

		document.body.querySelector('.hline').appendChild(line);

		if (y != max) {
			var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
			text.setAttribute("x", 30 - 6);
			//text.setAttribute("x", 30 - 16);
			text.setAttribute("y", y + 5);
			text.innerHTML = start;
			start--;

			document.body.querySelector('.hcoordinate').appendChild(text);
		}
	} //var <line class="grid_9" x1="0" y1="330" x2="1000" y2="330"></line>
}


function addVLine(x, date) {

	var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
	line.setAttribute("x1", x);
	line.setAttribute("y1", 30);
	line.setAttribute("x2", x);
	line.setAttribute("y2", 360);
	if (date.substr(5) == "01/01") {
		line.setAttribute("class", "solid");
	}
	document.body.querySelector('.vline').appendChild(line);


	var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
	text.setAttribute("x", x - 20);
	text.setAttribute("y", 380);
	//text.setAttribute("transform", "rotate(30 20,40)");
	//text.setAttribute("rotate", "30");

	text.innerHTML = date.substr(5).replace("/", '-');

	document.body.querySelector('.vcoordinate').appendChild(text);
	//var <line class="grid_9" x1="0" y1="330" x2="1000" y2="330"></line>
}

render();
bindEvent();

function bindEvent() {
	document.body.addEventListener("mousemove", do_mousemove);
	document.body.addEventListener("click", do_click);
}

function do_click(e) {
	guide.style.display = "block";
	guide_text.style.display = "block";
	guide_v.style.display = "block";
	guide_v1.style.display = "block";
	guide_v2.style.display = "block";
	guide_v3.style.display = "block";
	//guide_rect.style.display = "block";

	do_mousemove(e);
}

function do_mousemove(e) {
	//console.log("e", e.clientX, e.clientY);


	//x = startX * 900 / (data.length / 5);

	var clientWidth = document.documentElement.clientWidth;
	var left = (clientWidth - 960) / 2;

	var data_index = Math.round(((e.clientX - left - 30) / gap) * 5, 0);
	var data_index2 = Math.round(data_index / 5) * 5;
	//console.log("data_index", Math.round(e.clientX - left), gap, data_index, data_index2);
	var data_obj = data[data_index2];
	//alert("clientWidth=" + clientWidth + "left=" + left);
	if (data_index2 > data.length || data_index2 < 0) {
		guide.style.display = "none";
		guide_text.style.display = "none";
		//guide_rect.style.display = "none";
		guide_v.style.display = "none";
		guide_v1.style.display = "none";
		guide_v2.style.display = "none";
		guide_v3.style.display = "none";
		return;
	}

	guide.setAttribute("x1", e.clientX - left);
	guide.setAttribute("x2", e.clientX - left);

	var pos = e.clientX - left + 6;
	var pos1 = e.clientX - left - 40;
	if (pos1 > 960 - 100) {
		pos1 = 860;
	}
	guide_text.setAttribute("x", pos1);
	//guide_rect.setAttribute("x", e.clientX - left);
	guide_v.setAttribute("x", pos);
	guide_v1.setAttribute("x", pos);
	guide_v2.setAttribute("x", pos);
	guide_v3.setAttribute("x", pos);

	var data_p = data_point[data_obj];

	//上方压制
	var y = data_p.y;
	var y1 = data_p.y1;
	var y2 = data_p.y2;
	var y3 = data_p.y3;
	var arr = [data_p.y, data_p.y1, data_p.y2, data_p.y3].sort(compare);
	console.log("point arr", arr);

	y = y;
	y1 = forceDown(y1, arr);
	y2 = forceDown(y2, arr);
	y3 = forceDown(y3, arr);

	console.log("rebalance", y1, y2, y3);

	guide_v.setAttribute("y", y);
	guide_v.innerHTML = formatMoney(data_p.v / 100000000, 2);

	guide_v1.setAttribute("y", y1);
	guide_v1.innerHTML = formatMoney(data_p.v1 / 100000000, 2);

	guide_v2.setAttribute("y", y2);
	guide_v2.innerHTML = formatMoney(data_p.v2 / 100000000, 2);

	guide_v3.setAttribute("y", y3);
	guide_v3.innerHTML = formatMoney(data_p.v3 / 100000000, 2);

	guide_text.innerHTML = data_obj;

}

function compare(value1, value2) {
	if (value1 < value2) {
		return -1;
	} else if (value1 > value2) {
		return 1;
	} else {
		return 0
	}
}

function forceDown(a, arr) { //上方压制
	var arr2 = [];
	for (var i = 1; i < arr.length; i++) {
		var pre = arr[i - 1];
		var curr = arr[i];
		if (curr <= pre + 16) {
			arr2[i] = pre + 16;
			console.log("forceDown", a, arr[i]);
		} else {
			arr2[i] = arr[i];
		}


		if (a == curr) {
			return arr2[i];
		}
	}
}


function formatMoney(s, len) {
	var ret;
	var n = len > 0 && len <= 20 ? len : 2;
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
	var f = "";
	if (/^-/.test(s)) {
		f = "-";
		s = s.substr(1);
	}
	var l = s.split(".")[0].split("").reverse(),
		r = s.split(".")[1];
	t = "";
	for (i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
	}
	if (!len) {
		ret = f + t.split("").reverse().join("")
	} else {
		ret = f + t.split("").reverse().join("") + "." + r;
	}
	if (ret == "0.00") ret = "";
	return ret;
}