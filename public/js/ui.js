export function showLoading() {
  const existingLoader = document.getElementById('loader');
  if (existingLoader) return;
  const loader = document.createElement('div');
  loader.id = 'loader';
  loader.style.cssText = `
    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
    border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%;
    width: 30px; height: 30px; animation: spin 1s linear infinite;
  `;
  document.body.appendChild(loader);
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    </style>
  `);
}

export function hideLoading() {
  const loader = document.getElementById('loader');
  if (loader) loader.remove();
}

export function showError(elementId, message) {
  console.log('Showing error:', message);
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    setTimeout(() => (errorElement.style.display = 'none'), 5000);
  }
}