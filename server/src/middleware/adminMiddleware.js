 const restrictToAdmin = (req, res, next) => {
    
    if (req.user && req.user.role === 'admin') {
        next(); 
    } else {
      
        return res.status(403).json({ 
            message: 'Access denied. Admins only.' 
        });
    }
};

export default restrictToAdmin
