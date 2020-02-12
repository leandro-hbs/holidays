function pascoaDay() {
    let dataAtual = new Date();
    let ano = dataAtual.getFullYear();
    let d = (19 * (ano % 19) + 24) % 30;
    let e = ((2 * (ano % 4)) + (4 * (ano % 7)) + (6 * (d)) + 5) % 7;
    if ((d + e) > 9){
        var dia = (d + e) - 9;
        var mes = '04';
    } else {
        var dia = (d + e) + 22;
        var mes = '03';
    }
    resultado = mes + '/' + String(dia) + '/' + String(ano);
    return resultado;
}

class Feriados {
    constructor(){
        this.titulo = document.getElementById('titulo');
        this.tabela = document.getElementById('feriados');
        this.dataAtual = new Date();
        let ano = this.dataAtual.getFullYear();
        let pascoa = new Date(pascoaDay());
        this.feriados = new Map();
        this.feriados.set('Ano Novo', new Date('1/1/'+ano));
        this.feriados.set('Carnaval', new Date(pascoa.getTime() - (47 * 24 * 60 * 60 * 1000)));
        this.feriados.set('Dia da Páscoa', new Date(pascoa));
        this.feriados.set('Tiradentes', new Date('4/21/'+ano));
        this.feriados.set('Dia do Trabalho', new Date('5/1/'+ano));
        this.feriados.set('São João', new Date(pascoa.getTime() + (60 * 24 * 60 * 60 * 1000)));
        this.feriados.set('Dia da Independência', new Date('9/7/'+ano));
        this.feriados.set('Dia das Crianças', new Date('10/12/'+ano));
        this.feriados.set('Dia de Finados', new Date('11/2/'+ano));
        this.feriados.set('Dia da Proclamação da República', new Date('11/15/'+ano));
        this.feriados.set('Natal', new Date('12/25/'+ano));
    }

    showHolidays(){
        let rows = "";
        let next = 0;
        for (let [key, value] of this.feriados) {
            rows += `<tr>
                        <td>${key}</td>
                        <td>${value.getDate()}/${value.getMonth()+1}/${value.getFullYear()}</td>
                        <td>
                            <button type="button" onclick='info("${key}")' class="btn">
                                <i class="fas fa-clock"></i>
                            </button>
                    </tr>`;
            
            if ((value.getTime() > this.dataAtual.getTime()) && (next == 0)){
                this.howDays(key);
                next = 1;
            };
        }
        this.tabela.innerHTML += rows;
    }

    howDays(id){
        if (this.dataAtual.getTime() > this.feriados.get(id).getTime()){
            let diff = Math.ceil(Math.abs(this.dataAtual.getTime() - this.feriados.get(id).getTime()) / (1000 * 3600 * 24));
            this.titulo.innerHTML = `Já se passaram ${diff} dia(s) desde o ${id}`;
        } else {
            let diff = Math.ceil(Math.abs(this.dataAtual.getTime() - this.feriados.get(id).getTime()) / (1000 * 3600 * 24));
            this.titulo.innerHTML = `Ainda faltam ${diff} dia(s) para o ${id}`;
        }
    }
}

let DADOS = new Feriados();
DADOS.showHolidays();

function info(key) {
    DADOS.howDays(key);
}
