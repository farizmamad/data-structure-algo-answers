class Solution {
    maxAreaOfIslandRecursive(grid) {
        if (!grid || grid.length === 0) return 0;

        const rows = grid.length;
        const cols = grid[0].length;

        /**
         * Helper function for Depth First Search
         */
        const dfs = (r, c) => {
            // Base case: check boundaries and if the cell is water (0)
            if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === 0) {
                return 0;
            }

            // Mark the cell as visited by "sinking" the island
            grid[r][c] = 0;

            // Sum the current cell (1) + all four directions
            return (
                1 +
                dfs(r - 1, c) +
                dfs(r + 1, c) +
                dfs(r, c - 1) +
                dfs(r, c + 1)
            );
        };

        let maxArea = 0;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (grid[r][c] === 1) {
                    maxArea = Math.max(maxArea, dfs(r, c));
                }
            }
        }

        return maxArea;
    }

  maxAreaOfIslandIterative(grid) {
        if (!grid || grid.length === 0) return 0;

        const rows = grid.length;
        const cols = grid[0].length;
        let maxArea = 0;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                // When we find land, start an iterative search
                if (grid[r][c] === 1) {
                    let currentArea = 0;
                    let stack = [[r, c]];
                    grid[r][c] = 0; // Mark as visited immediately

                    while (stack.length > 0) {
                        const [currR, currC] = stack.pop();
                        currentArea++;

                        // Define directions: Up, Down, Left, Right
                        const directions = [
                            [currR - 1, currC],
                            [currR + 1, currC],
                            [currR, currC - 1],
                            [currR, currC + 1]
                        ];

                        for (const [nr, nc] of directions) {
                            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
                                stack.push([nr, nc]);
                                grid[nr][nc] = 0; // "Sink" the land here to prevent duplicate stack entries
                            }
                        }
                    }
                    maxArea = Math.max(maxArea, currentArea);
                }
            }
        }

        return maxArea;
    }
}

// Example usage:
const grid = [
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
];

const sol = new Solution();
console.log(`Max Area (Recursive): ${sol.maxAreaOfIslandRecursive(grid)}`);
// console.log(`Max Area (Iterative): ${sol.maxAreaOfIslandIterative(grid)}`);
