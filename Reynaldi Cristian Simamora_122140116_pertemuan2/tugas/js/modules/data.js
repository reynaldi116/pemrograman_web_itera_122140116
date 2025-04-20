export class ScheduleManager {
    constructor() {
        this.schedules = [];
        this.loadFromLocalStorage();
    }
    loadFromLocalStorage() {
        try {
            const savedSchedules = localStorage.getItem('schedules');
            if (savedSchedules) {
                this.schedules = JSON.parse(savedSchedules);
            } else {
                this.initializeDefaultSchedules();
            }
        } catch (error) {
            console.error('Error loading data from localStorage:', error);
            this.schedules = [];
            this.initializeDefaultSchedules();
        }
    }
    initializeDefaultSchedules() {
        const defaultSchedules = [
            {
                id: "1",
                courseName: "Pembelajaran Mesin",
                day: "Senin",
                startTime: "09:30",
                endTime: "12:00",
                lecturer: "Andika Setiawan, S.Kom., M.Cs.",
                room: "GK2 116",
                createdAt: new Date().toISOString()
            },
            {
                id: "2",
                courseName: "Kriptografi",
                day: "Senin",
                startTime: "13:00",
                endTime: "15:30",
                lecturer: "Angga Wijaya, S.Si., M.Si.",
                room: "GK2 407",
                createdAt: new Date().toISOString()
            },
            {
                id: "3",
                courseName: "Pengolahan Sinyal Digital",
                day: "Selasa",
                startTime: "07:00",
                endTime: "09:30",
                lecturer: "Martin Clinton Tosima Manullang, S.T., M.T.",
                room: "GK2 312",
                createdAt: new Date().toISOString()
            },
            {
                id: "4",
                courseName: "Pengembangan Aplikasi Mobile",
                day: "Selasa",
                startTime: "09:30",
                endTime: "12:00",
                lecturer: "Arkham Zahri Rakhman, S.Kom., M.Eng",
                room: "GK2 308",
                createdAt: new Date().toISOString()
            },
            {
                id: "5",
                courseName: "Kewirausahaan",
                day: "Rabu",
                startTime: "07:00",
                endTime: "08:40",
                lecturer: "Aidil Afriansyah, S.Kom., M.Kom",
                room: "GK2 307",
                createdAt: new Date().toISOString()
            },
            {
                id: "6",
                courseName: "Proyek Teknologi Informasi",
                day: "Rabu",
                startTime: "15:30",
                endTime: "17:10",
                lecturer: "Aidil Afriansyah, S.Kom., M.Kom",
                room: "GK2 304",
                createdAt: new Date().toISOString()
            },
            {
                id: "7",
                courseName: "Pemrograman Web",
                day: "Kamis",
                startTime: "09:30",
                endTime: "10.40",
                lecturer: "Muhammad Habib Algifari, S.Kom., M.T.I.",
                room: "GK2 213",
                createdAt: new Date().toISOString()
            },
            {
                id: "8",
                courseName: "Sistem Tertanam",
                day: "Kamis",
                startTime: "15:30",
                endTime: "17.10",
                lecturer: "Ilham Firman Ashari, S.Kom., M.T",
                room: "GK2 210",
                createdAt: new Date().toISOString()
            }
        ];
        this.schedules = defaultSchedules;
        this.saveToLocalStorage();
    }
    saveToLocalStorage() {
        try {
            localStorage.setItem('schedules', JSON.stringify(this.schedules));
        } catch (error) {
            console.error('Error saving data to localStorage:', error);
        }
    }

    /**
     * Mendapatkan semua jadwal
     * @returns {Array} Array jadwal kuliah
     */
    getAllSchedules() {
        return [...this.schedules];
    }
    
    /**
     * Mendapatkan jadwal berdasarkan ID
     * @param {string} id - ID jadwal
     * @returns {Object|null} - Jadwal yang ditemukan atau null
     */
    getScheduleById(id) {
        return this.schedules.find(schedule => schedule.id === id) || null;
    }

    /**
     * Menambahkan jadwal baru
     * @param {Object} scheduleData - Data jadwal yang akan ditambahkan
     * @returns {Object} - Jadwal yang ditambahkan
     */
    addSchedule(scheduleData) {
        const newSchedule = {
            id: Date.now().toString(),
            ...scheduleData,
            createdAt: new Date().toISOString()
        };
        
        this.schedules.push(newSchedule);
        this.saveToLocalStorage();
        return newSchedule;
    }

    /**
     * Memperbarui jadwal yang sudah ada
     * @param {string} id - ID jadwal
     * @param {Object} updatedData - Data jadwal yang diperbarui
     * @returns {Object|null} - Jadwal yang diperbarui atau null jika tidak ditemukan
     */
    updateSchedule(id, updatedData) {
        const index = this.schedules.findIndex(schedule => schedule.id === id);
        if (index === -1) return null;
        
        const updatedSchedule = {
            ...this.schedules[index],
            ...updatedData,
            updatedAt: new Date().toISOString()
        };
        
        this.schedules[index] = updatedSchedule;
        this.saveToLocalStorage();
        return updatedSchedule;
    }

    /**
     * Menghapus jadwal
     * @param {string} id - ID jadwal
     * @returns {boolean} - true jika berhasil dihapus, false jika tidak
     */
    deleteSchedule(id) {
        const initialLength = this.schedules.length;
        this.schedules = this.schedules.filter(schedule => schedule.id !== id);
        
        if (initialLength !== this.schedules.length) {
            this.saveToLocalStorage();
            return true;
        }
        return false;
    }

    /**
     * Mendapatkan jadwal berdasarkan hari
     * @param {string} day - Hari (Senin, Selasa, dst)
     * @returns {Array} - Array jadwal pada hari tersebut
     */
    getSchedulesByDay(day) {
        return this.schedules.filter(schedule => schedule.day === day);
    }
}