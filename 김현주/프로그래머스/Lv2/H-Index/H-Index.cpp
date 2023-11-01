#include <string>
#include <vector>
#include <algorithm>

using namespace std;

int solution(vector<int> citations) {
    sort(citations.begin(), citations.end(), greater<>()); //내림차순 정렬
    int H = 0;
    for(int i=0;i<citations.size();i++) {
        int count = i+1; //논문의 개수
        if(count <= citations[i]) { //만약 h번 이상 인용된 논문이 h편 이상인 경우
            H = count; //H-Index가 된다.
        }
        else {
            break;
        }
    }
    return H;
}