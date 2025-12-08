// Jest’in yanlışlıkla msw’nin browser modüllerini yüklemesini engeller.
module.exports = require('msw/node');
