import { useQueries,useQueryClient,useQuery} from 'react-query';
import userService from '../services/user.service';

export function userPreference(){
 const [mediaQuery, beatQuery,geoQuery,topicQuery,competitorQuery,brandQuery,spokespersonQuery,userPreferencesQuery] = useQueries(
     [
      {
        queryKey: ['media'],
        queryFn: () =>userService.get('/userpreference/media'),
        staleTime: Infinity
      },

      {
        queryKey: ['beat'],
        queryFn: () =>userService.get('/userpreference/beat'),
        staleTime: Infinity               
      },
      {
        queryKey: ['geo'],
        queryFn: () =>userService.get('/userpreference/geo'),
        staleTime: Infinity
      },

      {
        queryKey: ['topic'],
        queryFn: () =>userService.get('/userpreference/topic'),
        staleTime: Infinity               
      },
      {
        queryKey: ['competitor'],
        queryFn: () =>userService.get('/userpreference/competitor'),
        staleTime: Infinity
      },

      {
        queryKey: ['brand'],
        queryFn: () =>userService.get('/userpreference/brand'),
        staleTime: Infinity               
      },
      {
        queryKey: ['spokesperson'],
        queryFn: () =>userService.get('/userpreference/spokesperson'),
        staleTime: Infinity               
      },
      {
        queryKey: ['userPreferences'],
        queryFn: () =>userService.get('/userpreference/preferences?userid=5370c1fe-1e16-452f-b240-ce253823042c'),
        staleTime: Infinity               
      }
    ],
  );
  return{mediaQuery, beatQuery,geoQuery,topicQuery,competitorQuery,brandQuery,spokespersonQuery,userPreferencesQuery};
}
export const  setUserPreference=async (data:any)=>
{
  userService.post("userpreference/preferences", data
 ).then(response => {
   if (response) {
     console.log(response)
   }
   return response;
 });
}

// export const  addTopicLookup=async (data:any)=>
// {
//   userService.post("/userpreference/topic", data
//  ).then(response => {
//    if (response) {
//      console.log(response)
//    }
//    return response;
//  });
// }
export const addTopicLookup = async (data:any) => {
  try {
    const response = await userService.post('/userpreference/topic', data);
    if (response) {
      console.log(response);
    }
    return response;
  } catch (error) {
    console.error('Error adding topic lookup:', error);
    throw error;
  }
};
//  export function addTopicLookup(data:any)
// {
//  // const { data, isLoading } = useQuery(["saveUserPreferences"], getApiData);
//   const [mediaQueryDataSave] = useQueries(
//     [
//      {
//        queryKey: ['Post-UserPreference'],
//        queryFn: () =>userService.post('//v1/userpreference/topic',data),
//        staleTime: Infinity
//      }
// ]);
// return{mediaQueryDataSave}
// }
// export const getTopic = async () => {
//   const { data } = await userService.get("/userpreference/topic")
//   return data;
// };
async function getTopic(){
  const { data } = await userService.get('/userpreference/topic');
  return data;
}

export function useProduct() {
  const { data , isError, isLoading } = useQuery(["topicNew"], getTopic);
  let d = data;
  let isLoadingTopic=isLoading
  return {d, isError, isLoadingTopic};
}