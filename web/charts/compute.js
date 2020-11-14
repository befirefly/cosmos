//按宽度360  高度360
function compute(radius, deg) {
	var y = radius * Math.sin(deg * Math.PI / 180);
	var x = radius * Math.cos(deg * Math.PI / 180);

	var offsetX = 360;
	var offsetY = 360
	console.log(x + offsetX, offsetY - y);

	return {
		x: x + offsetX,
		y: offsetY - y
	}
}

// console.log(Math.sin(Math.PI / 4)); // sin 45 
// console.log(Math.cos(Math.PI / 6)); // cos 30
// console.log(Math.tan(Math.PI / 6)); // 1 / 1.73

// function degree_to_r(degree) {
//     // PI --> 180
//     return (degree / 180) * Math.PI;
// }

// function r_to_degree(r) {
//     // PI--> 180;
//     return (r / Math.PI) * 180;
// }
// var r = degree_to_r(90);
// console.log(r); // PI / 2;
// console.log(r_to_degree(r));
// 257.9422863405995 225
// 237.85088487178854 248.94399988070802

function test() {
	compute(120, 30);
	compute(120, 50);

	compute(160, 30);
	compute(160, 50);
	compute(240, 30);
	compute(240, 50);
	// compute(120, 0);
	// compute(120, 90);

	// compute(360, 0);
	// compute(360, 90);
}


//a60 60 0 1 0 120 0
// dx dy XROTATION  FLAG1 FLAG2  x y 终点
if (process && process.mainModule && process.mainModule.filename == __filename) {
	test();
}