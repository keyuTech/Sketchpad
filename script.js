var canvas = document.getElementById('canvas')
setPage()
var context = canvas.getContext('2d')

window.onresize = function(){
  setPage()
}

var paint = false
var lastPoint = {
  x: undefined,
  y: undefined
}
canvas.onmousedown = function (e) {
  paint = true
  var x = e.clientX
  var y = e.clientY
  drawCircle(x, y, 1)
  lastPoint.x = x
  lastPoint.y = y
}

canvas.onmousemove = function (e) {
  if (paint) {
    var x = e.clientX
    var y = e.clientY
    var newPoint = {
      x: x,
      y: y
    }
    drawCircle(x, y, 1)
    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
    lastPoint = newPoint
  }
}

canvas.onmouseup = function (e) {
  paint = false
}

function setPage() {
  var pageWidth = document.documentElement.clientWidth
  var pageHeight = document.documentElement.clientHeight
  canvas.width = pageWidth
  canvas.height = pageHeight
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineWidth = 2
  context.lineTo(x2, y2)
  context.stroke()
  context.closePath()
}

function drawCircle(x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2)
  context.fill()
}