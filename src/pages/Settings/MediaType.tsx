import { useEffect,useState } from 'react';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import userService from '../../services/user.service';
import Alert from '../../components/Alert';

const MediaType=()=>{
const [submitted, setSubmitting] = useState(false);
const [stateName,setStateName]=useState([{stateId:"",stateName:""}]);
const [cityName,setCityName]=useState([{cityId:"",cityName:""}]);
const [city,setCity]=useState([{cityId:"",cityName:""}]);
const [ddcity,setDdCity]=useState({cityId:"",cityName:""});
const [mediaType,setmediaType]=useState([{mediaTypeId:"",mediaTypeName:"",status:false}]);
const [beat,setBeat]=useState([{beatId:"",beatName:"",status:false}]);
const [competitor,setCompetitor]=useState([{text:""}]);
const [comp,setComp]=useState("");
const [topic,setTopic]=useState([{text:""}]);
const [top,setTop]=useState("");
const [clientName,setClientName]=useState([{agencyId:"",agencyName:""}]);
const [userName,setUserName]=useState([{userId:"",userName:""}]);


const [formData, setFormData] = useState({ });

useEffect(() => {
Promise.all([userService.getAllClient(),userService.getState(), userService.getGeo()])
.then(([allclientResponse,stateResponse, geoResponse]) => {
    setClientName(allclientResponse.data);
    setStateName(stateResponse.data);     
    setCity(geoResponse.data)
    console.log(clientName);
})
.catch(error => {
console.log(error.response);
});
}, []);

const onClientChange=(e:any)=>{
  const {value } = e.target;
  userService.getAgencyUsersById(value).then(response => {  
      console.log(response.data);
      setUserName(response.data);
  }, error => {
    console.log(error.response);
  });

}

const onStateChange = (e: any) => {
    const {value } = e.target;
    userService.getCity(value).then(response => {  
        console.log(response.data);
      setCityName(response.data);
    }, error => {
      console.log(error.response);
    });
}

const onCityChange=(e:any)=>{
  const { text, value } = e.target.options[e.target.selectedIndex]  
  setDdCity({ cityName:text,cityId:value });  
  console.log(ddcity);    
  }

const AddCity=()=>{
 if(city.find(val=>val.cityName===ddcity.cityName))
  {
    Alert.success('success', `City already exist`);
    console.log("City already exist");
  }
  else{
  setCity((pr) => [...pr,ddcity]);
  }
  console.log(city);
}

const handleGeoClick = async () => {
    Promise.all([userService.getState(), userService.getGeo()])
      .then(([stateResponse, geoResponse]) => {
        console.log(stateResponse.data, geoResponse.data);
        setStateName(stateResponse.data);      
        setCity(geoResponse.data)  
      })
      .catch(error => {
        console.log(error.response);
      });
    }

    const handleSaveGeoClick =async()=>{      
      userService.postGeo(city).then(response => {  
          console.log(response);
          if(response.status==="Created"){
            Alert.success('success', `${response.message}`);  
            }      
        },error=>{           
          console.log(error);
          Alert.success('error', error.response.data.message)
        });
   }  


const handleMediaClick = async () => {
    Promise.all([userService.getMediaType()])
    .then(([response]) => {
    setmediaType(response.data);
    })
    .catch(error => {
    console.log(error.response);
    });
    }
 
 const handleSaveMediaClick =async()=>{
    const mediaTypeId = mediaType.filter(val => val.status === true);
    userService.postMediaType(mediaTypeId).then(response => {  
        console.log(response);
        if(response.status==="Created"){
          Alert.success('success', `${response.message}`);  
          }      
      },error=>{           
        console.log(error);
        Alert.success('error', error.response.data.message)
      });
 }   
    
const handleBeatClick = async () => {
    Promise.all([userService.getBeat()])
    .then(([response]) => {
    setBeat(response.data);
    })
    .catch(error => {
    console.log(error.response);
    });
}

const handleSaveBeatClick =async()=>{
    const beatId = beat.filter(val => val.status === true);
    setSubmitting(true);
    userService.postBeat(beatId).then(response => {  
        setSubmitting(false);
        console.log(response);
        if(response.status==="Created"){
          Alert.success('success', `${response.message}`);  
          }      
      },error=>{    
        setSubmitting(false);       
        console.log(error);
        Alert.success('error', error.response.data.message)
    });
}
const handleCompClick = async () => {
    Promise.all([userService.getCompetitor()])
    .then(([response]) => {
        setCompetitor(response.data);
        setComp("");
    })
    .catch(error => {
    console.log(error.response);
    });
} 
const handleSaveCompClick=async()=>{  
    setSubmitting(true);
    userService.postCompetitor(competitor).then(response => {  
        setSubmitting(false);
        console.log(response);
        if(response.status==="Created"){
          Alert.success('success', `${response.message}`);  
          }      
      },error=>{     
        setSubmitting(false);      
        console.log(error);
        Alert.success('error', error.response.data.message)
    });
}
const handleTopicClick = async () => {
    Promise.all([userService.getTopic()])
    .then(([response]) => {
        setTopic(response.data);
        setTop("");
    })
    .catch(error => {
    console.log(error.response);
    });
} 
const handleSaveTopicClick=async()=>{
    setSubmitting(true);
    userService.postTopic(topic).then(response => {  
        setSubmitting(false);
        console.log(response);
        if(response.status==="Created"){
          Alert.success('success', `${response.message}`);  
          }      
      },error=>{           
        setSubmitting(false);
        console.log(error);
        Alert.success('error', error.response.data.message)
    });
}
  const AddTopic=()=>{
    if (!top.length) {
        Alert.success('success', `Please Add Topic`);
        console.log("Please Add Topic");        
      } 
      else if(topic.find(val=>val.text===top))
      {
        Alert.success('success', `Topic already exist`);
        console.log("Topic already exist");
      }
      else if(top.split(" ").length>3)
      {
        Alert.success('success', `You can enter max 3 words`);
        console.log("You can enter max 3 words");
      }
      else{
        setTopic((pr) => [...pr, { text: top }]);
        setTop("");
      } 
  }
  const AddComp=()=>{
    if (!comp.length) {
        Alert.success('success', `Please Add Competitor`);
        console.log("Please Add Competitor");        
      } 
      else if(competitor.find(val=>val.text===comp))
      {
        Alert.success('success', `Competitor already exist`);
        console.log("Competitor already exist");
      }
      else if(comp.split(" ").length>3)
      {
        Alert.success('success', `You can enter max 3 words`);
        console.log("You can enter max 3 words");
      }
      else{
        setCompetitor((pr) => [...pr, { text: comp }]);
        setComp("");
      }    
  }

const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    console.log(e.target.value);    
    }
return(
<>
<div className="mb-5 flex items-center">
        <select id="clientId" name='clientId'  
        onChange={onClientChange} 
        className="form-multiselect text-white-dark" required>
           <option value=""  >Select a client</option>
           {clientName.map((client) => (
            <option value={client.agencyId} key={client.agencyId}>
             {client.agencyName}
             </option>
           ))}
        </select>
        <select id="userId" name='userId'  
        onChange={handleSelectChange} 
        className="form-multiselect text-white-dark" required>
           <option value=""  >Select a client</option>
           {userName.map((usr) => (
            <option value={usr.userId} key={usr.userId}>
             {usr.userName}
             </option>
           ))}
        </select>
</div>
<div className="mb-5 flex flex-col sm:flex-row">
   <Tab.Group>
      <div className="mb-5 sm:mb-0 sm:flex-[0_0_20%]">
         <Tab.List className="space-y-2 ltr:pr-4 rtl:pl-4">
            <Tab as={Fragment}>
               {({ selected }) => (
               <button onClick={handleGeoClick}
               className={`${selected ? '!bg-success text-white !outline-none' : ''}
               duration-300' block rounded-md p-3.5 py-2 transition-all hover:bg-success hover:text-white`}
               style={{ width: '100%', display: 'flex', textAlign: 'start' }}
               >
               Geo Location
               </button>
               )}
            </Tab>
            <Tab as={Fragment}>
               {({ selected }) => (
               <button onClick={handleMediaClick}
               className={`${selected ? '!bg-success text-white !outline-none' : ''}
               duration-300' block rounded-md p-3.5 py-2 transition-all hover:bg-success hover:text-white`}
               style={{ width: '100%', display: 'flex', textAlign: 'start' }}
               >
               Media Types
               </button>
               )}
            </Tab>
            <Tab as={Fragment}>
               {({ selected }) => (
               <button onClick={handleBeatClick}
               className={`${selected ? '!bg-success text-white !outline-none' : ''}
               duration-300' block rounded-md p-3.5 py-2 transition-all hover:bg-success hover:text-white`}
               style={{ width: '100%', display: 'flex', textAlign: 'start' }}
               >
               Beats
               </button>
               )}
            </Tab>
            <Tab as={Fragment}>
               {({ selected }) => (
               <button onClick={handleCompClick}
               className={`${selected ? '!bg-success text-white !outline-none' : ''}
               duration-300' block rounded-md p-3.5 py-2 transition-all hover:bg-success hover:text-white`}
               style={{ width: '100%', display: 'flex', textAlign: 'start' }}
               >
               Competitors
               </button>
               )}
            </Tab>
            <Tab as={Fragment}>
               {({ selected }) => (
               <button onClick={handleTopicClick}
               className={`${selected ? '!bg-success text-white !outline-none' : ''}
               duration-300' block rounded-md p-3.5 py-2 transition-all hover:bg-success hover:text-white`}
               style={{ width: '100%', display: 'flex', textAlign: 'start' }}
               >
               Topics
               </button>
               )}
            </Tab>
         </Tab.List>
      </div>
      <Tab.Panels>
         <Tab.Panel>
            <div className="active">
               <h4 className="mb-4 text-2xl font-semibold">Geo Location</h4>
               <div className="flex gap-x-2">
               <div>
        <select id="state" name="state"
        onChange={onStateChange}  
        className="form-multiselect text-white-dark" required>
            <option value=""  >Select a state</option>
        {stateName.map((State) => (
                <option value={State.stateId} key={State.stateId}>
                  {State.stateName}
                </option>
              ))}
        </select>
    </div>
    <div>
        <select id="city" name="city" 
        onChange={onCityChange} 
        className="form-multiselect text-white-dark" required>
            <option value="0">Select a city</option>
            {cityName.map((city) => (
                <option value={city.cityId} key={city.cityId}>
                  {city.cityName}
                </option>
             ))}
        </select>
    </div>
    <button
                type="submit"
                onClick={AddCity}
                className="bg-gray-500 px-5 text-white text-md hover:bg-gray-600">
                Add Selected City
              </button> 
            </div>
            <div className="flex mt-3 flex-wrap gap-2">
              {city.map((curItem) => {
                return (
                  <span className="flex items-center pl-2 border border-gray-600 text-sm capitalize text-gray-600">
                    {curItem.cityName}
                    <span
                      className="material-icons-outlined custom-text close-icon-size cursor-pointer ml-2 p-1 hover:bg-slate-600 hover:text-white"
                      onClick={() => 
                        setCity(city.filter(item => item.cityName !== curItem.cityName))
                    }
                    >
                      close
                    </span>
                  </span>
                );
              })}
            </div>
            <button type="button" onClick={handleSaveGeoClick} className="btn btn-success btn-sm">
                  {submitted ? (
        <>
            <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"></span>
            Updating...
        </>
    ) : (
        'Update'
    )}
                    </button>
            </div>
         </Tab.Panel>
         <Tab.Panel>  
         <h4 className="mb-4 text-2xl font-semibold">Media Type</h4>  
         <div className='panel'>           
                  <div className="space-y-1 grid grid-cols-4">
                     {mediaType.map((item, index) => (                        
                     <div key={index}>
                        <label>
                        <input type="checkbox" 
                        className="form-checkbox outline-primary"                        
                        onChange={(e) => {
                            item.status = e.target.checked;
                            setmediaType ([...mediaType]);
                            console.log(mediaType);
                        }}
                        checked={item.status}></input>
                        <span>{item.mediaTypeName}</span>
                        </label>
                     </div>
                     ))}                     
                  </div>
                  <button type="button" onClick={handleSaveMediaClick} className="btn btn-success btn-sm">
                  {submitted ? (
        <>
            <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"></span>
            Updating...
        </>
    ) : (
        'Update'
    )}
                    </button>
                  </div>
         </Tab.Panel>
         <Tab.Panel>
            <h4 className="mb-4 text-2xl font-semibold">Beat</h4>  
         <div className='panel'>           
                  <div className="space-y-1 grid grid-cols-4">
                     { beat.map((item, index) => (                        
                     <div key={index}>
                        <label>
                        <input type="checkbox" 
                        className="form-checkbox outline-primary"                        
                        onChange={(e) => {
                            item.status = e.target.checked;
                            setBeat ([...beat]);
                            console.log(beat);
                        }}
                        checked={item.status}></input>
                        <span>{item.beatName}</span>
                        </label>
                     </div>
                     ))}                     
                  </div>
                  <button type="button" onClick={handleSaveBeatClick} className="btn btn-success btn-sm">
                  {submitted ? (
        <>
            <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"></span>
            Updating...
        </>
    ) : (
        'Update'
    )}
                    </button>
                  </div>
         </Tab.Panel>
         <Tab.Panel>
         <h4 className="mb-4 text-2xl font-semibold">Competitors</h4>
         <label className="w-48 text-sm text-gray-600 mb-1">
              Add Competitor
            </label>
            <div className="flex gap-x-2">
              <input
                type="text"
                name="compData"
                className="w-1/1 p-2 border border-gray-300 text-sm text-gray-400 focus:outline-none"
                placeholder="Ex: Tata Steel Corp."
                onChange={(e) => {    
                    setComp (e.target.value);                       
                }}
                value={comp}
              />
              <button
                type="submit"
                onClick={AddComp}
                className="bg-gray-500 px-5 text-white text-md hover:bg-gray-600">
                Add
              </button>              
              <button type="button" onClick={handleSaveCompClick} className="btn btn-success btn-sm">
                                  {submitted ? (
        <>
            <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"></span>
            Updating...
        </>
    ) : (
        'Update'
    )}
                </button>
            </div>
            <div className="flex mt-3 flex-wrap gap-2">
              {competitor.map((curItem) => {
                return (
                  <span className="flex items-center pl-2 border border-gray-600 text-sm capitalize text-gray-600">
                    {curItem.text}
                    <span
                      className="material-icons-outlined custom-text close-icon-size cursor-pointer ml-2 p-1 hover:bg-slate-600 hover:text-white"
                      onClick={() => 
                        setCompetitor(competitor.filter(item => item.text !== curItem.text))
                    }
                    >
                      close
                    </span>
                  </span>
                );
              })}
            </div>
         </Tab.Panel>
         <Tab.Panel>
         <h4 className="mb-4 text-2xl font-semibold">Topic</h4>
         <label className="w-48 text-sm text-gray-600 mb-1">
              Add Topic
            </label>
            <div className="flex gap-x-2">
              <input
                type="text"
                name="topicData"
                className="w-1/1 p-2 border border-gray-300 text-sm text-gray-400 focus:outline-none"
                placeholder="Ex: Tata Steel Corp."
                onChange={(e) => {    
                    setTop(e.target.value);                       
                }}
                value={top}
              />
              <button
                type="submit"
                onClick={AddTopic}
                className="bg-gray-500 px-5 text-white text-md hover:bg-gray-600">
                Add
              </button>              
              <button type="button" onClick={handleSaveTopicClick} className="btn btn-success btn-sm">
              {submitted ? (
        <>
            <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"></span>
            Updating...
        </>
    ) : (
        'Update'
    )}
                </button>
            </div>
            <div className="flex mt-3 flex-wrap gap-2">
              {topic.map((curItem) => {
                return (
                  <span className="flex items-center pl-2 border border-gray-600 text-sm capitalize text-gray-600">
                    {curItem.text}
                    <span
                      className="material-icons-outlined custom-text close-icon-size cursor-pointer ml-2 p-1 hover:bg-slate-600 hover:text-white"
                      onClick={() => 
                        setTopic(topic.filter(item => item.text !== curItem.text))
                    }
                    >
                      close
                    </span>
                  </span>
                );
              })}
            </div>
         </Tab.Panel>         
      </Tab.Panels>
   </Tab.Group>
</div>
</>
)
};
export default MediaType