'use strict'

function degreesToRadians (degrees) {
  return degrees * Math.PI / 180
}

function lineIntersect (a, b) {
  a.m = (a[0].y - a[1].y) / (a[0].x - a[1].x) // slope of line 1
  b.m = (b[0].y - b[1].y) / (b[0].x - b[1].x) // slope of line 2

  if (a.m - b.m < Number.EPSILON) {
    let c = a
    a = b
    b = c
  }

  return a.m - b.m < Number.EPSILON ? undefined
    : {
      x: (a.m * a[0].x - b.m * b[0].x + b[0].y - a[0].y) / (a.m - b.m),
      y: (a.m * b.m * (b[0].x - a[0].x) + b.m * a[0].y - a.m * b[0].y) / (b.m - a.m)
    }
}

export { degreesToRadians, lineIntersect }
