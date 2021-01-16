import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private  linkTheme = document.querySelector('#theme')
  

  constructor() {
    console.log('settings service init');

    const h = localStorage.getItem('theme') || './assets/css/colors/dark.css'
    console.log(h,'guardado');
    

    this.linkTheme.setAttribute('href',h);
    
   }

   changeTheme(theme:string){
    console.log(theme);
    

    console.log(this.linkTheme);
    
    const URL = `./assets/css/colors/${ theme }.css`;

    console.log(URL);

    this.linkTheme.setAttribute('href',URL);
    localStorage.setItem('theme',URL)
    this.checkCurrentTheme()
    
    
  }

  checkCurrentTheme(){
    const links = document.querySelectorAll('.selector')
    links.forEach(elem => {
      elem.classList.remove('working')
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeURL = `./assets/css/colors/${ btnTheme }.css`;
      const currentTheme = this.linkTheme.getAttribute('href');
      if (btnThemeURL == currentTheme){
        elem.classList.add('working')
      }
    })
  }
}
