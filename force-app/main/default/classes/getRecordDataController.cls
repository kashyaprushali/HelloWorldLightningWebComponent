public with sharing class getRecordDataController {
  
    @AuraEnabled(cacheable=true)
    public static List<getRecordDataController.AccountDetailsWrapper> getAccounts( string item){
       List<Account> AccountDetailsList = new List<Account>();
       List<getRecordDataController.AccountDetailsWrapper> AccountDetailsWrapperList = new List<getRecordDataController.AccountDetailsWrapper>();
       AccountDetailsList = [SELECT Id,Name,Rating,Status__c from Account where Rating = : item Limit 10];
       for(Account cObj : AccountDetailsList){
           getRecordDataController.AccountDetailsWrapper cdWrapper = new getRecordDataController.AccountDetailsWrapper();
           cdWrapper.id = cObj.Id;
           cdWrapper.name = cObj.Name;
           cdWrapper.Status = cObj.Status__c;
           cdWrapper.Rating = cObj.Rating;
           AccountDetailsWrapperList.add(cdWrapper);
       }
       return AccountDetailsWrapperList;
     
  }
  public class AccountDetailsWrapper{
   @AuraEnabled public String   id{get;set;}
   @AuraEnabled public String   name{get;set;}
   @AuraEnabled public Boolean   Status{get;set;}
   @AuraEnabled public string   Rating{get;set;}
  }
}