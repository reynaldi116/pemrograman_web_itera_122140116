// ==================== UTILITY FUNCTIONS ====================
// Fungsi umum untuk menampilkan pesan status
function showStatus(element, message, isError = false) {
    element.textContent = message;
    element.className = isError 
        ? "status-message status-error" 
        : "status-message status-success";
    element.classList.remove("hidden");
    
    setTimeout(() => {
        element.classList.add("hidden");
    }, 5000);
}

// Fungsi untuk menampilkan/menyembunyikan loader
function toggleLoader(loader, show) {
    if (show) {
        loader.classList.remove("hidden");
    } else {
        loader.classList.add("hidden");
    }
}

// Fungsi umum untuk fetch API dengan error handling
async function fetchAPI(url, options = {}) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

// ==================== TO-DO LIST SECTION ====================
const domOutput = document.getElementById("todo-output");
const todoInput = document.getElementById("todo-input");
const todoLoader = document.getElementById("todo-loader");
const todoStatus = document.getElementById("todo-status");

// Load to-do dari localStorage saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
    
    // Inisialisasi event listeners
    document.getElementById("btn-tambah-item").addEventListener("click", addTodoFromInput);
    todoInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTodoFromInput();
    });
    document.getElementById("btn-load-todos").addEventListener("click", fetchTodos);
    
    // Inisialisasi event listeners untuk kalkulator
    initCalculator();
    
    // Inisialisasi event listeners untuk form validasi
    initFormValidation();
});

// Load to-do items from localStorage
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    domOutput.innerHTML = '';
    todos.forEach(todo => {
        addTodoToDOM(todo.text, todo.completed);
    });
}

// Save to-do items to localStorage
function saveTodos() {
    const todos = [];
    domOutput.querySelectorAll('.todo-item').forEach(item => {
        todos.push({
            text: item.querySelector('span').innerText,
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Add to-do item to DOM
function addTodoToDOM(text, completed = false) {
    const newItem = document.createElement("div");
    newItem.className = `todo-item ${completed ? 'completed' : ''}`;
    
    const btnClasses = ['btn-primary', 'btn-secondary', 'btn-success', 'btn-danger'];
    const randomClass = btnClasses[Math.floor(Math.random() * btnClasses.length)];
    
    const completeIcon = completed ? '↩' : '✓';
    
    newItem.innerHTML = `
        <span>${text}</span>
        <div class="todo-actions">
            <button class="complete-btn ${randomClass} round-btn" title="${completed ? 'Batal' : 'Selesai'}">${completeIcon}</button>
            <button class="delete-btn btn-danger round-btn" title="Hapus">×</button>
        </div>
    `;
    domOutput.appendChild(newItem);

    // Event listener for complete button
    newItem.querySelector('.complete-btn').addEventListener('click', function() {
        newItem.classList.toggle('completed');
        this.innerHTML = newItem.classList.contains('completed') ? '↩' : '✓';
        this.title = newItem.classList.contains('completed') ? 'Batal' : 'Selesai';
        saveTodos();
    });

    // Event listener for delete button
    newItem.querySelector('.delete-btn').addEventListener('click', function() {
        newItem.style.opacity = '0';
        setTimeout(() => {
            domOutput.removeChild(newItem);
            saveTodos();
        }, 300);
    });
}

// Function to add todo from input
function addTodoFromInput() {
    const text = todoInput.value.trim();
    if (text !== "") {
        addTodoToDOM(text);
        todoInput.value = "";
        saveTodos();
    } else {
        todoInput.style.animation = 'shake 0.5s';
        setTimeout(() => {
            todoInput.style.animation = '';
        }, 500);
    }
}

// Fetch todos from API
async function fetchTodos() {
    toggleLoader(todoLoader, true);
    
    try {
        const data = await fetchAPI('https://jsonplaceholder.typicode.com/todos?_limit=5');
        
        domOutput.innerHTML = '';
        data.forEach(todo => {
            addTodoToDOM(todo.title, todo.completed);
        });
        
        saveTodos();
        showStatus(todoStatus, "Berhasil memuat tugas dari API");
    } catch (error) {
        showStatus(todoStatus, "Gagal memuat tugas dari API: " + error.message, true);
    } finally {
        toggleLoader(todoLoader, false);
    }
}

// ==================== KALKULATOR SECTION ====================
const hasilElement = document.getElementById("hasil-kalkulator");
const calculatorLoader = document.getElementById("calculator-loader");
const calculatorStatus = document.getElementById("calculator-status");

function initCalculator() {
    // Event listeners untuk tombol operasi kalkulator
    document.getElementById("btn-tambah").addEventListener("click", () => performCalculation("tambah", "+"));
    document.getElementById("btn-kurang").addEventListener("click", () => performCalculation("kurang", "-"));
    document.getElementById("btn-kali").addEventListener("click", () => performCalculation("kali", "×"));
    document.getElementById("btn-bagi").addEventListener("click", () => performCalculation("bagi", "÷"));
    document.getElementById("btn-pangkat").addEventListener("click", () => performCalculation("pangkat", "^"));
    document.getElementById("btn-akar").addEventListener("click", () => performCalculation("akar", "√"));
    document.getElementById("btn-modulus").addEventListener("click", () => performCalculation("modulus", "%"));
    document.getElementById("btn-clear").addEventListener("click", clearCalculator);
    document.getElementById("btn-calculate-api").addEventListener("click", calculateViaAPI);
}

function performCalculation(operation, symbol) {
    const angka1 = parseFloat(document.getElementById("angka1").value);
    const angka2 = parseFloat(document.getElementById("angka2").value);
    tampilkanHasil(angka1, angka2, operation, symbol);
}

function clearCalculator() {
    document.getElementById("angka1").value = "";
    document.getElementById("angka2").value = "";
    hasilElement.innerHTML = "";
    calculatorStatus.classList.add("hidden");
}

function hitungKalkulator(angka1, angka2, operasi) {
    let hasil = 0;
    switch (operasi) {
        case "tambah":
            hasil = angka1 + angka2;
            break;
        case "kurang":
            hasil = angka1 - angka2;
            break;
        case "kali":
            hasil = angka1 * angka2;
            break;
        case "bagi":
            if (angka2 === 0) return "Error: Pembagian dengan nol tidak diperbolehkan";
            hasil = angka1 / angka2;
            break;
        case "pangkat":
            hasil = Math.pow(angka1, angka2);
            break;
        case "akar":
            if (angka1 < 0) return "Error: Akar kuadrat dari bilangan negatif tidak diperbolehkan";
            hasil = Math.sqrt(angka1);
            break;
        case "modulus":
            if (angka2 === 0) return "Error: Modulus dengan nol tidak diperbolehkan";
            hasil = angka1 % angka2;
            break;
        default:
            return "Operasi tidak valid";
    }
    
    // Format hasil jika bilangan desimal
    return hasil % 1 !== 0 ? hasil.toFixed(2) : hasil;
}

function tampilkanHasil(angka1, angka2, operasi, simbol) {
    // Khusus untuk operasi akar yang hanya membutuhkan satu angka
    if (operasi === "akar") {
        if (isNaN(angka1)) {
            hasilElement.innerHTML = `<p style="color: #ff4d4d;">Masukkan angka yang valid!</p>`;
            return;
        }
        
        const hasil = hitungKalkulator(angka1, angka2, operasi);
        hasilElement.innerHTML = typeof hasil === "string" && hasil.startsWith("Error")
            ? `<p style="color: #ff4d4d;">${hasil}</p>`
            : `<p>Hasil: ${simbol}${angka1} = ${hasil}</p>`;
        return;
    }
    
    // Untuk operasi lain yang membutuhkan dua angka
    if (isNaN(angka1) || isNaN(angka2)) {
        hasilElement.innerHTML = `<p style="color: #ff4d4d;">Masukkan angka yang valid!</p>`;
        return;
    }
    
    const hasil = hitungKalkulator(angka1, angka2, operasi);
    hasilElement.innerHTML = typeof hasil === "string" && hasil.startsWith("Error")
        ? `<p style="color: #ff4d4d;">${hasil}</p>`
        : `<p>Hasil: ${angka1} ${simbol} ${angka2} = ${hasil}</p>`;
}

async function calculateViaAPI() {
    const angka1 = parseFloat(document.getElementById("angka1").value);
    const angka2 = parseFloat(document.getElementById("angka2").value);
    
    if (isNaN(angka1) || isNaN(angka2)) {
        showStatus(calculatorStatus, "Masukkan angka yang valid!", true);
        return;
    }
    
    toggleLoader(calculatorLoader, true);
    hasilElement.innerHTML = "";
    
    try {
        const url = `https://httpbin.org/get?num1=${angka1}&num2=${angka2}&operation=add`;
        const data = await fetchAPI(url);
        
        // Parse data dari response httpbin
        const args = data.args;
        const num1 = parseFloat(args.num1);
        const num2 = parseFloat(args.num2);
        const result = num1 + num2;
        
        hasilElement.innerHTML = `
            <p>API Result:</p>
            <p>Hasil: ${num1} + ${num2} = ${result}</p>
            <p><small>Response dari: ${data.url}</small></p>
        `;
        
        showStatus(calculatorStatus, "Berhasil mendapatkan hasil dari API");
    } catch (error) {
        showStatus(calculatorStatus, "Gagal mendapatkan hasil dari API: " + error.message, true);
        
        hasilElement.innerHTML = `
            <p style="color: #ff4d4d;">API Error: ${error.message}</p>
            <p>Menggunakan perhitungan lokal sebagai fallback:</p>
            <p>Hasil: ${angka1} + ${angka2} = ${angka1 + angka2}</p>
        `;
    } finally {
        toggleLoader(calculatorLoader, false);
    }
}

// ==================== FORM VALIDASI SECTION ====================
const formValidasi = document.getElementById("form-validasi");
const validationLoader = document.getElementById("validation-loader");
const validationStatus = document.getElementById("validation-status");
const formSuccess = document.getElementById("form-success");

function initFormValidation() {
    formValidasi.addEventListener("submit", validasiForm);
    document.getElementById("btn-validate-email-api").addEventListener("click", validateEmailButtonHandler);
}

function validasiForm(event) {
    event.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    
    // Reset error messages
    document.getElementById("error-nama").textContent = "";
    document.getElementById("error-email").textContent = "";
    document.getElementById("error-password").textContent = "";
    formSuccess.classList.add("hidden");
    
    let isValid = true;

    // Validasi nama (lebih dari 3 karakter)
    if (nama.length <= 3) {
        document.getElementById("error-nama").textContent = "Nama harus lebih dari 3 karakter.";
        isValid = false;
    }

    // Validasi email dengan regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById("error-email").textContent = "Email tidak valid.";
        isValid = false;
    }

    // Validasi password (minimal 8 karakter)
    if (password.length < 8) {
        document.getElementById("error-password").textContent = "Password harus minimal 8 karakter.";
        isValid = false;
    }

    // Jika semua validasi berhasil
    if (isValid) {
        formSuccess.classList.remove("hidden");
        formValidasi.reset();
    }
}

function validateEmailFormat(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(String(email).toLowerCase());
}

function validateEmailButtonHandler() {
    const email = document.getElementById("email").value.trim();
    
    if (!email) {
        showStatus(validationStatus, "Masukkan email terlebih dahulu!", true);
        return;
    }
    
    validateEmailWithApi(email);
}

async function validateEmailWithApi(email) {
    toggleLoader(validationLoader, true);
    document.getElementById("error-email").textContent = "";
    
    try {
        const url = `https://httpbin.org/get?email=${encodeURIComponent(email)}`;
        const data = await fetchAPI(url);
        
        const emailToValidate = data.args.email;
        const isValid = validateEmailFormat(emailToValidate);
        
        if (isValid) {
            showStatus(validationStatus, `Email "${emailToValidate}" valid menurut API!`);
            document.getElementById("error-email").textContent = "";
        } else {
            document.getElementById("error-email").textContent = "Email tidak valid menurut API.";
            showStatus(validationStatus, `Email "${emailToValidate}" tidak valid menurut API`, true);
        }
    } catch (error) {
        showStatus(validationStatus, "Gagal memvalidasi email: " + error.message, true);
    } finally {
        toggleLoader(validationLoader, false);
    }
}