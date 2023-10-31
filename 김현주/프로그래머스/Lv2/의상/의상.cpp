#include <string>
#include <vector>
#include <unordered_map>

using namespace std;

int solution(vector<vector<string>> clothes) {
    int answer = 1;
    unordered_map<string, int> clothes_map; // {옷의 종류, 갯수}
    vector<string> clothes_type; //옷의 종류
    
    for(vector<string> v : clothes) {
        //map에 key(종류) 존재하면
        if(clothes_map.find(v[1]) != clothes_map.end()) {
            clothes_map[v[1]]++;
        }
        else {
            clothes_map.insert(make_pair(v[1],1)); // 입는경우 + 이 종류의 옷을 아예 입지 않는경우
            clothes_type.push_back(v[1]);
        }
    }

    int count = clothes_type.size();
    for(int i = 0; i<count; i++) {
        answer *= clothes_map[clothes_type[i]]+1;
    }
    return answer-1;
}