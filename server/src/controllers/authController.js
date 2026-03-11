import jwt from 'jsonwebtoken'
import User from '../models/User.js'



export const login = async (req, res) => {
    try {
        const { agentCode, password } = req.body;
        const user = await User.findOne({ agentCode: agentCode })

        if (!user) {
            return res.status(401).json({ message: "Identifiants invalid" });
        }

        const isMatch = await user.matchPassword(password); 

if (!isMatch) {
    return res.status(401).json({ message: "password incorrect" });
}
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        res.json({
            message: `welcome  ${user.fullName}`,
            token,
            user: { id: user._id, agentCode: user.agentCode,fullName:user.fullName, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ message: 'error connection' })

    }

}
export const getMe = async (req, res) => {
    try {
      
        res.status(200).json({
            user: {
                id: req.user._id,
                agentCode: req.user.agentCode,
                fullName: req.user.fullName,
                role: req.user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: "error internal serve" });
    }
};