'use strict'

// Converts degrees to radians
function degreesToRadians (degrees) {
  return degrees * Math.PI / 180
}

/**
 * Takes 2 lines and gives the point of intersection as result
 * @param {a} - A line defined by 2 points a[0] and a[1]
 * @param {b} - A line defined by 2 points b[0] and b[1]
 */
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
