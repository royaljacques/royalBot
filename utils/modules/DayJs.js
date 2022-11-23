const dayJs = require('dayjs')
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const fr = require("dayjs/locale/fr")

dayJs.extend(utc)
dayJs.extend(timezone)
dayJs.locale(fr)

dayJs.tz.setDefault("Europe/Paris");

module.exports = dayJs();
