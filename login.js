  let loginAttempts = 0;
        const maxAttempts = 3;

        function togglePassword() {
            const passwordInput = document.getElementById('password');
            const toggleBtn = document.querySelector('.toggle-btn');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleBtn.textContent = '🙈';
            } else {
                passwordInput.type = 'password';
                toggleBtn.textContent = '👁️';
            }
        }

        function showMessage(type, message) {
            const errorDiv = document.getElementById('errorMessage');
            const successDiv = document.getElementById('successMessage');
            
            // Hide both messages first
            errorDiv.style.display = 'none';
            successDiv.style.display = 'none';
            
            if (type === 'error') {
                errorDiv.textContent = message;
                errorDiv.style.display = 'block';
            } else if (type === 'success') {
                successDiv.textContent = message;
                successDiv.style.display = 'block';
            }
        }

        function handleForgotPassword(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            
            if (!email) {
                showMessage('error', 'Digite seu e-mail para recuperar a senha.');
                document.getElementById('email').focus();
                return;
            }
            
            showMessage('success', 'Instruções de recuperação enviadas para seu e-mail.');
        }

        function handleSupport(event) {
            event.preventDefault();
            alert('Suporte Técnico MedCare\n\nTelefone: (11) 3000-0000\nE-mail: suporte@medcare.com.br\nHorário: 08:00 às 18:00');
        }

        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function validatePassword(password) {
            return password.length >= 6;
        }

        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const loginBtn = document.getElementById('loginBtn');
            
            // Clear previous messages
            document.getElementById('errorMessage').style.display = 'none';
            document.getElementById('successMessage').style.display = 'none';
            
            // Validation
            if (!email || !password) {
                showMessage('error', 'Todos os campos são obrigatórios.');
                return;
            }

            if (!validateEmail(email)) {
                showMessage('error', 'Digite um e-mail válido.');
                document.getElementById('email').focus();
                return;
            }

            if (!validatePassword(password)) {
                showMessage('error', 'A senha deve ter pelo menos 6 caracteres.');
                document.getElementById('password').focus();
                return;
            }

            // Check max attempts
            if (loginAttempts >= maxAttempts) {
                showMessage('error', 'Muitas tentativas de login. Tente novamente em 15 minutos.');
                loginBtn.disabled = true;
                return;
            }

            // Loading state
            loginBtn.classList.add('loading');
            loginBtn.disabled = true;

            // Simulate authentication
            setTimeout(() => {
                loginBtn.classList.remove('loading');
                loginBtn.disabled = false;
                
                // Simulate authentication logic
                if (email === 'admin@medcare.com.br' && password === 'admin123') {
                    showMessage('success', 'Acesso autorizado. Redirecionando para o painel...');
                    setTimeout(() => {
                        // Redirect to dashboard
                        console.log('Redirecting to dashboard...');
                    }, 2000);
                } else {
                    loginAttempts++;
                    const remainingAttempts = maxAttempts - loginAttempts;
                    
                    if (remainingAttempts > 0) {
                        showMessage('error', `Credenciais inválidas. ${remainingAttempts} tentativa(s) restante(s).`);
                    } else {
                        showMessage('error', 'Conta temporariamente bloqueada. Contate o suporte.');
                        loginBtn.disabled = true;
                    }
                    
                    // Clear password field
                    document.getElementById('password').value = '';
                    document.getElementById('password').focus();
                }
            }, 1500);
        });

        // Input validation feedback
        document.getElementById('email').addEventListener('blur', function() {
            const email = this.value.trim();
            if (email && !validateEmail(email)) {
                this.style.borderColor = '#dc2626';
            } else {
                this.style.borderColor = '#d1d5db';
            }
        });

        document.getElementById('password').addEventListener('blur', function() {
            const password = this.value;
            if (password && !validatePassword(password)) {
                this.style.borderColor = '#dc2626';
            } else {
                this.style.borderColor = '#d1d5db';
            }
        });

        // Auto-focus on email field
        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('email').focus();
        });