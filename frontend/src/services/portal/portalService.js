import { mockStudent } from "../../data/mock/portal/student";
import { mockPortalResults } from "../../data/mock/portal/results";

export async function fetchPortalData() {
  return {
    student: mockStudent,
    results: mockPortalResults,
  };
}