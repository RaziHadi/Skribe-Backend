import api from './api';
import TokenService from "./token.service";

class UserService {

async get(url:any){
  const response = await api.get(url, {
    headers: {
      Authorization: `Bearer ${TokenService.getLocalAccessToken()}`
    }
  });
  if (response) {
    //console.log(response);
  }
  return response.data;
};

async post(url:any, data:any) {
  const response = await api.post(url,data, {
    headers: {
      Authorization: `Bearer ${TokenService.getLocalAccessToken()}`
    }
  });
  if (response) {
    console.log(response);
  }
  return response.data;
}

  getPublicContent() {    
    return api.get('/Beat/GetBeat', {
      headers: {
      Authorization: `Bearer ${TokenService.getLocalAccessToken()}`}
    }
  )};

  async getGeo() {
    const response = await api.get('/UserDataSettings/Get-Location', {
      headers: {
        Authorization: `Bearer ${TokenService.getLocalAccessToken()}`
      }
    });
    if (response) {
      console.log(response);
    }
    return response.data;
  }

  async postGeo(data:any) {
    const response = await api.post('/UserDataSettings/Post-Location',data, {
      headers: {
        Authorization: `Bearer ${TokenService.getLocalAccessToken()}`
      }
    });
    if (response) {
      console.log(response);
    }
    return response.data;
  }

  async getMediaType() {
    const response = await api.get('/UserDataSettings/Get-MediaType', {
      headers: {
        Authorization: `Bearer ${TokenService.getLocalAccessToken()}`
      }
    });
    if (response) {
      console.log(response);
    }
    return response.data;
  }

  async postMediaType(data:any) {
    const response = await api.post('/UserDataSettings/Post-MediaType',data, {
      headers: {
        Authorization: `Bearer ${TokenService.getLocalAccessToken()}`
      }
    });
    if (response) {
      console.log(response);
    }
    return response.data;
  }

  async getBeat() {
    const response = await api.get('/UserDataSettings/Get-Beat', {
      headers: {
        Authorization: `Bearer ${TokenService.getLocalAccessToken()}`
      }
    });
    if (response) {
      console.log(response);
    }
    return response.data;
  }

  async postBeat(data:any) {
    const response = await api.post('/UserDataSettings/Post-Beat',data, {
      headers: {
        Authorization: `Bearer ${TokenService.getLocalAccessToken()}`
      }
    });
    if (response) {
      console.log(response);
    }
    return response.data;
  }

  async getCompetitor() {
    const response = await api.get('/UserDataSettings/Get-Competitor', {
      headers: {
        Authorization: `Bearer ${TokenService.getLocalAccessToken()}`
      }
    });
    if (response) {
      console.log(response);
    }
    return response.data;
  }

  async postCompetitor(data:any) {
    const response = await api.post('/UserDataSettings/Post-Competitor',data, {
      headers: {
        Authorization: `Bearer ${TokenService.getLocalAccessToken()}`
      }
    });
    if (response) {
      console.log(response);
    }
    return response.data;
  }
  async getTopic() {
    const response = await api.get('/UserDataSettings/Get-Topic', {
      headers: {
        Authorization: `Bearer ${TokenService.getLocalAccessToken()}`
      }
    });
    if (response) {
      console.log(response);
    }
    return response.data;
  }
  async postTopic(data:any) {
    const response = await api.post('/UserDataSettings/Post-Topic',data, {
      headers: {
        Authorization: `Bearer ${TokenService.getLocalAccessToken()}`
      }
    });
    if (response) {
      console.log(response);
    }
    return response.data;
  }

  async PostUserRegistration(data: any) {
    const response = await api.post("/Authenticate/register", data, {
      headers: {
        Authorization: `Bearer ${TokenService.getLocalAccessToken()}`
      }
    });
    if (response) {
      console.log(response);
    }
    return response.data;
  }
  

  async getAllClient() {
    const response = await api.get('/CreateCustomer/Get-All-Client', {
      headers: {
        Authorization: `Bearer ${TokenService.getLocalAccessToken()}`
      }
    });
    if (response) {
      console.log(response);
    }
    return response.data;
  }
  async getState() {
    const response = await api.get('/Search/Get-State', {
      headers: {
        Authorization: `Bearer ${TokenService.getLocalAccessToken()}`
      }
    });
    if (response) {
      console.log(response);
    }
    return response.data;
  }
 
  async getCity(stateId:any) {
    const response = await api.get('/Search/Get-City-By-Id?StateId='+stateId, {
      headers: {
        Authorization: `Bearer ${TokenService.getLocalAccessToken()}`
      }
    });
    if (response) {
      console.log(response);
    }
    return response.data;
  }
  async postEmailSend(data:any) {
    const response = await api.post('/EmailSend/Send-Mail',data, {
      headers: {
        Authorization: `Bearer ${TokenService.getLocalAccessToken()}`
      }
    });
    if (response) {
      console.log(response);
    }
    return response.data;
  }
  async getAllUser() {
    const response = await api.get('/CreateCustomer/Get-All-User', {
      headers: {
        Authorization: `Bearer ${TokenService.getLocalAccessToken()}`
      }
    });
    if (response) {
      console.log(response);
    }
    return response.data;
  }

  async postCreateCustomer(data:any) {
    const response = await api.post('/CreateCustomer/Create-Customer',data, {
      headers: {
        'Content-Type': 'multipart/form-data',
    'accept': '*/*',
        'Authorization': `Bearer ${TokenService.getLocalAccessToken()}`
      }
    });
    if (response) {
      console.log(response);
    }
    return response.data;
  }

  async getAllCustomers(apiParameter:any) {
    const response = await api.get(`/CreateCustomer/Get-All-Customers-Details?pageNumber=${apiParameter.pageNumber}&pageSize=${apiParameter.pageSize}&txtSearch=${apiParameter.serText}`, {
      headers: {
        Authorization: `Bearer ${TokenService.getLocalAccessToken()}`
      }
    });
    if (response) {
    }
    return response.data;
  }

  async getCustomersById(Id:any) {
    const response = await api.get(`/CreateCustomer/Get-Customer-by-Id?customerId=${Id}`, {
      headers: {
        Authorization: `Bearer ${TokenService.getLocalAccessToken()}`
      }
    });
    if (response) {
    }
    return response.data;
  }
  async putCreateCustomer(data:any,Id:any) {
    const response = await api.put(`/CreateCustomer/Update-Customer-By-Id?customerId=${Id}`,data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'accept': '*/*',
        'Authorization': `Bearer ${TokenService.getLocalAccessToken()}`
      }
    });
    if (response) {
      console.log(response);
    }
    return response.data;
  }

  async getAgencyUsersById(Id:any) {
    const response = await api.get(`/CreateCustomer/Get-Agency-Users?AgencyId=${Id}`, {
      headers: {
        Authorization: `Bearer ${TokenService.getLocalAccessToken()}`
      }
    });
    return response.data;
  }

}

export default new UserService();
