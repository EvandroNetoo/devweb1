async function fetchDadosPais(nomePais) {
    const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(nomePais)}`;

    return await fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('País não encontrado');
            }
            return response.json();
        })
        .then(data => data[0])
        .catch(error => {
            console.error('Erro ao buscar dados do país:', error);
            throw error;
        });
}

function setDados(dadosPais) {
    document.getElementById('nome').textContent =
        dadosPais?.translations?.por?.common ?? 'Carregando...';

    document.getElementById('sigla').textContent =
        dadosPais?.cca2 ?? 'Carregando...';

    document.getElementById('capital').textContent =
        dadosPais?.capital?.[0] ?? 'Não informado';

    document.getElementById('continente').textContent =
        dadosPais?.continents?.[0] ?? 'Não informado';

    document.getElementById('populacao').textContent =
        dadosPais?.population?.toLocaleString('pt-BR') ?? 'Não informado';

    document.getElementById('area').textContent =
        dadosPais?.area?.toLocaleString('pt-BR') ?? 'Não informado';

    document.getElementById('bandeira').src =
        dadosPais?.flags?.png ?? '';
}

async function enviarFormulario(event) {
    event.preventDefault();
    const countryName = document.getElementById('nomePais').value;

    try {
        setDados({});
        const dadosPais = await fetchDadosPais(countryName);
        setDados(dadosPais);
    } catch (error) {
        alert('Erro ao buscar dados do país. Verifique o nome e tente novamente.');
    }
}

document.getElementById('formulario').addEventListener('submit', async (event) => { await enviarFormulario(event) });