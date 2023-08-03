import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useEffect,useState } from 'react';
import userService from '../../services/user.service';
import Alert from '../../components/Alert';
import React from 'react';
const CreateCustomer=()=>{
const [submitted, setSubmitting] = useState(false);
const [stateName,setStateName]=useState([{stateId:"",stateName:""}]);
const [cityName,setCityName]=useState([{cityId:"",cityName:""}]);
const [accountManager,setAccountManager]=useState([{autoId:"",userName:""}]);
const [file, setFile] = useState(null);
const [formData, setFormData] = useState({
    agencyName: "",
    agencyAddress: "",
    companyType: "",
    amount: "0",
    pitchingStatus: false,
    acountManagerId: "",
    file: null
}); 
const dispatch = useDispatch();
useEffect(() => {
    dispatch(setPageTitle('Create Customer'));
},[])
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
    console.log(e.target.value);
    setFormData(prevState => {
            return { ...prevState, [name]: value }; 
      });
    }
    const onStateChange = (e: any) => {
        const { name, value } = e.target;
        userService.getCity(value).then(response => {  
            console.log(formData);
          setCityName(response.data);
        }, error => {
          console.log(formData);
        });
    }
    const handleFileUpload = (event: any) => {
        const file = event.target.files[0];
        setFormData({ ...formData, file: file || null });
        setFile(file);
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
         setSubmitting(true);
         e.preventDefault();
        userService.postCreateCustomer(apiformData).then(response => {  
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
                <h2 className="font-bold text-2xl mb-3">Create Customer Form</h2>
<form onSubmit={createCustomer} className="space-y-5">
    <div>
        <label htmlFor="agencyName">Customer Name:</label>
        <input  value={formData.agencyName} name='agencyName' autoComplete="off"
                onChange={handleInputChange} id="customerName" type="text" required
                placeholder="Enter  Name" className="form-input"  />
    </div>

    <div>
        <label htmlFor="state">select state:</label>
        <select id="state" name='state' 
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
        <label htmlFor="agencyAddress">City:</label>
        <select id="agencyAddress" name="agencyAddress" 
        onChange={handleSelectChange} 
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
        onChange={handleSelectChange} 
        className="form-multiselect text-white-dark" required>
            <option value=""  >Select a client</option>
            <option key="1" value="Agency">Agency</option>
            <option key="2" value="Brand">Brand</option>
        </select>
    </div>
    <div>
        <label htmlFor="acountManagerId">Account Manager</label>
        <select id="acountManagerId" name='acountManagerId' 
        onChange={handleSelectChange}  
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
    <input type="checkbox" id="pitchingStatus" name='pitchingStatus' onChange={handleInputChange} className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"  />
    <span  className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
</label>
    </div>
    <div>
      <label htmlFor="upload">Upload File:</label>
      <input type="file" id="upload" name="upload"  onChange={handleFileUpload} />
    </div>
    <button type="submit" className="btn btn-primary !mt-6">
    {submitted ? (
        <>
            <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"></span>
            Loading...
        </>
    ) : (
        'Submit'
    )}
</button>
</form>
</div>
</div>
    </>)
}
export default CreateCustomer;