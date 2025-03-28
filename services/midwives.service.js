const { pool } = require("../config/db.config");

module.exports = {
    createMidwife: async (name, email, availability) => {
        try {
            const newMidwife = await pool.query("INSERT INTO midwives (name, email, availability) VALUES ($1, $2, $3) RETURNING *", [name, email, availability]);
            return newMidwife.rows[0];
        }
        catch (error) {
            console.error("Error in createMidwife:", error);
            throw error;
        }
    },

    getAllMidwives: async () => {
        try {
            const midwives = await pool.query("SELECT * FROM midwives ORDER BY id DESC");
            return midwives.rows;
        } catch (error) {
            console.error("Error in getAllMidwives:", error);
            throw error;
        }
    },

    findMidwifeById: async (id) => {
        try {
            const midwife = await pool.query("SELECT * FROM dev.midwives WHERE id = $1", [id]);
            return midwife;
        } catch (error) {
            console.error("Error in findMidwifeById:", error);
            throw error;
        }
    },

    findMidwifeByEmail: async (email) => {
        try {
            const midwife = await pool.query("SELECT * FROM dev.midwives WHERE email = $1", [email]);
            return midwife;
        }
        catch (error) {
            console.error("Error in findMidwifeByEmail:", error);
            throw error;
        }
    },

    updateMidwife: async (id, name, email, availability) => {
        try {
            const updatedMidwife = await pool.query("UPDATE dev.midwives SET name = $1, email = $2, availability = $3 WHERE id = $4 RETURNING *", [name, email, availability, id]);
            return updatedMidwife;
        }
        catch (error) {
            console.error("Error in updateMidwife:", error);
            throw error;
        }
    },

    deleteMidwife: async (id) => {
        try {
            const deletedMidwife = await pool.query("DELETE FROM dev.midwives WHERE id = $1 RETURNING *", [id]);
            return deletedMidwife;
        }
        catch (error) {
            console.error("Error in deleteMidwife:", error);
            throw error;
        }
    },

    checkAvailableSlots: async (date) => {
        try {
            const dayOfWeek = new Date(date).toLocaleString('en-us', { weekday: 'long' }).toLowerCase();
            console.log(`[INFO] Day of the week: ${dayOfWeek}`);

            const midwivesQuery = await pool.query("SELECT id, availability FROM dev.midwives");
            const midwives = midwivesQuery.rows;

            console.log(JSON.stringify(midwives))

            const bookedQuery = await pool.query("SELECT midwiveid, consultation_time FROM dev.consultations WHERE consultation_date = $1",[date]);

            const bookedMap = new Map();
            bookedQuery.rows.forEach(({ midwiveid, consultation_time }) => {
                
                if (!bookedMap.has(midwiveid)) { bookedMap.set(midwiveid, new Set());}

                let bookedTime = formatTime(consultation_time);
                let nextSlot = addMinutesToTime(bookedTime, 60);

                bookedMap.get(midwiveid).add(`${bookedTime}-${nextSlot}`);

            });

            console.log(bookedQuery.rows,'bookedQuery')


            let availableSlots = [];

            midwives.forEach(midwife => {
                let midwifeAvailableSlots = [];
                const bookedTimes = bookedMap.get(String(midwife.id)) || new Set();

                if (midwife.availability[dayOfWeek]) {
                    midwife.availability[dayOfWeek].forEach(slot => {
                        let [startTime, endTime] = slot.split('-');

                        let startMinutes = convertToMinutes(startTime);
                        let endMinutes = convertToMinutes(endTime);

                        while (startMinutes < endMinutes) {
                            let formattedStart = convertToTime(startMinutes);
                            let formattedEnd = convertToTime(startMinutes + 60);
                            let fullSlot = `${formattedStart}-${formattedEnd}`;

                            console.log(`[DEBUG] Checking slot: ${fullSlot} for midwife ${midwife.id}`);

                            if (bookedTimes.has(fullSlot)) {
                                console.log(`[WARNING] Slot ${fullSlot} is booked for midwife ${midwife.id}, removing...`);
                            } 
                            else {
                                midwifeAvailableSlots.push(fullSlot);
                            }

                            startMinutes += 60;
                        }
                    });
                }

                if (midwifeAvailableSlots.length > 0) {
                    console.log(`[INFO] Available slots for midwife ${midwife.id}:`, JSON.stringify(midwifeAvailableSlots, null, 2));
                    availableSlots.push({ midwiveId: midwife.id, availableSlots: midwifeAvailableSlots });
                } 
                else {
                    console.log(`[WARNING] No available slots for midwife ${midwife.id}`);
                }
            });

            return  availableSlots
                
        } catch (error) {
            console.error(`[ERROR] Fetching available slots failed: ${error.message}`);
            throw new Error("Error fetching available slots");
        }

    }






};

const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    console.log(`${hours}:${minutes}`, '`${hours}:${minutes}`')
    return `${hours}:${minutes}`;
};

// Convert HH:MM to total minutes
const convertToMinutes = (time) => {
    let [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

// Convert total minutes back to HH:MM
const convertToTime = (minutes) => {
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

// Add minutes to time and return HH:MM format
const addMinutesToTime = (time, minutesToAdd) => {
    let totalMinutes = convertToMinutes(time) + minutesToAdd;
    return convertToTime(totalMinutes);
};
