const Model = require('./model')
/*
const getAllProducts = async(req,res)=>{
    const myData = await Model.find({})  FINDING the whole Data which we dont want,we want the query paramn shu9d be complex
    res.status(200).json({myData})
}
*/

//* Adding a company filter(but this wway,we have to add the all the properties one by one)
const getAllProducts = async(req,res)=>{

    //*Earlier we were just .find(req.query)
    // Adding the sort query as well(wqhich is new to me,rest are the properties inside our model)
    const {company,name,feature,sort,select} = req.query

    const queryObject = {}

    //*If user has entered the company ,then updating the query object
    if(company){
        queryObject.company = company
    }

    //*If user has entered the feature  ,then updating the query object
    if(feature){
        queryObject.feature = feature
    }

    /* THIS SEARCH IS VERY STRICT,agr galt type kiya toh nhi aaega --> 
     if(name){
         queryObject.name = name
     }
     So we will use mongo db regex for advanced filtering by searching
     */  

    //* using mongoDb regex,for advanced Filtering
    if(name){
        // i => Case insensitivity to match upper and lower cases.
        queryObject.name = {$regex:name,$options:"i"} 
    }


    let apiData = Model.find(queryObject).sort()
    //* Coz in url, we will write , but in code(we have to give space instead of ,)
    if(sort){

        // * These logics are good when u create ur own api and make it user friendly
        
        let FixingOldSort = sort.replace(',  ',' ')
        //* This is of no use,coz this was useful when apply sort at end(which is wrong) --->  queryObject.sort = FixingOldSort
        apiData = apiData.sort(FixingOldSort)
    }

  



    //* This way,if user doesnt enter(or some wrong query),then we get all the data,if entered then we get that queryData

    //* const myData = await Model.find(queryObject).sort(queryObject)   //* Adding the .sort method wont be helpful here
    const myData = await apiData
    res.status(200).json({myData,nbHits:myData.length})
}


//* Here we are directly applying various features,not giving Queries and all
const getSelected = async (req,res)=>{
    // * query is in form of key value pair
    // const myData = await Model.find({company:"apple"}) Here it is static 
    //* We will use req.query coz it is used for sorting,searching,pagination
    
    // Sorting geneerally used for Prices(low to high,High to low)
    // const myData = await Model.find(req.query).sort("name")  //* It sorts in Ascending order by default
    //*const myData = await Model.find(req.query).sort("-price name")  //* Descending

    const myData2 = await Model.find(req.query).select("name price")  
    // const myData2 = await Model.find(req.query).select("name")  
    // const myData2 = await Model.find(req.query).select("price")  
    res.status(200).json({myData2})
}


module.exports = {getAllProducts,getSelected}