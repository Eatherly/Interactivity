import { Component , OnInit } from '@angular/core';
import { HttpService} from './http.service'
import {Color} from './color';

@Component({
    selector: 'color-app',
    template: `
<div class="container">
        <h1>Color list</h1>
        <span>please, click to button to sort list by color name or code</span>
        <table  class="table table-striped tableOfColors">
            <tr class="tableHead">
                <th id="itemNumber">#</th>
                <th id="colorName" (click)="increase('colorName')"><button class="btn btn-primary orderButton">name <span [innerHTML]="triangle.colorName"></span></button></th>
                <th id="hexValue" (click)="increase('hexValue')"><button class="btn btn-danger orderButton">color <span [innerHTML]="triangle.hexValue"></span></button></th>
            </tr>
            <tr *ngFor="let color of colors; let i=index">
                <td class="itemNumber">{{i+1}}</td>
                <td class="colorName">{{color?.colorName}}</td>
                <td class="hexValue" [style.backgroundColor]="color?.hexValue"> </td>
            </tr>
        </table>
        
</div> `,
    providers: [HttpService],
    styles: [` 
            h1{color:navy;}
  
    `]
})




export class AppComponent  implements OnInit { 
  inverse: boolean = false;
  byProperty: string = "colorName" ;
  triangle = {colorName:"&#9660;",
                  hexValue:"&#8195;"}    
  colors: Color[]=[];  
    
  constructor(private httpService: HttpService){}
      
  ngOnInit(){
          
        this.httpService.getData().subscribe(data => 
            {this.colors=data["colorsArray"] ; 
             this.colors.sort(function (a, b ) {
                if (a.colorName > b.colorName) {return 1;}
                if (a.colorName < b.colorName) {return -1;}
                return 0;
                })
            }
        )
    }  
    
    increase($event:string) : void  {

        this.inverse ? this.inverse=false :this.inverse=true;
        if($event == "colorName"){
        !this.inverse ? this.triangle={colorName:"&#9660;", hexValue:"&#8195;"} : this.triangle={colorName:"&#9650;",hexValue:"&#8195;"}
        }
        if($event == "hexValue"){
        !this.inverse ? this.triangle={colorName:"&#8195;", hexValue:"&#9660;"} : this.triangle={colorName:"&#8195;",hexValue:"&#9650;"}
        }
        if(this.byProperty != $event) 
           {this.inverse=false; 
            $event == "colorName" ? this.triangle={colorName:"&#9660;", hexValue:"&#8195;"} : this.triangle={colorName:"&#8195;",hexValue:"&#9660;"}
           } ;
        this.byProperty=$event;
        

        let temp=this.inverse;
        this.colors.sort(function sort (a, b ) {
                    if (a[$event] > b[$event]) {
                        if(!temp)  return 1
                        else return -1 ;
                    }
                    if (a[$event] < b[$event]) {
                        if(!temp)  return -1
                        else return 1 ;
                    }
                            return 0;
        })                 
    }

}


