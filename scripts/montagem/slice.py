import sys, numpy as np, colorsys
from PIL import Image
from scipy import ndimage as ndi
src, out = sys.argv[1], sys.argv[2]
im = np.array(Image.open(src).convert('RGBA')).astype(np.float32)
A = im[:,:,3]; rgb = im[:,:,:3]/255
mask = A > 10
lab, n = ndi.label(ndi.binary_dilation(mask, iterations=2))
lab = lab * mask
# hsv per pixel
mx = rgb.max(2); mn = rgb.min(2); sat = np.where(mx>0,(mx-mn)/np.maximum(mx,1e-6),0)
r,g,b = rgb[:,:,0],rgb[:,:,1],rgb[:,:,2]
H,W = A.shape
yy = np.arange(H)[:,None].repeat(W,1)
names = ['pao-cima','queijo','carne-1','carne-2','cebola','picles','alface','pao-baixo']
bands = {'pao-cima':(0,532),'queijo':(532,807),'carne-1':(807,1114),'carne-2':(1114,1440)}
layers = {k: np.zeros((H,W),bool) for k in names}
for k,(a,b_) in bands.items():
    layers[k] = mask & (yy>=a) & (yy<b_)
low = mask & (yy>=1440)
def big(m, minsz):
    l,n=ndi.label(m); sz=ndi.sum(m,l,range(1,n+1))
    return np.isin(l,[j+1 for j,s_ in enumerate(sz) if s_>minsz])
green = g > r*1.10
bun = low & (yy>=2230) & ~((g > r*0.98) & (yy<2320))
bun = big(bun, 20000)
let = low & ~bun & (((green) & (yy>1845)) | (yy>1915))
let = big(ndi.binary_opening(let, iterations=1), 5000)
rest = low & ~bun & ~let
onion = rest & (sat < 0.28) & (mx > 0.55)
onion = big(ndi.binary_opening(onion, iterations=2), 3000)
onion = ndi.binary_closing(onion, iterations=3) & rest
def largest(m):
    l,n=ndi.label(m); sz=ndi.sum(m,l,range(1,n+1)); return l==(int(np.argmax(sz))+1)
pick = largest(ndi.binary_opening(rest & ~onion, iterations=2)) & rest & ~onion
bun = largest(bun)
let = big(let | (low & ~bun & ~pick & ~onion & (yy>2100) & (g > r*0.98)), 400)
layers['pao-baixo']=bun; layers['alface']=let; layers['cebola']=onion; layers['picles']=pick
for k in names:
    m = layers[k]
    ys, xs = np.where(m)
    y0,y1,x0,x1 = ys.min(), ys.max()+1, xs.min(), xs.max()+1
    pad=6; y0=max(0,y0-pad); x0=max(0,x0-pad); y1=min(H,y1+pad); x1=min(W,x1+pad)
    o = im.copy(); o[:,:,3] = np.where(m, A, 0)
    Image.fromarray(o[y0:y1,x0:x1].astype(np.uint8)).save(f'{out}/{k}.png')
    print(k, x0,y0,x1,y1, 'cx', (x0+x1)/2)
