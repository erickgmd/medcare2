  // Calendar functionality
        class AppointmentCalendar {
            constructor() {
                this.currentDate = new Date();
                this.selectedDate = null;
                this.selectedTime = null;
                this.doctors = {
                    cardiologia: ['Dr. Carlos Silva', 'Dra. Ana Santos'],
                    dermatologia: ['Dr. Pedro Lima', 'Dra. Maria Costa'],
                    neurologia: ['Dr. João Oliveira', 'Dra. Clara Rocha'],
                    pediatria: ['Dra. Lucia Mendes', 'Dr. Rafael Torres'],
                    ginecologia: ['Dra. Fernanda Alves', 'Dra. Patricia Duarte'],
                    ortopedia: ['Dr. Bruno Carvalho', 'Dr. Marcos Reis'],
                    oftalmologia: ['Dra. Juliana Pinto', 'Dr. André Barbosa']
                };
                this.timeSlots = [
                    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
                    '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
                    '16:00', '16:30', '17:00', '17:30'
                ];
                this.init();
            }

            init() {
                this.renderCalendar();
                this.renderTimeSlots();
                this.attachEventListeners();
            }

            attachEventListeners() {
                document.getElementById('prevMonth').addEventListener('click', () => {
                    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
                    this.renderCalendar();
                });

                document.getElementById('nextMonth').addEventListener('click', () => {
                    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
                    this.renderCalendar();
                });

                document.getElementById('specialty').addEventListener('change', (e) => {
                    this.updateDoctors(e.target.value);
                });

                document.getElementById('appointmentForm').addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.submitAppointment();
                });
            }

            renderCalendar() {
                const calendar = document.getElementById('calendar');
                const monthYear = document.getElementById('monthYear');
                
                const year = this.currentDate.getFullYear();
                const month = this.currentDate.getMonth();
                
                const monthNames = [
                    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
                ];
                
                monthYear.textContent = `${monthNames[month]} ${year}`;
                
                const firstDay = new Date(year, month, 1);
                const lastDay = new Date(year, month + 1, 0);
                const startDate = new Date(firstDay);
                startDate.setDate(startDate.getDate() - firstDay.getDay());
                
                const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
                
                calendar.innerHTML = '';
                
                // Header
                days.forEach(day => {
                    const headerCell = document.createElement('div');
                    headerCell.className = 'calendar-header-cell';
                    headerCell.textContent = day;
                    calendar.appendChild(headerCell);
                });
                
                // Calendar days
                const today = new Date();
                for (let i = 0; i < 42; i++) {
                    const cellDate = new Date(startDate);
                    cellDate.setDate(startDate.getDate() + i);
                    
                    const cell = document.createElement('div');
                    cell.className = 'calendar-cell';
                    cell.textContent = cellDate.getDate();
                    
                    if (cellDate.getMonth() !== month) {
                        cell.classList.add('other-month');
                    }
                    
                    if (cellDate.toDateString() === today.toDateString()) {
                        cell.classList.add('today');
                    }
                    
                    if (cellDate >= today && cellDate.getMonth() === month) {
                        cell.addEventListener('click', () => {
                            document.querySelectorAll('.calendar-cell.selected').forEach(c => {
                                c.classList.remove('selected');
                            });
                            cell.classList.add('selected');
                            this.selectedDate = new Date(cellDate);
                            this.renderTimeSlots();
                        });
                    } else if (cellDate < today) {
                        cell.style.opacity = '0.5';
                        cell.style.cursor = 'not-allowed';
                    }
                    
                    calendar.appendChild(cell);
                }
            }

            renderTimeSlots() {
                const timeSlotsContainer = document.getElementById('timeSlots');
                timeSlotsContainer.innerHTML = '';
                
                this.timeSlots.forEach(time => {
                    const slot = document.createElement('div');
                    slot.className = 'time-slot';
                    slot.textContent = time;
                    
                    // Simulate some unavailable slots
                    const isUnavailable = Math.random() < 0.3;
                    if (isUnavailable) {
                        slot.classList.add('unavailable');
                    } else {
                        slot.addEventListener('click', () => {
                            document.querySelectorAll('.time-slot.selected').forEach(s => {
                                s.classList.remove('selected');
                            });
                            slot.classList.add('selected');
                            this.selectedTime = time;
                        });
                    }
                    
                    timeSlotsContainer.appendChild(slot);
                });
            }

            updateDoctors(specialty) {
                const doctorSelect = document.getElementById('doctor');
                doctorSelect.innerHTML = '<option value="">Selecione um médico</option>';
                
                if (specialty && this.doctors[specialty]) {
                    this.doctors[specialty].forEach(doctor => {
                        const option = document.createElement('option');
                        option.value = doctor.toLowerCase().replace(/\s+/g, '-');
                        option.textContent = doctor;
                        doctorSelect.appendChild(option);
                    });
                }
            }

            submitAppointment() {
                const specialty = document.getElementById('specialty').value;
                const doctor = document.getElementById('doctor').value;
                const healthPlan = document.getElementById('healthPlan').value;
                const symptoms = document.getElementById('symptoms').value;
                
                if (!specialty || !doctor || !healthPlan || !this.selectedDate || !this.selectedTime) {
                    alert('Por favor, preencha todos os campos obrigatórios e selecione uma data e horário.');
                    return;
                }
                
                const appointmentData = {
                    specialty,
                    doctor,
                    healthPlan,
                    date: this.selectedDate.toLocaleDateString('pt-BR'),
                    time: this.selectedTime,
                    symptoms
                };
                
                // Simulate API call
                alert(`Agendamento realizado com sucesso!\n\nDetalhes:\nEspecialidade: ${specialty}\nMédico: ${document.getElementById('doctor').selectedOptions[0].textContent}\nData: ${appointmentData.date}\nHorário: ${appointmentData.time}`);
                
                // Reset form
                document.getElementById('appointmentForm').reset();
                this.selectedDate = null;
                this.selectedTime = null;
                document.querySelectorAll('.selected').forEach(el => {
                    el.classList.remove('selected');
                });
            }
        }

        // Initialize the application
        document.addEventListener('DOMContentLoaded', () => {
            new AppointmentCalendar();
        });