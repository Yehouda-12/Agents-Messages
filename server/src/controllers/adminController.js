import User from '../models/User.js'


const encodeAtbash = (text) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const reversedAlphabet = 'zyxwvutsrqponmlkjihgfedcba';
    
    return text
        .toLowerCase()
        .split('')
        .map(char => {
            const index = alphabet.indexOf(char);
            return index !== -1 ? reversedAlphabet[index] : char;
        })
        .join('')
        .replace(/\s+/g, ''); 
};

export const createUser = async (req,res)=>{
    try{
        const { fullName, agentCode, password, role } = req.body;
        if (!fullName || !agentCode) {
            return res.status(400).json({ message: 'Full name and Agent code are required.' });
        }

        const existingUser = await User.findOne({agentCode})
        if (existingUser) {
            return res.status(400).json({ message: 'Agent code already in use.' });
        }
        const generatedPassword = password || encodeAtbash(fullName);
        const newUser = new User({
            fullName,
            agentCode,
            password:generatedPassword,
            role: role || 'agent' 
        });

        await newUser.save()
        const userResponse = newUser.toObject();
        delete userResponse.password;
        res.status(201).json({
            message: 'User created successfully',
            user: userResponse,
            temporaryPassword: generatedPassword
        });


    }catch(error){
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });

    }

}
export const getUsers = async (req,res)=>{
    try{
        const users = await User.find({}).select('-password').sort({createdAt:-1})
        res.status(200).json(users)
    }catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}