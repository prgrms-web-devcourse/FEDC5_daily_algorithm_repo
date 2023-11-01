#include <string>
#include <vector>
#include <cctype>
#include <algorithm>
#include <cmath>
#include <unordered_map>

using namespace std;

int solution(string str1, string str2) {
    int answer = 0;
    //전부 대문자로 변경해주는 과정
    transform(str1.begin(), str1.end(), str1.begin(), ::toupper);
    transform(str2.begin(), str2.end(), str2.begin(), ::toupper);
    
    unordered_map<string, int> map1;
    unordered_map<string, int> map2;
    

    int str1Size = 0;
    //str1을 분해해서 넣는 과정
    for(int i=0;i<str1.length()-1; i++) {
        char c1 = str1[i];
        char c2 = str1[i+1];

        //공백, 숫자, 특수문자가 들어간 글자쌍은 무시
        if(isalpha(c1) == 0 || isalpha(c2) == 0) { //만약 알파벳이 아니라면
            continue;//패스...
        }
        string str = "";
        str.push_back(c1);
        str.push_back(c2);
        if(map1.count(str) == 0) {
            map1[str] = 1;
        }
        else {
            map1[str] += 1;
        }
        str1Size++;
    }

    int str2Size = 0;
    //str2을 분해해서 넣는 과정
    for(int i=0;i<str2.length()-1; i++) {
        char c1 = str2[i];
        char c2 = str2[i+1];

        //공백, 숫자, 특수문자가 들어간 글자쌍은 무시
        if(isalpha(c1) == 0 || isalpha(c2) == 0) { //만약 알파벳이 아니라면
            continue;//패스...
        }
        string str = "";
        str.push_back(c1);
        str.push_back(c2);
        if(map2.count(str) == 0) {
            map2[str] = 1;
        }
        else {
            map2[str] += 1;
        }
        str2Size++;
    }

    //이제 문자열 비교!     
    int intersection = 0; //교집합 개수

    //교집합 구하기
    for (auto const &pair: map1) {
        string key = pair.first;
        if(map2.count(key) > 0) {
            intersection += min(map1[key], map2[key]);
        }
    }

    //합집합의 개수 = 두 백터의 전체 크기 합 - 교집합의 크기
    int unionCount = str1Size + str2Size - intersection;

    //합집합이 아예 없어서 공집합일 경우 (0으로 나눌 수 없으니 오류 처리)
    if(unionCount == 0)
        answer = 65536;
    else{
        float result = ((float)intersection / (float)unionCount)* 65536;
        answer = (int)result;
    }
    
    return answer;
}