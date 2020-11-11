///////////////////////////////////////////////////////////////Формирование колоды
const rzmrKld = 36
const vidKart = [
    'ШЕСТЬ',
    'СЕМЬ',
    'ВОСЕМЬ',
    'ДЕВЯТЬ',
    'ДЕСЯТЬ',
    'ВАЛЕТ',
    'ДАМА',
    'КОРОЛЬ',
    'ТУЗ'
];

const vidMasti = [
    'ЧЕРВИ',
    'БУБНА',
    'КРЕСТИ',
    'ПИК'
]

const vseKarts = []

let randPerem;
let isTrue = true


vidMasti.forEach((item) => {
    vidKart.forEach((item2) => {
        vseKarts.push(item + '-' + item2)
    })
})

// console.log(vseKarts)

let koloda = []

vseKarts.forEach(() => {

    do {
        randPerem = getRandomIntInclusive(0, vseKarts.length - 1)
    }while(koloda.indexOf(randPerem) != -1)
    
    koloda.push(randPerem)

})
//////////////////////////////////////////////////////////////////////////////////koloda

//////////////////////////////////////////////////////////////////////////////////механизм раздачи карт на двух игроков

let user1 = [1,2,3,4,5,6]
let user2 = [1,2,3,4,5,6]


user1.forEach((item, nomer) => {
    user1[nomer] = koloda.shift()
})

user2.forEach((item, nomer) => {
    user2[nomer] = koloda.shift()
})

let kozir = koloda.shift()

//////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////Интерфейс, визуал

//>Для упрощения перевести из чисел в строковый формат масть - роль
let gmr1 = []
let gmr2 = []

user1.forEach((item) => {
    gmr1.push(vseKarts[item])
})

user2.forEach((item) => {
    gmr2.push(vseKarts[item])
})

console.log('ryka1 ',gmr1)
console.log('ryka2 ',gmr2)


const $igrok1 = document.getElementById('igrok1')
const $stol = document.getElementById('stol')
const $igrok2 = document.getElementById('igrok2')

let htmlkod = ''

gmr1.forEach((item) => {
    htmlkod += `<label id = "${item}" class = "gamer1">/${item}\\</label>`
})
$igrok1.innerHTML = htmlkod
htmlkod = ''




$stol.innerHTML = `<button>${vseKarts[kozir]} ostalos ${koloda.length}</button>`

gmr2.forEach((item) => {
    htmlkod += `<label id = "${item}" class = "gamer2">/${item}\\</label>`
})

$igrok2.innerHTML = htmlkod
htmlkod = ''

//////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////механика игры
const glavnMast = rzbMastRoll(vseKarts[kozir])[0]//опред главн масть



//>Первым ходит тот у кого наименьший козырь если козырей нет ни у одного то рандомно

let oheredChiy

let minKozirUser1 = 100
let minKozirUser2 = 100

gmr1.forEach((item) => {
    if((rzbMastRoll(item)[0] == glavnMast) && (vidKart.indexOf(rzbMastRoll(item)[1]) < minKozirUser1))
        minKozirUser1 = vidKart.indexOf(rzbMastRoll(item)[1])
})

gmr2.forEach((item) => {
    if((rzbMastRoll(item)[0] == glavnMast) && (vidKart.indexOf(rzbMastRoll(item)[1]) < minKozirUser2))
        minKozirUser2 = vidKart.indexOf(rzbMastRoll(item)[1])
})

if(minKozirUser1 < minKozirUser2) {
    oheredChiy = 'gamer1'
} else if(minKozirUser2 < minKozirUser1) {
    oheredChiy = 'gamer2'
} else {
    oheredChiy = getRandomIntInclusive(1, 2)
}

console.log(oheredChiy)

//////////////////////////////////////////////////////////////////////////////////

//>Вылаживание карт на стол






//////////////////////////////////////////////////////////////////////////////////События

const $sourse = document.getElementById('sourse')

$sourse.addEventListener('click', (e) => {
    if(event.target.className == oheredChiy) {

        e.target.parentNode.removeChild(e.target);

        console.log(event.target.id)
        vilogNaStol(oheredChsiy, event.target.id)
        
    }
})

$stol.addEventListener('click', () => {
    if(oheredChiy == 'gamer1') {
        oheredChiy = 'gamer2'
    } else {
        oheredChiy = 'gamer1'
    }
    console.log(oheredChiy)
})


//////////////////////////////////////////////////////////////////////////////////














//////////////////////////////////////////////////////////////////////////////////Функционал

function vilogNaStol(oheredn, karta) {
    if(oheredn == 'gamer1') {
        gmr1.splice(gmr1.indexOf(karta),1)

    }
    if(oheredn == 'gamer2') {
        gmr1.splice(gmr2.indexOf(karta),1)
    }

    $stol.insertAdjacentHTML('afterend', `<div>${karta}</div>`)

}

function rzbMastRoll(strZnahKart) {
    return strZnahKart.split('-')
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }

//////////////////////////////////////////////////////////////////////////////////
