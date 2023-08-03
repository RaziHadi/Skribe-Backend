import { useState,Fragment,useEffect } from "react";
import { Dialog, Transition } from '@headlessui/react';
import Alert from "../../../components/Alert";
import { useMutation, useQueryClient } from "react-query";
import {addTopicLookup } from '../../../custom-hooks/userPreferences';
    const AddTopic=  (type:any) => {
        console.log(type)
    const [isAddProjectModal, setIsAddProjectModal] = useState(false);
    const [LookupName,setTopicName]=useState();
    const saveTopic = async () => {
        if (LookupName==="") {
            Alert.success("error","Topic is required.")
            return false;
        }
       else {
        if(type.type==="topic")
        {
            let addTopicBody=[
                {
                  "vchTopic": LookupName
                }
              ]
           let res= addTopicLookup(addTopicBody)
        }
            };
        setIsAddProjectModal(false);
      };
      const changeValue = (e: any) => {
        const { value, id } = e.target;
        setTopicName(e.target.value);
    };
      const closeModal = () => {
        setIsAddProjectModal(false);
      };
      let queryClient = useQueryClient();
      const { mutate } = useMutation(() => saveTopic(), {
          onSuccess: async () => {
              await queryClient.invalidateQueries(["topic"], { exact: true });
              Alert.success("toast","Add Topic successfully");
          },
      
          onError: () => {
              Alert.success("error","Something went wrong.")
          }
        });
      const AddLookup=()=>{
          mutate();
      }
    return(<>
        <button
                    type="button"
                    className="btn btn-primary flex w-full sm:w-1/4 mb-5"
                    onClick={() => {
                        setIsAddProjectModal(true);
                    console.log(isAddProjectModal)
                    }}
                >
                    <svg className="w-5 h-5 ltr:mr-3 rtl:ml-3" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Add Topic
                </button>
     {/* add project modal */}
 <Transition appear show={isAddProjectModal} as={Fragment}>
                <Dialog as="div" open={isAddProjectModal} onClose={closeModal} className="relative z-50">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div  className="fixed inset-0 z-[999] px-4 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddProjectModal(false)}
                                        className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                    {/* <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                        {params.id ? 'Edit Project' : 'Add Project'}
                                    </div> */}
                                    <div className="p-5">
                                        <form onSubmit={AddLookup}>
                                            <div className="grid gap-5">
                                                <div>
                                                    <label htmlFor="title">Name</label>
                                                    <input id="title" value={LookupName} onChange={changeValue} type="text" className="form-input mt-1" placeholder="Enter Name" />
                                                </div>
                                            </div>

                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setIsAddProjectModal(false)}>
                                                    Cancel
                                                </button>
                                                <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                    Add
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
    </>)
}
export default AddTopic;