"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalBitcoin = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LocalBitcoin =
/*#__PURE__*/
function () {
  function LocalBitcoin(apiEndpoint) {
    _classCallCheck(this, LocalBitcoin);

    this.apiEndpoint = apiEndpoint;
  }

  _createClass(LocalBitcoin, [{
    key: "request",
    value: function request(endpoint) {
      var options = {
        method: 'GET',
        url: "https://localbitcoins.com" + endpoint
      };
      return (0, _axios["default"])(options).then(function (res) {
        return res;
      })["catch"](function (err) {
        console.log('error: ', err.res);
        return err.res;
      });
    }
  }]);

  return LocalBitcoin;
}();

exports.LocalBitcoin = LocalBitcoin;
//# sourceMappingURL=unaunth.js.map