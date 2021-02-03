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
const Storage = {
    get(){
        return JSON.parse(localStorage.getItem("dev.finances: transactions")) ||
        []
    },

    set(transactions){
        localStorage.setItem("dev.finances: transactions", JSON.stringify(transactions))
    }
}


// OBJETO COM FUNÇÕES PARA REALIZAR SOMA DAS ENTRAS, SAÍDAS E TOTAL
let Transaction = {

    all: Storage.get(),

    add(transaction){
        Transaction.all.push(transaction)

        App.reload()
    },

    remove(index){
        Transaction.all.splice(index, 1)

        App.reload()
    },

    incomes() {
        let income = 0;
        Transaction.all.forEach(transaction =>{
            if (transaction.amount > 0 ) {
                income += transaction.amount;
            } 
        }) 
        
        return income;
    },

    expenses() {
        let expense = 0;
        Transaction.all.forEach(transaction =>{
            if (transaction.amount < 0 ) {
                expense += transaction.amount;
            } 
        }) 
        
        return expense;
    },

    total(){
        return this.incomes() + this.expenses();
    },

}

// OBJETO COM FUNÇÕES PARA ADICIONAR ITEMS NA TABELA
let DOM = {

    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        tr.dataset.index = index

        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction, index) {

        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)
        const html = `
        <tr>
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <th><i onclick="Transaction.remove(${index})" class="fas fa-minus-circle"></th>
        </tr>
        `
        return html
    },

    updateBalance() {
        document
        .querySelector('#incomeDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.incomes());
        document
        .querySelector('#expenseDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.expenses());
        document
        .querySelector('#totalDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.total());
    },

    clearTransactions(){
        DOM.transactionsContainer.innerHTML = ""
    },
   
}

// OBJETO COM FUNÇÕES DE UTILIDADES (EX: FORMATAR NÚM P/ MOEDA)
const Utils = {
    formatAmount(value){
        value = Number(value) * 100
        return value
    },

    formatDate(date){
       const splittedDate = date.split("-")
       return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

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

// OBJETO COM FUNÇÕES P/ ARMAZENAR NO STORAGE
const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues(){
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },
     
    
    validateFields(){
        const { description, amount, date } = Form.getValues()
        
        if ( description.trim() === "" || 
             amount.trim() === "" ||
             date.trim() === "") {
                throw new Error("Por favor, preencha todos os campos")

        }
    },

    formatValues(){
        let { description, amount, date } = Form.getValues()

        amount = Utils.formatAmount(amount)
        date = Utils.formatDate(date)

        return {
            description,
            amount,
            date
        }
    },

    clearFields(){
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },


    submit(event){
        event.preventDefault()

        try{
            Form.validateFields()
            const transaction = Form.formatValues()
            Transaction.add(transaction)
            Form.clearFields()
            layer.close()

        } catch (error){
            alert(error.message)
        }

        
    }
}




const App = {
    init(){

        // FAZ O PREENCHIMENTO DA TABELA
        Transaction.all.forEach(DOM.addTransaction)

        DOM.updateBalance()

        Storage.set(Transaction.all)
    },
    reload(){
        DOM.clearTransactions()
        App.init()
    },
}

App.init()









