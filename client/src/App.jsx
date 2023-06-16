import React, { useEffect, useState } from 'react'
import axios from 'axios'


function App() {
  const [data, setData] = useState([])
  const baseUrl = "http://localhost:4000/api/route/product"
  const [searchQuery,setSearchQuery] = useState("")

  const [postPerPage,setPostPerPage] = useState(10)
  const [currentPageNumber,setCurrentPageNumber] = useState(1)

  const getData = async (url) => {
    const response = await axios.get(url)
    // console.log(response.data.myData)
    setData(response.data.myData)
  }

  const getData2 = async() =>{
    const response = await axios.get(`${baseUrl}?sort=-price`)
    // console.log(response)
    setData(response.data.myData)
  }

  const getData3 = async() =>{
    const response = await axios.get(`${baseUrl}?sort=price,name`)
    // console.log(response)
    setData(response.data.myData)
  }


  useEffect(() => {
    getData(`${baseUrl}?name=${searchQuery}`)
  }, [searchQuery])   // Whenever we type,it reloads the shit coz we are passing it as a dependency


  // * Number of Pagination button logic
  let NumberOfPagesArray = []
  for(let i= 1 ;i<=Math.ceil(data.length/postPerPage);i++){
    NumberOfPagesArray.push(i)
  }

  // * Pagination Logic
  let indexOfLastItem = currentPageNumber*postPerPage
  let indexOfFirstItem = indexOfLastItem - postPerPage
  let currentItemsinPageArray = data.slice(indexOfFirstItem,indexOfLastItem)

  const paginate = (e) =>{
    console.log(e)
     setCurrentPageNumber(e)
  }

  const searchHandler = (e) =>{
       console.log(e);
       setSearchQuery(e)
  }



  return (
    <React.Fragment>
      <button onClick={()=>getData2()}>Sort Price(High to low)</button>
      <button onClick={()=>getData3()}>Sort Price(low to High)</button>
      <input type="search" placeholder='Name of Product' value={searchQuery} onChange={(e)=>searchHandler(e.target.value)} />
      <div>
        {NumberOfPagesArray.map((currEle,index)=>{
          return(
            <button onClick={()=>paginate(currEle)} key={index}>{currEle}</button>
          )
        })}
      </div>
      <div className='category-content'>
        {/* {data.map((currEle, index) => { */}
        {currentItemsinPageArray.map((currEle, index) => {
          const { price, name, feature } = currEle
          return (
            <div key={index} className='category-content-card'>
              <h4>Price:₹{price}</h4>
              <h4>Name of Product : {name}</h4>              
            </div>
          )
        })}
      </div>

 

    </React.Fragment>
  )
}

export default App