let buttonsConfig = [
    {
        label: "Local",
        protocol: "http",
        params: { "env": "local" }
    },
    {
        label: "Production",
        protocol: "https",
        params: { env: "production" }
    },
    {
        label: "Testing",
        protocol: 'https',
        params: { env: 'qa' }
    }
]

window.onload = function() {
  var labels = document.getElementsByClassName('labels');
  var protocols = document.getElementsByClassName('protocols');
  var params = document.getElementsByClassName('params');
  for(var i = 0; i < labels.length; i++){
    if(sessionStorage.getItem("labels" + [i]) != null){
      buttonsConfig[i].label = sessionStorage.getItem("labels" + [i]);
    }
    if(sessionStorage.getItem("protocols" + [i]) != null){
      buttonsConfig[i].protocol = sessionStorage.getItem("protocols" + [i]);
    }
    if(sessionStorage.getItem("params" + [i]) != null){
      buttonsConfig[i].params = sessionStorage.getItem("params" + [i]);
    }
  }
}


document.getElementById('edit').addEventListener("change", function(){

  if(document.getElementById('edit').checked){
    var elems = document.getElementsByClassName('settingsContainer');
    elems[0].style.display = "block";
  }
  else{
    var elems = document.getElementsByClassName('settingsContainer');
    elems[0].style.display = "none";
  }
})


document.getElementById('submit').addEventListener('click', function(){
  var labels = document.getElementsByClassName('labels');
  var protocols = document.getElementsByClassName('protocols');
  var params = document.getElementsByClassName('params');

  for(var i = 0; i < labels.length; i++){
    if(labels[i].value != ""){
      sessionStorage.setItem("labels" + [i], labels[i].value );
      buttonsConfig[i].label = labels[i].value;//

      }
    if(protocols[i].value != ""){
      sessionStorage.setItem("protocols" + [i], protocols[i].value );
      buttonsConfig[i].protocol = protocols[i].value;
    }
    if(params[i].value != ""){
      sessionStorage.setItem("params" + [i], JSON.parse(params[i].value));
      buttonsConfig[i].params = JSON.parse(params[i].value);
    }
  }


  console.log(buttonsConfig[0].label);
  console.log(buttonsConfig[1].label);
  console.log(buttonsConfig[2].label);
  console.log(buttonsConfig[0].protocol);
  console.log(buttonsConfig[1].protocol);
  console.log(buttonsConfig[2].protocol);
  console.log(buttonsConfig[0].params);
  console.log(buttonsConfig[1].params);
  console.log(buttonsConfig[2].params);



  // var elems = document.getElementsByClassName('editSettings');
  // for(var i = 0; i < elems.length; i++){
  //   elems[i].style.display = "none";
  // }

  document.getElementById('edit').checked = false;
  alert("Saved Succuessfully!")
})





const buttonsConfigUrl = chrome.runtime.getURL('buttonsConfig.json');
fetch(buttonsConfigUrl)
    .then((response) => response.json())
    .then((json) => { buttonsConfig = json.buttonsConfig });

const buttons = document.getElementsByClassName('urlChanger')

const openNewTab = (buttonConfig) => {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = new URL(tabs[0].url);
        url.protocol = buttonConfig.protocol + ':';
        for(const [key, val] of Object.entries(buttonConfig.params)){
            url.searchParams.append(key, val)
        }
        chrome.tabs.create({ url: url.toString() });
    });
}

for (let i = 0; i < buttons.length, i < buttonsConfig.length; i++){
    buttons[i].addEventListener('click', () => openNewTab(buttonsConfig[i]));
}
