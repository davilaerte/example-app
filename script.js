function checkCode() {
    const codigo = document.getElementById('codigoInput').value;
    if (codigo) {
        
        const url = `https://script.google.com/macros/s/AKfycbznfu0HeHVGFqW3WkBLuCgfN1AromYH4sPF-6gqdDxcuDtGTuzYx9fv034VX7Ke3qPCbg/exec?code=${codigo}`;

        fetch(url)
        .then(response => response.json())  // Converte a resposta em formato JSON
        .then(data => {
          // Aqui você pode tratar a resposta, dependendo do que retornar da sua API
          if (data.status === 'sucesso') {
            console.log('Código encontrado! E-mail associado:', data.email);
            sessionStorage.setItem('codigo', codigo);
            sessionStorage.setItem('email', data.email);
            window.location.href = 'action.html';  // Navega para a próxima página
          } else {
            console.log('Erro:', data.mensagem);  // Exibe a mensagem de erro, se o código não for encontrado
          }
        })
        .catch(error => {
          console.error('Erro na requisição:', error);  // Trata possíveis erros de requisição
        });
    } else {
        alert('Por favor, insira um código válido!');
    }
}

function makeAction() {
    const codigo = sessionStorage.getItem('codigo');
    const email = sessionStorage.getItem('email');
    if (codigo) {
        const url = `https://script.google.com/macros/s/AKfycbznfu0HeHVGFqW3WkBLuCgfN1AromYH4sPF-6gqdDxcuDtGTuzYx9fv034VX7Ke3qPCbg/exec`;
  
        const dados = {
          email: email,
          code: codigo,
          time: new Date()
        };
      
        fetch(url, {
          method: 'POST',
          body: JSON.stringify(dados)
        })
        .then(response => response.json())
        .then(data => {
          if (data.status === 'sucesso') {
            console.log('Dados gravados com sucesso!');
            alert(`Ação realizada com o código: ${codigo}`);
          } else {
            console.log('Erro:', data.mensagem);
          }
        })
        .catch(error => {
          console.error('Erro na requisição:', error);
        });
    } else {
        alert('Código não encontrado!');
    }
}
