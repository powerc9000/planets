(function(){
	var c, $h = headOn, camera = new $h.Camera(900,900), cam2 = new $h.Camera(900,900);
	var keys = {};
	var pointers = 0;
	$h.canvas.create("main", 900, 900, camera);
	c = $h.canvas("main");
	c.append("body");
	c.canvas.canvas.style.border ="1px black solid"
	camera.zoomAmt = 1;
	var once;
	$h.update(function(delta){
		if(keys[38]){
			camera.move($h.Vector(0,-1 * camera.zoomAmt));
		}
		if(keys[39]){
			camera.move($h.Vector(1  * camera.zoomAmt,0));
		}
		if(keys[40]){
			camera.move($h.Vector(0,1  * camera.zoomAmt));
		}
		if(keys[37]){
			camera.move($h.Vector(-1  * camera.zoomAmt,0));
		}
		$h.planets.forEach(function(p){
			p.update(delta);
		});
		
		camera.moveTo($h.planets[1].position);
		
	})
	$h.render(function(){

		c.clear(c.width, c.height, 0, 0, "white");
		c.setCamera(cam2);
		c.drawRect(1,c.height, c.width/2 , 0, "black");
		c.drawRect(c.width,1, 0 , c.height/2, "black");
		c.setCamera(camera);
		c.drawRect(20,20, 100, 100, "black")
		$h.planets.forEach(function(p){
			p.render(c);
		})
	});
	$h.imagesLoaded = true;
	$h.run();
	$h.events.listen("cursor:pointer", function(bool){
		if(bool){
			pointers++;
		}else{
			pointers = (pointers -1 < 0)? 0: pointers-1;
		}
		if(pointers > 0){
			c.canvas.canvas.style.cursor = "pointer";
		}else{
			c.canvas.canvas.style.cursor = "auto";
		}
		
		
	})
	
	window.addEventListener("keydown", function(e){
		keys[e.which] = true;
		
	});
	c.canvas.canvas.addEventListener("click", function(e){
		var bounds = e.target.getBoundingClientRect();
		var coords = $h.Vector(e.pageX - bounds.left, e.pageY - bounds.top);
		//(x - camera.position.x)/camera.zoomAmt
		var real = coords.mul(camera.zoomAmt).add(camera.position);
		$h.events.trigger("click",coords, real, camera);
	})
	c.canvas.canvas.addEventListener("mousemove", function(e){
		var bounds = e.target.getBoundingClientRect();
		var coords = $h.Vector(e.pageX - bounds.left, e.pageY - bounds.top);
		//(x - camera.position.x)/camera.zoomAmt
		var real = coords.mul(camera.zoomAmt).add(camera.position);
		$h.events.trigger("move",coords, real, camera);
		
	})
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