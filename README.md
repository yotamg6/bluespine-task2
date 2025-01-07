# Patient Medical History Viewer

A React application for visualizing patient medical claims and history in an interactive timeline format.

## Features

- Chronological display of medical claims in a two-sided timeline
- Color-coded claim amounts with high-cost alerts
- Diagnosis code visualization
- Grouped procedure codes with tooltips for overflow
- Scroll pagination
- Medical code categorization with tag system

## Tech Stack

- React with TypeScript
- Material-UI (MUI) for UI components

## Project Structure

- `/api`: API services and data fetching
- `/components`: React components for timeline and layout
- `/hooks`: Custom hooks for patients and claims data
- `/types`: TypeScript interfaces
- `/utils`: Helper functions and constants

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm start`

## Key Components

- `TimeLine`: Main timeline visualization
- `TimeLineElement`: Individual claim display
- `PageHeader`: Navigation and title display
- `InfoBar`: Patient information summary
