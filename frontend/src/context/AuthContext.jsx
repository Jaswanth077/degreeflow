import { createContext, useContext, useEffect, useState } from "react";

import api from "../services/api";

import {
  saveSession,
  loadSession,
  clearSession,
} from "../utils/sessionHelper";

import { runAcademicEngine } from "../core/academic";
import { fetchPortalData } from "../services/portal/portalService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [student, setStudent] = useState(null);
  const [academicProfile, setAcademicProfile] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isMockMode, setIsMockMode] = useState(false);

  // ---------------------------------------
  // Restore Previous Session
  // ---------------------------------------

  useEffect(() => {
    const session = loadSession();

    if (session) {
      setStudent(session.student);
      setAcademicProfile(session.academicProfile);
      setIsAuthenticated(true);
      setIsMockMode(session.isMockMode);
    }

    setIsInitializing(false);
  }, []);

  // ---------------------------------------
  // Academic Engine
  // ---------------------------------------

  const buildProfile = (student, portalResults) =>
    runAcademicEngine({
      student,
      portalResults,
    });

  // ---------------------------------------
  // Apply Login State
  // ---------------------------------------

  const applyLogin = (profile, mockMode) => {
    setStudent(profile.student);
    setAcademicProfile(profile);

    setIsAuthenticated(true);
    setIsMockMode(mockMode);

    saveSession(profile.student, profile, mockMode);
  };

  // ---------------------------------------
  // Login
  // ---------------------------------------

  const login = async (registerNumber, password) => {
    setIsLoading(true);

    try {
      // =====================================
      // MOCK LOGIN
      // =====================================

      if (registerNumber === "12345678") {
        await new Promise((resolve) =>
          setTimeout(resolve, 800)
        );

        const portalData = await fetchPortalData();

        const profile = buildProfile(
          portalData.student,
          portalData.results
        );

        applyLogin(profile, true);

        return {
          success: true,
          mode: "mock",
        };
      }

      // =====================================
      // REAL LOGIN
      // =====================================

      const response = await api.post(
        "/api/student/progress",
        {
          username: registerNumber,
          password,
        }
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "Unable to fetch portal data."
        );
      }

      const { student, portalResults } =
        response.data.data;

      const profile = buildProfile(
        student,
        portalResults
      );

      applyLogin(profile, false);

      return {
        success: true,
        mode: "real",
      };
    } catch (error) {
      console.error(
        "Login Error:",
        error.response?.data || error.message
      );

      // =====================================
      // FALLBACK
      // =====================================

      const portalData = await fetchPortalData();

      const profile = buildProfile(
        portalData.student,
        portalData.results
      );

      applyLogin(profile, true);

      return {
        success: true,
        mode: "fallback",
        message:
          error.response?.data?.message ||
          error.message ||
          "Portal unavailable",
      };
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------------------------------
  // Logout
  // ---------------------------------------

  const logout = () => {
    setStudent(null);
    setAcademicProfile(null);

    setIsAuthenticated(false);
    setIsMockMode(false);

    clearSession();
  };

  return (
    <AuthContext.Provider
      value={{
        student,
        academicProfile,

        isAuthenticated,
        isLoading,
        isInitializing,
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
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
}