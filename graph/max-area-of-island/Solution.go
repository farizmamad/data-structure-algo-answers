package main

import (
	"fmt"
)

type Point struct {
	r, c int
}

func maxAreaOfIslandRecursive(grid [][]int) int {
	if len(grid) == 0 {
		return 0
	}

	rows := len(grid)
	cols := len(grid[0])
	maxArea := 0

	// Define DFS as a local variable to allow recursion
	var dfs func(r, c int) int
	dfs = func(r, c int) int {
		// Base case: check boundaries and if cell is water
		if r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] == 0 {
			return 0
		}

		// Mark as visited (sink the island)
		grid[r][c] = 0

		// Sum 1 + all 4 directions
		return 1 + dfs(r-1, c) + dfs(r+1, c) + dfs(r, c-1) + dfs(r, c+1)
	}

	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if grid[r][c] == 1 {
				area := dfs(r, c)
				if area > maxArea {
					maxArea = area
				}
			}
		}
	}

	return maxArea
}

func maxAreaOfIslandIterative(grid [][]int) int {
	if len(grid) == 0 {
		return 0
	}

	rows := len(grid)
	cols := len(grid[0])
	maxArea := 0

	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if grid[r][c] == 1 {
				currentArea := 0
				// Initialize stack with the first land point
				stack := []Point{{r, c}}
				grid[r][c] = 0 // Mark visited immediately

				for len(stack) > 0 {
					// Pop from stack
					curr := stack[len(stack)-1]
					stack = stack[:len(stack)-1]
					currentArea++

					// Directions: Up, Down, Left, Right
					dirs := []Point{{curr.r - 1, curr.c}, {curr.r + 1, curr.c}, {curr.r, curr.c - 1}, {curr.r, curr.c + 1}}

					for _, d := range dirs {
						if d.r >= 0 && d.r < rows && d.c >= 0 && d.c < cols && grid[d.r][d.c] == 1 {
							grid[d.r][d.c] = 0 // Sink land before pushing to prevent duplicates
							stack = append(stack, d)
						}
					}
				}

				if currentArea > maxArea {
					maxArea = currentArea
				}
			}
		}
	}
	return maxArea
}

func main() {
	grid := [][]int{
		{0,0,1,0,0,0,0,1,0,0,0,0,0},
		{0,0,0,0,0,0,0,1,1,1,0,0,0},
		{0,1,1,0,1,0,0,0,0,0,0,0,0},
		{0,1,0,0,1,1,0,0,1,0,1,0,0},
		{0,1,0,0,1,1,0,0,1,1,1,0,0},
		{0,0,0,0,0,0,0,0,0,0,1,0,0},
		{0,0,0,0,0,0,0,1,1,1,0,0,0},
		{0,0,0,0,0,0,0,1,1,0,0,0,0},
	}

	fmt.Printf("Max Area: %d\n", maxAreaOfIslandRecursive(grid))
	// fmt.Printf("Max Area: %d\n", maxAreaOfIslandIterative(grid))
}
