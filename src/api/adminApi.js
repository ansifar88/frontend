import adminRequest from "../utils/adminRequest";

export async function AdminLogin(value) {
  try {
    const data = await adminRequest.post("/adminAuth/login", { ...value });
    return data;
  } catch (err) {
    return err;
  }
}

export const allUsers = async ({ page, filter, search }) => {
  return adminRequest.get("/users", {
    params: {
      page,
      filter,
      search,
    },
  });
};
export const allDoctors = async ({ page, filter, search }) => {
  return adminRequest.get("/doctors", {
    params: {
      page,
      filter,
      search,
    },
  });
};
export const allDepartments = async ({ page, filter, search }) => {
  return adminRequest.get("/department", {
    params: {
      page,
      filter,
      search,
    },
  });
};

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

export const verifyDoctor = async (id) => {
  return adminRequest.put(`/verify/${id}`, {
    withCredentials: true,
  });
};

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

export const rejectDoctor = async (data, id) => {
  return adminRequest.put(`/rejectDoctor/${id}`, data, {
    withCredentials: true,
  });
};
