import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useEffect,useState } from 'react';
import userService from '../../services/user.service';
import Alert from '../../components/Alert';
import { useParams } from "react-router-dom";
const Registration=()=>{
  const {id}=useParams();
  let customerId = 0;
  if (id && id !== 'Registration') {
    customerId = parseInt(id);
  }
    const [submitted, setSubmitting] = useState(false);
    const [stateName,setStateName]=useState([{stateId:"",stateName:""}]);
    const [clientName,setClientName]=useState([{agencyId:"",agencyName:""}]);
    const [cityName,setCityName]=useState([{cityId:"",cityName:""}]);
    const[mailCont,setMailCont]= useState({to:"",subject:"",body:""});  
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        clientId: id && id !== 'Registration' ? id : '',
        state: "",
        city: "",
        image: "string",
        emailSignature: "string",
        userRole: "User",
        status: true
    });   
    useEffect(() => {
        Promise.all([userService.getState(), userService.getAllClient()])
          .then(([stateResponse, clientResponse]) => {
            console.log(stateResponse.data, clientResponse.data);
            setStateName(stateResponse.data);
            setClientName(clientResponse.data);
          })
          .catch(error => {
            console.log(error.response);
          });
      }, []);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Registration'));
        // setFormData({
        //   ...formData,clientId:  id !== 'Registration'? id :'',
        // })
    },[])
      useEffect(() => {
        setMailCont({
            ...mailCont,
            to: formData.email,
            subject: "formData.password",
            body:`Hi <br>For login on Skribe <br> UserName: ${formData.email} <br> Password: ${formData.password} `
        });
    }, [formData.email, formData.password]);
    
    const emailSend = async () => {
        userService.postEmailSend(mailCont).then(response=>{
            console.log(response);     
            return true;
            },error => {
                console.log(error.response);
                return false;
            })           
      }
    
    const handleInputChange = (e:any) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }
    const handleSelectChange = (e: any) => {
        const { name, value } = e.target;
        console.log(e.target.value);
        setFormData(prevState => {
            return { ...prevState, [name]: value };
          });
          
        if (name === "state") {
            userService.getCity(value).then(response => {  
                console.log(formData);
              setCityName(response.data);
            }, error => {
              console.log(formData);
            });
          }
        }
        const  RegisterUser= async (e:any) =>{
            debugger;
            setSubmitting(true);
            e.preventDefault();
            userService.PostUserRegistration(formData).then(response => {  
            setSubmitting(false);
            console.log(response);
            if(response.status==="Success"){
            const res=  emailSend();
            Alert.success('success', `${response.message} <br> credentials sent on  mail Id.`);  
            }         
          },error=>{           
            setSubmitting(false);
            console.log(error);
         Alert.success('error', "something went wrong please try again")
          }
          );
           
        } 
return(
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center">
            <div className="panel sm:w-[480px] m-6 max-w-lg w-full">
                <h2 className="font-bold text-2xl mb-3">User Registration Form</h2>
<form onSubmit={RegisterUser} className="space-y-5">
<div>
        <label htmlFor="client">select client</label>
        <select id="clientId" name='clientId' value={formData.clientId} 
        onChange={handleSelectChange} disabled={customerId >0 ? true : false}
        className="form-multiselect text-white-dark" required>
           <option value=""  >Select a client</option>
        {clientName.map((client) => (
                <option value={client.agencyId} key={client.agencyId}>
                  {client.agencyName}
                </option>
              ))}
        </select>
    </div>
    <div>
        <label htmlFor="username">User Name:</label>
        <input  value={formData.username} name='username' autoComplete="off"
                onChange={handleInputChange} id="username" type="email" required
                placeholder="Enter Full Name" className="form-input"  />
    </div>

    <div>
        <label htmlFor="email">Email:</label>
        <input  value={formData.email}
                onChange={handleInputChange} id="email" type="email"  name='email' required
                placeholder="Enter Email Id" className="form-input" />
    </div>
    <div>
        <label htmlFor="password">Password:</label>
        <input  value={formData.password}
                onChange={handleInputChange} id="password" type="password"  name='password' required
                 className="form-input" />
    </div>
    <div>
        <label htmlFor="state">select state</label>
        <select id="state" name='state' value={formData.state}
        onChange={handleSelectChange}  
        className="form-multiselect text-white-dark" required>
            <option value=""  disabled>Select a state</option>
        {stateName.map((State) => (
                <option value={State.stateId} key={State.stateId}>
                  {State.stateName}
                </option>
              ))}
        </select>
    </div>
    <div>
        <label htmlFor="city">Example multiple select</label>
        <select id="city" name='city' value={formData.city}
        onChange={handleSelectChange}  
        className="form-multiselect text-white-dark" required>
            <option value=""  disabled>Select a city</option>
        {cityName.map((city) => (
                <option value={city.cityId} key={city.cityId}>
                  {city.cityName}
                </option>
              ))}
        </select>
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
)
};
export default Registration;