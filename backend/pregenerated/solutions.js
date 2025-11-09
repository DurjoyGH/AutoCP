const solutions = {
    "Noman's First Array": {
        cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        sum += arr[i];
    }
    
    cout << sum << endl;
    return 0;
}`,
        javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
let idx = 0;
let n = parseInt(input[idx++]);
let arr = [];
for (let i = 0; i < n; i++) {
    arr.push(parseInt(input[idx++]));
}
let sum = 0;
for (let num of arr) sum += num;
console.log(sum);`
    },

    "Pushpita's String Reversal": {
        cpp: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string str;
    cin >> str;
    
    reverse(str.begin(), str.end());
    
    cout << str << endl;
    return 0;
}`
    },

    "Tahmid's Two Sum Problem": {
        cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int main() {
    int n, target;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) {
        cin >> nums[i];
    }
    cin >> target;
    
    unordered_map<int, int> map;
    for (int i = 0; i < n; i++) {
        int complement = target - nums[i];
        if (map.find(complement) != map.end()) {
            cout << map[complement] << " " << i << endl;
            return 0;
        }
        map[nums[i]] = i;
    }
    
    cout << endl;
    return 0;
}`
    },

    "Durjoy's Bubble Sort Challenge": {
        cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
    
    for (int i = 0; i < n; i++) {
        if (i > 0) cout << " ";
        cout << arr[i];
    }
    cout << endl;
    return 0;
}`
    },

    "Tahmid's Binary Search Challenge": {
        cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, target;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    cin >> target;
    
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            cout << mid << endl;
            return 0;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    cout << -1 << endl;
    return 0;
}`
    },

    "Noman's Palindrome Quest": {
        cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string str;
    cin >> str;
    
    int len = str.length();
    bool isPalindrome = true;
    for (int i = 0; i < len / 2; i++) {
        if (str[i] != str[len - 1 - i]) {
            isPalindrome = false;
            break;
        }
    }
    
    cout << (isPalindrome ? "true" : "false") << endl;
    return 0;
}`
    },

    "Pushpita's Coin Change": {
        cpp: `#include <iostream>
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

int main() {
    int n, amount;
    cin >> n;
    vector<int> coins(n);
    for (int i = 0; i < n; i++) {
        cin >> coins[i];
    }
    cin >> amount;
    
    vector<int> dp(amount + 1, INT_MAX);
    dp[0] = 0;
    
    for (int coin : coins) {
        for (int i = coin; i <= amount; i++) {
            if (dp[i - coin] != INT_MAX) {
                dp[i] = min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    cout << (dp[amount] == INT_MAX ? -1 : dp[amount]) << endl;
    return 0;
}`
    },

    "Tahmid's Merge Sort Implementation": {
        cpp: `#include <iostream>
#include <vector>
using namespace std;

void merge(vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    vector<int> L(n1), R(n2);
    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (int i = 0; i < n2; i++)
        R[i] = arr[mid + 1 + i];
    
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
        }
    }
    
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    mergeSort(arr, 0, n - 1);
    
    for (int i = 0; i < n; i++) {
        if (i > 0) cout << " ";
        cout << arr[i];
    }
    cout << endl;
    return 0;
}`
    },

    "Durjoy's Dijkstra Algorithm": {
        cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>
#include <climits>
using namespace std;

int main() {
    int n, m;
    string start;
    cin >> n >> m >> start;
    
    unordered_map<string, vector<pair<string, int>>> graph;
    vector<string> nodes;
    
    for (int i = 0; i < m; i++) {
        string u, v;
        int w;
        cin >> u >> v >> w;
        graph[u].push_back({v, w});
        if (find(nodes.begin(), nodes.end(), u) == nodes.end()) {
            nodes.push_back(u);
        }
        if (find(nodes.begin(), nodes.end(), v) == nodes.end()) {
            nodes.push_back(v);
        }
    }
    
    unordered_map<string, int> distances;
    for (const string& node : nodes) {
        distances[node] = INT_MAX;
    }
    distances[start] = 0;
    
    priority_queue<pair<int, string>, vector<pair<int, string>>, greater<pair<int, string>>> pq;
    pq.push({0, start});
    
    while (!pq.empty()) {
        int dist = pq.top().first;
        string node = pq.top().second;
        pq.pop();
        
        if (dist > distances[node]) continue;
        
        for (auto& edge : graph[node]) {
            string neighbor = edge.first;
            int weight = edge.second;
            int newDist = dist + weight;
            
            if (newDist < distances[neighbor]) {
                distances[neighbor] = newDist;
                pq.push({newDist, neighbor});
            }
        }
    }
    
    for (const string& node : nodes) {
        cout << node << ":" << (distances[node] == INT_MAX ? -1 : distances[node]);
        if (node != nodes.back()) cout << " ";
    }
    cout << endl;
    return 0;
}`
    },

    "Machine Learning Model by Pushpita": {
        cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n, k;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) {
        cin >> nums[i];
    }
    cin >> k;
    
    sort(nums.begin(), nums.end(), greater<int>());
    
    cout << nums[k - 1] << endl;
    return 0;
}`
    },

    "Noman's Tricky Trapping Rain Water": {
        cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> height(n);
    for (int i = 0; i < n; i++) {
        cin >> height[i];
    }
    
    if (n == 0) {
        cout << 0 << endl;
        return 0;
    }
    
    int left = 0, right = n - 1;
    int leftMax = 0, rightMax = 0;
    int water = 0;
    
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                water += rightMax - height[right];
            }
            right--;
        }
    }
    
    cout << water << endl;
    return 0;
}`
    },

    "Pushpita's Largest Number Formation": {
        cpp: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

bool compare(int a, int b) {
    string s1 = to_string(a) + to_string(b);
    string s2 = to_string(b) + to_string(a);
    return s1 > s2;
}

int main() {
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) {
        cin >> nums[i];
    }
    
    sort(nums.begin(), nums.end(), compare);
    
    if (nums[0] == 0) {
        cout << "0" << endl;
        return 0;
    }
    
    for (int num : nums) {
        cout << num;
    }
    cout << endl;
    return 0;
}`
    },

    "Noman's GCD Sum Challenge": {
        cpp: `#include <bits/stdc++.h>
using namespace std;

long long phi(long long n) {
    long long result = n;
    for (long long i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            while (n % i == 0) n /= i;
            result -= result / i;
        }
    }
    if (n > 1) result -= result / n;
    return result;
}

vector<long long> get_divisors(long long n) {
    vector<long long> divisors;
    for (long long i = 1; i * i <= n; i++) {
        if (n % i == 0) {
            divisors.push_back(i);
            if (i != n / i) divisors.push_back(n / i);
        }
    }
    sort(divisors.begin(), divisors.end());
    return divisors;
}

int main() {
    long long n;
    cin >> n;
    
    vector<long long> divisors = get_divisors(n);
    long long sum = 0;
    
    for (long long d : divisors) {
        sum += d * phi(n / d);
    }
    
    cout << sum << endl;
    return 0;
}`,
        java: `import java.util.*;

public class Main {
    static long phi(long n) {
        long result = n;
        for (long i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                while (n % i == 0) n /= i;
                result -= result / i;
            }
        }
        if (n > 1) result -= result / n;
        return result;
    }

    static List<Long> getDivisors(long n) {
        List<Long> divisors = new ArrayList<>();
        for (long i = 1; i * i <= n; i++) {
            if (n % i == 0) {
                divisors.add(i);
                if (i != n / i) divisors.add(n / i);
            }
        }
        Collections.sort(divisors);
        return divisors;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long n = sc.nextLong();
        
        List<Long> divisors = getDivisors(n);
        long sum = 0;
        
        for (long d : divisors) {
            sum += d * phi(n / d);
        }
        
        System.out.println(sum);
    }
}`,
        python: `def phi(n):
    result = n
    i = 2
    while i * i <= n:
        if n % i == 0:
            while n % i == 0:
                n //= i
            result -= result // i
        i += 1
    if n > 1:
        result -= result // n
    return result

def get_divisors(n):
    divisors = []
    i = 1
    while i * i <= n:
        if n % i == 0:
            divisors.append(i)
            if i != n // i:
                divisors.append(n // i)
        i += 1
    divisors.sort()
    return divisors

n = int(input())
divisors = get_divisors(n)
total_sum = 0

for d in divisors:
    total_sum += d * phi(n // d)

print(total_sum)`,
        javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim();
const n = parseInt(input);

function phi(num) {
    let result = num;
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) {
            while (num % i === 0) num /= i;
            result -= Math.floor(result / i);
        }
    }
    if (num > 1) result -= Math.floor(result / num);
    return result;
}

function getDivisors(num) {
    const divisors = [];
    for (let i = 1; i * i <= num; i++) {
        if (num % i === 0) {
            divisors.push(i);
            if (i !== Math.floor(num / i)) divisors.push(Math.floor(num / i));
        }
    }
    divisors.sort((a, b) => a - b);
    return divisors;
}

const divisors = getDivisors(n);
let sum = 0;

for (const d of divisors) {
    sum += d * phi(Math.floor(n / d));
}

console.log(sum);`
    }
};

module.exports = solutions;
