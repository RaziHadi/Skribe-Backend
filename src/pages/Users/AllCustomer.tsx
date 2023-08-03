import react, { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import userService from '../../services/user.service';
import Paging from '../../components/Paging';
import 'material-icons/iconfont/material-icons.css';
import { Link } from 'react-router-dom';
const AllCustomer=()=>{
    
const [allCustomers,setAllCustomers]= useState([{agencyId:"",agencyName:"",amount : 0,cityName:"",companyType:"",    createdDate:"", email:"", status:true, pitchingStatus:false }]);
    const [paging,setPaging]=useState({TotalCount:0,TotalPages:0,CurrentPage:0,previousPage:false,nextPage:false});
    const [currentPage, setCurrentPage] = useState(1);
    const [apiParameter, setApiParameter] = useState({
        serText: "",
        pageNumber: 1,
        pageSize: 20,
      });
      const [search, setSearch] = useState<string>('');
      const handlePageChange = (pageNumber:any) => {
        setCurrentPage(pageNumber);
        console.log(currentPage);
        setApiParameter((prevParameter) => ({
            ...prevParameter,
            pageNumber: pageNumber,
          }));
      };
      const handleSearchText = () => {
        setCurrentPage(1);
        setApiParameter((prevParameter) => ({
            ...prevParameter,
            serText: search, pageNumber:1
          }));        
      };
    useEffect(() => {
        userService.getAllCustomers(apiParameter)
          .then(response => {     
          var jsonPaging= JSON.parse(response.paging);
            setPaging(jsonPaging);
            setAllCustomers(response.data);
          })
          .catch(error => {
            console.log(error.response);
          });
      }, [apiParameter]);
return(<>
 <div style={{width: '250px',display:"flex"}} className="relative">
    <div>
            <input
                type="text"
                value={search}
                placeholder="Search Attendees..."
                className="form-input shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] bg-white rounded-full h-11 placeholder:tracking-wider ltr:pr-11 rtl:pl-11"
                 onChange={(e) => setSearch(e.target.value)}  />
            <button type="button" className="btn btn-primary absolute ltr:right-1 rtl:left-1 inset-y-0 m-auto rounded-full w-9 h-9 p-0 flex items-center justify-center"
            onClick={handleSearchText}>
            <span className="material-icons-outlined text-sm text-gray-500  hover:text-gray-700">
            search
          </span>
            </button>
            </div>
           
        </div>
        <div>
            <button className="btn btn-primary !mt-6">
                                <Link type="button" to={`/users/Create-Customer`}>
                                </Link>
                           Add Customer </button>
                            </div>
<div className="table-responsive mb-5">
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Amount</th>
                <th>City Name</th>
                <th>Type</th>
                <th>Created Date</th>
                <th>Customer Status</th>
                <th>Pitching Status</th>
                <th className="text-center">Action</th>
            </tr>
        </thead>
        <tbody>
            {allCustomers && allCustomers.length > 0 && allCustomers.map((data) => {
                return (
                    <tr key={data.agencyId}>
                        <td>{data.agencyId}</td>
                        <td>
                            <div className="whitespace-nowrap">{data.agencyName}</div>
                        </td>
                        <td>
                            <div className="whitespace-nowrap">{data.amount}</div>
                        </td>
                        <td>
                            <div className="whitespace-nowrap">{data.cityName}</div>
                        </td>
                        <td>
                            <div className="whitespace-nowrap">{data.companyType}</div>
                        </td>
                        <td>
                            <div className="whitespace-nowrap">{data.createdDate}</div>
                        </td>
                        <td>
                            <div className="whitespace-nowrap">{data.status ? <span className="material-icons-outlined text-sm text-gray-500  hover:text-gray-700">
                done
              </span>:<span className="material-icons-outlined text-sm text-gray-500  hover:text-gray-700">
                close
              </span>}</div>
                        </td>
                        <td>
                            <div className="whitespace-nowrap">
                                {data.pitchingStatus ? <span className="material-icons-outlined text-sm text-gray-500  hover:text-gray-700">
                mark_email_read
              </span>:<span className="material-icons-outlined text-sm text-gray-500  hover:text-gray-700">
                mail_lock
              </span>}
                        </div>
                        </td>
                        
                        <td className="p-3 border-b border-[#ebedf2] dark:border-[#191e3a] text-center">
                            <Tippy content="Edit">
                                <Link type="button" to={`/EditCustomer/${data.agencyId}`}>
                                <span className="material-icons-outlined text-sm text-gray-500  hover:text-gray-700">
                edit_note
              </span>
                                </Link>
                            </Tippy>
                            <Tippy content="Add">
                            <Link type="button" to={`/users/Registration/${data.agencyId}`}>
                                <span className="material-icons-outlined text-sm text-gray-500  hover:text-gray-700">
                group_add
              </span>
                                </Link>
                            </Tippy>
            <Tippy content="View Users">
                                <Link type="button" to={`/users/Clients-Users/${data.agencyId}`}>
                                <span className="material-icons-outlined text-sm text-gray-500  hover:text-gray-700">
                group
              </span>
                                </Link>
                            </Tippy>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    </table>
</div>

<Paging
  currentPage={paging.CurrentPage}
  totalPages={paging.TotalPages}
  onPageChange={handlePageChange}
/>

</>)
}
export default AllCustomer;
