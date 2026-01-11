class Solution:
    def maxAreaOfIsland(self, grid: list[list[int]]) -> int:
        if not grid:
            return 0
        
        rows, cols = len(grid), len(grid[0])
        
        def dfs(r, c):
            # Base case: check boundaries and if the cell is water (0)
            if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == 0:
                return 0
            
            # Mark the cell as visited by "sinking" the island
            grid[r][c] = 0
            
            # Sum the current cell (1) + all four directions
            return (1 + dfs(r - 1, c) + 
                        dfs(r + 1, c) + 
                        dfs(r, c - 1) + 
                        dfs(r, c + 1))
        
        max_area = 0
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == 1:
                    max_area = max(max_area, dfs(r, c))
                    
        return max_area

# Example usage:
grid = [
  [0,0,1,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,1,1,0,1,0,0,0,0,0,0,0,0],
  [0,1,0,0,1,1,0,0,1,0,1,0,0],
  [0,1,0,0,1,1,0,0,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,1,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,1,1,0,0,0,0]
]

sol = Solution()
print(f"Max Area: {sol.maxAreaOfIsland(grid)}")
