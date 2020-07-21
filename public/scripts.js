const form = document.querySelector('form');

form.addEventListener('submit', async e => {
  e.preventDefault();

  const formData = new FormData(form).entries();

  const response = await fetch('http://localhost:3000/api/shorten', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Object.fromEntries(formData))
  });

  const result = await response.json();

  document.getElementById('result').style.display = 'block';
  document.getElementById('short-url').value = result.shortUrl;
});

const copyBtn = document.getElementById('copy-btn');
copyBtn.onclick = () => {
  const copyText = document.getElementById('short-url');

  copyText.select();
  copyText.setSelectionRange(0, 99999);

  document.execCommand('copy');

  document.getElementById('copy-btn').innerHTML = 'Copied ✔︎';
}