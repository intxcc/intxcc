'use strict'

/** Just because I can. Calculate my age here, based on my birthday. */
const MYAGE = Math.abs((new Date((new Date()) - Date.parse('1994-09-05'))).getUTCFullYear() - 1970)

export default MYAGE
