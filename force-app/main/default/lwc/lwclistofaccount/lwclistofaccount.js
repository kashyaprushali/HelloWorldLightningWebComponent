import { LightningElement, track,wire } from 'lwc';
import getAccounts from '@salesforce/apex/fetchAccount.getAccounts';
//import getContacts from '@salesforce/apex/fetchAccount.getContacts';

export default class AccountList extends LightningElement {
    @track data;
    accountList;
    @track columns = [
        {label: 'Label',fieldName: 'Name',type: 'text'},
        {label: 'Phone',fieldName: 'Phone', type: 'phone'},
        
        { label: 'Status', cellAttributes:
            { iconName: { fieldName: 'accountRatingIcon' }, iconPosition: 'right' }
    },
    ];
    connectedCallback(){
        console.log('testssss');    
    }
    @wire (getAccounts) accountRecords({error,data})
    {
        if(data){
            console.log('if');
            this.accountList = data;
            console.log('data',this.accountList); 
            let Accountlist = [];
            this.accountList.forEach(record =>{
                console.log('record',record);
                let accObj = {...record};
                if(record.Status__c === true){
                    console.log('ehfheuhu');
                    accObj.accountRatingIcon = "utility:check";
                }else if(record.Status__c === false){
                    accObj.accountRatingIcon = "utility:close";
                }
                accObj['accountLink'] = '/lightning/r/Account/' + record.accountId +'/view';
                Accountlist.push(accObj);
            });
            this.accountList = Accountlist;
            console.log('this is list', this.accountList);
        }
        else if(error){
            this.data = undefined;
        }
    }
}