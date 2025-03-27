const { pool } = require("../config/db.config");

module.exports = {
    
    create: async (user_id, consultation_date, consultation_time,midwiveId) => {
        try {
            const newConsultation = await pool.query("INSERT INTO public.consultations (user_id, consultation_date, consultation_time,midwiveId) VALUES ($1, $2, $3, $4) RETURNING *",[user_id, consultation_date, consultation_time,midwiveId]);
            return newConsultation.rows[0];
        } 
        catch (error) {
            console.log(error, "Error in create consultation");
            throw error;
        }
    },

    findConsultationByUserId: async (id) => {
        try {
            const consultationExists = await pool.query("SELECT * FROM public.consultations WHERE user_id = $1", [id]);
            return consultationExists;
        }
        catch (error) {
            console.log(error, "Error in findConsultationByUserId");
        }
    },

    findConsultationById: async (id) => {
        try {
            const consultationExists = await pool.query("SELECT * FROM public.consultations WHERE id = $1", [id]);
            return consultationExists;
        }
        catch (error) {
            console.log(error, "Error in findConsultationById");
        }
    },
    getAllConsultations: async () => {
        try {
            const consultations = await pool.query("SELECT * FROM public.consultations ORDER BY consultation_date DESC");
            return consultations.rows;
        } 
        catch (error) {
            console.log(error, "Error in getAllConsultations");
            throw error;
        }
    },
    updateConsultationTime: async (id, consultation_date, consultation_time) => {
        try {
            const updatedConsultation = await pool.query("UPDATE public.consultations SET consultation_date = $1, consultation_time = $2 WHERE id = $3 RETURNING *",[consultation_date, consultation_time, id]);
            return updatedConsultation;
        } 
        catch (error) {
            console.log(error, "Error in updateConsultationTime");
            throw error;
        }
    },

    updateConsultationStatus: async (id, newStatus) => {
        try {
            const updatedConsultation = await pool.query("UPDATE public.consultations SET consultation_status = $1 WHERE id = $2 RETURNING *",[newStatus, id]);
            return updatedConsultation;
        } 
        catch (error) {
            console.log(error, "Error in updateConsultationStatus");
            throw error;
        }
    },

    deleteConsultation: async (id) => {
        try {
            const deletedConsultation = await pool.query("DELETE FROM public.consultations WHERE id = $1 RETURNING *",[id]);
            return deletedConsultation;
        } 
        catch (error) {
            console.log(error, "Error in deleteConsultation");
            throw error;
        }
    },
};
