const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const usersRouter = require("./users/users-router")
const usersRouter = require("express-session")                  // import express session here 

const server = express()
const port = process.env.PORT || 5000

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(session({
	resave: false, // avoid creating sessions that have not changed 
	saveUninitalized: false, // GDPR laws againts setting cookies automaticall 
	secret: " kee it secret, keep it safe", // cryptogrphycally sign the cookie 
}
))                                           // this is where you call session 

server.use(usersRouter)

server.use((err, req, res, next) => {
	console.log(err)
	
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})
