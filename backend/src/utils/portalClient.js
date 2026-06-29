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
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      })
    );
  }

  // -------------------------------
  // Step 1 : Fetch Login Page
  // -------------------------------
  async getLoginPage() {
    console.log("📄 Fetching Login Page...");

    const response = await this.client.get("/Login.aspx");

    return response.data;
  }

  // -------------------------------
  // Step 2 : Extract ASP.NET Fields
  // -------------------------------
  extractHiddenFields(html) {
    console.log("🔍 Extracting Hidden Fields...");

    const $ = cheerio.load(html);

    return {
      viewState: $("#__VIEWSTATE").val() || "",
      eventValidation: $("#__EVENTVALIDATION").val() || "",
      viewStateGenerator: $("#__VIEWSTATEGENERATOR").val() || "",
    };
  }

  // -------------------------------
  // Step 3 : Submit Login
  // -------------------------------
  async submitLogin(username, password, fields) {
    console.log("🚀 Logging into Portal...");

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

    return response;
  }

  // -------------------------------
  // Step 4 : Login
  // -------------------------------
  async login(username, password) {
    const html = await this.getLoginPage();

    const fields = this.extractHiddenFields(html);

    const response = await this.submitLogin(
      username,
      password,
      fields
    );

    if (response.status !== 200) {
      throw new Error("Login request failed.");
    }

    /*
      Later we'll improve this further by checking
      whether the returned HTML still contains Login.aspx.
      That will tell us if the credentials were wrong.
    */

    console.log("✅ Login Successful");

    return true;
  }

  // -------------------------------
  // Step 5 : Fetch Results
  // -------------------------------
  async getResults() {
    console.log("📚 Fetching Student Results...");

    const response = await this.client.get(
      "/Handler/Student.ashx",
      {
        params: {
          Page: "CourseEnroll",
          Mode: "GetResult",
          Id: 0,
        },
      }
    );

    if (!response.data || !response.data.Table) {
      throw new Error("Unable to fetch results.");
    }

    console.log(
      `✅ ${response.data.Table.length} courses retrieved`
    );

    return response.data.Table;
  }
}

export default PortalClient;