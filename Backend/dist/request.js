"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.query = query;
exports.order = order;
exports.save = save;

var _currency = require("../models/currency.js");

var _unaunth = require("../modules/unaunth.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function query(j) {
  var currency = ["ves", "usd", "eur", "rub", "cny"];

  if (j <= currency.length - 1) {
    console.log(currency[j]);
    var enlace = "/bitcoincharts/".concat(currency[j], "/trades.json");
    console.log(enlace);
    var instancia = new _unaunth.LocalBitcoin(enlace);
    var consulta = instancia.request(enlace);
    consulta.then(
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(result) {
        var i, results;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (result !== undefined) {
                  i = 0;
                  results = result.data;
                  console.log(currency.length);
                  save(results, i, currency[j]);
                  j++;
                  query(j);
                }

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }())["catch"](function (err) {
      console.log(err);
    });
  }
}

function order(results) {
  var object = results;
  var obj = object.sort(function (a, b) {
    if (a.date > b.date) {
      return 1;
    }

    if (a.date < b.date) {
      return -1;
    }

    return 0;
  });
  return obj;
}

function save(results, i, coin) {
  var ordened = 0;

  if (i <= results.length - 1) {
    ordened = order(results);
    ordened.forEach(function (ordened) {
      var unixEpochTimeMS = ordened.date * 1000;
      var d = new Date(unixEpochTimeMS);
      var strDate = d.toLocaleString();
      (0, _currency.searchTid)(ordened.tid, coin).then(
      /*#__PURE__*/
      function () {
        var _ref2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2(res) {
          var rates;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(res == 1)) {
                    _context2.next = 4;
                    break;
                  }

                  rates = new _currency.currency({
                    tid: ordened.tid,
                    currency: coin,
                    price: ordened.price,
                    amount: ordened.amount,
                    date: strDate,
                    epoch: ordened.date
                  });
                  _context2.next = 4;
                  return rates.save();

                case 4:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }())["catch"](function (err) {
        console.log(err);
      });
    });
  }
}
//# sourceMappingURL=request.js.map