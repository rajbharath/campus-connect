var stackDepth = 0;

function quicksort_hoare(data, low, high, _depth) {
  stackDepth = stackDepth + _depth;
  var partitioned_index = _hoare_partition(data, low, high);
  if (low < partitioned_index) {
    quicksort_hoare(data, low, partitioned_index, 1);
  }
  if (partitioned_index + 1 < high) {
    quicksort_hoare(data, partitioned_index + 1, high, 0);
  }
}

function quicksort_lomuto(data, low, high, _depth) {
  stackDepth = stackDepth + _depth;
  var partitioned_index = _lomuto_partition(data, low, high);
  if (low < partitioned_index) {
    quicksort_lomuto(data, low, partitioned_index, 1);
  }
  if (partitioned_index + 1 < high) {
    quicksort_lomuto(data, partitioned_index + 1, high, 0);
  }
}

function _lomuto_partition(data, low, high) {
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

function _hoare_partition(data, low, high) {
  var pivot = data[low];
  var left = low;
  var right = high;
  while(true) {
    left++;
    right--;

    for(;data[left] < pivot; ++left);
    for(;data[right] > pivot; --right);

    if ( left >= right ) {
      _swap(data, low, right);
      return right;
    }
    _swap(data, left, right);
  }
}

function _swap(data, i, j) {
  var temp = data[i];
  data[i] = data[j];
  data[j] = temp;
}

function doSort(data, method) {
  switch(method) {
    case 'hoare':
      quicksort_hoare(data, 0, data.length, 1);
      break;
    default:
      quicksort_lomuto(data, 0, data.length, 1);

  }
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

function performanceTest(data, method) {
  stackDepth = 0;
  console.log('-----PARTITION METHOD----------');
  console.log(method);
  console.log('-------Start Time-----');
  console.log(new Date());
  doSort(data, method);
  console.log('--------End Time-----------');
  console.log(new Date());
  console.log(isDataSortedTest(data));
  console.log(stackDepth);
}

var data = getShuffledData(100000000);
performanceTest(data.slice(0), 'lomuto');
performanceTest(data.slice(0), 'hoare');
