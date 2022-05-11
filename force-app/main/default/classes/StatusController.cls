public with sharing class StatusController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAcccount()
    {
        return[Select id,Name,Phone,Status__c from Account Limit 20];
    }
   
}
