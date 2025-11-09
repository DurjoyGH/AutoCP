const testcases = {
    "Noman's First Array": [
        { input: [[1, 2, 3, 4, 5]], output: 15 },
        { input: [[10, 20, 30]], output: 60 },
        { input: [[-1, 0, 1]], output: 0 }
    ],
    "Pushpita's String Reversal": [
        { input: ["hello"], output: "olleh" },
        { input: ["world"], output: "dlrow" },
        { input: ["Jashore"], output: "erohsaJ" }
    ],
    "Tahmid's Two Sum Problem": [
        { input: [[2, 7, 11, 15], 9], output: [0, 1] },
        { input: [[3, 2, 4], 6], output: [1, 2] },
        { input: [[3, 3], 6], output: [0, 1] }
    ],
    "Durjoy's Bubble Sort Challenge": [
        { input: [[64, 34, 25, 12, 22, 11, 90]], output: [11, 12, 22, 25, 34, 64, 90] },
        { input: [[5, 1, 4, 2, 8]], output: [1, 2, 4, 5, 8] }
    ],
    "Tahmid's Binary Search Challenge": [
        { input: [[1, 2, 3, 4, 5, 6], 4], output: 3 },
        { input: [[10, 20, 30, 40, 50], 10], output: 0 },
        { input: [[5, 15, 25, 35], 30], output: -1 }
    ],
    "Noman's Palindrome Quest": [
        { input: ["madam"], output: true },
        { input: ["level"], output: true },
        { input: ["hello"], output: false }
    ],
    "Pushpita's Coin Change": [
        { input: [[1, 2, 5], 11], output: 3 },
        { input: [[2], 3], output: -1 },
        { input: [[1], 0], output: 0 }
    ],
    "Tahmid's Merge Sort Implementation": [
        { input: [[12, 11, 13, 5, 6, 7]], output: [5, 6, 7, 11, 12, 13] },
        { input: [[38, 27, 43, 3, 9, 82, 10]], output: [3, 9, 10, 27, 38, 43, 82] }
    ],
    "Durjoy's Dijkstra Algorithm": [
        {
            input: [{
                A: { B: 1, C: 4 },
                B: { A: 1, C: 2, D: 5 },
                C: { A: 4, B: 2, D: 1 },
                D: { B: 5, C: 1 }
            }, "A"],
            output: { A: 0, B: 1, C: 3, D: 4 }
        }
    ],
    "Machine Learning Model by Pushpita": [
        { input: [[3, 2, 1, 5, 6, 4], 2], output: 5 },
        { input: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], output: 4 }
    ],
    "Noman's Tricky Trapping Rain Water": [
        { input: [[0,1,0,2,1,0,1,3,2,1,2,1]], output: 6 },
        { input: [[4,2,0,3,2,5]], output: 9 }
    ],
    "Pushpita's Largest Number Formation": [
        { input: [[10, 2]], output: "210" },
        { input: [[3, 30, 34, 5, 9]], output: "9534330" },
        { input: [[50, 2, 1, 9]], output: "95021" }
    ]
};

module.exports = testcases;
