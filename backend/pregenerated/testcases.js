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
    ],

    "Noman's GCD Sum Challenge": [
        // Basic cases - small N
        { input: [1], output: 1 },
        { input: [2], output: 3 },
        { input: [3], output: 5 },
        { input: [4], output: 8 },
        { input: [5], output: 9 },
        { input: [6], output: 15 },
        { input: [7], output: 13 },
        { input: [8], output: 20 },
        { input: [9], output: 21 },
        { input: [10], output: 27 },
        
        // Edge cases - primes and special numbers
        { input: [11], output: 21 },
        { input: [13], output: 25 },
        { input: [17], output: 33 },
        { input: [19], output: 37 },
        { input: [23], output: 45 },
        { input: [29], output: 57 },
        { input: [31], output: 61 },
        
        // Numbers with many divisors
        { input: [12], output: 40 },
        { input: [15], output: 45 },
        { input: [16], output: 48 },
        { input: [18], output: 63 },
        { input: [20], output: 72 },
        { input: [24], output: 100 },
        { input: [25], output: 65 },
        { input: [30], output: 135 },
        { input: [36], output: 168 },
        { input: [42], output: 195 },
        
        // Large cases
        { input: [60], output: 360 },
        { input: [72], output: 420 },
        { input: [84], output: 520 },
        { input: [96], output: 560 },
        { input: [100], output: 520 },
        { input: [120], output: 900 },
        { input: [144], output: 1008 },
        { input: [168], output: 1300 },
        { input: [180], output: 1512 },
        { input: [210], output: 1755 },
        
        // Very large cases for comprehensive testing
        { input: [240], output: 2160 },
        { input: [252], output: 2184 },
        { input: [270], output: 2187 },
        { input: [300], output: 2600 },
        { input: [336], output: 3120 },
        { input: [360], output: 3780 },
        { input: [420], output: 4680 },
        { input: [480], output: 5040 },
        { input: [504], output: 5460 },
        { input: [540], output: 5832 },
        { input: [600], output: 6500 },
        { input: [720], output: 9072 },
        { input: [840], output: 11700 }
    ]
};

module.exports = testcases;
