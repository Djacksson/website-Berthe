// Fonction pour normaliser le port
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) { return val; }
    if (port >= 0) { return port; }

    return false;
}

module.exports = {
    normalizePort
}