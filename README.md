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
    "0": i, 
    "1": 12 * i, 
    "21": i * 2 * 23, 
    "12": i * 3 * 13, 
    "31": i * 8 * 2 
  }] 
``` 
 
It includes a self contained Paging library.  