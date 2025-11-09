const problems = {
    easy: [
        {
            title: "Noman's First Array",
            description: "Noman, a bright and curious student at Jashore University of Science and Technology, is just beginning his journey into the world of computer science. His friend Tahmid, already a proficient programmer, has given him a foundational problem to build his confidence. The task is to calculate the sum of all elements in a given array of integers. This fundamental exercise will help Noman understand basic array traversal and manipulation, a cornerstone of many complex algorithms he will encounter in his future studies.",
            difficulty: "Easy",
            tags: ["array", "sum", "easy"],
            examples: [
                { input: "[1, 2, 3, 4, 5]", output: "15", explanation: "The sum of the array is 1 + 2 + 3 + 4 + 5 = 15." },
                { input: "[10, -5, 10]", output: "15", explanation: "The sum of the array is 10 - 5 + 10 = 15." }
            ],
            constraints: "1 <= arr.length <= 1000\n-1000 <= arr[i] <= 1000",
            timeComplexity: "O(n)",
            spaceComplexity: "O(1)"
        },
        {
            title: "Pushpita's String Reversal",
            description: "Pushpita, a computer science enthusiast with a keen interest in machine learning, is currently diving deep into string manipulation techniques. Her senior, Durjoy, known for his challenging problems, has tasked her with a classic: reversing a string. This exercise, while seemingly simple, is crucial for understanding how strings are stored and manipulated in memory. A solid grasp of this concept is vital for processing textual data in machine learning applications.",
            difficulty: "Easy",
            tags: ["string", "reversal", "easy"],
            examples: [
                { input: "hello", output: "olleh", explanation: "The reversed string of 'hello' is 'olleh'." },
                { input: "JUST", output: "TSUJ", explanation: "The reversed string of 'JUST' is 'TSUJ'." }
            ],
            constraints: "1 <= str.length <= 1000",
            timeComplexity: "O(n)",
            spaceComplexity: "O(n)"
        },
        {
            title: "Tahmid's Two Sum Problem",
            description: "Tahmid, a sharp and analytical student from JUST, was given an intriguing problem by his friend Durjoy. Given an array of integers and a specific target sum, the challenge is to find two numbers in the array that add up to this target. This problem is a favorite in technical interviews as it tests a candidate's ability to think about time complexity and data structures. A naive approach is simple, but an optimized solution using a hash map is what separates a good programmer from a great one.",
            difficulty: "Easy",
            tags: ["array", "hash map", "easy"],
            examples: [
                { input: "nums = [2, 7, 11, 15], target = 9", output: "[0, 1]", explanation: "The numbers at index 0 (2) and index 1 (7) add up to 9." },
                { input: "nums = [3, 2, 4], target = 6", output: "[1, 2]", explanation: "The numbers at index 1 (2) and index 2 (4) add up to 6." }
            ],
            constraints: "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9\nOnly one valid answer exists.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(n)"
        },
        {
            title: "Durjoy's Bubble Sort Challenge",
            description: "Durjoy, wanting to help his juniors Noman and Pushpita build a strong foundation in algorithms, has presented them with the Bubble Sort challenge. He explains that while it's not the most efficient sorting algorithm, it's one of the most intuitive. The task is to implement Bubble Sort to arrange an array of numbers in ascending order. This exercise is designed to teach them the basics of sorting, nested loops, and in-place element swapping, which are fundamental concepts in computer science.",
            difficulty: "Easy",
            tags: ["sorting", "bubble sort", "easy"],
            examples: [
                { input: "[64, 34, 25, 12, 22, 11, 90]", output: "[11, 12, 22, 25, 34, 64, 90]", explanation: "The array is sorted in ascending order." }
            ],
            constraints: "1 <= arr.length <= 1000\n-1000 <= arr[i] <= 1000",
            timeComplexity: "O(n^2)",
            spaceComplexity: "O(1)"
        }
    ],
    medium: [
        {
            title: "Tahmid's Binary Search Challenge",
            description: "Tahmid and Durjoy are a formidable team in a programming contest at Jashore University of Science and Technology. They've encountered a problem that requires them to search for an element in a large, sorted array under tight time constraints. A linear scan would be too slow. Tahmid immediately recognizes that binary search is the perfect tool for this job. The challenge is to implement a flawless binary search algorithm, which will significantly cut down the search time and help them clinch a victory.",
            difficulty: "Medium",
            tags: ["binary search", "array", "medium"],
            examples: [
                { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4", explanation: "The target 9 is found at index 4." },
                { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1", explanation: "The target 2 is not in the array, so we return -1." }
            ],
            constraints: "1 <= nums.length <= 10^4\n-10^4 < nums[i], target < 10^4\nAll the integers in nums are unique.\nnums is sorted in ascending order.",
            timeComplexity: "O(log n)",
            spaceComplexity: "O(1)"
        },
        {
            title: "Noman's Palindrome Quest",
            description: "Noman has developed a fascination for palindromic strings—strings that read the same forwards and backward. He wants to write an efficient function to determine if a given string is a palindrome. His friend Pushpita, who is studying machine learning, suggests a two-pointer approach that would be much more efficient than some of the more obvious, but slower, methods. This problem tests understanding of string manipulation and algorithmic efficiency.",
            difficulty: "Medium",
            tags: ["string", "palindrome", "medium"],
            examples: [
                { input: "A man, a plan, a canal: Panama", output: "true", explanation: "After removing non-alphanumeric characters and converting to lowercase, the string is 'amanaplanacanalpanama', which is a palindrome." },
                { input: "race a car", output: "false", explanation: "After processing, the string is 'raceacar', which is not a palindrome." }
            ],
            constraints: "1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(1)"
        },
        {
            title: "Pushpita's Coin Change",
            description: "Pushpita is tackling a complex optimization problem for her machine learning project, which surprisingly reduces to a classic dynamic programming challenge: the coin change problem. Given a set of coin denominations and a total amount, the goal is to find the minimum number of coins required to make up that amount. Noman and Tahmid are amazed at how a real-world machine learning problem can be modeled by this classic computer science puzzle.",
            difficulty: "Medium",
            tags: ["dynamic programming", "array", "medium"],
            examples: [
                { input: "coins = [1, 2, 5], amount = 11", output: "3", explanation: "11 = 5 + 5 + 1, which is 3 coins." },
                { input: "coins = [2], amount = 3", output: "-1", explanation: "It's impossible to make 3 with coins of value 2." }
            ],
            constraints: "1 <= coins.length <= 12\n1 <= coins[i] <= 2^31 - 1\n0 <= amount <= 10^4",
            timeComplexity: "O(amount * coins.length)",
            spaceComplexity: "O(amount)"
        },
        {
            title: "Tahmid's Merge Sort Implementation",
            description: "During a data structures and algorithms session at JUST, Tahmid's professor emphasized the importance of efficient sorting algorithms. The professor challenged the class to implement Merge Sort, a powerful divide-and-conquer algorithm. Unlike Bubble Sort, Merge Sort is highly efficient and stable. Tahmid, always up for a challenge, decides to implement it from scratch. This will test his understanding of recursion and the merging of sorted arrays.",
            difficulty: "Medium",
            tags: ["sorting", "merge sort", "recursion", "medium"],
            examples: [
                { input: "[12, 11, 13, 5, 6, 7]", output: "[5, 6, 7, 11, 12, 13]", explanation: "The array is sorted in ascending order using merge sort." }
            ],
            constraints: "1 <= arr.length <= 1000\n-1000 <= arr[i] <= 1000",
            timeComplexity: "O(n log n)",
            spaceComplexity: "O(n)"
        }
    ],
    hard: [
        {
            title: "Durjoy's Dijkstra Algorithm",
            description: "Durjoy, a final year computer science student at Jashore University of Science and Technology, is deeply engrossed in his thesis on graph algorithms. A core part of his research requires finding the shortest path between various nodes in a large, weighted graph representing a network. For this, he needs a robust implementation of Dijkstra's algorithm. This is a non-trivial task that requires a good understanding of graphs, priority queues, and greedy algorithms.",
            difficulty: "Hard",
            tags: ["graph", "dijkstra", "hard"],
            examples: [
                { input: "graph = {A:{B:1,C:4},B:{A:1,C:2,D:5},C:{A:4,B:2,D:1},D:{B:5,C:1}}, start = A", output: "{A:0,B:1,C:3,D:4}", explanation: "The shortest paths from node A to all other nodes." }
            ],
            constraints: "2 <= n <= 100\n1 <= w <= 1000",
            timeComplexity: "O(E log V)",
            spaceComplexity: "O(V)"
        },
        {
            title: "Machine Learning Model by Pushpita",
            description: "Pushpita is in the process of building a sophisticated machine learning model. A crucial preprocessing step involves identifying the k-th largest element in a massive, unsorted dataset. This is a common problem in data analysis and is essential for outlier detection and feature selection. Noman and Tahmid are collaborating with her, exploring efficient algorithms like Quickselect to solve this problem without having to sort the entire dataset.",
            difficulty: "Hard",
            tags: ["array", "sorting", "hard", "machine learning"],
            examples: [
                { input: "nums = [3,2,1,5,6,4], k = 2", output: "5", explanation: "The 2nd largest element is 5." },
                { input: "nums = [3,2,3,1,2,4,5,5,6], k = 4", output: "4", explanation: "The 4th largest element is 4." }
            ],
            constraints: "1 <= k <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
            timeComplexity: "O(n) on average",
            spaceComplexity: "O(1)"
        },
        {
            title: "Noman's Tricky Trapping Rain Water",
            description: "Having built a solid foundation, Noman is now ready for a much tougher challenge, a problem famous for being asked in interviews at top tech companies. His professor at JUST presented him with the 'Trapping Rain Water' problem. Given an elevation map represented by an array of non-negative integers, the task is to compute the total amount of water that can be trapped between the bars after a rainfall. This problem requires clever use of data structures or a two-pointer approach to solve efficiently.",
            difficulty: "Hard",
            tags: ["array", "two pointers", "dynamic programming", "hard"],
            examples: [
                { input: "[0,1,0,2,1,0,1,3,2,1,2,1]", output: "6", explanation: "The total amount of trapped water is 6 units." },
                { input: "[4,2,0,3,2,5]", output: "9", explanation: "The total amount of trapped water is 9 units." }
            ],
            constraints: "n == height.length\n1 <= n <= 2 * 10^4\n0 <= height[i] <= 10^5",
            timeComplexity: "O(n)",
            spaceComplexity: "O(1)"
        },
        {
            title: "Pushpita's Largest Number Formation",
            description: "Pushpita encounters a fascinating problem while working on a feature engineering task for a machine learning model. Given a list of non-negative integers, the goal is to arrange them in such a way that they form the largest possible number. For example, given [50, 2, 1, 9], the largest formed number is 95021. This is a tricky sorting problem that requires a custom comparator to correctly order the numbers. Durjoy and Tahmid are intrigued by this non-standard sorting logic.",
            difficulty: "Hard",
            tags: ["sorting", "custom comparator", "string manipulation", "hard"],
            examples: [
                { input: "[10, 2]", output: "210", explanation: "By arranging the numbers as '2' and '10', we get the largest number 210." },
                { input: "[3, 30, 34, 5, 9]", output: "9534330", explanation: "The arrangement '9', '5', '34', '3', '30' forms the largest number." }
            ],
            constraints: "1 <= nums.length <= 100\n0 <= nums[i] <= 10^9",
            timeComplexity: "O(n log n)",
            spaceComplexity: "O(n)"
        }
    ]
};

module.exports = problems;
