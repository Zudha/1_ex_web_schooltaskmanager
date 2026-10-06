// Tangkap Elemen DOM
const taskForm = document.getElementById("task-form");
const taskTitleInput = document.getElementById("task-title");
const subjectInput = document.getElementById("subject")
const deadlineInput = document.getElementById("deadline")
const taskList = document.getElementById("task-list")

// Array Kosong untuk Menampung Data Tugas
let tasks = JSON.parse(localStorage.getItem('TASKS_DATA')) || [];

// Event Listener saat Form di-Submit
taskForm.addEventListener("submit", function(event) {
	//Mencegah halaman reload/refresh otomatis
	event.preventDefault();
	
	//Membaca nilai dari input Form
	const titleValue = taskTitleInput.value;
	const subjectValue = subjectInput.value;
	const deadlineValue = deadlineInput.value;
	
	//Membuat Objek tugas Baru
	const newTask = {
		id: Date.now(), // ID untuk menggunakan timestamp
		title: titleValue,
		subject: subjectValue,
		deadline: deadlineValue,
		isCompleted: false,
	};
	
	//Push Object ke Array Utama
	tasks.push(newTask);
	
	//Cek data di Console Browser
	console.log("Daftar tugas saat Ini: ", tasks);
	
	//Reset form setelah disimpan
	taskForm.reset();
	
	//Tampilan ke layar HTML
	renderTasks();
});

//Fungsi Menampilkan Data Array ke HTML
function renderTasks() {
	// Mengosongkan tampilan list sebelumnya
	taskList.innerHTML = "";
	
	//Looping Array "tasks" menggunakan forEach
	tasks.forEach(function(task) {
		//Bikin elemen li baru 
		const li = document.createElement("li");
		li.classList.add("task-item");
		
	//Isi HTML di dalam li
	li.innerHTML = `
		<div class="task-info">
			<h3>${task.title}</h3>
			<p><span>Subject:</span> ${task.subject} | <span>Deadline:</span> ${task.deadline}</p>
		</div>
		<div class="task-actions">
			<button class="delete" onclick="deleteTask(${task.id})">Hapus</button>
		</div>
		`;
		
	//Masukkan li ke dalam ul(taskList)
		taskList.appendChild(li);
	});
	
	//Memanggil fungsi untuk menyimpan data ke LocalStorage
	saveToLocalStorage();
}

//Fungsi menyimpan data ke localStorage
function saveToLocalStorage() {
  localStorage.setItem('TASKS_DATA', JSON.stringify(tasks));
}

//Fungsi menghapus tugas berdasarkan ID 
	function deleteTask(id) {
		//Filter array: Hapus tugas yang ID nya diperintahkan
		tasks = tasks.filter(function(task) {
			return task.id !== id;
		});
		
		//Menampilkan ulang list yang sudah update
		renderTasks();
	}
	
// Panggil halaman saat pertama kali dibuat
renderTasks();