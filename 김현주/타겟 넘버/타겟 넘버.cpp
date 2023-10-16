#include <string>
#include <vector>

using namespace std;

int dfs(vector<int> numbers, int target, int sum, int depth) {
    if(depth == numbers.size()) { //만약 numbers 원소로 전부 조합해 봤을 때
        if(sum == target) { //타겟 넘버를 만들었으면
            return 1; //count++
        }
        return 0; //못 만들었으면 0개
    } 
    int count = 0;
    count += dfs(numbers, target, sum + numbers[depth], depth+1);
    count += dfs(numbers, target, sum - numbers[depth], depth+1);
    return count;
}

int solution(vector<int> numbers, int target) {
    return dfs(numbers, target, 0 , 0);;
}