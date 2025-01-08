import { tween, Vec3, Node } from "cc";

export class Util{
    static clickDownTween(node:Node|null, callback?:Function,args?:any){
        if(!node) return;
        tween(node).to(0.1, {scale:new Vec3(0.9,0.9,0.9)}).call(callback?.(args)).start();
    }

    static clickUpTween(node:Node|null, callback?:Function, args?:any){
        if(!node) return;
        tween(node).to(0.1, {scale:new Vec3(1,1,1)}).call(callback?.(args)).start();
    }
}