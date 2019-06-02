const getAndSetClientId = link => {
  fetch("/getClientId")
    .then(res => res.text())
    .then(out => setClientId(out));
};

const setClientId = clientId => {
  const link = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
  const button = document.getElementById("btn");
  const text = button.innerHTML;
  button.innerHTML = `<a href = ${link}> ${text} </a>`;
};

const initialize = () => {
  getAndSetClientId();
};

window.onload = initialize;
