/** 
 * Format waktu dari format 24 jam ke format 12 jam
 * @param {string} time - Waktu dalam format 24 jam (HH:MM)
 * @returns {string} - Waktu dalam format 12 jam (HH:MM AM/PM)
 */
export const formatTime = (time) => {
    if (!time) return '';
    
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    
    return `${formattedHour}:${minutes} ${period}`;
};

/**
 * Memformat tanggal saat ini
 * @returns {string} - Tanggal dan waktu saat ini dalam format lokal
 */
export const getCurrentDateTime = () => {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    return now.toLocaleDateString('id-ID', options);
};

/**
 * Mengurutkan jadwal berdasarkan hari dan waktu mulai
 * @param {Array} schedules - Array jadwal yang akan diurutkan
 * @returns {Array} - Array jadwal yang sudah diurutkan
 */
export const sortSchedules = (schedules) => {
    const dayOrder = {
        'Senin': 1,
        'Selasa': 2,
        'Rabu': 3,
        'Kamis': 4,
        'Jumat': 5,
        'Sabtu': 6
    };
    
    return [...schedules].sort((a, b) => {
        // Urutkan berdasarkan hari
        if (dayOrder[a.day] !== dayOrder[b.day]) {
            return dayOrder[a.day] - dayOrder[b.day];
        }
        
        // Jika hari sama, urutkan berdasarkan waktu mulai
        return a.startTime.localeCompare(b.startTime);
    });
};

/**
 * Membuat template item jadwal untuk ditampilkan di UI
 * @param {Object} schedule - Data jadwal
 * @returns {string} - HTML template untuk item jadwal
 */
export const createScheduleTemplate = (schedule) => {
    return `
        <div class="schedule-item" data-id="${schedule.id}">
            <div class="schedule-header">
                <h3 class="schedule-title">${schedule.courseName}</h3>
                <div class="schedule-actions">
                    <button class="btn-icon btn-edit" data-id="${schedule.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                    </button>
                    <button class="btn-icon btn-delete" data-id="${schedule.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="schedule-details">
                <div class="schedule-detail">
                    <span class="detail-label">Hari:</span>
                    <span>${schedule.day}</span>
                </div>
                <div class="schedule-detail">
                    <span class="detail-label">Waktu:</span>
                    <span>${formatTime(schedule.startTime)} - ${formatTime(schedule.endTime)}</span>
                </div>
                <div class="schedule-detail">
                    <span class="detail-label">Dosen:</span>
                    <span>${schedule.lecturer}</span>
                </div>
                <div class="schedule-detail">
                    <span class="detail-label">Ruangan:</span>
                    <span>${schedule.room}</span>
                </div>
            </div>
        </div>
    `;
};

/**
 * Fungsi untuk memvalidasi form jadwal
 * @param {Object} formData - Data form jadwal
 * @returns {Object} - Hasil validasi {isValid, errors}
 */
export const validateScheduleForm = (formData) => {
    const errors = {};
    let isValid = true;
    
    // Validasi nama mata kuliah
    if (!formData.courseName.trim()) {
        errors.courseName = 'Nama mata kuliah tidak boleh kosong';
        isValid = false;
    }
    
    // Validasi waktu
    if (!formData.startTime) {
        errors.startTime = 'Waktu mulai harus diisi';
        isValid = false;
    }
    
    if (!formData.endTime) {
        errors.endTime = 'Waktu selesai harus diisi';
        isValid = false;
    }
    
    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
        errors.endTime = 'Waktu selesai harus lebih besar dari waktu mulai';
        isValid = false;
    }
    
    // Validasi dosen
    if (!formData.lecturer.trim()) {
        errors.lecturer = 'Nama dosen tidak boleh kosong';
        isValid = false;
    }
    
    // Validasi ruangan
    if (!formData.room.trim()) {
        errors.room = 'Ruangan tidak boleh kosong';
        isValid = false;
    }
    
    return { isValid, errors };
};