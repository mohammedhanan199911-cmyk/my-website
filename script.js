function showMessage() {
    const card = document.getElementById('status-card');
    if (card.classList.contains('hidden')) {
        card.classList.remove('hidden');
    } else {
        card.classList.add('hidden');
    }
}
