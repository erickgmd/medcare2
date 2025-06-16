 let currentAppointmentId = null;

        // Appointment management functions
        function cancelAppointment(appointmentId) {
            currentAppointmentId = appointmentId;
            document.getElementById('cancelModal').classList.add('active');
        }

        function rescheduleAppointment(appointmentId) {
            currentAppointmentId = appointmentId;
            document.getElementById('rescheduleModal').classList.add('active');
        }

        function closeModal() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('active');
            });
            currentAppointmentId = null;
        }

        function confirmCancel() {
            if (currentAppointmentId) {
                // Find and remove the appointment card
                const appointmentCards = document.querySelectorAll('.appointment-card');
                const cardToRemove = appointmentCards[currentAppointmentId - 1];
                
                if (cardToRemove) {
                    // Add cancelled status
                    cardToRemove.classList.remove('confirmed', 'pending');
                    cardToRemove.classList.add('cancelled');
                    
                    // Update status
                    const statusElement = cardToRemove.querySelector('.appointment-status');
                    statusElement.textContent = 'Cancelado';
                    statusElement.className = 'appointment-status status-cancelled';
                    
                    // Remove action buttons
                    const actionsElement = cardToRemove.querySelector('.appointment-actions');
                    actionsElement.innerHTML = '<span style="color: #e74c3c; font-weight: 600;">Consulta Cancelada</span>';
                    
                    // Show success message
                    showNotification('Consulta cancelada com sucesso!', 'success');
                }
            }
            closeModal();
        }

        function confirmReschedule() {
            showNotification('Redirecionando para reagendamento...', 'info');
            setTimeout(() => {
                // In a real app, this would redirect to the appointment scheduling page
                window.location.href = '#novo-agendamento';
            }, 1500);
            closeModal();
        }

        // Notification system
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 2rem;
                border-radius: 8px;
                color: white;
                font-weight: 600;
                z-index: 1001;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            `;
            
            switch(type) {
                case 'success':
                    notification.style.background = '#27ae60';
                    break;
                case 'error':
                    notification.style.background = '#e74c3c';
                    break;
                case 'info':
                    notification.style.background = '#3498db';
                    break;
                default:
                    notification.style.background = '#95a5a6';
            }
            
            notification.textContent = message;
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);
            
            // Remove after 3 seconds
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }

        // Sidebar navigation
        document.querySelectorAll('.sidebar-menu a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links
                document.querySelectorAll('.sidebar-menu a').forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Simulate content loading
                const contentType = this.getAttribute('href').replace('#', '');
                loadContent(contentType);
            });
        });

        function loadContent(type) {
            const appointmentsList = document.getElementById('appointmentsList');
            const pageTitle = document.querySelector('.page-title');
            const pageSubtitle = document.querySelector('.page-subtitle');
            
            switch(type) {
                case 'consultas-agendadas':
                    pageTitle.textContent = 'Minhas Consultas Agendadas';
                    pageSubtitle.textContent = 'Gerencie suas consultas médicas';
                    // Keep existing content
                    break;
                    
                case 'exames-agendados':
                    pageTitle.textContent = 'Exames Agendados';
                    pageSubtitle.textContent = 'Acompanhe seus exames médicos';
                    appointmentsList.innerHTML = `
                        <div class="empty-state">
                            <div class="empty-icon">🔬</div>
                            <h3 class="empty-title">Nenhum exame agendado</h3>
                            <p class="empty-text">Você não possui exames agendados no momento.</p>
                            <button class="btn btn-primary">Agendar Exame</button>
                        </div>
                    `;
                    break;
                    
                case 'solicitacoes-pendentes':
                    pageTitle.textContent = 'Solicitações Pendentes';
                    pageSubtitle.textContent = 'Acompanhe suas solicitações em análise';
                    appointmentsList.innerHTML = `
                        <div class="empty-state">
                            <div class="empty-icon">⏳</div>
                            <h3 class="empty-title">Nenhuma solicitação pendente</h3>
                            <p class="empty-text">Todas as suas solicitações foram processadas.</p>
                        </div>
                    `;
                    break;
                    
                case 'nova-consulta':
                    showNotification('Redirecionando para agendamento...', 'info');
                    setTimeout(() => {
                        window.location.href = '#novo-agendamento';
                    }, 1000);
                    break;
            }
        }

        // Close modal when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeModal();
                }
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            showNotification('Bem-vindo ao MedCare!', 'success');
        });