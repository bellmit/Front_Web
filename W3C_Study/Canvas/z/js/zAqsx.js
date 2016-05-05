(function() {
    var canvas=document.createElement("canvas");
	var wraps=document.getElementById("showcanvas");
	canvas.id="canvas";
	var nodeimgs=document.createElement("img");
	nodeimgs.alt="no html5 tag";
	nodeimgs.src="images/no-html5.png";
	nodeimgs.id=nodeimgs.className="notags";
	if(!canvas.getContext){
		nodeimgs.style.display="block";
		wraps.appendChild(canvas.appendChild(nodeimgs));
		return;
	}
	wraps.appendChild(canvas);
    context = canvas.getContext( '2d' ),
    height =width = Math.min(900,500),
	radius = Math.min( width, height ) * 0.5,
    quality = radius > 300 ? 180 : 90,
	layers = [],
	layerSize = radius * 0.3,
	layerOverlap = Math.round( quality * 0.1 );
	function initialize() {
		for( var i = 0; i < quality; i++ ) {
			layers.push({
				x: width/2 + Math.sin( i / quality * 2 * Math.PI ) * ( radius - layerSize ),
				y: height/2 + Math.cos( i / quality * 2 * Math.PI ) * ( radius - layerSize ),
				r: ( i / quality ) * Math.PI
			});
		}
		resize();
		update();
	}
	function resize() {
		canvas.width = width;
		canvas.height = height;
	}
	function update() {
		requestAnimationFrame( update );
		step();
		clear();
		paint();
	}
	function step () {
		for( var i = 0, len = layers.length; i < len; i++ ) {
			layers[i].r += 0.005;
		}
	}
	function clear() {
		context.clearRect( 0, 0,canvas.width, canvas.height );
	}
	function paint() {
		var layersLength = layers.length;
		for( var i = layersLength - layerOverlap, len = layersLength; i < len; i++ ) {
			context.save();
			context.globalCompositeOperation = 'destination-over';
			paintLayer( layers[i] );
			context.restore();
		}
		context.save();
		context.globalCompositeOperation = 'destination-in';
		paintLayer( layers[0], true );
		context.restore();
		for( var i = 0, len = layersLength; i < len; i++ ) {
			context.save();
			context.globalCompositeOperation = 'destination-over';
			paintLayer( layers[i] );
			context.restore();
		}
	}
	function paintLayer( layer, mask ) {
		size = layerSize + ( mask ? 10 : 0 );
		size2 = size / 2;
		context.translate( layer.x, layer.y );
		context.rotate( layer.r );
		if( !mask ) {
			context.strokeStyle = '#000';
			context.lineWidth = 1;
			context.strokeRect( -size2, -size2, size, size );
		}
		context.fillStyle = '#fff';
		context.fillRect( -size2, -size2, size, size );

	}
	(function() {
		var lastTime = 0;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelAnimationFrame = 
			  window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
		}
		if (!window.requestAnimationFrame)
			window.requestAnimationFrame = function(callback, element) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
				  timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};
		if (!window.cancelAnimationFrame)
			window.cancelAnimationFrame = function(id) {
				clearTimeout(id);
			};
	}());
	initialize();
})();