// Configuration for static GitHub Pages deployment
export const config = {
  // Base URL for GitHub Pages
  baseUrl: '/Calendar_app',
  
  // Feature flags for static deployment
  features: {
    authentication: false, // Disabled for static deployment
    database: false, // Disabled for static deployment
    localStorageSync: true, // Use localStorage instead of database
  },
  
  // Default data for static deployment
  defaults: {
    goals: [
      {
        id: '1',
        title: 'Complete Project',
        description: 'Finish the calendar app implementation',
        deadline: '2024-04-01',
        completed: false,
      },
      {
        id: '2',
        title: 'Learn Next.js',
        description: 'Master Next.js and React development',
        deadline: '2024-05-01',
        completed: false,
      },
    ],
    tasks: [
      {
        id: '1',
        title: 'Set up GitHub Pages',
        description: 'Configure static deployment',
        dueDate: '2024-03-20',
        completed: false,
        goalId: '1',
      },
    ],
    habits: [
      {
        id: '1',
        title: 'Code Review',
        description: 'Review code daily',
        frequency: 'daily',
        streak: 0,
      },
    ],
  },
} 