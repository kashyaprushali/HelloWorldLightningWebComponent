import { LightningElement,track } from 'lwc';
//import { getObjectInfo } from 'lightning/uiObjectInfoApi';
//import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import DependentPicklist from '@salesforce/apex/dependentPicklistClass.getState';
//import ACCOUNT_OBJECT from '@salesforce/schema/Account';
//import State from '@salesforce/schema/Account.Select_State__c';
export default class dependentPicklist extends LightningElement {
    @track stateName=[];
    handelclick(event) 
    {
       this.indiaval=event.target.value;
       console.log('OUTPUT : ', event.target.value);
       DependentPicklist({stateName: event.target.value})
       .then(state=>{
        this.stateName=state;
            console.log(state);
       })
       .error(error=>{
           console.log(error);
       });
       
    }
    
}