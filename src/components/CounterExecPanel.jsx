
import React, { useEffect,useState } from 'react'
import axios from 'axios';


const CounterExecPanel = () => {
  
  const [userData, setUserData] = useState({
    tid:'',
    st: '',

  })

  useEffect(() => {


    let url = `http://localhost:8080/gettokencounter?cid=${userData.tid}`;

    axios.get(url).then((response) => {
      console.log(response);
      console.log("in counter execpanel")

    })


  });

  function call() {
    setUserData({
      tid: 1,
    
    })


    let url = `http://localhost:8080/gettopservice?cid=${userData.tid}`;

    axios.get(url).then((response) => {
      console.log(response);
      console.log("in call buton")

    })

  }
  function Served() {

    setUserData({
      tid: 0,
      st: "done",

    })

    
    var jsonData = JSON.stringify(userData);
    axios
      .post("http://localhost:8080/changestatus", jsonData, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        console.log(response.data);
        //   setUserData(response.data); 
      });

  }

  function Pending() {
    setUserData({
      tid: 0,
      st: "pending",

    })
   
   let jsonData=JSON.stringify(userData);
    axios
    .post("http://localhost:8080/changestatus", jsonData, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      console.log(response.data);
      //   setUserData(response.data); 
    });

  }

  return (

    <div>



      <section className="bg-[#F3F4F6] pt-20 pb-10 lg:pt-[120px] lg:pb-20">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 md:w-1/2 xl:w-1/2">
              <div className="mb-10 overflow-hidden rounded-lg bg-white">

                <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                  <h1 className="text-dark hover:text-primary mb-4 block text-xl font-semibold sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]">Current service</h1>


                  <button onClick={() => call()} style={{ margin: '5px' }} className="text-body-color hover:border-primary hover:bg-indigo-900 inline-block rounded-full border border-[blue] py-2 px-7 text-base font-medium transition hover:text-white"
                  > Call</button>

                  <button onClick={() => Pending()} style={{ margin: '5px' }} className="text-body-color hover:border-primary hover:bg-indigo-900 inline-block rounded-full border border-[blue] py-2 px-7 text-base font-medium transition hover:text-white"
                  > Pending</button>

                  <button onClick={() => Served()} style={{ margin: '5px' }} className="text-body-color hover:border-primary hover:bg-indigo-900 inline-block rounded-full border border-[blue] py-2 px-7 text-base font-medium transition hover:text-white"
                  > Served</button>

                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2 xl:w-1/2">
              <div className="mb-10 overflow-hidden rounded-lg bg-white">

                <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                  <h3 className="text-dark hover:text-primary mb-4 block text-xl font-semibold sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]">Customer List</h3>





                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>

  )
}

export default CounterExecPanel
