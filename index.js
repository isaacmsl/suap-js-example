const axios = require('axios')

const api = axios.create({
    baseURL: `https://suap.ifrn.edu.br/api/v2/`
})

require('dotenv').config()

const user = {
    username: process.env.MATRICULA,
    password: process.env.SENHA
}

api.post('autenticacao/token/', user)
    .then(response => {
        const accessToken = 'JWT ' + response.data.token

        api.get('minhas-informacoes/meus-dados/', {
            headers: { Authorization: accessToken }
        }).then(response => {
            console.log(response.data)
        })
    })
    .catch(err => {
        const status = err.response.status

        if (status === 401) {
            console.error('Erro: Matricula ou senha incorreta(s)')
        } else {
            console.error('Erro inesperado :*')
        }
    })