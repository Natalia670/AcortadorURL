function storeUrl() {
    console.log('Stores the URL');
    // Javascript
    let urlname = document.getElementById('url').value;
    console.log('url', urlname);
  
    let payload = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: urlname})
    };
    fetch('/urls', payload)
      .then(response => {
        if (response.ok) {
          console.log(response)
          return response.json();
        } else {
          throw "Error en la llamada Ajax";
        }
      })
      .then(url => {
        document.getElementById('url').value = '';
        addUrl(url);
      })
      .catch(error => {
        console.log('Error: ', error);
      })
}

function addUrl(url){
    let html =
  `
    <br>
     <a class="card-text" onclick="updateRedirections(${url.id})" href="${url.longURL}" target="_blank">http://localhost:3000/${url.shortURL}</a>
  `;
  let node = document.createRange().createContextualFragment(html);
  document.getElementById('generated_url').prepend(node);
}

function updateRedirections(id){
    console.log(id);
    let payload = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id})
    };
  fetch('/updateRed', payload)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw "Error en la llamada Ajax";
      }
    })
    .catch(error => {
      console.log('Error: ', error);
    })
}

