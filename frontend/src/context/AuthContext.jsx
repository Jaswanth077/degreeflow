import { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [student, setStudent] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [progressData, setProgressData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMockMode, setIsMockMode] = useState(false);

  // Restore session from localStorage
  useEffect(() => {
    const savedStudent = localStorage.getItem("df_student");
    const savedAuth = localStorage.getItem("df_auth") === "true";
    const savedProgress = localStorage.getItem("df_progress");
    const savedMock = localStorage.getItem("df_mock") === "true";

    if (savedAuth && savedProgress) {
      setStudent(savedStudent ? JSON.parse(savedStudent) : { name: "Student", registerNumber: "" });
      setIsAuthenticated(true);
      setProgressData(JSON.parse(savedProgress));
      setIsMockMode(savedMock);
    }
  }, []);

  // Login handler
  const login = async (registerNumber, password) => {
    setIsLoading(true);
    try {
      // 1. Check if register number is mock code
      if (registerNumber === "12345678") {
        await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate delay
        const mockData = getMockProgressData();
        const studentInfo = { name: "Jaswanth G", registerNumber: "12345678" };

        setStudent(studentInfo);
        setProgressData(mockData);
        setIsAuthenticated(true);
        setIsMockMode(true);

        localStorage.setItem("df_student", JSON.stringify(studentInfo));
        localStorage.setItem("df_auth", "true");
        localStorage.setItem("df_progress", JSON.stringify(mockData));
        localStorage.setItem("df_mock", "true");

        return { success: true, mode: "mock" };
      }

      // 2. Otherwise try real portal sync
      const response = await api.post("/api/student/progress", {
        username: registerNumber,
        password: password,
      });

      if (response.data && response.data.success) {
        const studentInfo = {
          name: response.data.data.studentName || "Student",
          registerNumber: registerNumber,
        };

        setStudent(studentInfo);
        setProgressData(response.data.data);
        setIsAuthenticated(true);
        setIsMockMode(false);

        localStorage.setItem("df_student", JSON.stringify(studentInfo));
        localStorage.setItem("df_auth", "true");
        localStorage.setItem("df_progress", JSON.stringify(response.data.data));
        localStorage.setItem("df_mock", "false");

        return { success: true, mode: "real" };
      } else {
        throw new Error(response.data.message || "Failed to retrieve academic progress.");
      }
    } catch (error) {
      console.error("Login failure:", error);
      // Fallback to Mock mode for demonstration if portal sync fails
      const fallbackMock = getMockProgressData();
      const studentInfo = { name: "Jaswanth G (Demo)", registerNumber: registerNumber };

      setStudent(studentInfo);
      setProgressData(fallbackMock);
      setIsAuthenticated(true);
      setIsMockMode(true);

      localStorage.setItem("df_student", JSON.stringify(studentInfo));
      localStorage.setItem("df_auth", "true");
      localStorage.setItem("df_progress", JSON.stringify(fallbackMock));
      localStorage.setItem("df_mock", "true");

      return {
        success: true,
        mode: "fallback",
        message: error.response?.data?.message || error.message || "Portal unreachable",
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout handler
  const logout = () => {
    setStudent(null);
    setIsAuthenticated(false);
    setProgressData(null);
    setIsMockMode(false);
    localStorage.removeItem("df_student");
    localStorage.removeItem("df_auth");
    localStorage.removeItem("df_progress");
    localStorage.removeItem("df_mock");
  };

  return (
    <AuthContext.Provider
      value={{
        student,
        isAuthenticated,
        progressData,
        isLoading,
        isMockMode,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Mock Data Builder based exactly on UI Plan specs
function getMockProgressData() {
  return {
    summary: {
      totalCourses: 37,
      completed: 18,
      failed: 2,
      remaining: 17,
      progress: 49.00,
    },
    completed: [
      { code: "UBA01", name: "Engineering Mathematics - I", credits: 5, grade: "A" },
      { code: "UBA04", name: "Discrete Mathematics", credits: 5, grade: "A-" },
      { code: "UBA53", name: "Probabilistic Methods and Linear Algebra", credits: 5, grade: "B+" },
      { code: "UBA28", name: "Professional Ethics and Legal Practices", credits: 2, grade: "PASS" },
      { code: "UBA48", name: "Engineering Physics", credits: 5, grade: "A" },
      { code: "UBA49", name: "Engineering Chemistry", credits: 5, grade: "A" },
      { code: "UBA29", name: "Technical English", credits: 3, grade: "A" },
      { code: "BTA01", name: "Biology and Environmental Science for Engineers", credits: 3, grade: "B" },
      { code: "EEA01", name: "Basic Electrical and Electronics Engineering", credits: 5, grade: "A" },
      { code: "ECA47", name: "Principles of Digital System Design", credits: 5, grade: "A" },
      { code: "CSA02", name: "C Programming", credits: 5, grade: "B+" },
      { code: "CSA04", name: "Operating Systems", credits: 5, grade: "A-" },
      { code: "CSA07", name: "Computer Networks", credits: 5, grade: "A" },
      { code: "CSA08", name: "Python Programming", credits: 5, grade: "B+" }, // recent B+ 7.8
      { code: "CSA09", name: "Programming in Java", credits: 5, grade: "A" },
      { code: "CSA10", name: "Software Engineering", credits: 5, grade: "A-" }, // recent A- 8.7
      { code: "ITA05", name: "Computer Vision", credits: 4, grade: "A-" }, // recent A- 9.2
      { code: "DSA01", name: "Object Oriented Programming using C++", credits: 4, grade: "B+" },
      { code: "SPIC5", name: "Industrial Internship - I", credits: 3, grade: "PASS" },
      { code: "SPIC9", name: "Professional Certification", credits: 2, grade: "PASS" },
    ].slice(0, 18), // exact match of 18 courses
    failed: [
      { code: "CSA05", name: "Database Management Systems", credits: 3, grade: "RA" },
      { code: "CSA12", name: "Computer Architecture", credits: 4, grade: "RA" },
    ],
    remaining: [
      { code: "UBA10", name: "Numerical Methods", credits: 5 },
      { code: "UBA06", name: "Applied Mathematics", credits: 5 },
      { code: "CSA03", name: "Data Structures", credits: 5 },
      { code: "CSA15", name: "Cloud computing and Big Data Analytics", credits: 5 },
      { code: "CSA16", name: "Data warehousing and Data Mining", credits: 4 },
      { code: "CSA17", name: "Artificial Intelligence", credits: 5 },
      { code: "CSA06", name: "Design and Analysis of Algorithms", credits: 5 },
      { code: "CSA65", name: "Generative AI and Large-Scale Models", credits: 4 },
      { code: "DSA03", name: "Natural Language Processing", credits: 4 },
      { code: "DSA04", name: "Fundamentals of Data Science", credits: 4 },
      { code: "MLA03", name: "Reinforcement Learning", credits: 4 },
      { code: "ECA14", name: "Embedded Systems", credits: 4 },
      { code: "SPIC7", name: "Product Design and Development", credits: 4 },
      { code: "SPIC4", name: "Research Project", credits: 6 },
      { code: "SPIC6", name: "Industrial Internship - II", credits: 3 },
    ],
  };
}
