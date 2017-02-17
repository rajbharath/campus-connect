var stackDepth = 0;

function quicksort(data, low, high, _depth) {
  stackDepth = stackDepth + _depth;
  var partitioned_index = _place_pivot_in_its_place(data, low, high);
  if (low < partitioned_index) {
    quicksort(data, low, partitioned_index, 1);
  }
  if (partitioned_index + 1 < high) {
    quicksort(data, partitioned_index + 1, high, 0);
  }
}

function _place_pivot_in_its_place(data, low, high) {
  var left = low + 1;
  var pivot = data[low];
  for( var i = left; i < high; i++ ) {
    if (data[i] <= pivot) {
      _swap(data, i, left);
      left++;
    }
  }
  var pivot_index = left - 1;
  _swap(data, low, left - 1);
  return pivot_index;
}

function _swap(data, i, j) {
  var temp = data[i];
  data[i] = data[j];
  data[j] = temp;
}

function doSort(data) {
  quicksort(data, 0, data.length, 1);
}

function getShuffledData(n) {
  var data = [];
  for (var i = 1; i <= n; i++) {
    data.push(i);
  }
  for (var i = 0; i < n; i++) {
    _swap(data, i, Math.floor(Math.random() * n));
  }
  return data;
}

var data = getShuffledData(104000000);

function isDataSortedTest(data) {
  for (var i = 0; i < data.length - 1; i++) {
    if ( data[i] > data[i + 1]) {
      console.log(data[i]);
      console.log(data[i+1]);
      return false;
    }
  }
  return true;
}
console.log('-------------------');
console.log('Start Time');
console.log('-------------------');
console.log(new Date());
doSort(data);
console.log('-------------------');
console.log(new Date());
console.log('End Time');
console.log('-------------------');
console.log(isDataSortedTest(data));
console.log(stackDepth);
