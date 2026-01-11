class Solution {    
    public int maxAreaOfIsland(int[][] grid) {
        int ans = 0;
        for (int row = 0; row < grid.length; row++) {
            for (int col = 0; col < grid[0].length; col++) {
                if (grid[row][col] == 1) {
                    ans = Math.max(ans, dfs(row, col, grid));
                }
            }
        }
        return ans;
    }

    private int dfs(int row, int col, int[][] grid) {
        if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || grid[row][col] == 0) {
            return 0;
        }
        grid[row][col] = 0; // Mark as visited
        return 1 + dfs(row - 1, col, grid) 
                 + dfs(row + 1, col, grid) 
                 + dfs(row, col - 1, grid) 
                 + dfs(row, col + 1, grid);
    }

    public static void main(String[] args) {
        int[][] grid = {
            {0,0,1,0,0,0,0,1,0,0,0,0,0},
            {0,0,0,0,0,0,0,1,1,1,0,0,0},
            {0,1,1,0,1,0,0,0,0,0,0,0,0},
            {0,1,0,0,1,1,0,0,1,0,1,0,0},
            {0,1,0,0,1,1,0,0,1,1,1,0,0},
            {0,0,0,0,0,0,0,0,0,0,1,0,0},
            {0,0,0,0,0,0,0,1,1,1,0,0,0},
            {0,0,0,0,0,0,0,1,1,0,0,0,0}
        };

        Solution solution = new Solution();
        System.out.println("Max Area: " + solution.maxAreaOfIsland(grid));
    }
}
