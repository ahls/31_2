const OL = document.querySelector('ol');

const GetCardButton = document.querySelector('#GetCard');
const CardDisplayContainer = document.querySelector('#CardHolder');

async function Part_1()
{
    const url = "http://numbersapi.com";
    const num = 1;
    let allReqeusts = [];

    for (let index = 0; index < 4; index++) {
        let resp = await axios.get(`${url}/${num}?json`)
        allReqeusts.push(resp);
        console.log(resp)
    }
    Promise.all(allReqeusts)
        .then(arr=>
            {
                arr.forEach(response =>
                    {
                        let a = document.createElement('li')
                        a.innerText = response.data.text
                        OL.appendChild(a)
                    })
            })
}

async function Part_2_Shuffle()
{
    const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    let resp = await axios.get(url);
    GetCardButton.style.display = "block";
    localStorage.setItem('deckID',resp.data.deck_id)
    localStorage.setItem('z',0)
}
async function Part_2_Draw()
{
    const url = `https://deckofcardsapi.com/api/deck/${localStorage.getItem('deckID')}/draw/?count=1`
    let resp = await axios.get(url);
    console.log(resp)
    let card = document.createElement('img');
    card.classList.add('card');
    card.src = resp.data.cards[0].image;
    CardDisplayContainer.appendChild(card);
    let angle = (0.5-Math.random()) * 60;
    let randomX = 50-Math.random()*5
    let randomY = 15-Math.random()*5
    card.style.transform = `rotate(${angle}deg)`;
    card.style.top = randomY+'px';
    card.style.left = randomX+'px';
    let z = Number(localStorage.getItem('z'))
    card.style.zIndex=z;
    console.log(z);
    localStorage.setItem('z',z+1);
    if(z == 51)
    {
        GetCardButton.style.display = "none";
    }
    
}



Part_1();
GetCardButton.addEventListener("click",(evt)=>
{
    evt.preventDefault();
    Part_2_Draw()
})
Part_2_Shuffle()