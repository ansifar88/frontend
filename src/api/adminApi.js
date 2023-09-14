import adminRequest from "../utils/adminRequest";

export async function AdminLogin(value) {
    try {
      const data = await adminRequest.post("/adminAuth/login", { ...value });
      return data;
    } catch (err) {
      return err;
    }
  }