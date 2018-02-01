var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
autoSetPage(canvas)
listenToMouse(canvas)

var usingEraser = false
var eraser = document.getElementById('eraser')
var actions = document.getElementById('actions')
var pen = document.getElementById('pen')
eraser.onclick = function () {
  usingEraser = true
  actions.className = 'actions switch'
}
pen.onclick = function(){
  usingEraser = false
  actions.className = 'actions'
}

function listenToMouse(canvas) {
  var active = false
  var lastPoint = {
    x: undefined,
    y: undefined
  }
  canvas.onmousedown = function (e) {
    var x = e.clientX
    var y = e.clientY
    active = true
    if (usingEraser) {
      context.clearRect(x - 5, y - 5, 10, 10)
    } else {
      lastPoint.x = x
      lastPoint.y = y
    }
  }

  canvas.onmousemove = function (e) {
    var x = e.clientX
    var y = e.clientY
    if (!active) { return }
    if (usingEraser) {
      context.clearRect(x - 5, y - 5, 10, 10)
    } else {
      var newPoint = {
        x: x,
        y: y
      }
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
      lastPoint = newPoint
    }
  }

  canvas.onmouseup = function (e) {
    active = false
  }
}

function autoSetPage(canvas) {
  setPage()
  window.onresize = function () {
    setPage()
  }
  function setPage() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineWidth = 2
  context.lineTo(x2, y2)
  context.stroke()
  context.closePath()
}
