const { pool } = require("../config/db.config");


module.exports = {
    
    createUser: async (uid, email, name, image) => {
        try {
            const newUser = await pool.query("INSERT INTO public.users (uid, email, username, profile_image) VALUES ($1, $2, $3, $4) RETURNING *",[uid, email, name, image]);

            return newUser.rows[0];
        } 
        catch (error) {
            console.log(error, "Error in createUser");
            throw error;
        }
    },
    findUserByEmail: async (email) => {
        try {
            const userExists = await pool.query("SELECT * FROM public.users WHERE email = $1", [email]);
            return userExists
        }
        catch (error) {
            console.log(error, 'error in findUserByEmail ')
        }
    },
    findUserById: async (id) => {
        try {
            const userExists = await pool.query("SELECT * FROM public.users WHERE user_id = $1", [id]);
            return userExists
        }
        catch (error) {
            console.log(error, 'error in findUserById ')
        }
    },
    updateOnboarding: async (id, onboarding_data) => {
        try {
            const updatedUser = await pool.query("UPDATE public.users SET onboarding_data = $1 WHERE user_id = $2 RETURNING *",[onboarding_data, id]);
            return updatedUser;
        } 
        catch (error) {
            console.log(error, "Error in updateUsername");
            throw error;
        }
    },
    updateUsername: async (id, newUsername) => {
        try {
            const updatedUser = await pool.query("UPDATE public.users SET username = $1 WHERE user_id = $2 RETURNING *",[newUsername, id]);
            return updatedUser;
        } 
        catch (error) {
            console.log(error, "Error in updateUsername");
            throw error;
        }
    },
    updateProfileImage: async (id, imageUrl) => {
        try {
            const updatedUser = await pool.query("UPDATE public.users SET profile_image = $1 WHERE user_id = $2 RETURNING *",[imageUrl, id]);
            return updatedUser;
        } 
        catch (error) {
            console.log(error, "Error in updateProfileImage");
            throw error;
        }
    },
    deleteUsers: async() => {
        try {
            await pool.query("DELETE FROM public.users",[]);
            return "User Deleted";
        } 
        catch (error) {
            console.log(error, "Error in updateProfileImage");
            throw error;
        }
    },
}
