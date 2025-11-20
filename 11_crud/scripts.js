const telefoneMask = IMask(
    document.getElementById("telefoneAdd"),
    { mask: ['(00) 0000-0000', '(00) 00000-0000'] },
);

const contatos = JSON.parse(localStorage.getItem("contatos") || "[]");
const modalExcluir = document.getElementById("modalExcluir");

function carregarTabela() {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = "";

    contatos.forEach((contato, index) => {
        let linha = document.getElementById("templateLinha").innerHTML;

        linha = linha.replaceAll("__index__", index);
        linha = linha.replaceAll("__nome__", contato.nome);
        linha = linha.replaceAll("__telefone__", contato.telefone);
        linha = linha.replaceAll("__email__", contato.email);

        const tr = document.createElement("tr");
        tr.id = `linha${index}`;
        tr.innerHTML = linha;

        tbody.appendChild(tr);
    });
}

function validarContato(nome, telefone, email) {
    const erros = [];

    if (nome.length < 3) {
        erros.push("O nome deve ter pelo menos 3 caracteres.");
    }
    if (!/^\(\d{2}\) \d{4,5}-\d{4}$/.test(telefone)) {
        erros.push("O telefone deve estar no formato (00) 0000-0000 ou (00) 00000-0000.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        erros.push("O e-mail deve ser válido.");
    }

    return erros;
}

function adicionarContato(formulario) {
    event.preventDefault();

    const nome = formulario.nome.value.trim();
    const telefone = formulario.telefone.value.trim();
    const email = formulario.email.value.trim();

    const erros = validarContato(nome, telefone, email);
    if (erros.length > 0) {
        alert(erros.join("\n\n"));
        return;
    }

    contatos.push({ nome, telefone, email });
    localStorage.setItem("contatos", JSON.stringify(contatos));

    carregarTabela();
    formulario.reset();
    telefoneMask.updateValue();
}

let indexParaExcluir = null;

function confirmarExclusão(index) {
    indexParaExcluir = index;
    modalExcluir.showModal();
}

function excluir() {
    if (indexParaExcluir === null) return;

    contatos.splice(indexParaExcluir, 1);
    localStorage.setItem("contatos", JSON.stringify(contatos));

    carregarTabela();
    modalExcluir.close();
}

function editarLinha(index) {
    carregarTabela();

    const contato = contatos[index];
    let linha = document.getElementById("templateFormulario").innerHTML;

    linha = linha.replaceAll("__index__", index);
    linha = linha.replaceAll("__nome__", contato.nome);
    linha = linha.replaceAll("__telefone__", contato.telefone);
    linha = linha.replaceAll("__email__", contato.email);

    const tr = document.getElementById(`linha${index}`);
    tr.innerHTML = linha;

    IMask(
        document.getElementById(`telefoneInput${index}`),
        { mask: ['(00) 0000-0000', '(00) 00000-0000'] },
    );
}

function salvarLinha(index) {
    const nome = document.getElementById(`nomeInput${index}`).value.trim();
    const telefone = document.getElementById(`telefoneInput${index}`).value.trim();
    const email = document.getElementById(`emailInput${index}`).value.trim();

    const erros = validarContato(nome, telefone, email);
    if (erros.length > 0) {
        alert(erros.join("\n\n"));
        return;
    }

    contatos[index] = { nome, telefone, email };
    localStorage.setItem("contatos", JSON.stringify(contatos));

    carregarTabela();
}

document.addEventListener("DOMContentLoaded", carregarTabela);