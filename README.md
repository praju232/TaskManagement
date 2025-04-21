# Task Management Dashboard

A modern task management application built with Angular, featuring a Kanban board layout and drag-and-drop functionality.

## Features

- Kanban board layout with three columns (To Do, In Progress, Done)
- Drag-and-drop task management
- Create new tasks with title, description, and status
- Delete tasks
- Update task status
- Responsive design
- Modern UI with Bootstrap

## Architecture

### Frontend
- **Framework**: Angular 18+
- **UI Framework**: Bootstrap 5.3
- **State Management**: Component-based state management
- **Routing**: Angular Router
- **API Integration**: JSON Server for mock API

### Project Structure
```
src/
├── app/
│   ├── api.service.ts        # API service for CRUD operations
│   ├── dashboard/
│   │   ├── dashboard.component.html  # Kanban board UI
│   │   ├── dashboard.component.ts    # Task management logic
│   │   └── dashboard.component.sass  # Component styling
│   ├── app.config.ts         # Application configuration
│   └── app.routes.ts         # Application routing
├── assets/                   # Static assets
└── environments/            # Environment configurations
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd TaskManagement
```

2. Install dependencies:
```bash
npm install
```

3. Start JSON Server (for mock API):
```bash
npm install -g json-server
json-server --watch db.json
```

4. Start Angular development server:
```bash
ng serve
```

The application will be available at `http://localhost:4200`

## Usage

1. Add New Task:
   - Click the "Add New Task" button
   - Fill in the title, description, and select a status
   - Click "Create Task" to save

2. Manage Tasks:
   - Drag and drop tasks between columns to update status
   - Click the delete button to remove a task
   - Tasks persist in the database

## Technologies Used

- **Frontend**: Angular 18+
- **UI Framework**: Bootstrap 5.3
- **API**: JSON Server
- **Icons**: Font Awesome
- **Development Tools**: Angular CLI, npm

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
