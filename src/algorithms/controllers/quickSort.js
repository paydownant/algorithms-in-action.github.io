
function partition(a, l, r){
	// Choose pivot
	pivot = a[r]
	while(l < r) {
		// Repeatedly increment l until A[l] >= pivot
		while(l<r && a[l]<=pivot)
			l++;
		// Swap
		a[r] = a[l];
		// Repeatedly decrement r until A[r] <= pivot or r < l
		while(l<r&&pivot<=a[r])
			r--;
		// Swap
		a[l] = a[r];

	}
	a[r] = pivot;
	return r;
}
	
function QuickSort(a,left, right){
	if(left<right){
		l = partition(a, left, right)
		//  Quicksort FirstHalf
		QuickSort(a, left, l-1);
		//  Quicksort SecondHalf
		QuickSort(a, l+1, right);
	}
}
	