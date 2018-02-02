var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
autoSetPage(canvas)
listenToAction(canvas)

var usingEraser = false
var pen = document.getElementById('pen')
var eraser = document.getElementById('eraser')
var actions = document.getElementById('actions')

pen.onclick = function(){
  usingEraser = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick = function(){
  usingEraser = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}


function listenToAction(canvas) {
  var active = false
  var lastPoint = {
    x: undefined,
    y: undefined
  }
  //特性检测
  var touch = 'ontouchstart'
  if (touch in document.documentElement) {
    //非触屏设备
    console.log('触屏设备')
    canvas.ontouchstart = function (e) {
      var x = e.touches[0].clientX
      var y = e.touches[0].clientY
      active = true
      if (usingEraser) {
        context.clearRect(x - 5, y - 5, 20, 20)
      } else {
        lastPoint.x = x
        lastPoint.y = y
      }
    }
    canvas.ontouchmove = function (e) {
      var x = e.touches[0].clientX
      var y = e.touches[0].clientY
      if (!active) { return }
      if (usingEraser) {
        context.clearRect(x - 5, y - 5, 20, 20)
      } else {
        var newPoint = {
          x: x,
          y: y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function (e) {
      active = false
    }
  } else {
    //触屏设备
    console.log('非触屏设备')
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

