const input = document.querySelector('input');
const shorten = document.querySelector('.shorten');
const lists = document.querySelector('.lists');
const started = document.querySelector('.started');
// const copyLink = document.querySelector('.copy-link');
document.addEventListener('DOMContentLoaded', getMyLinks)
shorten.addEventListener('click', shortenLink);
// started.addEventListener('click', copyTxt);

function shortenLink(e) {
  const link = input.value;

  // console.log(link);
  fetch('https://api-ssl.bitly.com/v4/shorten', {
  method: 'POST',
  headers: {
      'Authorization': 'Bearer f9328cfa962461517d946be606d00f71fd34dd32',
      'Content-Type': 'application/json'
  },
    body: JSON.stringify({ "long_url": link, "domain": "bit.ly"})
  }).then(function(res){
  return res.json();
  }).then(function(data){
  // console.log(data);
  createLink(data.id, link);
  }).catch(function(err){
  console.log(err);

  }) 
  input.value = ''

  e.preventDefault();
}

// function copyTxt(e) {
  
  
//     /* Get the text field */
//     let newLink = document.querySelector(".build");

//     /* Select the text field */
//     newLink.select();
//     newLink.setSelectionRange(0, 99999); /*For mobile devices*/
  
//     /* Copy the text inside the text field */
//     document.execCommand("copy");


//     e.preventDefault();
// }



function createLink(line, mylink){
  // const link = input.value;

  const listDiv = document.createElement('div');
  listDiv.classList.add('list');

  const long = document.createElement('p');
  long.classList.add('long-link')
  long.innerText = mylink;
  listDiv.appendChild(long)
  // add longlink to local storage
  // saveMyLinks(mylink);

  const short = document.createElement('p');
  short.classList.add('short-link')
  short.innerText = line;
  listDiv.appendChild(short);
  //add shortlink to local storage
  saveMyLinks(mylink, line);

  const btn = document.createElement('button')
  btn.classList.add('copy-link')
  btn.innerText = 'Copy';
  listDiv.appendChild(btn);

  lists.appendChild(listDiv)

}

function saveMyLinks(mylink, line){
  let coolLinks;
  if(localStorage.getItem('coolLinks') === null) {
    coolLinks = [];

  } else {
    coolLinks = JSON.parse(localStorage.getItem('coolLinks'));
  }

  coolLinks.push({mylink, line});
  localStorage.setItem("coolLinks", JSON.stringify(coolLinks))
}

function getMyLinks(){
  console.log('yayuuu');
  
  let coolLinks;
  if(localStorage.getItem('coolLinks') === null) {
    coolLinks = [];
  } else {
    coolLinks = JSON.parse(localStorage.getItem('coolLinks'));
  }

  coolLinks.forEach(cool => {
    const listDiv = document.createElement('div');
    listDiv.classList.add('list');

    const long = document.createElement('p');
    long.classList.add('long-link')
    long.innerText = cool.mylink;
    listDiv.appendChild(long)

    const short = document.createElement('p');
    short.classList.add('short-link')
    short.innerText = cool.line;
    listDiv.appendChild(short);

    const btn = document.createElement('button')
    btn.classList.add('copy-link')
    btn.innerText = 'Copy';
    listDiv.appendChild(btn);


    lists.appendChild(listDiv)
    
  });

}



















// const input = document.querySelector('input');
// const form = document.querySelector("form");
// const para = document.querySelector("p");

// form.addEventListener('submit', function(e){
//   const mylink = input.value;
//   // console.log(mylink) 

 
//   e.preventDefault();
// })