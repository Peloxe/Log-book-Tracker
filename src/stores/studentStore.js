import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStudentStore = defineStore('student', () => {
  const students = ref([
    {
      id: 1,
      name: 'Alice Johnson',
      supervisorId: 1,
      submittedTasks: [
        { title: 'Updated UI', details: 'Worked on dashboard UI components' },
        { title: 'Fixed Login', details: 'Corrected validation errors' },
        { title: 'Database Migration', details: 'Migrated tables to new schema' },
        { title: 'API Integration', details: 'Connected front-end to API' },
        { title: 'Testing', details: 'Wrote unit tests for login module' },
      ]
    },
    {
      id: 2,
      name: 'Bob Smith',
      supervisorId: 1,
      submittedTasks: [
        { title: 'Created Forms', details: 'Designed student registration forms' },
        { title: 'Bug Fix', details: 'Resolved styling issues in login page' },
        { title: 'Server Setup', details: 'Configured development server' },
        { title: 'API Calls', details: 'Tested GET and POST requests' },
        { title: 'Debugging', details: 'Fixed UI misalignment issues' },
      ]
    },
    {
      id: 3,
      name: 'Charlie Brown',
      supervisorId: 2,
      submittedTasks: [
        { title: 'Initial Commit', details: 'Set up project repository' },
        { title: 'Login Page', details: 'Developed login functionality' },
        { title: 'UI Improvements', details: 'Enhanced dashboard layout' },
        { title: 'Bug Fixes', details: 'Resolved navigation issues' },
        { title: 'Testing', details: 'Conducted integration tests' },
      ]
    },
    {
      id: 4,
      name: 'Diana Prince',
      supervisorId: 2,
      submittedTasks: [
        { title: 'Project Setup', details: 'Initialized project structure' },
        { title: 'Form Validation', details: 'Implemented validation logic' },
        { title: 'UI Design', details: 'Created responsive design elements' },
        { title: 'API Integration', details: 'Connected front-end to back-end' },
        { title: 'Debugging', details: 'Fixed data rendering issues' },
      ]
    },
    {
      id: 5,
      name: 'Ethan Hunt',
      supervisorId: 1,
      submittedTasks: [
        { title: 'Backend Setup', details: 'Configured server and database' },
        { title: 'Login Functionality', details: 'Implemented user authentication' },
        { title: 'UI Enhancements', details: 'Improved dashboard aesthetics' },
        { title: 'Bug Fixes', details: 'Resolved API call issues' },
        { title: 'Testing', details: 'Performed unit testing on modules' },
      ]
    },
    {
      id: 6,
      name: 'Fiona Gallagher',
      supervisorId: 1,
      submittedTasks: [
        { title: 'Project Initialization', details: 'Set up initial project files' },
        { title: 'Form Creation', details: 'Developed student registration forms' },
        { title: 'UI Improvements', details: 'Enhanced user interface components' },
        { title: 'API Testing', details: 'Tested API endpoints for data retrieval' },
        { title: 'Debugging', details: 'Fixed layout issues on dashboard' },
      ]
    },
    {
      id: 7,
      name: 'George Martin',
      supervisorId: 2,
      submittedTasks: [
        { title: 'Repository Setup', details: 'Created project repository' },
        { title: 'Login Page Development', details: 'Built login functionality' },
        { title: 'UI Design', details: 'Designed dashboard layout' },
        { title: 'Bug Fixes', details: 'Resolved navigation issues' },
        { title: 'Testing', details: 'Conducted integration tests' },
      ]
    },
    {
      id: 8,
      name: 'Hannah Baker',
      supervisorId: 2,
      submittedTasks: [
        { title: 'Project Structure', details: 'Initialized project structure' },
        { title: 'Form Validation', details: 'Implemented validation logic' },
        { title: 'UI Design', details: 'Created responsive design elements' },
        { title: 'API Integration', details: 'Connected front-end to back-end' },
        { title: 'Debugging', details: 'Fixed data rendering issues' },
      ]
    },
    {
      id: 9,
      name: 'Ian Somerhalder',
      supervisorId: 1,
      submittedTasks: [
        { title: 'Backend Setup', details: 'Configured server and database' },
        { title: 'Login Functionality', details: 'Implemented user authentication' },
        { title: 'UI Enhancements', details: 'Improved dashboard aesthetics' },
        { title: 'Bug Fixes', details: 'Resolved API call issues' },
        { title: 'Testing', details: 'Performed unit testing on modules' },
      ]
    },
    {
      id: 10,
      name: 'Jane Doe',
      supervisorId: 1,
      submittedTasks: [
        { title: 'Project Initialization', details: 'Set up initial project files' },
        { title: 'Form Creation', details: 'Developed student registration forms' },
        { title: 'UI Improvements', details: 'Enhanced user interface components' },
        { title: 'API Testing', details: 'Tested API endpoints for data retrieval' },
        { title: 'Debugging', details: 'Fixed layout issues on dashboard' },
      ]
    },
    // ... add 18 more students similarly with supervisorId 1 or 2
  ]);

  return { students };
});