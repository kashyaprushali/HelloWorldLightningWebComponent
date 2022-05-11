import { api, LightningElement,wire,track } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Rating';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/mainpubsub';
export default class picA_Value extends LightningElement {
    @wire(CurrentPageReference) pageRef;
    @api value1 ='';
    //@track data =true;
    // to get the default record type id, if you dont' have any recordtypes then it will get master
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    accountMetadata;
    // now get the industry picklist values
    @wire(getPicklistValues,
        {
            recordTypeId: '$accountMetadata.data.defaultRecordTypeId',
            fieldApiName: INDUSTRY_FIELD
        }
    )
    industryPicklist;
    // on select picklist value to show the selected value
    
    handleChange(event)
    {
        fireEvent(this.pageRef, "inputChangeEvent", event.target.value);
        this.value1 = event.detail.value;
    }
}