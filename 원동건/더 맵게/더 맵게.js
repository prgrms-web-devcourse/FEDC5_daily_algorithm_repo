const minHeap = [];

const pushHeap = (num) => {
    minHeap.push(num);
    let currentIndex = minHeap.length - 1;
    let parentIndex = Math.floor((currentIndex - 1) / 2);

    while (currentIndex > 0 && minHeap[currentIndex] < minHeap[parentIndex]) {
        [minHeap[parentIndex], minHeap[currentIndex]] = [
            minHeap[currentIndex],
            minHeap[parentIndex],
        ];
        currentIndex = parentIndex;
        parentIndex = Math.floor((parentIndex - 1) / 2);
    }
};

const popHeap = () => {
    if (minHeap.length === 0) return null;

    const minValue = minHeap[0];
    const lastValue = minHeap.pop();

    if (minHeap.length > 0) {
        minHeap[0] = lastValue;

        let currentIndex = 0;
        
        while (currentIndex * 2 + 1 < minHeap.length) {
            let smallerChildIndex = currentIndex * 2 + 1;

            if (
                smallerChildIndex + 1 < minHeap.length && 
                minHeap[smallerChildIndex] > minHeap[smallerChildIndex + 1]
            ) { 
                smallerChildIndex++;
            }

            if (minHeap[currentIndex] <= minHeap[smallerChildIndex]) { 
                break; 
            } else { 
                [minHeap[currentIndex], minHeap[smallerChildIndex]] =
                    [minHeap[smallerChildIndex], minHeap[currentIndex]]; 

                currentIndex = smallerChildIndex; 
           }
       }
   }

   return minValue;
};


function solution(scoville, K) {
    let count = 0;
    scoville.forEach(scov => pushHeap(scov));
    
    while(minHeap.length > 1 && K > minHeap[0]) {
        const first = popHeap();
        const second = popHeap();
        
        count += 1;
        pushHeap(first + (second * 2));
    }
    
    return minHeap[0] < K ? -1 : count;
}