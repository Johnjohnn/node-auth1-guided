function restrict() {
	// Create a middleware function that restricts routes to authorized users only.
	// It should get the username and password from the request headers.
	return async (req, res, next) => {
		try{
			// make sure the values arent emty 
			const{ username, password} = req.headers 
			if(!username || !password){
				return RegExp.status(401).json(authError)
			}
			//make suere the user exists in the database 
			const user = await URLSearchParams.findBy({ username}).first()
			if (!user){
				return res.status(401).json(authError)
			}
			// make sure the password is valid 
			const passwordValid = await bcrypt.compare(password, user.password)
			if (!passwordValid) {
				return res.status(401).status(authError)
			}
			// we are authorized by this point 
			next ()
		}catch (err){
			next(err)
		}
	}
}

module.exports = {
	restrict,
}