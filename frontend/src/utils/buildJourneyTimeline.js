import {
  EVENT_TYPES,
} from "../constants/timeline";

import {
  getAcademicSummary,
} from "./academicMetrics";

/**
 * Builds the Academic Journey timeline
 * using REAL portal result dates.
 */
export function buildJourneyTimeline(academicProfile) {
  const summary = getAcademicSummary(academicProfile);

  if (!academicProfile) {
    return {
      groupedEvents: {},
      footerMessage: summary.footerMessage,
      completedCount: 0,
      totalCourses: 0,
    };
  }

  const completed = academicProfile.completed || [];
  const failed = academicProfile.failed || [];

  const events = [];

  // ----------------------------------------
  // Completed Courses
  // ----------------------------------------

  completed.forEach((course) => {
    events.push({
      id: `${course.code}-completed`,

      type: EVENT_TYPES.COURSE,

      title: course.name,

      grade: course.grade,

      credits: course.credits,

      status: "PASS",

      resultDate: course.resultDate,

      month:
        course.month ||
        formatMonth(course.resultDate),

      badge: "COURSE",
    });
  });

  // ----------------------------------------
  // Failed Courses
  // ----------------------------------------

  failed.forEach((course) => {
    events.push({
      id: `${course.code}-failed`,

      type: EVENT_TYPES.BACKLOG,

      title: course.name,

      grade: course.grade,

      credits: course.credits,

      status: "FAIL",

      resultDate: course.resultDate,

      month:
        course.month ||
        formatMonth(course.resultDate),

      badge: "BACKLOG",
    });
  });

  // ----------------------------------------
  // Sort (Newest First)
  // ----------------------------------------

  events.sort((a, b) => {
    return (
      new Date(b.resultDate).getTime() -
      new Date(a.resultDate).getTime()
    );
  });

  // ----------------------------------------
  // Group by Month
  // ----------------------------------------

  const groupedEvents = {};

  events.forEach((event) => {
    const key = event.month;

    if (!groupedEvents[key]) {
      groupedEvents[key] = [];
    }

    groupedEvents[key].push(event);
  });

  return {
    groupedEvents,

    footerMessage: summary.footerMessage,

    completedCount: summary.completedCount,

    totalCourses: summary.totalCourses,
  };
}

/**
 * Converts ResultOn date into
 * "June 2026"
 */
function formatMonth(dateString) {
  if (!dateString) return "Unknown";

  return new Date(dateString).toLocaleString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    }
  );
}