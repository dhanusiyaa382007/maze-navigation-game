const DX={1:0,2:1,4:0,8:-1},DY={1:-1,2:0,4:1,8:0},DIRS=[1,2,4,8];
function nbrs(L,x,y){const c=L.cells[y*L.w+x];return DIRS.filter(b=>c&b).map(b=>[x+DX[b],y+DY[b]]);}
function drawMaze(cv,L,o={}){
  const s=Math.floor(600/L.w);cv.width=cv.height=s*L.w;const g=cv.getContext('2d');
  g.clearRect(0,0,cv.width,cv.height);
  const fill=(x,y,c)=>{g.fillStyle=c;g.fillRect(x*s+1,y*s+1,s-1,s-1)};
  if(o.visited)o.visited.forEach(k=>fill(k%L.w,Math.floor(k/L.w),'#1e3a5f'));
  if(o.front)o.front.forEach(k=>fill(k%L.w,Math.floor(k/L.w),'#b45309'));
  if(o.path)o.path.forEach(([x,y])=>fill(x,y,'#166534'));
  fill(0,0,'#2563eb');fill(L.w-1,L.h-1,'#16a34a');
  if(o.player){g.fillStyle='#facc15';g.beginPath();g.arc(o.player[0]*s+s/2,o.player[1]*s+s/2,s/3,0,7);g.fill();}
  g.strokeStyle='#e2e8f0';g.lineWidth=2;g.beginPath();
  for(let y=0;y<L.h;y++)for(let x=0;x<L.w;x++){const c=L.cells[y*L.w+x];
    if(!(c&1)){g.moveTo(x*s,y*s);g.lineTo(x*s+s,y*s)}
    if(!(c&2)){g.moveTo(x*s+s,y*s);g.lineTo(x*s+s,y*s+s)}
    if(!(c&4)){g.moveTo(x*s,y*s+s);g.lineTo(x*s+s,y*s+s)}
    if(!(c&8)){g.moveTo(x*s,y*s);g.lineTo(x*s,y*s+s)}}
  g.stroke();
}
/* BFS from (sx,sy) to goal; returns path array [[x,y]...] */
function bfsPath(L,sx,sy){const par=new Map([[sy*L.w+sx,-1]]),q=[[sx,sy]];
  while(q.length){const [x,y]=q.shift();if(x==L.w-1&&y==L.h-1)break;
    for(const [nx,ny] of nbrs(L,x,y)){const k=ny*L.w+nx;if(!par.has(k)){par.set(k,y*L.w+x);q.push([nx,ny]);}}}
  const p=[];for(let k=L.w*L.h-1;k!=-1&&par.has(k);k=par.get(k))p.unshift([k%L.w,Math.floor(k/L.w)]);return p;}
/* Step-by-step search generator: 'bfs' uses a queue, 'dfs' uses a stack */
function* search(L,type){const seen=new Set([0]),par=new Map([[0,-1]]),ds=[0];
  while(ds.length){const k=type=='bfs'?ds.shift():ds.pop();
    if(k==L.w*L.h-1){const p=[];for(let c=k;c!=-1;c=par.get(c))p.unshift([c%L.w,Math.floor(c/L.w)]);yield{seen,front:ds,path:p,done:true};return;}
    for(const [nx,ny] of nbrs(L,k%L.w,Math.floor(k/L.w))){const n=ny*L.w+nx;if(!seen.has(n)){seen.add(n);par.set(n,k);ds.push(n);}}
    yield{seen,front:ds,done:false};}}
