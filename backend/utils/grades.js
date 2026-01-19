export const getGrade = (total) => {
 if (total >= 90) return "A+";
 if (total >= 80) return "A";
 if (total >= 70) return "B";
 if (total >= 60) return "C";
 if (total >= 50) return "D";
 return "F";
};
