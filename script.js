// OBJETO COM FUNÇÕES PARA ABRIR E FECHAR JANELA DE FORMULÁRIO 
// FUNÇÕES PARA ADICIONAR E REMOVER UMA CLASS DO CSS)
let layer = {
    open(){
        document
            .querySelector('.layer-overlay')
            .classList.add('active')
    },
    close(){
        document
            .querySelector('.layer-overlay')
            .classList.remove('active')
    }
}

// ARRAY CONTENDO AS INFORMAÇÕES DA TABELA (PROVISÓRIO)
let transactions = [
    {
        description: 'Luz',
        amount: -30000,
        date: "01/02/2021",
    },
    {
        description: 'Internet',
        amount: -10000,
        date: '01/02/2021',
    },
    {
        description: 'Website',
        amount: 100000,
        date: '01/02/2021',
    }
]

// OBJETO COM FUNÇÕES PARA REALIZAR SOMA DAS ENTRAS, SAÍDAS E TOTAL
let Transaction = {

    incomes() {
        // somar as entradas
    },
    expenses() {
        //somar as saídas
    },
    total(){
        //total 
    }

}

// OBJETO COM FUNÇÕES PARA ADICIONAR ITEMS NA TABELA
let DOM = {

    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction) {

        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)
        const html = `
        <tr>
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <th><i class="fas fa-minus-circle"></th>
        </tr>
        `
        return html
    }
   
}

// OBJETO COM FUNÇÕES DE UTILIDADES (EX: FORMATAR NÚM P/ MOEDA)
const Utils = {
    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : ""
        
        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        return signal + value
    }
}

// FAZ O PREENCHIMENTO DA TABELA
transactions.forEach(transaction =>{
    DOM.addTransaction(transaction)
})

