const fullToolbarOptions = [
    [{ 'font': [] }],
    [{ 'size': ['small', false, 'large', 'huge'] }], // tamanhos
    ['bold', 'italic', 'underline', 'strike'],        // estilos
    [{ 'color': [] }, { 'background': [] }],          // cores
    [{ 'script': 'sub' }, { 'script': 'super' }],     // subscrito/sobrescrito
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],         // indentação
    [{ 'direction': 'rtl' }],                         // direção do texto
    [{ 'align': [] }],                                // alinhamento
    ['link', 'image', 'video'],                       // mídia
    ['clean']                                         // limpar formatação
];

const quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
        toolbar: fullToolbarOptions
    }
});

IMask(document.getElementById("telefone"), {
    mask: [
        '(00) 0000-0000',
        '(00) 00000-0000',
    ]
});

function textoInputHandler(textarea) {
    if (textarea.value.length > 100) {
        textarea.value = textarea.value.trimStart();
    }
    textarea.value = textarea.value.slice(0, 100);
    const tamanhoTexto = document.getElementById("tamanhoTexto");
    tamanhoTexto.innerText = textarea.value.length;
}

function mudarSpanIdade(rangeInput) {
    const idadeValor = document.getElementById("idadeValor");
    idadeValor.innerText = rangeInput.value;
}

function verSenha() {
    const senhaInput = document.getElementById("senha");
    const btnVerSenha = document.getElementById("btnVerSenha");
    if (senhaInput.type === "password") {
        senhaInput.type = "text";
        btnVerSenha.innerText = "Ocultar senha";
    } else {
        senhaInput.type = "password";
        btnVerSenha.innerText = "Ver senha";
    }
}
function login() {
    const nomeCompleto = document.getElementById("nomeCompleto").value;
    alert("Login realizado com sucesso! Bem-vindo, " + nomeCompleto + "!");
}

function sorteDoDia() {
    const frases = [
        "Hoje é um ótimo dia para aprender algo novo!",
        "A sorte favorece os corajosos.",
        "Seu esforço será recompensado em breve.",
        "Grandes coisas estão por vir!",
        "Acredite em você mesmo.",
        "O sucesso está mais próximo do que você imagina.",
        "Hoje é o dia perfeito para começar algo novo.",
        "Sua determinação vai te levar longe.",
        "Mantenha o foco e tudo dará certo.",
        "Um sorriso pode mudar seu dia inteiro.",
        "Você é capaz de mais do que imagina.",
        "A persistência é o caminho do êxito.",
        "Cada dia é uma nova oportunidade.",
        "Sua criatividade não tem limites.",
        "O melhor ainda está por vir.",
        "Confie no processo.",
        "Você está no caminho certo.",
        "Hoje será um dia produtivo!",
        "Sua positividade atrai coisas boas.",
        "Acredite: você consegue!"
    ];

    const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
    alert(fraseAleatoria);
}

function mudaCorFundo(corFundo) {
    document.getElementById("spanCorSelecionada").innerText = corFundo.toUpperCase();
    document.body.style.backgroundColor = corFundo;
}

// Drag and Drop functionality
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInputDrop');
const fileInfo = document.getElementById('fileInfo');
const fileName = document.getElementById('fileName');
const fileSize = document.getElementById('fileSize');

// Prevenir comportamento padrão para drag and drop
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// Destacar zona de drop quando arrastar sobre ela
['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, unhighlight, false);
});

function highlight() {
    dropZone.classList.add('border-primary', 'bg-base-300');
}

function unhighlight() {
    dropZone.classList.remove('border-primary', 'bg-base-300');
}

// Gerenciar o drop
dropZone.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
}

// Click para abrir seletor de arquivo
dropZone.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

function handleFiles(files) {
    if (files.length > 0) {
        const file = files[0];
        displayFileInfo(file);
    }
}

function displayFileInfo(file) {
    fileName.textContent = file.name;
    fileSize.textContent = `Tamanho: ${formatBytes(file.size)}`;
    fileInfo.classList.remove('hidden');
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}