# Maze Navigation Game (Data Structures in C)
## Run in VS Code
1. Open the `maze-project` folder in VS Code (needs gcc).
2. Terminal > Run Task > "Export levels to website" (or `cd c && make levels`).
   Try the terminal version: `cd c && ./maze ascii 10 8 5`
3. Open `web/index.html` with the Live Server extension (or just double-click it).
## Structure
- c/maze.c : stack, linked-list queue, DFS generation, BFS/DFS solvers, level export
- web/ : index, play, solver, scores, about pages + style.css, common.js, levels.js (generated)
## Play in the terminal
```
cd c
gcc maze.c -o maze
./maze play 8        # 8x8 maze  (Windows: maze.exe play 8)
```
Keys: w/a/s/d move, u undo (stack), h hint (BFS), q quit.
