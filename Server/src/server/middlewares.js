
import jwt from 'jsonwebtoken'

async function decodeToken(token) {
  const arr = token.split(' ');

  try {
    if (arr[0] === 'ut') {
      return jwt.verify(arr[1], 'SECRET');
    }
  
    throw new Error('Please Re-Sign In')
  } catch (error) { 
    console.log(error)
    throw error
  }
}

async function auth(req,res,next) {
  try {
    const token = req.headers.auth;

    if (token != null) {
      const user = await decodeToken(token);
      req.user = user;
      return next()
    } 

  } catch (error) {

  }
  req.user = null;
  return next()
}




export default app => {
  app.use(auth)
  // app.use((req, res, next) => {
  //   // console.log('req.user : ', req.user)
  //   next()
  // })
}