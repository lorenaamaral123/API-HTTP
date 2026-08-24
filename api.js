import http from 'node:http';

const porta = 3000;

const tarefas = [
    { id: 1, nome: "Tarefa PTAS" },
    { id: 2, nome: "Comprar uma RTX 5090" }
];

const server = http.createServer((requisicao, resposta) => {
    resposta.setHeader('content-type', 'application/json');

    if (requisiscao.method == 'get' && requisicao.url == '/tarefas') {
        resposta.statusCode = 200;
        resposta.end(JSON.stringify(tarefas));
    } else if (requisicao.method == 'POST' && requisicao.url == '/tarefas') {
        let body = '';

        requisicao.on('data', (chunk) => {
            body += chunk.toString();
        });

        requisicao.on('end', () => {
            try {
                const novaTarefa = JSON.parse(body);

                if (!novaTarefa.nome) {
                    resposta.statusCode = 400;
                    resposta.end(JSON.stringify({ error: "O campo 'nome' é obrigatório." }));
                }

                const tarefaCriada = {
                    id: tarefas.length + 1,
                    nome: novaTarefa.titulo
                };

                tarefas.push(tarefaCriada);

                resposta.statusCode = 201;
                resposta.end(JSON.stringify(tarefaCriada));
            } catch (error) {
                resposta.statusCode = 400;
                resposta.end(JSON.stringify(error: 'Formato JSON inválido!'));
            }
        });
    } else {
        resposta.statusCode = 404;
        resposta.end(JSON.stringify(error: 'Rota não encontrada.'));
    }
});


server.listen(porta, () => {
    console.log(`servidor funcionando na porta ${porta}`);
});