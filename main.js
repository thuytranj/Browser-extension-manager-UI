const themeBtn = document.querySelector('.theme-btn');
const allBtn = document.querySelector('.all-btn');
const activeBtn = document.querySelector('.active-btn');
const inactiveBtn = document.querySelector('.inactive-btn');
const extensionsDisplay = document.querySelector('.extensions');
const themeIcon = document.getElementById('theme-icon');
let darkMode = true;

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    document.querySelector('.header').classList.toggle('header-light');

    document.querySelectorAll('.extension').forEach(el => {
      el.classList.toggle('extension-light');
    });

    document.querySelectorAll('button').forEach(el => {
        el.classList.toggle('light-btn');
    });

    const isLight = document.body.classList.contains('light');
    themeIcon.src = isLight ? 'assets/images/icon-moon.svg' : 'assets/images/icon-sun.svg';
    darkMode = isLight ? false : true;
});
  

const extensions = await getData();
console.log(extensions);

async function getData () {
    const result = await fetch('data.json');
    const data = await result.json();
    return data;
}

showAllExtensions(extensions);
allBtn.addEventListener('click', () => showAllExtensions(extensions));
activeBtn.addEventListener('click', () => showActiveExtensions(extensions));
inactiveBtn.addEventListener('click', () => showInActiveExtensions(extensions));

function showExtension(e) {
    const { logo, name, description, isActive } = e;
    const extension = document.createElement('div');
    extension.classList.add('extension');
    extension.innerHTML = `
    <div class="extension-info">
        <img src="${logo}">
        <div class="info">
        <h2>${name}</h2>
        <p>${description}</p>
        </div>
    </div>
    
    <div class="extension-btn">
        <button class="remove-btn">Remove</button>

        <label class="switch">
            <input type="checkbox" class="status-switch">
            <span class="slider"></span>
        </label>
    </div>`;

    const checkbox = extension.querySelector('.status-switch');
    checkbox.checked = isActive;
    checkbox.addEventListener('change', () => {
        e.isActive = checkbox.checked;
    });

    const removeBtn = extension.querySelector('.remove-btn');
    removeBtn.addEventListener('click', () => {
        extension.remove();

        const index = extensions.indexOf(e);
        if (index !== -1) {
            extensions.splice(index, 1);
        }
    });

    extension.classList.toggle('extension-light', !darkMode);
    removeBtn.classList.toggle('light-btn', !darkMode);

    extensionsDisplay.appendChild(extension);
}
function showAllExtensions(extensions) {
    extensionsDisplay.innerHTML = ``;
    extensions.forEach((e) => {
        showExtension(e);
    });
}

function showActiveExtensions(extensions) {
    extensionsDisplay.innerHTML = ``;
    extensions.forEach((e) => {
        const { isActive } = e;
        if (isActive) 
            showExtension(e);
    });
}

function showInActiveExtensions(extensions) {
    extensionsDisplay.innerHTML = ``;
    extensions.forEach((e) => {
        const { isActive } = e;
        if (!isActive) 
            showExtension(e);
    });
}