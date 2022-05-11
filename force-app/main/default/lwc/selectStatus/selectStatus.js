import { LightningElement,wire,api, track} from 'lwc';
import getAccount from'@salesforce/apex/StatusController.getAccount';


export default class SelectStatus extends LightningElement {
    @track data;
    @track columns = [
        {label: 'Name',fieldName: 'Name',type: 'text'},
      {label: 'Phone',fieldName: 'Phone', type: 'phone'},
      { label: 'Status', cellAttributes:
            { iconName: { fieldName: 'accountRatingIcon' }, iconPosition: 'right' }
    },
    ];
    @wire (getAccount) accountRecords({error,data})
    {
        if(data)
        {
            console.log('test',data);
            this.data = data;
            
        }
    }
 
}