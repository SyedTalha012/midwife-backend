const {createMidwife,getAllMidwives,findMidwifeById,findMidwifeByEmail,updateMidwife,deleteMidwife, checkAvailableSlots} = require("../services/midwives.service");


const createMidwifeController = async (req, res) => {
    try {
        let { name, email, availability } = req.body;

        let midwifeExists = await findMidwifeByEmail(email);
        if (midwifeExists.rows.length > 0) {
            return res.status(400).json({ message: "Midwife with this email already exists!" });
        }
        let response = await createMidwife(name, email, availability);
        res.status(201).json({ message: "Midwife created successfully", data: response });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating midwife" });
    }
};

const getAllMidwivesController = async (req, res) => {
    try {
        const midwives = await getAllMidwives();
        res.status(200).json({ message: "Midwives fetched successfully", data: midwives });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getMidwifeByIdController = async (req, res) => {
    try {
        let { id } = req.params;
        let midwife = await findMidwifeById(id);

        if (midwife.rows.length === 0) {
            return res.status(404).json({ message: "Midwife not found!", data: null });
        }

        res.status(200).json({ message: "Midwife found successfully", data: midwife.rows[0] });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving midwife" });
    }
};

const updateMidwifeController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, availability } = req.body;

        let midwifeExists = await findMidwifeById(id);
        if (midwifeExists.rows.length === 0) {
            return res.status(404).json({ message: "Midwife not found!", data: null });
        }

        let updatedMidwife = await updateMidwife(id, name, email, availability);
        res.status(200).json({ message: "Midwife updated successfully", data: updatedMidwife.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating midwife details" });
    }
};

const deleteMidwifeController = async (req, res) => {
    try {
        const { id } = req.params;

        let midwifeExists = await findMidwifeById(id);
        if (midwifeExists.rows.length === 0) {
            return res.status(404).json({ message: "Midwife not found!", data: null });
        }

        await deleteMidwife(id);
        res.status(200).json({ message: "Midwife deleted successfully" });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting midwife" });
    }
};

const checkMidWivesAvailablity = async (req,res) =>{
    try {
        const { date } = req.params;
        let availability = await checkAvailableSlots( date )
        return res.status(200).json({msg:"All Available Slots",data:availability})

    } 
    catch (error) {
        console.log(error)
    }
}

module.exports = {createMidwifeController,getAllMidwivesController,getMidwifeByIdController,updateMidwifeController,deleteMidwifeController,checkMidWivesAvailablity};
