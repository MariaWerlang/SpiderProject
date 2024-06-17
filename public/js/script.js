const body = document.querySelector('body'),
    sidebar = body.querySelector('.sidebar'),
    toggle = body.querySelector('.toggle'),
    searchBtn = body.querySelector('.search-box'),
    modeSwitch = body.querySelector('.toggle-switch'),
    modeText = body.querySelector('.mode-text');

modeSwitch.addEventListener('click', () => {
    body.classList.toggle('dark');
    modeSwitch.classList.toggle('active');
    modeText.textContent = body.classList.contains('dark') ? 'Spider Mode' : 'Venom Mode';
});

toggle.addEventListener('click', () => {
    sidebar.classList.toggle('close');
});

function iconHoverOut(iconid) {
    var icon = document.getElementById(iconid);
    icon.setAttribute("color","#fff");
}

function iconHoverIn(iconid) {
  var icon = document.getElementById(iconid);
  icon.setAttribute("color", "");
}

function imgHoverOut(imgid) {
    var img = document.getElementById(imgid);
    img.setAttribute("src", img.getAttribute("src").replace("-black.png", "-white.png"));
}

function imgHoverIn(imgid) {
    var img = document.getElementById(imgid);
    img.setAttribute("src", img.getAttribute("src").replace("-white.png", "-black.png"));
}