export const CURRENT_SESSION_VERSION = 2;

export const SESSION_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

const STORAGE_KEY = "degreeflow_session";

/**
 * Validates a stored session.
 */
export function validateSession(session) {
  if (!session) return false;

  // Version check
  if (session.version !== CURRENT_SESSION_VERSION) {
    return false;
  }

  // Required fields
  if (
    !session.student ||
    !session.student.registerNumber ||
    !session.academicProfile
  ) {
    return false;
  }

  // Expire only real sessions
  if (!session.isMockMode && session.timestamp) {
    const age = Date.now() - session.timestamp;

    if (age > SESSION_EXPIRY_MS) {
      return false;
    }
  }

  return true;
}

/**
 * Saves session.
 */
export function saveSession(
  student,
  academicProfile,
  isMockMode
) {
  const session = {
    version: CURRENT_SESSION_VERSION,

    timestamp: Date.now(),

    student,

    academicProfile,

    isMockMode,
  };

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(session)
    );
  } catch (error) {
    console.error(
      "Unable to save DegreeFlow session.",
      error
    );
  }
}

/**
 * Loads session.
 */
export function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) return null;

    const session = JSON.parse(raw);

    if (!validateSession(session)) {
      clearSession();
      return null;
    }

    return session;
  } catch (error) {
    console.error(
      "Unable to load DegreeFlow session.",
      error
    );

    clearSession();

    return null;
  }
}

/**
 * Clears session.
 */
export function clearSession() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error(
      "Unable to clear DegreeFlow session.",
      error
    );
  }
}