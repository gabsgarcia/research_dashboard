# Research Dashboard

A full-stack application for managing and visualizing scientific research projects and their metrics. Built with Ruby on Rails API backend and React frontend.

## Features

- **Project Management**: Create, view, and manage research projects with detailed metadata
- **Metrics Tracking**: Track important research metrics with time-series visualization
- **Data Visualization**: Interactive charts showing metric trends over time
- **Collaborative Notes**: Add notes to metrics for team collaboration
- **Favorite Projects**: Bookmark important projects for quick access
- **Export Functionality**: Export project metrics to CSV for external analysis
- **Role-Based Access**: Different permissions for administrators and researchers
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

### Backend
- **Ruby on Rails 7.1**: API development and server-side logic
- **PostgreSQL**: Relational database for data storage
- **Devise**: Authentication system for secure access
- **ActiveRecord**: ORM for database interactions

### Frontend
- **React 18**: Component-based UI development
- **Bootstrap 5**: Responsive design framework
- **Recharts**: Data visualization library
- **Axios**: Promise-based HTTP client for API requests

## Architecture

The application follows a modern full-stack architecture:

1. **Rails API Backend**: 
   - RESTful API endpoints
   - JSON serialization
   - Authentication and authorization
   - Database operations

2. **React Frontend**:
   - Component-based UI
   - State management using React hooks
   - API integration with the backend
   - Interactive data visualization

3. **Database Schema**:
   - Users: Authentication and role management
   - ResearchProjects: Core project information
   - Metrics: Time-series data points for projects
   - Notes: Collaborative annotations on metrics
   - Favorites: User project bookmarks

## Key Components

### Backend Controllers
- `Api::ResearchProjectsController`: Project CRUD operations
- `Api::MetricsController`: Metric management
- `Api::NotesController`: Notes functionality
- `Api::ExportsController`: Data export feature
- `Api::FavoritesController`: Project favoriting

### Frontend Components
- `App.jsx`: Main application component and routing
- `Dashboard.jsx`: Projects overview and favorites
- `ProjectDetails.jsx`: Detailed project view with metrics
- `MetricChart.jsx`: Data visualization for metrics
- `NotesPanel.jsx`: Collaborative notes interface
- `ExportButton.jsx`: CSV export functionality

## Data Flow

1. User authenticates with Devise
2. React frontend fetches data from Rails API
3. Data is rendered in React components
4. User interactions trigger API calls to update data
5. State is managed within React components using hooks

## Getting Started

### Prerequisites
- Ruby 3.1.2
- Rails 7.1.5
- Node.js and npm
- PostgreSQL

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/research-dashboard.git
cd research-dashboard
```

2. Install Ruby dependencies
```bash
bundle install
```

3. Install JavaScript dependencies
```bash
npm install
```

4. Set up the database
```bash
rails db:create
rails db:migrate
rails db:seed  # Loads sample data
```

5. Start the Rails server
```bash
rails server
```

6. In a separate terminal, start the webpack dev server
```bash
bin/dev
```

7. Access the application at `http://localhost:3000`

## Demo Credentials

Use these credentials to explore the application:

- **Admin User**: admin@example.com / password
- **Researcher**: climate@example.com / password

## Future Enhancements

- **Crud actions with API**: Get data from external API and create projects
- **Collaboration Features**: Comments, sharing, and team management

## Project Structure Highlights

```
app/
├── controllers/            # Rails controllers
│   ├── api/                # API endpoints
│   └── application_controller.rb
├── javascript/            
│   ├── components/         # React components
│   └── services/           # API services
├── models/                 # ActiveRecord models
└── views/                  # Rails views (minimal, mostly React)
```

## Development Insights

### Authentication Flow
The application uses Devise for authentication with a custom session controller to provide login status to the React frontend.

### Data Visualization Strategy
Recharts library is used for rendering time-series data with custom styling and interactive elements.

### API Design Philosophy
RESTful API design with proper error handling, status codes, and JSON responses, following Rails API best practices.

### State Management Approach
React hooks (useState, useEffect) for component-level state management with proper data fetching patterns.

