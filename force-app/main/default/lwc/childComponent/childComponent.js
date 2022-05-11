import { LightningElement } from 'lwc';
export default class ChildComponent extends LightningElement {
    Name;
    city;

    handleName(event){
        this.Name = event.detail.value;
    }

    handleCity(event){
        this.city = event.detail.value;
    }

    callParent(event){
        let paramData = { Name:this.Name,City:this.city};
        let eve = new CustomEvent('childmethod',{detail : paramData });
        this.dispatchEvent(eve);
            
        
    }
}