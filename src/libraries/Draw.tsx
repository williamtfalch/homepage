const Draw = {
  setFillStyle: function(context: CanvasRenderingContext2D | null, fillStyle: string):void {
    if (context) {
      context.fillStyle = fillStyle
    }
  },
  
  drawRectangle: function(context: CanvasRenderingContext2D | null, startX:number, startY:number, width: number, height: number, color?:string):void {
    if (context) {
      if (color) {
        context.fillStyle = color
      }

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
  },

  drawScreenshot: function(context: CanvasRenderingContext2D | null, screenshot: HTMLImageElement, width: number, height: number, fill: string):void {
    this.drawRectangle(context, 0, 0, width, height, fill) // fills in "transparent" background with background color, isn't captured
    this.drawImage(context, screenshot, 0, 0, width, height, 0, 0, width, height)
  },
}

export default Draw