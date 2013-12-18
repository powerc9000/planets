(function(){
	var G_CONST = 6.67384e-11,
		timewarp = 100,
		planets = [],
		planet = {
	    ax: 0,
	    ay: 0,
	    type:"circle",
	    render: function (canvas) {
	        canvas.drawCircle(this.position.x, this.position.y, this.radius, this.color);
	        canvas.drawRect(this.width, this.height, this.position.x, this.position.y, "blue")
	    },
	    update: function (delta) {
	        dt = delta / (1000 / timewarp);

	        planets.forEach(function (p) {
	            var otherplanet, dist, angle;
	            if (p == this) {

	               return;
	            } 
	            angle = Math.atan2(p.position.y - this.position.y, p.position.x - this.position.x);
	            dist = Math.sqrt(Math.pow((p.position.x - this.position.x), 2) + Math.pow((p.position.y - this.position.y), 2))
	            this.a = ((G_CONST * p.mass) / (dist * dist))
	            this.vx += this.a * Math.cos(angle) * dt;
	            this.vy += this.a * Math.sin(angle) * dt;
	            this.position.x += this.vx * dt;
	            this.position.y += this.vy * dt;
	        }.bind(this))

	    },
	    init: function(camera){
	    	var that = this;
	    	var cursor;
	    	headOn.events.listen("click", function(vec, realWorld, camera){
	    		if(headOn.collides(that, {position:realWorld, angle:0, width:2, height:2})){
	    			camera.moveTo(that.position);
	    		}
	    		//console.log(realWorld);
	    	});
	    	headOn.events.listen("move", function(vec, realWorld, camera){
				if(headOn.collides(that, {position:realWorld, angle:0, width:2, height:2})){
					if(!cursor){
						headOn.events.trigger("cursor:pointer", true)
						cursor = true;
					}
				}else{
					headOn.events.trigger("cursor:pointer", false);
				}
			});
		}
	},
	planet1 = headOn.entity({
		position: headOn.Vector(0, 0),
	    vx: 0,
	    vy: 0,
	    radius: 6.371000e6,
	    angle:0,
	    mass: 5.972E24,
	    color: "red"
	}, planet),
	planet2 = headOn.entity({
		position: headOn.Vector(0 ,559000 + 6.371000e6),
		vx: 7500,
		vy: 0,
		radius: 13.2*256,
		color: "purple",
		mass: 11110,
	}, planet);
	planet1.init();
	planet2.init();
	planets.push(planet1, planet2);

	headOn.planets = planets;
}())
