const { createUser, findUserByEmail, findUserById, updateUsername, updateProfileImage, updateOnboarding } = require("../services/auth.services");



const createAccount = async (req,res)=>{
    let {uid,email,name,image} = req.body
    let userExists = await findUserByEmail(email);
    if (userExists.rows.length > 0) {
        res.status(200).json({ message: "User already exists!", data: userExists.rows });
    }
    else{
        const newUser = await createUser(uid, email, name, image);
        res.status(201).json({ message: "User registered successfully", data: newUser });
    }
}


const loginAccount = async (req,res)=>{
    let {email} = req.body
    let userExists = await findUserByEmail(email);
    if (userExists.rows.length<=0) {
        return res.status(400).json({ msg: "User not found!",data:null });
    }
    else{
        res.status(201).json({ message: "User login successfully", data: userExists.rows });
    }
}

const getAccountById = async (req,res)=>{
    let {id} = req.params
    let userExists = await findUserById(id);
    if (userExists.rows.length<=0) {
        return res.status(400).json({ msg: "User not found!",data:null });
    }
    else{
        res.status(201).json({ message: "User found successfully", data: userExists.rows });
    }
}

const editUsername = async (req, res) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        let userExists = await findUserById(id);
        if (userExists.rows.length <= 0) {
            return res.status(400).json({ msg: "User not found!", data: null });
        }

        let updatedUser = await updateUsername(id, username);
        res.status(200).json({ message: "Username updated successfully", data: updatedUser.rows[0] });
    } catch (error) {
        console.log(error, "Error in editUsername");
        res.status(500).json({ msg: "Internal server error", error });
    }
};
const updateOnboardingData = async (req, res) => {
    try {
        const { id } = req.params;
        const { onboarding_data } = req.body;

        let userExists = await findUserById(id);
        if (userExists.rows.length <= 0) {
            return res.status(400).json({ msg: "User not found!", data: null });
        }

        let updatedUser = await updateOnboarding(id, onboarding_data);
        res.status(200).json({ message: "Onboarding data updated successfully", data: updatedUser.rows[0] });
    } catch (error) {
        console.log(error, "Error in editUsername");
        res.status(500).json({ msg: "Internal server error", error });
    }
};

const uploadProfileImage = async (req, res) => {
    try {
        const { id } = req.params; 
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        let updatedUser = await updateProfileImage(id, imageUrl);
        res.status(200).json({ message: "Profile image updated successfully", data: updatedUser.rows[0] });
    } catch (error) {
        console.log(error, "Error in uploadProfileImage");
        res.status(500).json({ msg: "Internal server error", error });
    }
};



module.exports = {createAccount,loginAccount,getAccountById,editUsername,uploadProfileImage,updateOnboardingData}