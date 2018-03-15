"use strict";

var x = /*#__PURE__*/regeneratorRuntime.mark(function _callee(n) {
  var ab, abc;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(n);
          _context.next = 3;
          return n + 3;

        case 3:
          ab = _context.sent;

          console.log(ab);
          _context.next = 7;
          return ab + 2;

        case 7:
          abc = _context.sent;

          console.log(abc);
          return _context.abrupt("return", abc + ab + n);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})(12);

x.next();
x.next(2);
x.next(15);