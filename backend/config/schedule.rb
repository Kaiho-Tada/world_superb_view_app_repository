ENV.each { |k, v| env(k, v) }
ENV["RAILS_ENV"] ||= "development"
set :environment, ENV.fetch("RAILS_ENV", nil)
set :output, "log/cron.log"

every 24.hours do
  rake "country_risk_level:get_country_risk_level"
end
