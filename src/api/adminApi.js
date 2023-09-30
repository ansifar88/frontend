import adminRequest from "../utils/adminRequest";

export async function AdminLogin(value) {
  try {
    const data = await adminRequest.post("/adminAuth/login", { ...value });
    return data;
  } catch (err) {
    return err;
  }
}

export const manageUser = async (id) => {
  return adminRequest.put(`/manageuser/${id}`, {
    withCredentials: true,
  });
};

export const addDepartment = async (details) => {
  return adminRequest.post("/department", details, {
    withCredentials: true,
  });
};

export const verifyDoctor = async(id)=>{
  return adminRequest.put(`/verify/${id}`,{
    withCredentials:true
  })
}

export const manageDoctor = async (id) => {
  return adminRequest.put(`/managedoctor/${id}`, {
    withCredentials: true,
  });
};
export const manageDepartment = async (id) => {
  return adminRequest.put(`/managedepartment/${id}`, {
    withCredentials: true,
  });
};