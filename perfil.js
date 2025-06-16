function showProfileSection(section) {
            // Hide all sections
            const sections = ['dados', 'contato', 'medico', 'preferencias', 'seguranca'];
            sections.forEach(s => {
                const element = document.getElementById(s + '-section');
                if (element) element.style.display = 'none';
            });

            // Show selected section
            const targetSection = document.getElementById(section + '-section');
            if (targetSection) targetSection.style.display = 'block';

            // Update active menu item
            document.querySelectorAll('.sidebar-menu a').forEach(a => a.classList.remove('active'));
            event.target.classList.add('active');
        }

        function changeAvatar() {
            const colors = ['#4ecdc4', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const avatar = document.querySelector('.profile-avatar');
            avatar.style.background = `linear-gradient(135deg, ${randomColor}, #44a08d)`;
        }

        function salvarPerfil() {
            const notification = document.getElementById('notification');
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);

            // Simulate save animation
            const btn = event.target;
            const originalText = btn.textContent;
            btn.textContent = 'Salvando...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1500);
        }

        function cancelarEdicao() {
            if (confirm('Tem certeza que deseja cancelar? As alterações não salvas serão perdidas.')) {
                // Reset form values or reload page
                location.reload();
            }
        }

        function showSection(section) {
            // This would handle navigation to other sections
            console.log('Navigating to:', section);
        }

        // Add some interactive behaviors
        document.addEventListener('DOMContentLoaded', function() {
            // Add focus animations to form inputs
            const inputs = document.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('focus', function() {
                    this.parentElement.style.transform = 'translateY(-2px)';
                    this.parentElement.style.transition = 'transform 0.3s ease';
                });

                input.addEventListener('blur', function() {
                    this.parentElement.style.transform = 'translateY(0)';
                });
            });

            // Format CPF input
            const cpfInput = document.getElementById('cpf');
            if (cpfInput) {
                cpfInput.addEventListener('input', function(e) {
                    let value = e.target.value.replace(/\D/g, '');
                    value = value.replace(/(\d{3})(\d)/, '$1.$2');
                    value = value.replace(/(\d{3})(\d)/, '$1.$2');
                    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                    e.target.value = value;
                });
            }

            // Format phone input
            const phoneInput = document.getElementById('telefone');
            if (phoneInput) {
                phoneInput.addEventListener('input', function(e) {
                    let value = e.target.value.replace(/\D/g, '');
                    value = value.replace(/(\d{2})(\d)/, '($1) $2');
                    value = value.replace(/(\d{5})(\d)/, '$1-$2');
                    e.target.value = value;
                });
            }

            // Format CEP input
            const cepInput = document.getElementById('cep');
            if (cepInput) {
                cepInput.addEventListener('input', function(e) {
                    let value = e.target.value.replace(/\D/g, '');
                    value = value.replace(/(\d{5})(\d)/, '$1-$2');
                    e.target.value = value;
                });
            }
        });