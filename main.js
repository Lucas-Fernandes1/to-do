'use strict';

// let bancoDados = [
//     // {'tarefa':'Estudar JS', 'status':''},
//     // {'tarefa':'Assistir', 'status':'checked'},
// ];

const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setBanco = (bancoDados) => localStorage.setItem('todoList', JSON.stringify(bancoDados));
let outAtividadesFeitas = document.getElementById("outAtividadesFeitas");

const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    let data = new Date();
    let day = data.getDate();
    let month = data.getMonth()+1;
    let hora = data.getHours();
    let min = data.getMinutes();
    let dataComp = day + '/' + month + '|' /*+ hora + ':' + min + '|'*/;
    let dataDia = document.getElementById("dataDia");
    let meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    let year = data.getFullYear();
    
    //dataDia.textContent = `${day} | ${meses[month - 1]} | ${year}`
    item.innerHTML = `
        ${dataComp}
        <input type="checkbox" ${status} data-indice = ${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice = ${indice}>
       `
    document.getElementById('todoList').appendChild(item);
}

const zerarDadosHojeMaiorQueDia = (dia) => {
    console.log(day)
}

const limparTarefas = () => {
    const todoList = document.getElementById('todoList');
    while(todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const atualizarTela = () => {
    limparTarefas();
    const bancoDados = getBanco();
    bancoDados.forEach((item, indice) => criarItem (item.tarefa, item.status, indice));
}


const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
     
    if(tecla === 'Enter') {
        const bancoDados = getBanco();
        bancoDados.push({'tarefa': texto});
        setBanco(bancoDados);
        atualizarTela();
        evento.target.value = '';
    }
}

const removerItem = (indice) => {
    const bancoDados = getBanco();
    bancoDados.splice(indice, 1);
    setBanco(bancoDados);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const bancoDados = getBanco();
    bancoDados[indice].status = bancoDados[indice].status === '' ? 'checked' : '';
    setBanco(bancoDados);
    atualizarTela();  
}

const clickItem = (evento) => {
    const elemento = evento.target;
    if(elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice)
        atualizarItem(indice)
    } else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem(indice)
    }
}

function limpBanco() {
    let apagar = confirm('Você deseja realmente limpar as tarefas?');
   
    if(apagar) {
        localStorage.getItem('todoList');
        localStorage.clear();
        location.reload();
    } else {
        location.reload();
    }  
}

function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    w=window.open();
    w.document.write(printContents);
    w.print();
    w.close();
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);
document.getElementById('btnClean').addEventListener('click', limpBanco);
atualizarTela();


