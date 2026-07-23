function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
    
    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;
    
    return true;
}


function validarEmail(email) {
    const provedoresPermitidos = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'uol.com.br', 'bol.com.br', 'icloud.com', 'protonmail.com'];
    const dominio = email.split('@')[1]?.toLowerCase();
    return provedoresPermitidos.includes(dominio);
}


function validarTelefone(telefone) {
    const numero = telefone.replace(/\D/g, '');
    return numero.length === 11 && ['9','8','7','6'].includes(numero[2]); // DDD + 9 dígitos
}



document.getElementById('cadastroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    const form = this;

   
    form.querySelectorAll('input, select').forEach(el => {
        el.style.borderColor = '#ffcc00';
    });

    
    const nome = document.getElementById('nome').value.trim();
    if (nome.length < 5) {
        alert('Nome completo deve ter pelo menos 5 caracteres.');
        isValid = false;
    }

    
    const cpf = document.getElementById('cpf').value;
    if (!validarCPF(cpf)) {
        alert('CPF inválido! Verifique os dígitos.');
        document.getElementById('cpf').style.borderColor = 'red';
        isValid = false;
    }

    
    const email = document.getElementById('email').value.trim();
    if (!validarEmail(email)) {
        alert('E-mail inválido! Use apenas: Gmail, Hotmail, Outlook, Yahoo, UOL, Bol, etc.');
        document.getElementById('email').style.borderColor = 'red';
        isValid = false;
    }

    
    const telefone = document.getElementById('telefone').value;
    if (!validarTelefone(telefone)) {
        alert('Telefone inválido! Use formato brasileiro com 11 dígitos (ex: 11987654321)');
        document.getElementById('telefone').style.borderColor = 'red';
        isValid = false;
    }

    
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length !== 8) {
        alert('CEP deve ter 8 dígitos.');
        isValid = false;
    }

    
    const peso = parseFloat(document.getElementById('peso').value);
    if (isNaN(peso) || peso < 40 || peso > 150) {
        alert('Peso deve estar entre 40kg e 150kg.');
        isValid = false;
    }

    
    if (!document.getElementById('categoria').value) {
        alert('Selecione uma categoria.');
        isValid = false;
    }

    if (!isValid) return;

    
    alert('Cadastro validado e realizado com sucesso!\n\nJogador registrado no torneio de Muay Thai.');
    console.log('Cadastro completo enviado!');
    
    
});


document.getElementById('telefone').addEventListener('input', function() {
    let valor = this.value.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.substring(0, 11);
    
    if (valor.length > 10) {
        this.value = `(${valor.substring(0,2)}) ${valor.substring(2,7)}-${valor.substring(7)}`;
    } else if (valor.length > 6) {
        this.value = `(${valor.substring(0,2)}) ${valor.substring(2,6)}-${valor.substring(6)}`;
    }
});

document.getElementById('cpf').addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '').substring(0, 11);
});

document.getElementById('cep').addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '').substring(0, 8);
});
