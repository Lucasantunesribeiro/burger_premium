import json, numpy as np
from PIL import Image
names=['pao-cima','queijo','carne-1','carne-2','cebola','picles','alface','pao-baixo']
W,H=1536,2720
out='/workspace/modelos/burger_premium_claude/public/montagem'
import os; os.makedirs(out,exist_ok=True)
boxes={}
for n in names:
    im=Image.open(f'layers/{n}.png').convert('RGBA'); a=np.array(im).astype(np.float32)
    # locate box in frame coords from slice log
    boxes[n]=None
log=open('slice.log').read().split('\n')
for line in log:
    p=line.split()
    if len(p)>=5 and p[0] in names: boxes[p[0]]=list(map(int,p[1:5]))
meta={}
for n in names:
    x0,y0,x1,y1=boxes[n]
    im=Image.open(f'layers/{n}.png').convert('RGBA'); a=np.array(im).astype(np.float32)
    xs=(np.arange(x0,x1)/W)[None,:]
    t=np.clip((xs-0.18)/(0.92-0.18),0,1); t=t*t*(3-2*t)
    k=1.12-0.52*t
    a[:,:,0]*=k*(1.04-0.04*t); a[:,:,1]*=k; a[:,:,2]*=k*(0.9+0.1*t)
    # gentle contrast lift
    a[:,:,:3]=np.clip(a[:,:,:3],0,255)
    img=Image.fromarray(a.astype(np.uint8),'RGBA')
    img.save(f'{out}/{n}.webp',quality=84,method=6)
    meta[n]={'x':x0,'y':y0,'w':x1-x0,'h':y1-y0}
json.dump({'frame':[W,H],'layers':meta},open(f'{out}/../../src/components/site/montagem-layers.json','w'),indent=1)
print(meta)
