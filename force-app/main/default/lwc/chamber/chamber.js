import { LightningElement } from 'lwc';
import Hotel from '@salesforce/resourceUrl/Hotel';
import chamber from '@salesforce/resourceUrl/Chamber';



export default class Chamber extends LightningElement {
    image1 = Hotel;
    image2 = chamber;
}