import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-factura',
  templateUrl: './modal-factura.component.html',
  styleUrls: ['./modal-factura.component.css']
})
export class ModalFacturaComponent implements OnInit {

  constructor() { }
  @Output() onClose = new EventEmitter()
  @Input() facturaPDF 
  @Input() existe 
  ngOnInit(): void {
    let height = window.screen.availHeight
    console.log();
    
    this.style.maxHeight = (height - 300) + 'px'
    this.style.overflow = 'auto'

    console.log(this.style); 
  }

  style:any = {}

  print(event){
     if (event.target.id == 'afuera') {
      this.onClose.emit()
    }
  }


  printContrato() {
    let wopen = window.open('/factura-pdf/' + this.facturaPDF._id)
    wopen.onafterprint = (event) => {
      wopen.close()
    }
  }

}
