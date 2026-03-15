import fs from 'fs'
import path from 'path'

const logger = (req, res, next) => {
  const log = `[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}\n`
  
  console.log(log.trim())
  
//   fs.appendFile(path.join('logs.txt'), log, (err) => {
//     if (err) console.error('Error WRITTING  log:', err)
//   })
  
  next()
}

export default logger
