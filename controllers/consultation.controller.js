const {create,findConsultationById,findConsultationByUserId,updateConsultationTime,updateConsultationStatus,deleteConsultation, getAllConsultations} = require("../services/consultation.service");

const createConsultation = async (req, res) => {
    try {
        let { user_id, consultation_date, consultation_time,midwiveId,notes } = req.body;
        let response = await create(user_id, consultation_date, consultation_time,midwiveId,notes);
        res.status(201).json({ message: "Consultation created successfully", data: response });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating consultation" });
    }
};

const getAllConsultationsController = async (req, res) => {
    try {
        const consultations = await getAllConsultations();
        res.status(200).json({ message: "Consultations fetched successfully", data: consultations });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getConsultationBasedOnId = async (req, res) => {
    try {
        let { id } = req.params;
        let consultationExists = await findConsultationById(id);
        if (consultationExists.rows.length <= 0) {
            return res.status(404).json({ message: "Consultation not found!", data: null });
        }
        return res.status(200).json({ message: "Consultation found successfully", data: consultationExists.rows[0] });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error retrieving consultation" });
    }
};

const getConsultationBasedOnUserId = async (req, res) => {
    try {
        let { id } = req.params;
        let consultationExists = await findConsultationByUserId(id);
        if (consultationExists.rows.length <= 0) {
            return res.status(404).json({ message: "Consultation not found!", data: null });
        }
        return res.status(200).json({ message: "Consultation found successfully", data: consultationExists.rows });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error retrieving consultations" });
    }
};

const updateConsultationDateTime = async (req, res) => {
    try {
        const { id } = req.params;
        const { consultation_date, consultation_time } = req.body;

        let consultationExists = await findConsultationById(id);
        if (consultationExists.rows.length <= 0) {
            return res.status(404).json({ message: "Consultation not found!", data: null });
        }

        let updatedConsultation = await updateConsultationTime(id, consultation_date, consultation_time);
        res.status(200).json({ message: "Consultation time updated successfully", data: updatedConsultation.rows[0] });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating consultation time" });
    }
};

const changeConsultationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { consultation_status } = req.body;

        let consultationExists = await findConsultationById(id);
        if (consultationExists.rows.length <= 0) {
            return res.status(404).json({ message: "Consultation not found!", data: null });
        }

        let updatedConsultation = await updateConsultationStatus(id, consultation_status);
        res.status(200).json({ message: "Consultation status updated successfully", data: updatedConsultation.rows[0] });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating consultation status" });
    }
};

const deleteConsultationRecord = async (req, res) => {
    try {
        const { id } = req.params;

        let consultationExists = await findConsultationById(id);
        if (consultationExists.rows.length <= 0) {
            return res.status(404).json({ message: "Consultation not found!", data: null });
        }

        await deleteConsultation(id);
        res.status(200).json({ message: "Consultation deleted successfully" });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting consultation" });
    }
};

module.exports = {createConsultation,getAllConsultationsController,getConsultationBasedOnId,getConsultationBasedOnUserId,updateConsultationDateTime,changeConsultationStatus,deleteConsultationRecord};
