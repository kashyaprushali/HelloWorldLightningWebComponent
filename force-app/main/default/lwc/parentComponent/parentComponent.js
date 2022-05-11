import { LightningElement } from 'lwc';
export default class ParentComponent extends LightningElement {
    Name;
    City;

    callFromChild(event){
        this.Name = event.detail.Name;
        this.City = event.detail.City;
    }

}