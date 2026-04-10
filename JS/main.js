const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    menu.classList.toggle("active");
});

document.querySelectorAll(".header_link a").forEach(link => {
    link.addEventListener("click", () => {
        toggle.classList.remove("active");
        menu.classList.remove("active");
    });
});  



document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector('.form-contato');
  const button = form.querySelector('button');
  const btnText = button.querySelector('.btn-text');

  let ultimoEnvio = 0;
  let enviando = false;

  function mostrarErro(input, mensagem) {
    let erro = input.parentElement.querySelector('.erro-msg');

    if (!erro) {
      erro = document.createElement('span');
      erro.className = 'erro-msg';
      erro.style.color = 'red';
      erro.style.fontSize = '12px';
      erro.style.display = 'block';
      erro.style.marginTop = '5px';
      input.parentElement.appendChild(erro);
    }

    erro.textContent = mensagem;
    input.style.border = '2px solid red';
  }

  function limparErro(input) {
    const erro = input.parentElement.querySelector('.erro-msg');
    if (erro) erro.remove();
    input.style.border = '';
  }

  function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email);
  }

  function validarTelefone(telefone) {
    const numeros = telefone.replace(/\D/g, '');

    if (numeros.length < 10 || numeros.length > 11) return false;

    if (/^(\d)\1+$/.test(numeros)) return false;

    return true;
  }


  form.telefone.addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '');

    if (v.length > 11) v = v.slice(0, 11);

    if (v.length > 6) {
      this.value = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
    } else if (v.length > 2) {
      this.value = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    } else {
      this.value = v;
    }
  });


  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = form.nome;
    const email = form.email;
    const telefone = form.telefone;
    const mensagem = form.mensagem;

    let valido = true;

    [nome, email, telefone, mensagem].forEach(limparErro);
    if (nome.value.trim().length < 2) {
      mostrarErro(nome, 'Digite um nome válido');
      valido = false;
    }

    if (!validarEmail(email.value.trim())) {
      mostrarErro(email, 'Digite um email válido (ex: seuemail@gmail.com)');
      valido = false;
    }

    if (!validarTelefone(telefone.value.trim())) {
      mostrarErro(telefone, 'Digite um telefone válido');
      valido = false;
    }

    if (mensagem.value.trim().length < 5) {
      mostrarErro(mensagem, 'Mensagem muito curta');
      valido = false;
    }

    if (!valido) {
      btnText.textContent = 'Corrija os campos';
      setTimeout(() => btnText.textContent = 'Enviar', 2000);
      return;
    }

    if (form.empresa && form.empresa.value !== '') return;

    const agora = Date.now();
    if (agora - ultimoEnvio < 10000) {
      btnText.textContent = 'Espere um pouco...';
      setTimeout(() => btnText.textContent = 'Enviar', 2000);
      return;
    }

    if (enviando) return;

    ultimoEnvio = agora;
    enviando = true;
    button.disabled = true;
    btnText.textContent = 'Enviando...';

    emailjs.send(
      'service_b8r9si6',
      'template_oktjncc',
      {
        nome: nome.value,
        email: email.value,
        telefone: telefone.value,
        mensagem: mensagem.value
      },
      'Q9lfw5COKgYRqJVhK'
    ).then(
      () => {
        btnText.textContent = 'Enviado';
        form.reset();

        setTimeout(() => {
          btnText.textContent = 'Enviar';
          button.disabled = false;
          enviando = false;
        }, 3000);
      },
      (error) => {
        console.error(error);
        btnText.textContent = 'Erro ao enviar';

        setTimeout(() => {
          btnText.textContent = 'Tentar novamente';
          button.disabled = false;
          enviando = false;
        }, 3000);
      }
    );
  });

});