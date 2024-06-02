window.onerror = function (msg, url, line, col, error) {
    jSuites.notification({
        error: 0,
        name: 'Error',
        message: error.message,
        stack: error.stack
    });
}