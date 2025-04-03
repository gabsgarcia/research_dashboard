# Required gems
require 'faker'

# Set Faker configuration for deterministic output (optional)
# This ensures you get the same data each time you run the seed
Faker::Config.random = Random.new(42)

# Clear existing data to ensure we're starting fresh
puts "Clearing old data..."
Note.destroy_all
Favorite.destroy_all
Metric.destroy_all
ResearchProject.destroy_all
User.destroy_all

# Create users with randomly generated data
puts "Creating users..."

# Create an admin user
admin = User.create!(
  name: "Dr. Sarah Mitchell",
  email: "admin@example.com",
  password: "password",
  role: "admin"
)

# Create researchers with academic titles and realistic emails
researchers = []
5.times do |i|
  name = Faker::Name.name
  email_name = name.downcase.gsub(/[^a-z]/, '.').gsub(/\.+/, '.')

  researcher = User.create!(
    name: "Dr. #{name}",
    email: i.zero? ? "climate@example.com" : (i == 1 ? "energy@example.com" : "#{email_name}@#{Faker::Internet.domain_name}"),
    password: "password",
    role: "researcher"
  )

  researchers << researcher
end

# Create projects with detailed descriptions and realistic parameters
puts "Creating research projects..."

# Generate realistic project data
# Array of potential funding sources for context (even if not in schema)
funding_sources = [
  "National Science Foundation", "Department of Energy", "National Institutes of Health",
  "Environmental Protection Agency", "DARPA", "NASA", "European Research Council",
  "Gates Foundation", "World Health Organization", "Ocean Conservation Foundation",
  "Climate Research Initiative", "Tech Climate Initiative", "United Nations Development Programme"
]

# Array of project categories (extended beyond what Faker offers)
project_categories = [
  # Environmental & Earth Sciences
  "Climate Science", "Atmospheric Science", "Oceanography", "Glaciology", "Geology",
  # Energy Sciences
  "Renewable Energy", "Energy Storage", "Nuclear Science", "Smart Grid Systems", "Energy Efficiency",
  # Life & Health Sciences
  "Medical Research", "Public Health", "Genomics", "Neuroscience", "Epidemiology", "Immunology",
  # Biological & Conservation Sciences
  "Marine Biology", "Conservation Biology", "Biodiversity Research", "Ecological Modeling", "Sustainable Forestry",
  # Physical Sciences
  "Materials Science", "Quantum Physics", "Nanotechnology", "Photonics", "Superconductivity",
  # Computing & Data Sciences
  "Computational Science", "Machine Learning", "Data Science", "Computer Vision", "Quantum Computing",
  # Applied Sciences
  "Biotechnology", "Agricultural Science", "Food Science", "Sustainable Technology", "Biomechanics"
]

# Custom method to generate more realistic research project titles
def generate_project_title(category)
  # Adjectives for research titles
  adjectives = [
    "Advanced", "Novel", "Integrated", "Comprehensive", "Innovative", "Systematic",
    "Comparative", "Long-term", "Interdisciplinary", "Quantitative", "Pioneering",
    "Sustainable", "Adaptive", "Resilient", "Transformative", "Collaborative"
  ]

  # Research actions/approaches
  approaches = [
    "Investigation", "Analysis", "Assessment", "Characterization", "Evaluation",
    "Study", "Exploration", "Monitoring", "Simulation", "Modeling", "Development",
    "Synthesis", "Discovery", "Validation", "Implementation", "Optimization"
  ]

  # Generate title based on category
  case category
  when "Climate Science", "Atmospheric Science", "Oceanography", "Glaciology"
    regions = ["Arctic", "Antarctic", "Tropical", "Temperate", "Coastal", "Mountain", "Urban", "Global", "Regional"]
    phenomena = ["Temperature Patterns", "Precipitation Cycles", "Weather Extremes", "Carbon Fluxes", "Ice Dynamics", "Climate Feedback Mechanisms"]
    "#{adjectives.sample} #{approaches.sample} of #{regions.sample} #{phenomena.sample}"

  when "Renewable Energy", "Energy Storage", "Energy Efficiency", "Smart Grid Systems"
    technologies = ["Solar Cell", "Wind Turbine", "Fuel Cell", "Battery", "Biofuel", "Tidal Generator", "Geothermal System", "Hydrogen Storage"]
    aspects = ["Efficiency", "Durability", "Scalability", "Performance", "Cost-effectiveness", "Integration", "Lifecycle"]
    "#{adjectives.sample} #{technologies.sample} #{aspects.sample} #{approaches.sample} for #{["Rural", "Urban", "Commercial", "Residential", "Industrial", "Grid-scale"].sample} Applications"

  when "Medical Research", "Public Health", "Genomics", "Neuroscience", "Epidemiology", "Immunology"
    health_topics = ["Disease Resistance", "Immune Response", "Neural Pathway", "Gene Expression", "Drug Delivery", "Diagnostic Method", "Treatment Protocol", "Vaccine Efficacy"]
    conditions = ["Infectious Disease", "Chronic Condition", "Genetic Disorder", "Autoimmune Response", "Neurological Impairment", "Metabolic Syndrome"]
    "#{adjectives.sample} #{approaches.sample} of #{health_topics.sample} in #{conditions.sample}"

  when "Marine Biology", "Conservation Biology", "Biodiversity Research", "Ecological Modeling"
    ecosystems = ["Coral Reef", "Mangrove Forest", "Seagrass Meadow", "Kelp Forest", "Deep Sea Vent", "Intertidal Zone", "Pelagic Zone", "Marine Protected Area"]
    eco_aspects = ["Biodiversity", "Ecosystem Services", "Species Interactions", "Restoration Potential", "Resilience", "Carbon Sequestration"]
    "#{adjectives.sample} #{approaches.sample} of #{ecosystems.sample} #{eco_aspects.sample} in #{["Tropical", "Temperate", "Arctic", "Coastal", "Offshore"].sample} Waters"

  when "Materials Science", "Nanotechnology", "Quantum Physics", "Photonics"
    materials = ["Nanostructured Materials", "Quantum Dots", "Two-dimensional Materials", "Metamaterials", "Biomaterials", "Semiconductor Composites", "Photonic Crystals"]
    properties = ["Electrical Properties", "Optical Response", "Thermal Conductivity", "Mechanical Strength", "Quantum Coherence", "Phase Transitions"]
    "#{adjectives.sample} #{approaches.sample} of #{properties.sample} in #{materials.sample}"

  when "Computational Science", "Machine Learning", "Data Science", "Computer Vision"
    tech_approaches = ["Deep Learning", "Reinforcement Learning", "Neural Network", "Bayesian", "Graph-based", "Federated Learning", "Transfer Learning"]
    applications = ["Image Recognition", "Natural Language Processing", "Anomaly Detection", "Time Series Prediction", "Multi-modal Analysis", "Decision Support"]
    "#{tech_approaches.sample} #{approaches.sample} for #{applications.sample} in #{["Environmental", "Medical", "Industrial", "Social", "Economic"].sample} Contexts"

  when "Biotechnology", "Agricultural Science", "Food Science"
    bio_topics = ["Crop Yield", "Drought Resistance", "Nutrient Uptake", "Soil Health", "Pest Management", "Food Preservation", "Protein Engineering"]
    methods = ["CRISPR-based Editing", "Microbial Enhancement", "Metabolic Engineering", "Precision Agriculture", "Sustainable Practices"]
    "#{adjectives.sample} #{approaches.sample} of #{bio_topics.sample} through #{methods.sample}"

  else
    # Fallback for any other categories
    "#{adjectives.sample} #{approaches.sample} of #{Faker::Science.science} #{["Patterns", "Mechanisms", "Systems", "Processes", "Dynamics"].sample}"
  end
end

# Create several research projects with randomized data
projects = []

# Climate project - always include one
climate = ResearchProject.create!(
  title: generate_project_title("Climate Science"),
  description: "Long-term study of climate patterns and their correlation with global temperature anomalies, atmospheric composition, and ocean acidification levels. #{Faker::Lorem.paragraph(sentence_count: 3)}",
  category: "Climate Science",
  start_date: Faker::Date.between(from: 2.years.ago, to: 1.year.ago),
  end_date: Faker::Date.between(from: 1.year.from_now, to: 3.years.from_now),
  status: "active",
  user: researchers[0]
)
projects << climate

# Energy project - always include one
energy = ResearchProject.create!(
  title: generate_project_title("Renewable Energy"),
  description: "Research on improving efficiency and stability of renewable energy technologies, focusing on extending operational lifetime and reducing manufacturing costs. #{Faker::Lorem.paragraph(sentence_count: 3)}",
  category: "Renewable Energy",
  start_date: Faker::Date.between(from: 2.years.ago, to: 1.year.ago),
  end_date: Faker::Date.between(from: 6.months.from_now, to: 2.years.from_now),
  status: "active",
  user: researchers[1]
)
projects << energy

# Medical project - completed
medical = ResearchProject.create!(
  title: generate_project_title("Medical Research"),
  description: "Study of novel medical technologies and approaches to improve health outcomes and treatment efficacy. #{Faker::Lorem.paragraph(sentence_count: 3)}",
  category: "Medical Research",
  start_date: Faker::Date.between(from: 3.years.ago, to: 2.years.ago),
  end_date: Faker::Date.between(from: 3.months.ago, to: 1.month.ago),
  status: "completed",
  user: researchers[2]
)
projects << medical

# Generate 3-5 additional projects with random attributes
(3..Faker::Number.between(from: 3, to: 5)).each do |i|
  category = project_categories.sample

  project = ResearchProject.create!(
    title: generate_project_title(category),
    description: "#{Faker::Lorem.paragraph(sentence_count: 4)}",
    category: category,
    start_date: Faker::Date.between(from: 2.years.ago, to: 6.months.ago),
    end_date: Faker::Date.between(from: 3.months.from_now, to: 3.years.from_now),
    status: %w[active paused cancelled].sample,
    user: researchers.sample
  )

  projects << project
end

# Helper method to generate realistic time series with trend, seasonality, and noise components
# This simulates real-world data patterns that would appear in research measurements
def generate_time_series(start_value, num_points, trend_factor: 0, seasonal_amplitude: 0, seasonal_period: 12, noise_level: 0, min_value: nil, max_value: nil)
  series = []

  num_points.times do |i|
    # Base value with linear trend (increasing or decreasing over time)
    value = start_value + (trend_factor * i)

    # Add seasonality (cyclic patterns like seasonal variations)
    # Using sine wave to create a repeating pattern with specified amplitude and period
    value += seasonal_amplitude * Math.sin(2 * Math::PI * i / seasonal_period) if seasonal_amplitude > 0

    # Add random noise (simulates measurement variation and natural randomness)
    value += rand(-noise_level..noise_level)

    # Apply minimum and maximum bounds if specified (prevents unrealistic values)
    value = [value, min_value].max if min_value
    value = [value, max_value].min if max_value

    # Round to 2 decimal places for cleaner display
    series << value.round(2)
  end

  series
end

# Create the metrics for each project
puts "Creating metrics for each project..."

# Custom comprehensive metrics for different scientific fields
# Define metric name categories that make sense for different project types
climate_metrics = [
  { name: "Temperature Anomaly", unit: "°C", desc: "deviation from baseline" },
  { name: "CO2 Concentration", unit: "ppm", desc: "parts per million" },
  { name: "Sea Ice Extent", unit: "km²", desc: "million square kilometers" },
  { name: "Ocean pH", unit: "", desc: "acidity measurement" },
  { name: "Sea Level Rise", unit: "mm", desc: "millimeters per year" },
  { name: "Methane Levels", unit: "ppb", desc: "parts per billion" },
  { name: "Precipitation Anomaly", unit: "mm", desc: "deviation from historical average" },
  { name: "Glacial Mass Balance", unit: "Gt/yr", desc: "gigatonnes per year" },
  { name: "Ocean Heat Content", unit: "ZJ", desc: "zettajoules in upper 2000m" },
  { name: "Carbon Flux", unit: "PgC/yr", desc: "petagrams carbon per year" }
]

energy_metrics = [
  { name: "Conversion Efficiency", unit: "%", desc: "energy conversion rate" },
  { name: "Operational Lifetime", unit: "hours", desc: "before degradation" },
  { name: "Manufacturing Cost", unit: "$/unit", desc: "production cost" },
  { name: "Energy Density", unit: "Wh/kg", desc: "energy per mass" },
  { name: "Power Output", unit: "W", desc: "watts generated" },
  { name: "Material Purity", unit: "%", desc: "composition quality" },
  { name: "Charge-Discharge Cycles", unit: "cycles", desc: "before capacity drops to 80%" },
  { name: "Thermal Stability", unit: "°C", desc: "maximum operating temperature" },
  { name: "Energy Payback Time", unit: "years", desc: "to recoup energy used in manufacturing" },
  { name: "Grid Integration Efficiency", unit: "%", desc: "utilization efficiency when grid-connected" }
]

medical_metrics = [
  { name: "Efficacy Rate", unit: "%", desc: "treatment effectiveness" },
  { name: "Side Effect Incidence", unit: "%", desc: "reported side effects" },
  { name: "Patient Recovery Time", unit: "days", desc: "time to recovery" },
  { name: "Treatment Cost", unit: "$", desc: "per patient" },
  { name: "Survival Rate", unit: "%", desc: "long-term survival" },
  { name: "Quality of Life Score", unit: "points", desc: "patient-reported outcome" },
  { name: "Biomarker Expression", unit: "ng/mL", desc: "concentration in blood" },
  { name: "Drug Half-life", unit: "hours", desc: "in human circulation" },
  { name: "Immune Response Strength", unit: "titer", desc: "antibody concentration" },
  { name: "Pathogen Load", unit: "copies/mL", desc: "concentration in samples" }
]

computational_metrics = [
  { name: "Prediction Accuracy", unit: "%", desc: "correct predictions" },
  { name: "Processing Time", unit: "seconds", desc: "computation duration" },
  { name: "Memory Usage", unit: "GB", desc: "required memory" },
  { name: "Model Error Rate", unit: "RMSE", desc: "root mean squared error" },
  { name: "Data Processing Rate", unit: "MB/s", desc: "throughput" },
  { name: "Algorithm Efficiency", unit: "ops/s", desc: "operations per second" },
  { name: "F1 Score", unit: "", desc: "harmonic mean of precision and recall" },
  { name: "AUC-ROC", unit: "", desc: "area under receiver operating characteristic curve" },
  { name: "Training Convergence", unit: "epochs", desc: "iterations until model convergence" },
  { name: "Inference Latency", unit: "ms", desc: "milliseconds per prediction" }
]

biology_metrics = [
  { name: "Species Count", unit: "number", desc: "unique species" },
  { name: "Growth Rate", unit: "cm/month", desc: "size increase" },
  { name: "Survival Rate", unit: "%", desc: "population survival" },
  { name: "Reproduction Rate", unit: "offspring", desc: "per breeding cycle" },
  { name: "Genetic Diversity", unit: "index", desc: "population variability" },
  { name: "Environmental Tolerance", unit: "°C", desc: "temperature range" },
  { name: "Biomass Accumulation", unit: "kg/m²", desc: "mass per area" },
  { name: "Photosynthetic Efficiency", unit: "%", desc: "of photosynthetically active radiation" },
  { name: "Trophic Efficiency", unit: "%", desc: "energy transfer between trophic levels" },
  { name: "Population Density", unit: "individuals/km²", desc: "per square kilometer" }
]

materials_metrics = [
  { name: "Tensile Strength", unit: "MPa", desc: "megapascals" },
  { name: "Thermal Conductivity", unit: "W/(m·K)", desc: "watts per meter-kelvin" },
  { name: "Electrical Resistivity", unit: "Ω·m", desc: "ohm-meters" },
  { name: "Crystallinity", unit: "%", desc: "crystalline fraction" },
  { name: "Young's Modulus", unit: "GPa", desc: "gigapascals" },
  { name: "Optical Transparency", unit: "%", desc: "light transmission" },
  { name: "Band Gap", unit: "eV", desc: "electron volts" },
  { name: "Surface Area", unit: "m²/g", desc: "square meters per gram" },
  { name: "Quantum Yield", unit: "%", desc: "photon conversion efficiency" },
  { name: "Corrosion Rate", unit: "mm/year", desc: "material loss per year" }
]

agricultural_metrics = [
  { name: "Crop Yield", unit: "t/ha", desc: "tonnes per hectare" },
  { name: "Water Use Efficiency", unit: "kg/m³", desc: "yield per water volume" },
  { name: "Nitrogen Utilization", unit: "%", desc: "percentage of applied nitrogen used" },
  { name: "Pest Resistance", unit: "index", desc: "resistance rating" },
  { name: "Soil Organic Matter", unit: "%", desc: "percentage in soil" },
  { name: "Root Depth", unit: "cm", desc: "centimeters below surface" },
  { name: "Germination Rate", unit: "%", desc: "successful germination" },
  { name: "Nutritional Content", unit: "mg/100g", desc: "key nutrient concentration" },
  { name: "Drought Tolerance", unit: "days", desc: "survival without irrigation" },
  { name: "Carbon Sequestration", unit: "tC/ha/yr", desc: "tonnes carbon per hectare per year" }
]

# Variable to collect all metrics for later use
all_metrics = []

# Process each project to generate appropriate metrics
projects.each do |project|
  # Select metric set based on project category
  metric_set = case project.category
  when "Climate Science", "Atmospheric Science", "Oceanography", "Glaciology"
    climate_metrics
  when "Renewable Energy", "Energy Storage", "Energy Efficiency", "Smart Grid Systems"
    energy_metrics
  when "Medical Research", "Public Health", "Genomics", "Epidemiology", "Immunology", "Neuroscience"
    medical_metrics
  when "Computational Science", "Machine Learning", "Data Science", "Computer Vision", "Quantum Computing"
    computational_metrics
  when "Marine Biology", "Conservation Biology", "Biodiversity Research", "Ecological Modeling", "Sustainable Forestry"
    biology_metrics
  when "Materials Science", "Nanotechnology", "Photonics", "Superconductivity"
    materials_metrics
  when "Agricultural Science", "Food Science", "Sustainable Technology"
    agricultural_metrics
  else
    # For other categories, select an appropriate set or mix metrics
    case
    when project.category.include?("Energy") || project.category.include?("Power")
      energy_metrics
    when project.category.include?("Bio") || project.category.include?("Eco")
      biology_metrics
    when project.category.include?("Health") || project.category.include?("Medical")
      medical_metrics
    when project.category.include?("Comput") || project.category.include?("Data")
      computational_metrics
    when project.category.include?("Climate") || project.category.include?("Environment")
      climate_metrics
    else
      # Create a custom mix of metrics from 2-3 different sets
      metric_sets = [climate_metrics, energy_metrics, medical_metrics, computational_metrics, biology_metrics, materials_metrics, agricultural_metrics].sample(3)
      metric_sets.flat_map { |set| set.sample(3) }
    end
  end

  # Select 3-5 metrics for this project
  selected_metrics = metric_set.sample(Faker::Number.between(from: 3, to: 5))

  # Define the date range for metrics
  project_start = project.start_date
  project_end = [Date.today, project.end_date].min
  project_range = (project_end - project_start).to_i

  # Determine measurement frequency - between weekly and monthly
  # More frequent measurements for computational projects, less frequent for biological
  measurement_days = case project.category
  when "Computational Science", "Data Science"
    Faker::Number.between(from: 7, to: 14)  # Weekly to biweekly
  when "Marine Biology", "Conservation Biology"
    Faker::Number.between(from: 20, to: 40) # ~3 weeks to monthly
  else
    Faker::Number.between(from: 10, to: 30) # Biweekly to monthly
  end

  # Ensure we have at least 10 data points
  measurement_days = [measurement_days, (project_range / 10).to_i].min

  # Generate evenly spaced dates
  dates = []
  current_date = project_start
  while current_date <= project_end
    dates << current_date
    current_date += measurement_days.days
  end

  # For each selected metric, generate appropriate time series
  selected_metrics.each_with_index do |metric_info, idx|
    # Define parameters for this metric type
    params = case metric_info[:name]
    when /Efficiency|Accuracy|Rate|Survival|Purity/
      # Percentages or rates that typically improve but have upper limits
      {
        start_value: Faker::Number.between(from: 60.0, to: 90.0),
        trend_factor: Faker::Number.between(from: 0.05, to: 0.3),
        seasonal_amplitude: Faker::Number.between(from: 0.0, to: 5.0),
        seasonal_period: Faker::Number.between(from: 8, to: 20),
        noise_level: Faker::Number.between(from: 0.2, to: 2.0),
        max_value: 100.0,
        min_value: 0.0
      }
    when /Cost|Time|Error|Usage/
      # Metrics that should decrease (improve)
      {
        start_value: Faker::Number.between(from: 50.0, to: 500.0),
        trend_factor: Faker::Number.between(from: -0.2, to: -1.0),
        seasonal_amplitude: Faker::Number.between(from: 1.0, to: 20.0),
        seasonal_period: Faker::Number.between(from: 8, to: 20),
        noise_level: Faker::Number.between(from: 1.0, to: 10.0),
        min_value: 0.0
      }
    when /Temperature|Anomaly|Level|pH|CO2/
      # Environmental measurements with specific trends
      {
        start_value: metric_info[:name].include?("pH") ? Faker::Number.between(from: 7.9, to: 8.2) : Faker::Number.between(from: 10.0, to: 500.0),
        trend_factor: metric_info[:name].include?("pH") ? -0.001 : 0.1,  # pH decreasing, others increasing
        seasonal_amplitude: Faker::Number.between(from: 0.05, to: 10.0),
        seasonal_period: Faker::Number.between(from: 12, to: 24),  # Annual or semi-annual cycle
        noise_level: Faker::Number.between(from: 0.01, to: 5.0)
      }
    else
      # Default parameters for other metrics
      {
        start_value: Faker::Number.between(from: 10.0, to: 100.0),
        trend_factor: Faker::Number.between(from: -0.5, to: 0.5),
        seasonal_amplitude: Faker::Number.between(from: 0.0, to: 10.0),
        seasonal_period: Faker::Number.between(from: 8, to: 24),
        noise_level: Faker::Number.between(from: 0.1, to: 5.0)
      }
    end

    # Generate values for this metric
    values = generate_time_series(
      params[:start_value],
      dates.size,
      trend_factor: params[:trend_factor],
      seasonal_amplitude: params[:seasonal_amplitude],
      seasonal_period: params[:seasonal_period],
      noise_level: params[:noise_level],
      min_value: params[:min_value],
      max_value: params[:max_value]
    )

    # Create metrics by pairing dates with values
    project_metrics = []
    dates.each_with_index do |date, i|
      # Add some randomness to dates to avoid perfect regularity
      jitter = Faker::Number.between(from: -2, to: 2).days
      actual_date = date + jitter

      # Ensure date is within project range
      actual_date = [actual_date, project_start].max
      actual_date = [actual_date, project_end].min

      # Create a scientifically appropriate description with units
      # Generate appropriate measurement descriptors based on the metric type
      measurement_descriptors = case metric_info[:name]
        when /Temperature|Heat|Thermal/
          ["Average", "Peak", "Minimum", "Diurnal", "Seasonal", "Annual"]
        when /Concentration|Level|Content|Rate/
          ["Mean", "Maximum", "Minimum", "Cumulative", "Integrated", "Normalized"]
        when /Efficiency|Performance|Yield/
          ["Operational", "Theoretical", "Practical", "Measured", "Optimized", "Field-tested"]
        when /Time|Duration|Period|Cycle/
          ["Full-cycle", "Steady-state", "Initial", "Terminal", "Recovery", "Response"]
        when /Cost|Economic|Price/
          ["Amortized", "Total", "Marginal", "Production", "Operational", "Lifecycle"]
        when /Accuracy|Error|Precision/
          ["Statistical", "Validated", "Cross-verified", "Confidence-adjusted", "Bias-corrected"]
        else
          ["Measured", "Observed", "Calculated", "Derived", "Estimated", "Recorded"]
      end

      # Create the metric and store it in our array
      metric = Metric.create!(
        research_project: project,
        name: metric_info[:name],
        value: values[i],
        date: actual_date,
        description: "#{measurement_descriptors.sample} #{metric_info[:desc]}#{metric_info[:unit].empty? ? '' : ' (' + metric_info[:unit] + ')'}"
      )

      project_metrics << metric
    end

    # Add all metrics from this project to our tracking array
    all_metrics.concat(project_metrics)
  end
end

# Create favorites
puts "Creating user favorites..."

# For each user, randomly favorite some projects
User.all.each do |user|
  # Skip for some users to have diversity
  next if rand < 0.2

  # Select 1-3 random projects to favorite
  favorite_count = Faker::Number.between(from: 1, to: 3)
  favorite_projects = projects.sample(favorite_count)

  favorite_projects.each do |project|
    # Don't let users favorite their own projects
    next if project.user_id == user.id

    Favorite.create!(
      user: user,
      research_project: project
    )
  end
end

# Create notes on metrics
puts "Creating notes on metrics..."

# Create notes for a subset of metrics (so not every metric has notes)
notable_metrics = all_metrics.sample(all_metrics.size / 3)
notable_metrics.each do |metric|
  # Determine if we want multiple notes on this metric
  note_count = rand < 0.3 ? Faker::Number.between(from: 2, to: 3) : 1

  note_count.times do
    # Select a random user, but give preference to the project owner
    note_user = rand < 0.7 ? metric.research_project.user : User.all.sample

    # Custom scientific note generation with realistic content
    # Define common scientific observations by metric type
    observation_by_type = {
      /Temperature|Heat|Thermal/ => [
        "Unusual thermal gradient observed during measurement.",
        "Temperature fluctuations may be affecting readings.",
        "Heat sink efficiency degraded during extended testing.",
        "Thermal equilibrium took longer than anticipated to achieve.",
        "Seasonal temperature variations appear stronger than modeled."
      ],
      /Efficiency|Performance|Accuracy|Rate/ => [
        "Performance peaked under specific test conditions.",
        "Efficiency drops noted during scaled testing.",
        "Rate improvements plateaued after initial gains.",
        "Accuracy diminished with increased sample diversity.",
        "Performance metrics exceed predicted models by ~8%."
      ],
      /Cost|Economic|Price/ => [
        "Cost factors increased due to supply chain disruptions.",
        "Economic factors improved with process optimization.",
        "Price point remains above target threshold.",
        "Cost-benefit ratio improved in latest iteration.",
        "Economic viability confirmed at current performance levels."
      ],
      /Concentration|Levels|Content|PPM|PPB/ => [
        "Concentrations varied significantly between sampling sites.",
        "Levels stabilized after environmental controls implemented.",
        "Content analysis shows unexpected trace elements.",
        "Concentration gradient steeper than anticipated.",
        "Seasonal variations in baseline levels identified."
      ],
      /Time|Duration|Period|Cycle/ => [
        "Time series shows unexpected periodicity.",
        "Duration extended in low-temperature conditions.",
        "Cycle time optimization achieved through protocol adjustments.",
        "Time-dependent degradation less severe than predicted.",
        "Periodic oscillations detected in long-term measurements."
      ],
      /Genetic|DNA|RNA|Genomic/ => [
        "Gene expression patterns show environmental adaptation.",
        "DNA sequencing revealed unexpected polymorphisms.",
        "RNA transcription rates vary with circadian rhythms.",
        "Genomic stability maintained across test conditions.",
        "Genetic diversity higher in peripheral populations."
      ],
      /Error|Uncertainty|Variance/ => [
        "Error margins reduced after calibration adjustments.",
        "Uncertainty quantification methodology refined.",
        "Variance analysis suggests additional control variables needed.",
        "Error propagation less significant than predicted.",
        "Systematic uncertainty identified in measurement apparatus."
      ]
    }

    # Get the metric name to find relevant observations
    metric_name = metric.name

    # Find matching observation types or use general observations
    matching_observations = []
    observation_by_type.each do |pattern, observations|
      if metric_name.match?(pattern)
        matching_observations.concat(observations)
      end
    end

    # General observations if no specific matches found
    general_observations = [
      "Unusual anomaly observed during measurement period.",
      "Equipment calibration may affect accuracy of these readings.",
      "Value #{rand < 0.5 ? 'higher' : 'lower'} than expected based on theoretical models.",
      "Environmental factors may be influencing measurement stability.",
      "Results suggest reassessment of baseline assumptions.",
      "Correlation with secondary variables stronger than anticipated.",
      "Measurement precision improved after protocol adjustments.",
      "Unexpected pattern emerged during extended observation.",
      "Follow-up validation scheduled with refined methodology.",
      "Results consistent with hypothesis under specific conditions."
    ]

    # Combine specific and general observations
    all_observations = matching_observations.empty? ? general_observations : matching_observations + general_observations.sample(2)

    # Add some context about timing and next steps
    follow_ups = [
      "Follow-up measurement scheduled for #{Faker::Date.forward(days: 30).strftime('%B %d')}.",
      "Planning to repeat under controlled conditions next quarter.",
      "Will compare with results from alternate methodology.",
      "Additional validation runs planned to confirm pattern.",
      "Team meeting scheduled to discuss implications of these findings.",
      "Adjusting protocols based on these observations.",
      "Comparison with external lab results pending.",
      "Literature review in progress to contextualize findings."
    ]

    # Create the final note
    note_content = "#{all_observations.sample} #{follow_ups.sample} #{Faker::Lorem.sentence}"

    Note.create!(
      user: note_user,
      metric: metric,
      content: note_content
    )
  end
end

# Print summary of what was created
puts "Seed data created!"
puts "Created #{User.count} users, #{ResearchProject.count} projects, and #{Metric.count} metrics."
puts "Also created #{Favorite.count} favorites and #{Note.count} notes."

puts ""
puts "Login credentials:"
puts "  Admin: admin@example.com / password"
puts "  Climate Researcher: climate@example.com / password"
puts "  Energy Researcher: energy@example.com / password"
puts "  Additional users: [email shown in database] / password"
