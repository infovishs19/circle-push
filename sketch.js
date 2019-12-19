/// <reference path="./libraries/p5.global-mode.d.ts" />

var circles = [];
var n = 100;
function setup () {
	createCanvas( 800, 600);

	for(var i=0; i<n; i++){
		var circle = {
			x: random(width/2-200,width/2+200),
			y: random(height/2-200,height/2+200),
			r: random(5,30)
		}
		circles.push(circle);
	}
	frameRate(30);
	noLoop();
}

function draw () {

	background(200);

	for(var i=0; i<circles.length; i++){
		var c = circles[i];
		fill(255,100);
		ellipse(c.x,c.y,2*c.r,2*c.r);
		textAlign(CENTER,CENTER);
		noStroke();
		fill(0);
		text(i,c.x,c.y);
	}

	for(var i=0; i<1; i++){
		for(var j=0; j<circles.length; j++){
			for(var k=0; k<circles.length; k++ ){

				if(j==k){
					continue;
				}

				var c1 = circles[j];
				var c2 = circles[k];
				var d = dist(c1.x,c1.y,c2.x,c2.y);
				if(d<(c1.r + c2.r)){
					console.log('collision between ', j, ' and ', k );
					let v1 = createVector(c1.x, c1.y);
					let v2 = createVector(c2.x, c2.y);
					let vdiff = p5.Vector.sub(v2, v1);
					vdiff.normalize();
					let overlap = (c1.r+c2.r)-d;
					
					vdiff = vdiff.mult(0.5*overlap);

					v1.sub(vdiff);
					v2.add(vdiff);

					c1.x = v1.x;
					c1.y = v1.y;
					c2.x = v2.x;
					c2.y = v2.y;

				}
			}
		}
	}
	
}

function keyTyped(){
	redraw();
}



