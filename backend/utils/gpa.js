export const gradePoints = {
 "A+": 10,
 A: 9,
 B: 8,
 C: 7,
 D: 6,
 F: 0,
};

export const calculateSGPA = (subjects) => {
 let totalCredits = 0;
 let weightedSum = 0;

 subjects.forEach((s) => {
  const gp = gradePoints[s.grade] || 0;
  totalCredits += s.credits;
  weightedSum += gp * s.credits;
 });

 return (weightedSum / totalCredits).toFixed(2);
};

export const calculateCGPA = (allSemesters) => {
 let total = 0;
 allSemesters.forEach((s) => (total += parseFloat(s.sgpa)));
 return (total / allSemesters.length).toFixed(2);
};
