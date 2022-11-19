const dado = document.getElementById('dado');
const dinero = document.getElementById('dinero');
const numberCasilla = document.getElementById('numberCasilla');
const card = document.querySelector('.card');


localStorage.setItem('casilla', 0);
localStorage.setItem('money', 200);


function showMoney(){
    let money = parseInt(localStorage.getItem('money'));
    dinero.innerText ='$'+money;
}

function identifyCasilla(){
    let place = parseInt(localStorage.getItem("casilla"));
    let money = parseInt(localStorage.getItem('money'));
    const info = casilla[0][place];
    console.log(info);
    card.innerHTML='';
    if (info.precio===null) {
        card.innerHTML=`
            <img src="${info.img}" alt="salida">
            <h2>${info.titulo}</h2>  
        `;
        if (info.sancion !== null) {
            localStorage.removeItem('money');
            localStorage.removeItem('casilla');
            localStorage.setItem('casilla', place - info.sancion.retroceder);
            localStorage.setItem('money', money - info.sancion.multa);
            card.innerHTML+=`
                 <p>Debes pagar $${info.sancion.multa}, y retroceder ${info.sancion.retroceder} casillas</p>  
            `;
        }
        if (info.arca) {
            let number = Math.floor((Math.random()*20)+1);
            let data = infoAarca[0][number];
            localStorage.setItem('money', money + data.dinero);
            card.innerHTML+=`
                 <p>${data.titulo}</p>  
            `;
        }
    } else {
        card.innerHTML=`
            <img src="${info.img}" alt="salida">
            <h2>${info.titulo}</h2>
            <p>Precio:${info.precio}</p>
            <button onclick='buy()'>Comprar</button>
        `;
    }
}

function buy(){
    let place = parseInt(localStorage.getItem("casilla"));
    const info = casilla[0][place];
    let money = parseInt(localStorage.getItem('money'));
    if (money > info.precio) {
        localStorage.removeItem('money');
        localStorage.setItem('money', money - info.precio);
        alert('Producto comprado');
        showMoney();
    }else{
        alert('Te falta dinero');
    }
}

function dadoThrow(){
    let money = parseInt(localStorage.getItem('money'));
    let number = Math.floor((Math.random()*12)+1);
    numberCasilla.innerText = number;
    let casilla = parseInt(localStorage.getItem('casilla'));
    if (casilla===0) {
        localStorage.removeItem('casilla');
        localStorage.setItem('casilla',number);
    }else{
        localStorage.removeItem('casilla');
        localStorage.setItem('casilla', number + casilla);
        let numberC = parseInt(localStorage.getItem('casilla'));
        if (numberC > 30) {
            localStorage.removeItem('casilla');
            localStorage.setItem('casilla', 30 - casilla);
            localStorage.removeItem('money');
            localStorage.setItem('money', money + 20);
            alert('pasaste por salida por salida');
        }else{
            console.log(numberC);
        }
    }
}

dado.addEventListener('click',()=>{
    dadoThrow();
    identifyCasilla();
    showMoney();
});
