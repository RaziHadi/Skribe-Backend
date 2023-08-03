import React from "react";
import { useParams } from "react-router-dom";
import userService from "../../services/user.service";
import { useEffect,useState } from 'react';
import { useDispatch } from "react-redux";
import { setPageTitle } from '../../store/themeConfigSlice';
import Alert from '../../components/Alert';
import { Link } from 'react-router-dom';
const EditCustomer=()=>{
    const {id}=useParams();
    const dispatch = useDispatch();
    const [customerId, setCustomerId] = useState("");
    const [submitted, setSubmitting] = useState(false);
    const [stateName,setStateName]=useState([{stateId:"",stateName:""}]);
    const [cityName,setCityName]=useState([{cityId:"",cityName:""}]);
    const [accountManager,setAccountManager]=useState([{autoId:"",userName:""}]);
    const [formData, setFormData] = useState({
        agencyName: "",
        agencyAddress: "",
        companyType: "",
        amount: "0",
        pitchingStatus: false,
        acountManagerId: "",
        file: null,
        state:"",
        status:false
    }); 
    const CusId=id??'';
    dispatch(setPageTitle('Edit Customer'));
    useEffect(() => {  
        setCustomerId(CusId);
    },[])
    useEffect(() => {            
        userService.getCustomersById(id).then((response)=>{
        setFormData(response.data);
        console.log(response.data);
        }).catch(error => {
            console.log(error.response);
          });
    },[])
    useEffect(() => {
    userService.getCity(formData.state).then(response => {  
        setCityName(response.data);
      }, error => {
        console.log(error.response);
      });
    }, [formData.state]);
    useEffect(() => {
        Promise.all([userService.getState(), userService.getAllUser()])
          .then(([stateResponse, UserResponse]) => {
            console.log(stateResponse.data, UserResponse.data);
            setStateName(stateResponse.data);
            setAccountManager(UserResponse.data);
          })
          .catch(error => {
            console.log(error.response);
          });
      }, []);
    const handleInputChange = (e:any) => {
        const { name, value, checked, type } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: type === 'checkbox' ? checked : value
        }));
    }
    
    const handleSelectChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevState => {
                return { ...prevState, [name]: value }; 
          });
        }
        const onStateChange = (e: any) => {
            const { name, value } = e.target;
            setFormData(prevState => ({
             ...prevState, [name]: value 
          }));
          console.log(formData);
        }
        const handleFileUpload = (event: any) => {
            const file = event.target.files[0];
            setFormData({ ...formData, file: file || null });
          };
    const  createCustomer= async (e:any) =>{
        debugger;        
        const apiformData = new FormData();
        if (formData.file) {
           apiformData.append('file', formData.file);
         }
        apiformData.append('agencyName', formData.agencyName || '');
        apiformData.append('agencyAddress', formData.agencyAddress || '');
        apiformData.append('companyType', formData.companyType || '');
        apiformData.append('amount', formData.amount || '');
        apiformData.append('pitchingStatus', formData.pitchingStatus ? formData.pitchingStatus.toString() : '');
        apiformData.append('acountManagerId', formData.acountManagerId || '');
        apiformData.append('status', formData.status ? formData.status.toString() : '');
        setSubmitting(true);
        e.preventDefault();
       userService.putCreateCustomer(apiformData,id).then(response => {  
       setSubmitting(false);
       console.log(response);
       if(response.status==="Success"){
         Alert.success('success', `${response.message} <br> credentials sent on  mail Id.`);  
         }      
     },error=>{           
       setSubmitting(false);
       console.log(error);
    Alert.success('error', error.response.data.message)
     }
     );  
   }
    return(<>
<div className="flex justify-center items-center min-h-screen bg-cover bg-center">
            <div className="panel sm:w-[480px] m-6 max-w-lg w-full">
                <h2 className="font-bold text-2xl mb-3">User Registration Form</h2>
<form onSubmit={createCustomer} className="space-y-5">
    <div>
        <label htmlFor="agencyName">Customer Name:</label>
        <input  value={formData.agencyName} name='agencyName' autoComplete="off"
                onChange={handleInputChange} id="customerName" type="text" required
                placeholder="Enter  Name" className="form-input"  />
    </div>

    <div>
        <label htmlFor="state">select state:</label>
        <select id="state" name='state'  onChange={onStateChange}  value={formData.state}
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
        <label htmlFor="agencyAddress">City:</label>
        <select id="agencyAddress" name="agencyAddress" 
        onChange={handleSelectChange} value={formData.agencyAddress}
        className="form-multiselect text-white-dark" required>
            <option value=""  >Select a city</option>
        {cityName.map((city) => (
                <option value={city.cityId} key={city.cityId}>
                  {city.cityName}
                </option>
              ))}
        </select>
    </div>
    <div>
        <label htmlFor="companyType">Customer Type:</label>
        <select id="companyType" name="companyType"  
        onChange={handleSelectChange} value={formData.companyType}
        className="form-multiselect text-white-dark" required>
            <option value=""  >Select a client</option>
            <option key="1" value="Agency">Agency</option>
            <option key="2" value="Brand">Brand</option>
        </select>
    </div>
    <div>
        <label htmlFor="acountManagerId">Account Manager</label>
        <select id="acountManagerId" name='acountManagerId' 
        onChange={handleSelectChange}  value={formData.acountManagerId}
        className="form-multiselect text-white-dark" required>
            <option value=""  >Select a Account Manager</option>
            {accountManager.map((accMan,key) => (
                <option value={accMan.autoId} key={key}>
                  {accMan.userName}
                </option>
              ))}
        </select>
    </div>
    <div>
        <label htmlFor="amount">Amount:</label>
        <input  value={formData.amount} name='amount' autoComplete="off" min="1" max="1000000"
                onChange={handleInputChange} id="amount" type="number" required
                placeholder="Enter  Amount" className="form-input"  />
    </div>
    <div>
        <label htmlFor="pitchStatus">Pitch Status</label>
        <label className="w-12 h-6 relative">
    <input type="checkbox" id="pitchingStatus" name='pitchingStatus' onChange={handleInputChange} 
    checked={formData.pitchingStatus}
    className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"  />
    <span  className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
</label>
    </div>
    <div>
        <label htmlFor="status">Customer Status</label>
        <label className="w-12 h-6 relative">
    <input type="checkbox" id="status" name='status' onChange={handleInputChange} 
    checked={formData.status}
    className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"  />
    <span  className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
</label>
    </div>
    <div>
      <label htmlFor="upload">Upload File:</label>
      <input type="file" id="upload" name="upload"  onChange={handleFileUpload} />
    </div>
    <div style={{display:"flex", justifyContent: "space-between"}}>
    <button type="submit" className="btn btn-primary !mt-6">
    {submitted ? (
        <>
            <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"></span>
            Loading...
        </>
    ) : (
        'Update'
    )}
</button>
<button type="button" className="btn btn-dark !mt-6"><Link type="button" to={`/users/AllCustomer`}>Back To List </Link></button>
</div>
</form>

</div>

</div>

    </>)

}
export default EditCustomer;