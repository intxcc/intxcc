'use strict'

/**
 * Gives the name identifier for a skill eg. 'webpack-4'
 * @param {*} skill - Skill object with id, title, etc.
 */
function getNameIdentifierFromSkill (skill) {
  if (skill.title) {
    return skill.title.toLowerCase().replace(new RegExp(' ', 'g'), '-')
  }

  // No identifer found
  return false
}

/**
 * Gives id number from id string
 * @param {*} idString String representing the id. IMORTANT: Has to be shaped like '<some identifier>-<id number>'
 */
function getIdNumberFromIdString (idString) {
  return parseInt(idString.split('-')[1])
}

// Escape string for use in a regular expression
function escapeRegExp (string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

/**
 * Check if an object is empty
 * @param {*} Object to check if it is empty
 */
function isEmpty (obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false
    }
  }
  return true
}

/** Converts degrees to radians */
function degreesToRadians (degrees) {
  return degrees * (Math.PI / 180)
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

// Just so the eslint error, that btoa is undefined is contained in this file and doesn't annoy me anymore. Also this is a prettier function name
function stringToBase64 (input) {
  return btoa(input)
}

export {
  getNameIdentifierFromSkill,
  getIdNumberFromIdString,
  escapeRegExp,
  isEmpty,
  degreesToRadians,
  lineIntersect,
  stringToBase64
}
