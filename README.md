# DataTable 
A basic re-usable Table component in Mithril.js 
 
# Usage 
```javascript 
 <Table 
          pageSize={config.page.size} 
          data={[]} 
          columns={["","Locn_Nrb", "online_ord_Id", "KSN_Id", "SKU_Pro_Type_Cd"]} 
          showSerialNo={false} 
        /> 
 
``` 
 
Data format(Current) 
```javascript 
let data = [{ 
    "0": "sample",
    "1": "sample",
    "21":"sample",
    "12":"sample",
    "31":"sample"
  }] 
``` 
 
It includes a self contained Paging library.  