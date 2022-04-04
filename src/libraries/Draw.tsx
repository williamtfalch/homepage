const Draw = {
  drawRectangle: function(context: CanvasRenderingContext2D | null, startX:number, startY:number, width: number, height: number, color:string):void {
    if (context) {
      context.fillStyle = color
      context.fillRect(startX, startY, width, height)
    }
  },

  clearRectangle: function(context: CanvasRenderingContext2D | null, startX:number, startY:number, width:number, height:number):void {
    if (context) {
      context.clearRect(startX, startY, width, height)
    }
  },

  drawImage: function(context: CanvasRenderingContext2D | null, image:HTMLImageElement, sourceStartX:number, sourceStartY:number, sourceWidth: number, sourceHeight:number, destinationStartX:number, destinationStartY:number, destinationWidth:number, destinationHeight: number):void {
    if (context) {
      context.drawImage(image, sourceStartX, sourceStartY, sourceWidth, sourceHeight, destinationStartX, destinationStartY, destinationWidth, destinationHeight)
    }
  }
}

export default Draw