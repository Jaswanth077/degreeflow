import axios from "axios";
import * as cheerio from "cheerio";
import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";

class PortalClient {
  constructor() {
    this.jar = new CookieJar();

    this.client = wrapper(
      axios.create({
        baseURL: "https://arms.sse.saveetha.com",
        jar: this.jar,
        withCredentials: true,
      })
    );
  }

  // Step 1: Fetch Login Page
  async getLoginPage() {
    console.log("📄 Fetching Login Page...");

    const response = await this.client.get("/Login.aspx");

    return response.data;
  }

  // Step 2: Extract ASP.NET Hidden Fields
  extractHiddenFields(html) {
    console.log("🔍 Extracting Hidden Fields...");

    const $ = cheerio.load(html);

    return {
      viewState: $("#__VIEWSTATE").val(),
      eventValidation: $("#__EVENTVALIDATION").val(),
      viewStateGenerator: $("#__VIEWSTATEGENERATOR").val(),
    };
  }

  // Step 3: Submit Login Form
  async submitLogin(username, password, fields) {
    console.log("🚀 Submitting Login...");

    const params = new URLSearchParams();

    params.append("__VIEWSTATE", fields.viewState);
    params.append("__VIEWSTATEGENERATOR", fields.viewStateGenerator);
    params.append("__EVENTVALIDATION", fields.eventValidation);

    params.append("txtusername", username);
    params.append("txtpassword", password);
    params.append("btnlogin", "Login");

    const response = await this.client.post(
      "/Login.aspx",
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("✅ Login Response:", response.status);

    return response;
  }

  // Main Login Method
  async login(username, password) {
    const html = await this.getLoginPage();

    const fields = this.extractHiddenFields(html);

    const response = await this.submitLogin(
      username,
      password,
      fields
    );

    return response;
  }
}

export default PortalClient;