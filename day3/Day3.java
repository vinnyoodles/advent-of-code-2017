public class Day3 {
    public static void main(String[] args) {
        part1();
        part2();
    }

    public static void part1() {
        final int DOWN = 2;
        final int RIGHT = 3;
        final int LEFT = 4;
        final int UP = 5;
        int length = 600;
        int[][] grid = new int[length][length];
        int row = 300;
        int col = 300;
        int start = 1;
        int input = 289326;
        int dir = DOWN;
        grid[row][col] = 1;
        grid[row][col + 1] = 2;
        grid[row - 1][col + 1] = 3;
        grid[row - 1][col] = 4;
        grid[row - 1][col - 1] = 5;
        grid[row][col - 1] = 6;
        grid[row + 1][col - 1] = 7;
        grid[row + 1][col] = 8;
        grid[row + 1][col + 1] = 9;

        row ++;
        col += 2;
        start = 10;
        dir = UP;

        int x = 0, y = 0;

        while (start <= input) {
            if (dir == DOWN) {
                while (grid[row][col + 1] != 0) {
                    grid[row][col] = start;
                    if (start == input) {
                        x = row;
                        y = col;
                    }
                    start ++;
                    row ++;
                }
                dir = RIGHT;
            } else if (dir == RIGHT) {
                while (grid[row - 1][col] != 0) {
                    grid[row][col] = start;
                    if (start == input) {
                        x = row;
                        y = col;
                    }
                    
                    start ++;
                    col ++;
                }
                dir = UP;
            } else if (dir == UP) {
                while (grid[row][col - 1] != 0) {
                    grid[row][col] = start;
                    if (start == input) {
                        x = row;
                        y = col;
                    }
                    start ++;
                    row --;
                }
                dir = LEFT;
            } else if (dir == LEFT) {
                while (grid[row + 1][col] != 0) {
                    grid[row][col] = start;
                    if (start == input) {
                        x = row;
                        y = col;
                    }
                    start ++;
                    col --;
                }
                dir = DOWN;
            }
        }

        System.out.println(x + ", " + y);
    }

    public static void part2() {
        final long DOWN = 2;
        final long RIGHT = 3;
        final long LEFT = 4;
        final long UP = 5;
        int length = 600;
        long[][] grid = new long[length][length];
        int row = 300;
        int col = 300;
        long dir = DOWN;
        long input = 289326;
        grid[row][col] = 1;
        col ++;
        long start = 2;
        dir = UP;

        while (start <= input) {
            if (dir == DOWN) {
                while (grid[row][col + 1] != 0) {
                    grid[row][col] = neighbors(grid, row, col);
                    if (grid[row][col] > input) {
                        System.out.println(grid[row][col]);
                        return;
                    }
                    row ++;
                }
                dir = RIGHT;
            } else if (dir == RIGHT) {
                while (grid[row - 1][col] != 0) {
                    grid[row][col] = neighbors(grid, row, col);
                    if (grid[row][col] > input) {
                        System.out.println(grid[row][col]);
                        return;
                    }
                    col ++;
                }
                dir = UP;
            } else if (dir == UP) {
                while (grid[row][col - 1] != 0) {
                    grid[row][col] = neighbors(grid, row, col);
                    if (grid[row][col] > input) {
                        System.out.println(grid[row][col]);
                        return;
                    }
                    row --;
                }
                dir = LEFT;
            } else if (dir == LEFT) {
                while (grid[row + 1][col] != 0) {
                    grid[row][col] = neighbors(grid, row, col);
                    if (grid[row][col] > input) {
                        System.out.println(grid[row][col]);
                        return;
                    }
                    col --;
                }
                dir = DOWN;
            }
        }
    }

    public static long neighbors(long[][] arr, int i, int j) {
        long sum = 0;
        for (int a = -1; a <= 1; a ++) {
            if (a + i < 0 || a + i >= arr.length) 
                continue;
            for (int b = -1; b <= 1; b ++) {
                if (b + j < 0 || b + j >= arr[0].length) 
                    continue;

                if (arr[i + a][j + b] <= 0)
                    continue;

                sum += arr[i + a][j + b];
            }
        }

        return sum;
    }
}