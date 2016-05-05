var wallPattern = {
  
  // Settings
  spacingX: 55,
  spacingY: 35,
  offsetVariance: 13,
  baseRadius: 55,
  
  // Other Globals
  points: [],
  canvas: null,
  context: null,
  
  init: function() {
    this.canvas = document.getElementById( 'canvas' );
	if(!this.canvas.getContext){
		document.getElementById("notags").style.display="block";
		return;
	}
    this.context = canvas.getContext( '2d' );
    this.canvas.width = 900;
    this.canvas.height = 500;
    this.preparePoints();
	this.createPattern();
  },
  
  preparePoints: function() {
    
    var width, height, i, j, k, offsetX, offsetY;
    var maxVariance = this.offsetVariance * 2;
    
    // Vertical spacing
    for ( i = this.spacingY; i < this.canvas.height; i += this.spacingY ) {
      
      var pointSet = [];
      
      // Horizontal spacing
      for(j = this.spacingX; j < this.canvas.width; j += this.spacingX ) {
        
        offsetX = Math.round((Math.random() * maxVariance) - this.offsetVariance);
        offsetY = Math.round((Math.random() * maxVariance) - this.offsetVariance);
        var offsetR = Math.round((Math.random() * maxVariance) - this.offsetVariance);
        
				pointSet.push( {x: j + offsetX, y: i + offsetY, radius: this.baseRadius + offsetR} )
      }
      
      this.points.push( this.shuffleArray( pointSet ) );
    } 
  },

  createPattern: function() {
    
		var i, j, k, currentPoints, currentPoint;
    
    for ( i = 0; i < this.points.length; i++ ) {
      
      currentPoints = this.points[i]; 
      
      for ( j = 0; j < currentPoints.length;  j++ ) {
        	
       	currentPoint = currentPoints[j];
        for ( k = currentPoint.radius; k > 0; k-=3 ) {
        	
        	
     		  this.context.beginPath();
          this.context.arc(currentPoint.x, currentPoint.y, k ,0 , Math.PI*2, true);
          this.context.closePath();
          this.context.fillStyle='#ffffff';
          this.context.strokeStyle='#9FCFE3';
          this.context.fill();
          this.context.stroke();   
        }
      }
    }
  },
 
  // Shuffle algorithm from: http://stackoverflow.com/questions/962802/is-it-correct-to-use-javascript-array-sort-method-for-shuffling
  shuffleArray: function( array ) {
    
    var tmp, current, top = array.length;

    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }

    return array;
  }
}
    
wallPattern.init();