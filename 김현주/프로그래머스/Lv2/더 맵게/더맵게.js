class MinHeap {
  constructor() {
    this.heap = [null];
  }
  //요소 추가
  push(data) {
    this.heap.push(data);
    let currIndex = this.heap.length - 1;
    let parentIndex = Math.floor(currIndex / 2);

    while(parentIndex !==0 && this.heap[parentIndex] > data) {
      const temp = this.heap[parentIndex];
      this.heap[parentIndex] = data;
      this.heap[currIndex] = temp;

      currIndex = parentIndex;
      parentIndex = Math.floor(currIndex / 2);
    }
  }
  //삭제
  pop() {
    const data = this.heap[1];
		//만약 마지막 1개의 요소를 pop할 시, 배열에서 바로 pop해준다.
    if(this.heap.length == 2)
        return this.heap.pop();
    this.heap[1] = this.heap.pop();//가장 마지막 요소를 루트에 놓고 시작.

    let currIndex = 1;
    let leftIndex = 2;
    let rightIndex = 3;

    while(
        this.heap[currIndex] > this.heap[leftIndex] ||
        this.heap[currIndex] > this.heap[rightIndex]
    ) {
        if(this.heap[leftIndex] > this.heap[rightIndex]) {
            const temp = this.heap[currIndex];
            this.heap[currIndex] = this.heap[rightIndex];
            this.heap[rightIndex] = temp;
            currIndex = rightIndex;
        }
        else {
            const temp = this.heap[currIndex];
            this.heap[currIndex] = this.heap[leftIndex];
            this.heap[leftIndex] = temp;
            currIndex = leftIndex;
        }
        leftIndex = currIndex * 2;
        rightIndex = currIndex * 2 + 1;
    }
    return data;
  }
}

function solution(scoville, K) {
let answer = 0;
const heap = new MinHeap();

//1. 기존 scoville 배열 최소힙으로 이동.
for(const data of scoville) {
    heap.push(data);
}

//이미 전부 K 이상일경우 0 리턴
if(heap.heap[1] >= K) {
    return 0;
}

while(true){
		//만약 모든 음식이 전부 K를 넘었다면 break;
    if(heap.heap[1] >= K) break;
		//만약 더이상 음식 배열에 요소가 2개 이상 없고, 마지막 하나 남은 음식이 K를 넘지 못했다면 -1
    if(heap.heap.length <= 2 && heap.heap[1] < K) {
        answer = -1;
        break;
    }
    let first = heap.pop();
    let second = heap.pop();
    let newScoville = first + second * 2;
		//최소힙이므로 값을 삽입하면 자동으로 정렬된다.
    heap.push(newScoville);
    answer++;
}

return answer;
}
