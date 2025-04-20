import { ScheduleManager } from './modules/data.js';
import { 
    formatTime, 
    getCurrentDateTime, 
    sortSchedules, 
    createScheduleTemplate,
    validateScheduleForm
} from './modules/utils.js';

class UIController {
    constructor(scheduleManager) {
        this.scheduleManager = scheduleManager;
        
        this.scheduleList = document.getElementById('schedule-list');
        this.scheduleModal = document.getElementById('schedule-modal');
        this.confirmModal = document.getElementById('confirm-modal');
        this.scheduleForm = document.getElementById('schedule-form');
        this.dateTimeElement = document.getElementById('date-time');
        
        this.scheduleIdInput = document.getElementById('schedule-id');
        this.courseNameInput = document.getElementById('course-name');
        this.daySelect = document.getElementById('day');
        this.startTimeInput = document.getElementById('start-time');
        this.endTimeInput = document.getElementById('end-time');
        this.lecturerInput = document.getElementById('lecturer');
        this.roomInput = document.getElementById('room');
        
        this.modalTitle = document.getElementById('modal-title');
        this.addScheduleBtn = document.getElementById('add-schedule');
        this.cancelBtn = document.getElementById('cancel-btn');
        this.confirmDeleteBtn = document.getElementById('confirm-delete');
        this.cancelDeleteBtn = document.getElementById('cancel-delete');
        
        this.closeButtons = document.getElementsByClassName('close');
        this.scheduleToDelete = null;
        this.initEventListeners();
        this.renderSchedules();
        this.updateDateTime();
        
        setInterval(() => this.updateDateTime(), 60000);
    }
    
    initEventListeners() {
        this.addScheduleBtn.addEventListener('click', () => this.openAddModal());
        
        this.scheduleForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        
        this.cancelBtn.addEventListener('click', () => this.closeModal(this.scheduleModal));
        
        this.confirmDeleteBtn.addEventListener('click', () => this.handleDeleteConfirm());
        
        this.cancelDeleteBtn.addEventListener('click', () => this.closeModal(this.confirmModal));
        
        Array.from(this.closeButtons).forEach(btn => {
            btn.addEventListener('click', () => this.closeModal(btn.closest('.modal')));
        });
        
        this.scheduleList.addEventListener('click', (e) => this.handleScheduleListClick(e));
    }
    updateDateTime() {
        this.dateTimeElement.textContent = getCurrentDateTime();
    }
    renderSchedules() {
        const schedules = this.scheduleManager.getAllSchedules();
        
        if (schedules.length === 0) {
            this.scheduleList.innerHTML = '<p class="empty-message">Belum ada jadwal. Silakan tambahkan jadwal baru.</p>';
            return;
        }
        
        const sortedSchedules = sortSchedules(schedules);
        const scheduleHTML = sortedSchedules.map(schedule => createScheduleTemplate(schedule)).join('');
        this.scheduleList.innerHTML = scheduleHTML;
    }
    openAddModal() {
        this.resetForm();
        this.modalTitle.textContent = 'Tambah Jadwal Baru';
        this.scheduleModal.style.display = 'block';
    }
    
    /**
     * Buka modal untuk edit jadwal
     * @param {string} scheduleId - ID jadwal yang akan diedit
     */
    openEditModal(scheduleId) {
        const schedule = this.scheduleManager.getScheduleById(scheduleId);
        if (!schedule) return;
        
        this.resetForm();
        this.scheduleIdInput.value = schedule.id;
        this.courseNameInput.value = schedule.courseName;
        this.daySelect.value = schedule.day;
        this.startTimeInput.value = schedule.startTime;
        this.endTimeInput.value = schedule.endTime;
        this.lecturerInput.value = schedule.lecturer;
        this.roomInput.value = schedule.room;
        
        this.modalTitle.textContent = 'Edit Jadwal';
        this.scheduleModal.style.display = 'block';
    }
    
    /**
     * Buka modal konfirmasi hapus
     * @param {string} scheduleId - ID jadwal yang akan dihapus
     */
    openDeleteConfirmModal(scheduleId) {
        this.scheduleToDelete = scheduleId;
        this.confirmModal.style.display = 'block';
    }
    
    /**
     * Tutup modal
     * @param {HTMLElement} modal - Modal element yang akan ditutup
     */
    closeModal(modal) {
        modal.style.display = 'none';
    }
    resetForm() {
        this.scheduleForm.reset();
        this.scheduleIdInput.value = '';
    }
    
    /**
     * Handle submit form jadwal
     * @param {Event} e - Event object
     */
    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = {
            courseName: this.courseNameInput.value,
            day: this.daySelect.value,
            startTime: this.startTimeInput.value,
            endTime: this.endTimeInput.value,
            lecturer: this.lecturerInput.value,
            room: this.roomInput.value
        };
        
        const { isValid, errors } = validateScheduleForm(formData);
        
        if (!isValid) {
            console.error('Form validation failed:', errors);
            return;
        }
        
        const scheduleId = this.scheduleIdInput.value;
        
        if (scheduleId) {
            this.scheduleManager.updateSchedule(scheduleId, formData);
        } else {
            this.scheduleManager.addSchedule(formData);
        }
        
        this.renderSchedules();
        this.closeModal(this.scheduleModal);
    }
    
    /**
     * Handle klik pada daftar jadwal (delegasi event)
     * @param {Event} e - Event object
     */
    handleScheduleListClick(e) {
        const editBtn = e.target.closest('.btn-edit');
        const deleteBtn = e.target.closest('.btn-delete');
        
        if (editBtn) {
            const scheduleId = editBtn.dataset.id;
            this.openEditModal(scheduleId);
        } else if (deleteBtn) {
            const scheduleId = deleteBtn.dataset.id;
            this.openDeleteConfirmModal(scheduleId);
        }
    }
    handleDeleteConfirm() {
        if (this.scheduleToDelete) {
            this.scheduleManager.deleteSchedule(this.scheduleToDelete);
            this.renderSchedules();
            this.scheduleToDelete = null;
            this.closeModal(this.confirmModal);
        }
    }
}
const simulateProcessingDelay = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('Simulasi delay selesai.');
            resolve();
        }, 500);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    new UIController();
});
export { UIController };