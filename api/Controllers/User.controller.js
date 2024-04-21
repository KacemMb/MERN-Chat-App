import bcrypt from 'bcrypt';
import User from '../Models/User.model.js';
import generateTokenAndSerCookies from '../Utils/TokenGenerator.js';

export const signup = async (req, res) => {
    try {
        const {first_name, last_name,user_name, email, password} = req.body;
        console.log("data of user",first_name, last_name,user_name, email, password);
        const findUserByEmail = await User.findOne({email});
        if(findUserByEmail){
            return res.status(400).json({message: 'User already exists with this email'});
        }
        const findUserByUserName = await User.findOne({user_name});
        if(findUserByUserName){
            return res.status(400).json({message: 'User already exists with this username'});
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({first_name, last_name,user_name, email, password: hashedPassword});
        if(user){
            generateTokenAndSerCookies(user._id,res);
            return res.status(201).json({message: 'User created successfully', user});
        }
    } catch (error) {
        console.log('error is : ',error);
        return res.status(500).json({message: 'Internal server error'});
    }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne ({email});
        if(!user){
            return res.status(400).json({message: 'User not found with this email'});
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: 'Invalid credentials'});
        }
        generateTokenAndSerCookies(user._id,res);
        return res.status(200).json({message: 'Logged in successfully', user});    
    } catch (error) {
        
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({message: 'Logged out successfully'});
    } catch (error) {
        console.log("error is : ",error)
        return res.status(500).json({message: 'Internal server error'});
    }
}