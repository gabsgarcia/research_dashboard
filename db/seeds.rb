# Clear existing data
puts "Clearing old data..."
Metric.destroy_all
ResearchProject.destroy_all
User.destroy_all

# Create users
puts "Creating users..."

admin = User.create!(
  name: "Admin User",
  email: "admin@example.com",
  password: "password",
  role: "admin"
)

researcher1 = User.create!(
  name: "Climate Researcher",
  email: "climate@example.com",
  password: "password",
  role: "researcher"
)

researcher2 = User.create!(
  name: "Energy Researcher",
  email: "energy@example.com",
  password: "password",
  role: "researcher"
)

# Create projects with specific date ranges
puts "Creating research projects..."

climate = ResearchProject.create!(
  title: "Climate Change Study",
  description: "Analysis of temperature changes in coastal regions",
  category: "Environmental Science",
  start_date: Date.today - 180,  # 6 months ago
  end_date: Date.today + 90,     # 3 months from now
  status: "active",
  user: researcher1
)

energy = ResearchProject.create!(
  title: "Solar Panel Efficiency",
  description: "Comparing efficiency of different solar panel types",
  category: "Renewable Energy",
  start_date: Date.today - 120,  # 4 months ago
  end_date: Date.today + 60,     # 2 months from now
  status: "active",
  user: researcher2
)

medical = ResearchProject.create!(
  title: "Vaccine Effectiveness",
  description: "Tracking long-term effectiveness of vaccines",
  category: "Medical Research",
  start_date: Date.today - 365,  # 1 year ago
  end_date: Date.today - 30,     # 1 month ago
  status: "completed",
  user: admin
)

# Create metrics with dates within project timelines
puts "Creating metrics..."

# Climate metrics (must be between 6 months ago and 3 months from now)
6.times do |i|
  # Calculate date within the climate project timeline
  metric_date = climate.start_date + i * 25  # Spread metrics across the timeline

  Metric.create!(
    research_project: climate,
    name: "Average Temperature",
    value: 23.5 + (i * 0.5),
    date: metric_date,
    description: "Measured at sea level"
  )

  Metric.create!(
    research_project: climate,
    name: "Sea Level Rise",
    value: 2.0 + (i * 0.3),
    date: metric_date,
    description: "Measured in millimeters"
  )
end

# Energy metrics (must be between 4 months ago and 2 months from now)
6.times do |i|
  # Calculate date within the energy project timeline
  metric_date = energy.start_date + i * 20  # Spread metrics across the timeline

  Metric.create!(
    research_project: energy,
    name: "Panel Efficiency",
    value: 15.0 + (i * 0.8),
    date: metric_date,
    description: "Percentage of solar energy converted"
  )

  Metric.create!(
    research_project: energy,
    name: "Production Cost",
    value: 500 - (i * 25),
    date: metric_date,
    description: "Cost per panel in dollars"
  )
end

# Medical metrics (must be between 1 year ago and 1 month ago)
12.times do |i|
  # Calculate date within the medical project timeline
  range_days = (medical.end_date - medical.start_date).to_i
  days_to_add = (i * range_days / 12.0).floor
  metric_date = medical.start_date + days_to_add

  Metric.create!(
    research_project: medical,
    name: "Effectiveness Rate",
    value: 94.0 + (i % 3) - 1,
    date: metric_date,
    description: "Percentage effectiveness against infection"
  )

  Metric.create!(
    research_project: medical,
    name: "Side Effect Rate",
    value: 12.0 - (i * 0.8).clamp(0, 12),
    date: metric_date,
    description: "Percentage reporting any side effects"
  )
end

puts "Seed data created!"
puts "Created #{User.count} users, #{ResearchProject.count} projects, and #{Metric.count} metrics."
puts ""
puts "Login credentials:"
puts "  Admin: admin@example.com / password"
puts "  Researcher 1: climate@example.com / password"
puts "  Researcher 2: energy@example.com / password"
