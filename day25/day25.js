var _ = require('underscore');
var A = 1, B = 2, C = 3, D = 4, E = 5, F = 6;
var steps = 12964419;

function part1() {
  var arr = {};
  var index = 0;
  var state = A;
  _.times(steps, () => {
    if (!_.has(arr, index)) arr[index] = 0;
    switch (state) {
      case A:
        [arr, state, index] = a(arr, index);
        break;
      case B:
        [arr, state, index] = b(arr, index);
        break;
      case C:
        [arr, state, index] = c(arr, index);
        break;
      case D:
        [arr, state, index] = d(arr, index);
        break;
      case E:
        [arr, state, index] = e(arr, index);
        break;
      case F:
        [arr, state, index] = f(arr, index);
        break;
    }
  });

  var count = _.values(arr).reduce((m, n) => m + n);
  console.log(count);
}

function a(arr, index) {
  if (arr[index] === 0) {
    arr[index] = 1;
    return [arr, B, index + 1];
  } else {
    arr[index] = 0;
    return [arr, F, index + 1];
  }
}

function b(arr, index) {
  if (arr[index] === 0) {
    return [arr, B, index - 1];
  } else {
    return [arr, C, index - 1];
  }
}

function c(arr, index) {
  if (arr[index] === 0) {
    arr[index] = 1;
    return [arr, D, index - 1];
  } else {
    arr[index] = 0;
    return [arr, C, index + 1];
  }
}

function d(arr, index) {
  if (arr[index] === 0) {
    arr[index] = 1;
    return [arr, E, index - 1];
  } else {
    arr[index] = 1;
    return [arr, A, index + 1];
  }
}

function e(arr, index) {
  if (arr[index] === 0) {
    arr[index] = 1;
    return [arr, F, index - 1];
  } else {
    arr[index] = 0;
    return [arr, D, index - 1];
  }
}

function f(arr, index) {
  if (arr[index] === 0) {
    arr[index] = 1;
    return [arr, A, index + 1];
  } else {
    arr[index] = 0;
    return [arr, E, index - 1];
  }
}

part1();