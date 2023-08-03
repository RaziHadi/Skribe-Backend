import { useEffect, useState } from 'react';
import { userPreference,setUserPreference } from '../../custom-hooks/userPreferences';
import { useMutation, useQueryClient } from "react-query";
import Alert from '../../components/Alert';
import 'material-icons/iconfont/material-icons.css';
import AddTopic from './AddUserLookup/AddTopic';

const Preferences= () => {
const [activeTab, setActiveTab] = useState(1);
const [mediaType,setmediaType]=useState([{mediaid:"",mediaName:"",status:false}]);
const [beat,setBeat]=useState([{beatid:"",beatName:"",status:false}]);
const [topic,setTopic]=useState([{topicid:"",topicName:"",status:false}]);
const [topicSearch, setTopicSearch] = useState<string>('');
const [filteredTopic, setFilteredTopic] = useState([{topicid:"",topicName:"",status:false}]);
const [competitor,setCompetitor]=useState([{competitorid:"",competitorName:"",status:false}]);
const [filteredCompetitor, setFilteredCompetitor] = useState([{competitorid:"",competitorName:"",status:false}]);
const [competitorSearch, setCompetitorSearch] = useState<string>('');
const {
    mediaQuery, 
    beatQuery,
    geoQuery,
    topicQuery,
    competitorQuery,
    brandQuery,
    spokespersonQuery,
    userPreferencesQuery
 } = userPreference();
useEffect(() => {
    if(!userPreferencesQuery.isLoading)
    {
    const updatedMediaState = mediaQuery.data.data.map((curElem:any) => ({...curElem,
                            status: userPreferencesQuery.data.data.userMediaPrefs.some(
                           (val:any) => val.intMediaId === curElem.mediaid),}));
      setmediaType(updatedMediaState);
      const updatedBeatState = beatQuery.data.data.map((curElem:any) => ({...curElem,
                               status: userPreferencesQuery.data.data.userBeatPrefs.some(
                              (val:any) => val.intBeatId === curElem.beatid),}));
      setBeat(updatedBeatState);
       const updatedCompetitorState = competitorQuery.data.data.map((curElem:any) => ({...curElem,
        status: userPreferencesQuery.data.data.userTopicPref.some(
       (val:any) => val.intCompetitorId === curElem.competitorid),}));
       setCompetitor(updatedCompetitorState);
       setFilteredCompetitor(updatedCompetitorState);
    }
  }
, [userPreferencesQuery.isLoading]);
useEffect(() => {
  if(!topicQuery.isLoading && !userPreferencesQuery.isLoading)
  {
    const updatedTopicState = topicQuery?.data?.data.map((curElem:any) => ({...curElem,
      status: userPreferencesQuery?.data?.data?.userTopicPref.some(
     (val:any) => val.intTopicId === curElem.topicid),}));
     setTopic(updatedTopicState);
     setFilteredTopic(updatedTopicState);
  }
},[topicQuery.isLoading,userPreferencesQuery.isLoading])
useEffect(() => {
  setFilteredTopic(() => {
      return topic.filter((item) => {
          return item.topicName.toLowerCase().includes(topicSearch.toLowerCase());
      });
  });
}, [topicSearch]);
useEffect(() => {
  setFilteredCompetitor(() => {
      return competitor.filter((item) => {
          return item.competitorName.toLowerCase().includes(competitorSearch.toLowerCase());
      });
  });
}, [competitorSearch]);
const functionOnSave=async ()=>{
if(activeTab === 1 ){
    const CheckedIds=mediaType.filter((pre)=>pre.status===true)
    const UnCheckedIds=mediaType.filter((pre)=>pre.status===false)
    const userPrefsIdsSet = new Set(userPreferencesQuery?.data?.data?.userMediaPrefs.map((item:any) => item.intMediaId));

 const add = CheckedIds.filter(item => !userPrefsIdsSet.has(item.mediaid));
 const remove = UnCheckedIds.filter(item => userPrefsIdsSet.has(item.mediaid));
 const jsonData= inputJson(add,remove,"media");
 const res=setUserPreference(jsonData)
}
else if(activeTab === 2)
{
    const CheckedIds=beat.filter((pre)=>pre.status===true);
    const UnCheckedIds=beat.filter((pre)=>pre.status===false);
    const userPrefsIdsSet = new Set(userPreferencesQuery?.data?.data?.userBeatPrefs.map((item:any) => item.intBeatId));
     const add = CheckedIds.filter(item => !userPrefsIdsSet.has(item.beatid));
     const remove = UnCheckedIds.filter(item => userPrefsIdsSet.has(item.beatid));
     const jsonData= inputJson(add,remove,"beat");
     const res=setUserPreference(jsonData)
}
else if(activeTab === 4)
{
    const CheckedIds=topic.filter((pre)=>pre.status===true);
    const UnCheckedIds=topic.filter((pre)=>pre.status===false);
    const userPrefsIdsSet = new Set(userPreferencesQuery?.data?.data?.userTopicPref.map((item:any) => item.intTopicId));
     const add = CheckedIds.filter(item => !userPrefsIdsSet.has(item.topicid));
     const remove = UnCheckedIds.filter(item => userPrefsIdsSet.has(item.topicid));
     const jsonData= inputJson(add,remove,"topic");
     const res= await setUserPreference(jsonData)
}
    setActiveTab(activeTab===7 ? activeTab : activeTab+1)
}
let queryClient = useQueryClient();
const { mutate } = useMutation(() => functionOnSave(), {
    onSuccess: async () => {
        await queryClient.invalidateQueries(["userPreferences"], { exact: true });
        Alert.success("toast","update successfully")
    },

    onError: () => {
        Alert.success("error","Something went wrong.")
    }
  });
const mutateFunction=()=>{
    mutate();
}

const inputJson=(add:any,remove:any,type:any)=>{
 let jsonData=   {
        "clientId": 0,
        "userIds": [
          {
            "userId": "5370c1fe-1e16-452f-b240-ce253823042c"
          }
        ],
        "remove": [
          {
            "media": type=="media" ? remove.map((Item:any) => ({ intMediaId: Item.mediaid })): 
            [{ "intMediaId": 0 }],
            "beat": type=="beat" ? remove.map((Item:any) => ({ intBeatId: Item.beatid })):
            [{"intBeatId": 0}],
            "geo": [
              {
                "intGeoId": 0
              }
            ],
            "competitor": [
              {
                "intCompetitorId": 0
              }
            ],
            "topic":type=="topic" ? remove.map((Item:any) => ({ intTopicId: Item.topicid })): [
              {
                "intTopicId": 0
              }
            ],
            "spokesperson": [
              {
                "intSpokespersonId": 0
              }
            ],
            "brand": [
              {
                "intBrandId": 0
              }
            ]
          }
        ],
        "add": [
          {
            "media": type=="media" ? add.map((Item:any) => ({ intMediaId: Item.mediaid })):  [{ "intMediaId": 0 }],
            "beat": type=="beat" ? add.map((Item:any) => ({ intBeatId: Item.beatid })): 
            [{"intBeatId": 0}],
            "geo": [
              {
                "intGeoId": 0
              }
            ],
            "competitor": [
              {
                "intCompetitorId": 0
              }
            ],
            "topic":type=="topic" ? add.map((Item:any) => ({ intTopicId: Item.topicid })):  [
              {
                "intTopicId": 0
              }
            ],
            "spokesperson": [
              {
                "intSpokespersonId": 0
              }
            ],
            "brand": [
              {
                "intBrandId": 0
              }
            ]
          }
        ]
      }
      return jsonData;
}
return(
    <>

<div className="inline-block w-full">
    <ul className="mb-5 grid grid-cols-7 text-center">
        <li>
            <div
                className={`${activeTab === 1 ? '!bg-primary text-white' : ''}
                block rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]`}
                onClick={() => setActiveTab(1)}
            >
                 Media Type
            </div>
        </li>

        <li>
            <div className={`${activeTab === 2 ? '!bg-primary text-white' : ''} block rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]`} onClick={() => setActiveTab(2)}>
                 Beat
            </div>
        </li>

        <li>
            <div className={`${activeTab === 3 ? '!bg-primary text-white' : ''} block rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]`} onClick={() => setActiveTab(3)}>
                 Geo
            </div>
        </li>

        <li>
            <div className={`${activeTab === 4 ? '!bg-primary text-white' : ''} block rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]`} onClick={() => setActiveTab(4)}>
                 Topic
            </div>
        </li>

        <li>
            <div className={`${activeTab === 5 ? '!bg-primary text-white' : ''} block rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]`} onClick={() => setActiveTab(5)}>
                 Competitors
            </div>
        </li>

        <li>
            <div className={`${activeTab === 6 ? '!bg-primary text-white' : ''} block rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]`} onClick={() => setActiveTab(6)}>
                 Brand
            </div>
        </li>

        <li>
            <div className={`${activeTab === 7 ? '!bg-primary text-white' : ''} block rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]`} onClick={() => setActiveTab(7)}>
                 Spokeperson
            </div>
        </li>
    </ul>

    <div>
        <div className="mb-5">{activeTab === 1 && 
        <div className='panel'>           
                  <div className="space-y-1 grid grid-cols-4">
                 
                  {mediaType?.map((item:any, index:any) => (                                            
                     <div key={item.mediaid}>
                        <label>
                        <input type="checkbox" 
                        className="form-checkbox outline-primary"                        
                        onChange={(e:any) => { item.status = e.target.checked;setmediaType([...mediaType]);
                        }}                                   
                        checked={item.status}></input>
                        <span>{item.mediaName}</span>
                        </label>
                     </div>
                     ))}  

                  </div>
                  </div>
                }</div>
        <p className="mb-5">{activeTab === 2 &&  <div className='panel'>           
                  <div className="space-y-1 grid grid-cols-4">
                 
                  {beat.map((item:any, index:any) => (                                            
                     <div key={item.beatid}>
                        <label>
                        <input type="checkbox" 
                        className="form-checkbox outline-primary"                        
                        onChange={(e:any) => { item.status = e.target.checked;setBeat([...beat]);
                        }}                                   
                        checked={item.status}></input>
                        <span>{item.beatName}</span>
                        </label>
                     </div>
                     ))}  

                  </div>
                  </div>}</p>
        <p className="mb-5">{activeTab === 3 && 'Wonderful transition effects.'}</p>
        <div className="mb-5">{activeTab === 4 && <div className='panel'>           
        <form className="w-full sm:w-1/4 mb-5">
        <div className="relative">
            <input
                type="text"
                value={topicSearch}
                placeholder="Search Attendees..."
                className="form-input shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] bg-white rounded-full h-11 placeholder:tracking-wider ltr:pr-11 rtl:pl-11"
               onChange={(e) => setTopicSearch(e.target.value)}
            />
            <button type="button" className="btn btn-primary absolute ltr:right-1 rtl:left-1 inset-y-0 m-auto rounded-full w-9 h-9 p-0 flex items-center justify-center">
            <span className="material-icons-outlined text-sm text-gray-500  hover:text-gray-700">
                search
              </span>
            </button>
        </div>
    </form>
    <AddTopic type={"topic"}/>
                  <div className="space-y-1 grid grid-cols-4">
                 
                  {filteredTopic.map((item:any, index:any) => (                                            
                     <div key={item.topicid}>
                        <label>
                        <input type="checkbox" 
                        className="form-checkbox outline-primary"                        
                        onChange={(e:any) => { item.status = e.target.checked;setTopic([...topic]); setFilteredTopic([...filteredTopic]); }}                                   
                        checked={item.status}></input>
                        <span>{item.topicName}</span>
                        </label>
                     </div>
                     ))}  

                  </div>
                  </div>}</div>
        <p className="mb-5">{activeTab === 5 && <div className='panel'>           
        <form className="w-full sm:w-1/4 mb-5">
        <div className="relative">
            <input
                type="text"
                value={competitorSearch}
                placeholder="Search Attendees..."
                className="form-input shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] bg-white rounded-full h-11 placeholder:tracking-wider ltr:pr-11 rtl:pl-11"
               onChange={(e) => setCompetitorSearch(e.target.value)}
            />
            <button type="button" className="btn btn-primary absolute ltr:right-1 rtl:left-1 inset-y-0 m-auto rounded-full w-9 h-9 p-0 flex items-center justify-center">
            <span className="material-icons-outlined text-sm text-gray-500  hover:text-gray-700">
                search
              </span>
            </button>
        </div>
    </form>
    <AddTopic type={"Competitors"}/>
                  <div className="space-y-1 grid grid-cols-4">
                 
                  {filteredCompetitor.map((item:any, index:any) => (                                            
                     <div key={item.competitorid}>
                        <label>
                        <input type="checkbox" 
                        className="form-checkbox outline-primary"                        
                        onChange={(e:any) => { item.status = e.target.checked;setCompetitor([...competitor]); setFilteredCompetitor([...filteredCompetitor]);
                        }}                                   
                        checked={item.status}></input>
                        <span>{item.competitorName}</span>
                        </label>
                     </div>
                     ))}  

                  </div>
                  </div>}</p>
        <p className="mb-5">{activeTab === 6 && 'Wonderful transition effects.'}</p>
        <p className="mb-5">{activeTab === 7 && 'Wonderful transition effects Four.'}</p>
    </div>
    <div className="flex justify-between">
        <button type="button" className={`btn btn-primary ${activeTab === 1 ? 'hidden' : ''}`} onClick={() => setActiveTab(activeTab===1 ? activeTab : activeTab-1)}>
            Back
        </button>
        <button type="button" className="btn btn-primary ltr:ml-auto rtl:mr-auto" onClick={mutateFunction}>
            {activeTab === 7 ? 'Save' : 'Save'}
        </button>
    </div>
</div>
</>
)
};
export default Preferences;