const darkmode = document.querySelector('#dark-mode');
const bodyelt = document.querySelector("body");

darkmode.addEventListener('click',()=>{
    if (darkmode.textContent == 'DARK' ){
        document.documentElement.style.setProperty('--text-color', 'rgb(249, 245, 245)');        
        document.documentElement.style.setProperty('--background-color', 'black');    
            
        bodyelt.style.backgroundColor = 'black';
        darkmode.textContent = 'LIGHT'
    }
    else{
        document.documentElement.style.setProperty('--text-color', 'black');        
        document.documentElement.style.setProperty('--background-color', 'rgb(249, 245, 245)');        
        
        bodyelt.style.backgroundColor = 'rgb(249, 245, 245)';
        darkmode.textContent = 'DARK'
    }
})