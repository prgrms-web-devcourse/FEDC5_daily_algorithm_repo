#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int solution(string word) {
    int answer = 0;
    string str = "AEIOU";
    int num[5] = {781, 156, 31, 6, 1};
    answer = word.length();
    for(int i=0;i<word.length();i++) {
        int idx = str.find(word[i]);
        answer += idx * num[i];
    }
    return answer;
}