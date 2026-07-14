import { loadCurriculum } from "../../core/academic";
import { buildAcademicProfile } from "../../core/academic";

// Load CSE AI 2024 curriculum
const curriculum = loadCurriculum("cse_ai_2024");

// Mock portal results
const portalResults = [
  { code: "UBA01", grade: "A" },
  { code: "UBA04", grade: "A" },
  { code: "UBA53", grade: "B" },
  { code: "UBA28", grade: "PASS" },
  { code: "UBA48", grade: "S" },
  { code: "UBA49", grade: "A" },
  { code: "UBA29", grade: "B" },
  { code: "BTA01", grade: "C" },
  { code: "EEA01", grade: "A" },
  { code: "ECA47", grade: "A" },
  { code: "CSA02", grade: "B" },
  { code: "CSA04", grade: "A" },
  { code: "CSA07", grade: "A" },
  { code: "CSA08", grade: "B" },
  { code: "CSA09", grade: "A" },
  { code: "CSA10", grade: "A" },
  { code: "ITA05", grade: "A" },
  { code: "DSA01", grade: "B" },

  // Active backlogs
  { code: "CSA05", grade: "RA" },
  { code: "CSA12", grade: "RA" },
];

// Build academic profile
const profile = buildAcademicProfile(curriculum, portalResults);

console.clear();

console.log("====================================");
console.log("      DEGREEFLOW ENGINE TEST");
console.log("====================================");

console.log("\nSUMMARY");
console.table(profile.summary);

console.log("\nCREDITS");
console.table(profile.credits);

console.log("\nGRADE DISTRIBUTION");
console.table(profile.grades);

console.log("\nCOMPLETED COURSES");
console.table(
  profile.completed.map(course => ({
    Code: course.code,
    Grade: course.grade,
    Credits: course.credits,
  }))
);

console.log("\nFAILED COURSES");
console.table(
  profile.failed.map(course => ({
    Code: course.code,
    Grade: course.grade,
    Credits: course.credits,
  }))
);

console.log("\nREMAINING COURSES");
console.table(
  profile.remaining.map(course => ({
    Code: course.code,
    Credits: course.credits,
  }))
);

console.log("\n====================================");

console.log("Total Courses :", profile.summary.totalCourses);
console.log("Completed     :", profile.summary.completed);
console.log("Failed        :", profile.summary.failed);
console.log("Remaining     :", profile.summary.remaining);

console.log("\n====================================");

console.assert(
  profile.summary.totalCourses === 37,
  "❌ Total courses should be 37"
);

console.assert(
  profile.summary.completed === 18,
  "❌ Completed courses should be 18"
);

console.assert(
  profile.summary.failed === 2,
  "❌ Failed courses should be 2"
);

console.assert(
  profile.summary.remaining === 17,
  "❌ Remaining courses should be 17"
);

console.log("\n✅ All Academic Engine tests passed successfully!");