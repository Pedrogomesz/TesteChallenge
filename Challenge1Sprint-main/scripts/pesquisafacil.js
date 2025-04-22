const searchInput = document.getElementById('searchInput');
    const results = document.getElementById('results');
    const voiceBtn = document.getElementById('voiceBtn');

    // Função para filtrar os itens
    function filtrarItens() {
      const termo = searchInput.value.toLowerCase();
      const itens = results.getElementsByClassName('item');

      Array.from(itens).forEach(item => {
        const texto = item.textContent.toLowerCase();
        item.style.display = texto.includes(termo) ? 'block' : 'none';
      });
    }

    // Evento de digitação
    searchInput.addEventListener('input', filtrarItens);

    // Reconhecimento de voz
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'pt-BR';
      recognition.continuous = false;
      recognition.interimResults = false;

      voiceBtn.addEventListener('click', () => {
        recognition.start();
      });

      recognition.onresult = (event) => {
        const resultado = event.results[0][0].transcript;
        searchInput.value = resultado;
        filtrarItens();
      };

      recognition.onerror = (event) => {
        alert('Erro no reconhecimento de voz: ' + event.error);
      };
    } else {
      voiceBtn.disabled = true;
      voiceBtn.title = "Reconhecimento de voz não suportado no seu navegador.";
    }