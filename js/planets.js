(function(){
	var G_CONST = 6.67384e-11,
		timewarp = 1,
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
	    	headOn.events.listen("click", function(vec, realWorld, camera){
	    		console.log(that.position, realWorld);
	    		if(headOn.collides(that, {position:realWorld, angle:0, width:2, height:2})){
	    			camera.moveTo(that.position);
	    		}
	    		//console.log(realWorld);
	    	});
	    }
	},
	planet1 = headOn.entity({
		position: headOn.Vector(250, 300),
	    vx: 2,
	    vy: 0,
	    radius: 20,
	    width:20,
	    height:20,
	    angle:0,
	    mass: 100000,
	    color: "red"
	}, planet),
	planet2 = headOn.entity({
		position: headOn.Vector(700,700),
		vx: 0,
		vy: 2,
		radius: 4,
		color: "purple",
		mass: 0,
	}, planet);
	planet1.init();
	planet2.init();
	planets.push(planet1, planet2);

	headOn.planets = planets;
}())
