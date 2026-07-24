// ==================== FUNÇÕES DE VALIDAÇÃO ====================

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i-1]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i-1]) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf[10]);
}

function validarEmail(email) {
    const dominiosPermitidos = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'uol.com.br', 'bol.com.br', 'icloud.com'];
    const dominio = email.split('@')[1]?.toLowerCase();
    return dominiosPermitidos.includes(dominio);
}

function validarTelefone(tel) {
    const numero = tel.replace(/\D/g, '');
    return numero.length === 11;
}

// ==================== BUSCA DE CEP (ViaCEP API) ====================

async function buscarCEP(cep) {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return;

    const cepField = document.getElementById('cep');
    cepField.style.opacity = '0.7';

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = await response.json();

        if (data.erro) {
            alert('CEP não encontrado. Verifique o número digitado.');
            return;
        }

        // Preenche os campos automaticamente
        document.getElementById('endereco').value = data.logradouro || '';
        document.getElementById('bairro').value = data.bairro || '';
        document.getElementById('cidade').value = data.localidade || '';
        
        const estadoSelect = document.getElementById('estado');
        estadoSelect.value = data.uf || '';

        console.log('✅ Endereço preenchido via ViaCEP:', data);

    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        alert('Erro ao consultar o CEP. Verifique sua conexão.');
    } finally {
        cepField.style.opacity = '1';
    }
}

// ==================== EVENTOS ====================

document.getElementById('cadastroForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value;
    const peso = parseFloat(document.getElementById('peso').value);

    if (nome.length < 5) return alert('Nome completo deve ter pelo menos 5 caracteres.');
    if (!validarCPF(cpf)) return alert('CPF inválido!');
    if (!validarEmail(email)) return alert('E-mail inválido! Use Gmail, Hotmail, Outlook, etc.');
    if (!validarTelefone(telefone)) return alert('Telefone inválido! Use 11 dígitos (DDD + número).');
    if (isNaN(peso) || peso < 40 || peso > 150) return alert('Peso deve estar entre 40kg e 150kg.');

    alert(' Cadastro validado e realizado com sucesso!\n\nJogador inscrito no torneio.');
    console.log('Cadastro completo enviado!');
});

// Formatação em tempo real
document.getElementById('telefone').addEventListener('input', function() {
    let v = this.value.replace(/\D/g, '').substring(0, 11);
    if (v.length > 10) {
        this.value = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
    } else if (v.length > 6) {
        this.value = `(${v.slice(0,2)}) ${v.slice(2,6)}-${v.slice(6)}`;
    }
});

document.getElementById('cpf').addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '').substring(0, 11);
});

document.getElementById('cep').addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '').substring(0, 8);
});

// Busca automática de CEP (ao sair do campo)
document.getElementById('cep').addEventListener('blur', function() {
    buscarCEP(this.value);
});