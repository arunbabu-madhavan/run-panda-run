export function createAnimation(frames,frameLen)
{
    return function resolveFrame(distance){
        const frameIndex = (distance/frameLen) % frames.length | 0;
        const frameName = frames[frameIndex];
        return frameName;
    }
}