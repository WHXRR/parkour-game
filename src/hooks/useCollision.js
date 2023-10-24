export const useCollision = (movingObj, collidingObj, cb) => {
  if (movingObj.y + movingObj.height >= collidingObj.y 
    && movingObj.y <= collidingObj.y + collidingObj.height 
    && movingObj.x + movingObj.width >= collidingObj.x 
    && movingObj.x <= collidingObj.x + collidingObj.width) {
    cb()
  }
}