const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    try {
        // Специально вызываем ошибку для тестирования
        throw new Error('Test Error');
    } catch (err) {
        // Логируем ошибку в файл errors.log
        fs.appendFile('errors.log', `${new Date().toISOString()} - ${err.message}\n`, (fsErr) => {
            if (fsErr) {
                console.error('Error writing to log file:', fsErr);
            }
        });

        // Формируем ответ с ошибкой
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
