#include <string>
#include <vector>
#include <unordered_map>
#include <algorithm>
#include <queue>

using namespace std;

int solution(int n, vector<vector<int>> edge) {
    int answer = 0;
    
    unordered_map<int, vector<int>> graph; //인접 그래프
    
    for(int i=0;i<edge.size();i++){
        int start = edge[i][0];
        int end = edge[i][1];
        if(graph.count(start) == 1) {
            vector<int> v = graph[start];
            v.push_back(end);
            graph[start] = v;
        }
        else {
            vector<int> v = { end };
            graph[start] = v;
        }
        if(graph.count(end) == 1) {
            vector<int> v = graph[end];
            v.push_back(start);
            graph[end] = v;
        }
        else {
            vector<int> v = { start };
            graph[end] = v;
        }
    }
    
    queue<int> q;
    q.push(1);
    unordered_map<int,int> visit; //방문 및 거리 체크
    visit[1] = 0;
    
    int distance = 0; //최대 거리 체크
    
    while(q.size() > 0) {
        int start = q.front();
        q.pop();
        vector<int> v = graph[start];
        for(int i=0;i<v.size();i++) { // 다음 탐색 노드
            int end = v[i];
            if(visit.count(end) == 0) { // 방문 하지 않은 경우 큐에 추가
                q.push(end);
                visit[end] = visit[start]+1; //거리+1
                if(distance < visit[end]) {
                    distance = visit[end]; //최대 거리 업데이트
                }
            }
        }
    }
    
    for(const auto &entry: visit) { //최대 거리에 해당하는 원소 개수 세기
        if(entry.second == distance) {
            answer++;
        }
    }

    return answer;
}