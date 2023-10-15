#include <string>
#include <vector>
#include <sstream>
#include <unordered_map>
using namespace std;

vector<string> solution(vector<string> record) {
    vector<string> answer;
    
    unordered_map<string, string> map; //[userID, userName]
    
    //map에 [userID, userName] 계속 업데이트 해주며 저장
    for(int i=0;i<record.size();i++) {
        string message, userID, userName;
        //공백 기준 문자열 나누기
        stringstream splitString(record[i]);
        splitString >> message >> userID >> userName;
        
        if(message == "Leave") continue;
        
        map[userID] = userName; //map에 최신 닉네임으로 덮어쓰기
    }
    
    //result 출력
    for(int i=0;i<record.size();i++) {
        string message, userID, userName;
        //공백 기준 문자열 나누기
        stringstream splitString(record[i]);
        splitString >> message >> userID;
        userName = map[userID]; //map에서 ID에 해당하는 닉네임 찾기
        
        string str = "";
        if(message == "Enter") {
            str = userName + "님이 들어왔습니다.";
                
        }
        else if(message == "Leave") {
            str = userName + "님이 나갔습니다.";
        }
        else if(message == "Change") {
            continue;
        }
        answer.push_back(str);
    }
    
    
    return answer;
}