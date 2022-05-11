public with sharing class dependentPicklistClass {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts()
    {
        return[Select id,Name,Select_State__c from Account Limit 100];
    }

    @AuraEnabled
    public static List<String> getState(String stateName)
    {
        List<String> name = new List<String>();
        List<Select_State__mdt> df = [Select state__c from Select_State__mdt where label =:stateName ];
        for(Select_State__mdt ss : df){
            String dfd = ss.state__c;
            system.debug(dfd);
            for( String key : dfd.split(','))
            {
                
                name.add(key);
            }
            break;
        }
        return name;
       
    }
    
}
