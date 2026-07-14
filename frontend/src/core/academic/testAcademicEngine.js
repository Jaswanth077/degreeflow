import { runAcademicEngine } from "./academicEngine";
import { mockPortalResults } from "../../data/mock/portal/results";

const profile = runAcademicEngine({
  student: {
    name: "Test Student",
    registerNumber: "12345678",
    stream: "cse_ai",
    batch: "2024",
  },
  portalResults: mockPortalResults,
});

console.log(profile);