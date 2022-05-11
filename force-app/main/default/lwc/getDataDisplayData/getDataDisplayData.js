import { LightningElement, track, wire, api} from 'lwc';
import getAccounts from '@salesforce/apex/getRecordDataController.getAccounts';
import { registerListener, unregisterAllListeners, fireEvent } from 'c/mainpubsub';
import { CurrentPageReference } from 'lightning/navigation';
export default class GetDataDisplayData extends LightningElement {
    @api item;
    accountList;
    @wire(CurrentPageReference) pageRef;
    connectedCallback() {
        console.log('dlhewuiuqlewuuriq');
        console.log('this.item',this.item);
        registerListener("inputChangeEvent", this.handleEvent,this);
        console.log('this.item2',this.item);
      }
      handleEvent(item){
          this.item=item;
      }
      disconnectedCallback() {
          console.log('disconect');
        unregisterAllListeners(this);
      }
      
      
     @track columns = [
          { label: 'Name', fieldName: 'name' },
          { label: 'Id', fieldName: 'id'},
          { label: 'Rating', fieldName: 'Rating'},
          { label: 'Status', cellAttributes:
            { iconName: { fieldName: 'accountRatingIcon' }, iconPosition: 'right' }
    },
      ];
     
    
   @wire (getAccounts, {item: '$item'}) wiredAccounts({data,error}){
        console.log('inside getAccount data');
        if (data) 
        {
        console.log('if');
        this.accountList = data;
        console.log('data',this.accountList); 
        let Accountlist = [];
        this.accountList.forEach(record =>{
            console.log('record',record);
            let accObj = {...record};
            if(record.Status === true){
                console.log('ehfheuhu');
                accObj.accountRatingIcon = "utility:check";
            }else if(record.Status === false){
                accObj.accountRatingIcon = "utility:close";
            }
            accObj['accountLink'] = '/lightning/r/Account/' + record.accountId +'/view';
            Accountlist.push(accObj);
        });
        this.accountList = Accountlist;
        console.log('this is list', this.accountList);
        } 
        else{
        console.log(error);
        }
      }

    
}


