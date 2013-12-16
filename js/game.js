(function(){
	var c, $h = headOn, camera = new $h.Camera(700,700);
	var keys = {};
	$h.canvas.create("main", 700, 700, camera);
	c = $h.canvas("main");
	c.append("body");
	$h.update(function(){
		if(keys[38]){
			camera.move($h.Vector(0,-1));
		}
		if(keys[39]){
			camera.move($h.Vector(1,0));
		}
		if(keys[40]){
			camera.move($h.Vector(0,1));
		}
		if(keys[37]){
			camera.move($h.Vector(-1,0));
		}
	})
	$h.render(function(){
		c.clear(c.width, c.height, 0, 0, "white");
		c.drawRect(20, 20, 100, 100, "black");
		c.drawRect(20, 20, 350, 350, "green");
		c.drawRect(20, 20, 0, 0, "blue")
		c.drawRect(20, 20, 525, 525, "purple")
	});
	$h.imagesLoaded = true;
	$h.run();
	window.addEventListener("keydown", function(e){
		keys[e.which] = true;
		
	});
	window.addEventListener("keyup", function(e){
		keys[e.which] = false;
		if(e.which === 187){
			camera.zoomIn(2);
		}
		if(e.which === 189){
			camera.zoomOut(2);
		}
	});
}())