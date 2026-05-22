// server.js
import express from 'express';
import courses from "./course.js";
const app = express();
const PORT = 3000;

// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses', (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;
    // Implementing the filter logic
    // Hint: Use the filter method to filter the courses array based on the provided criteria
    const filteredCourses = courses.filter(course => {
        if (course.department !== dept) {
            return false;
        }
        if (level && course.level !== level) {
            return false;
        }
        if (minCredits && course.credits < parseInt(minCredits)) {
            return false;
        }
        if (maxCredits && course.credits > parseInt(maxCredits)) {
            return false;
        }
        if (semester && course.semester !== semester) {
            return false;
        }
        if (instructor && course.instructor !== instructor) {
            return false;
        }
        return true;
    });

    res.json(filteredCourses);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
